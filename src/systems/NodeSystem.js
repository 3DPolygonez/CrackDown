import { EnvironmentSystem } from "./EnvironmentSystem";

export class NodeSystem{
    /**
     * Prepares the NodeSystem class to ultimately return an array of coordinators to get from a start position to a goal position.
     * 
     * @param {EnvironmentSystem} environmentSystem - The pre-configured environment system that contains buildings, walls and other objects.
     */
    constructor(environmentSystem){
        this.maxCol = environmentSystem.width;
        this.maxRow = environmentSystem.depth;
        this.xOffset = this.maxCol / 2;
        this.zOffset = this.maxRow / 2;
        this.nodes = Array(this.maxRow).fill(null).map(() => Array(this.maxCol).fill(null));
        this.startNode = null;
        this.goalNode = null;
        this.currentNode = null;
        this.openNodes = [];
        this.checkedNodes = [];
        this.pathNodes = [];
        this.goalReached = false;
        this.step = 0;
        let col = 0;
        let row = 0;
        while (col < this.maxCol && row < this.maxRow){
            this.nodes[row][col] = new Node(col, row);
            col ++;
            if (col == this.maxCol){
                col = 0;
                row ++;
            }
        }
        //  read from the environment system to build the solid objects
        for (const item of environmentSystem.items) {
            for (let x = 0; x < item.mesh.width; x++){
                for (let z = 0; z < item.mesh.depth; z++){
                    this.setSolidNode(x + item.mesh.x + this.xOffset, z + item.mesh.z + this.zOffset)
                }
            }
        }
    }
    getPathWaypoints(){
        const waypointPositions = [];
        this.pathNodes.toReversed().forEach(node => {
            waypointPositions.push([node.col - this.xOffset + 0.5, node.row - this.zOffset + 0.5]); 
        });
        return waypointPositions;
    }
    getSimplifiedPathWaypoints(){
        const waypointPositions = this.getPathWaypoints();
        if (waypointPositions.length <= 2){
            return waypointPositions;
        }
        const optimised = [waypointPositions[0]];
        let lastDirection = null;

        for (let i = 1; i < waypointPositions.length - 1; i++){
            const p1 = waypointPositions[i]
            const p2 = waypointPositions[i + 1];
            //  calculate the vector of the current segment
            const currentDirection = { x: p2[0] - p1[0], z: p2[1] - p1[1] };
            //  if the direction changes, this is a required turning points
            if (lastDirection != null){
                if (currentDirection.x !== lastDirection.x || currentDirection.z !== lastDirection.z){
                    optimised.push(p1);
                }
            }
            lastDirection = currentDirection;
        }
        //  always keep the final destination
        optimised.push(waypointPositions[waypointPositions.length - 1]);
        return optimised;
    }
    setStartWaypoint(x, z){
        /*
            this needs to be explored to see 
            where abouts the start is exactly
        */
        this.setStartNode(Math.round(x) + this.xOffset, Math.round(z) + this.zOffset);
    }
    setStartNode(col, row){
        if (this.nodes[row][col].solid || this.nodes[row][col].goal){
            this.setStartNode(Math.floor(Math.random() * this.maxCol), Math.floor(Math.random() * this.maxRow));
            return;
        }
        this.nodes[row][col].setAsStart();
        this.startNode = this.nodes[row][col];
        this.currentNode = this.startNode;
    }
    setGoalWaypoint(x, z){
        /*
            this needs to be explored to see 
            where abouts the goal is exactly
        */
        this.setGoalNode(Math.round(x) + this.xOffset, Math.round(z) + this.zOffset);
    }
    setGoalNode(col, row){
        if (this.nodes[row][col].solid || this.nodes[row][col].start){
            console.log("oops found solid");
            this.setGoalNode(Math.floor(Math.random() * this.maxCol), Math.floor(Math.random() * this.maxRow));
            return;
        }
        this.nodes[row][col].setAsGoal();
        this.goalNode = this.nodes[row][col];
    }
    setSolidNode(col, row){
        this.nodes[row][col].setAsSolid();
    }
    setNodeCosts(){
        let col = 0;
        let row = 0;
        while (col < this.maxCol && row < this.maxRow){
            this.#setNodeCost(this.nodes[row][col]);
            col ++;
            if (col == this.maxCol){
                col = 0
                row ++;
            }
        }
    }
    #setNodeCost(node){
        //  set G cost (the distance from the start node)
        let xDistance = Math.abs(node.col - this.startNode.col);
        let yDistance = Math.abs(node.row - this.startNode.row);
        node.gCost = xDistance + yDistance;
        //  set H cost (the distance from the goal node)
        xDistance = Math.abs(node.col - this.goalNode.col);
        yDistance = Math.abs(node.row - this.goalNode.row);
        node.hCost = xDistance + yDistance;
        //  set F cost (the total cost)
        node.fCost = node.gCost + node.hCost;
    }
    logNodes(){
        for (let row = 0; row < this.maxRow; row++){
            let output = ("0" + row.toString() + " ").slice(-3);
            for (let col = 0; col < this.maxCol; col++){
                output += this.nodes[row][col].logNode();
            }
            console.log(output);
        }
    }
    autoSearch(){
        while (!this.goalReached && this.step < 300){
            let col = this.currentNode.col;
            let row = this.currentNode.row;
            this.currentNode.setAsChecked();
            this.#addToArray(this.checkedNodes, this.currentNode);
            this.#removeFromArray(this.openNodes, this.currentNode);
            /*
                this needs to be expanded to include
                eight way movement
            */
            /*
                this is only four way movement
            */
            //  open the up node
            if (row - 1 >= 0){
                this.#openNode(this.nodes[row - 1][col]);
            }
            //  open the left node
            if (col - 1 >= 0){
                this.#openNode(this.nodes[row][col - 1]);
            }
            //  open the down node
            if (row + 1 < this.maxRow){
                this.#openNode(this.nodes[row + 1][col]);
            }
            //  open the right node
            if (col + 1 < this.maxCol){
                this.#openNode(this.nodes[row][col + 1]);
            }
            //  find the best node
            let bestNodeIndex = 0;
            let bestNodeCost = 999;
            for (let i = 0; i < this.openNodes.length; i++){
                //  check if the node's f cost is better
                if (this.openNodes[i].fCost < bestNodeCost){
                    bestNodeIndex = i;
                    bestNodeCost = this.openNodes[i].fCost;
                }
                //  if f cost is equal then check the g cost
                else if (this.openNodes[i].fCost == bestNodeCost){
                    if (this.openNodes[i].gCost < this.openNodes[bestNodeIndex].gCost){
                        bestNodeIndex = i;
                    }
                }
            }
            //  after the loop we get the best node which is out next step
            this.currentNode = this.openNodes[bestNodeIndex];
            if (this.currentNode == this.goalNode){
                this.goalReached = true;
                while (this.currentNode != null){
                    this.currentNode.setAsPath();
                    this.pathNodes.push(this.currentNode);
                    this.currentNode = this.currentNode.parentNode;
                }
                this.pathNodes.pop();
            }
        }
        this.step ++;
    }
    #openNode(node){
        if (!node.open && !node.checked && !node.solid){
            node.setAsOpen(this.currentNode);
            this.#addToArray(this.openNodes, node);
        }
    }
    #addToArray(array, item){
        array.push(item);
    }
    #removeFromArray(array, item){
        let index = array.indexOf(item);
        if (index > -1){
            array.splice(index, 1);
        }
    }
}
export class Node{
    constructor(col, row){
        this.parentNode = null;
        this.col = col;
        this.row = row;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;
        this.start = false;
        this.goal = false;
        this.solid = false;
        this.open = false;
        this.checked = false;
        this.path = false;
    }
    setAsStart(){
        this.start = true;
    }
    setAsGoal(){
        this.goal = true;
    }
    setAsSolid(){
        this.solid = true;
    }
    setAsOpen(parentNode){
        this.open = true;
        this.parentNode = parentNode;
    }
    setAsChecked(){
        this.checked = true;
    }
    setAsPath(){
        this.path = true;
    }
    logNode(){
        if (this.start){
            return "🤔";
        }
        if (this.goal){
            return "🎯";
        }
        if (this.solid){
            return "🟫";
        }
        if (this.path){
            return "🌫️";
        }
        if (this.checked){
            return "🟨";
        }
        return "🟩";
    }
}