export class WaypointManager {
    #priority;
    #returningFromPriority;
    #baseWaypoints;
    #previousBaseWaypointIndex;
    #currentBaseWaypointIndex;
    #waypoints;
    #previousWaypointIndex;
    #currentWaypointIndex;
    constructor(waypoints){
        this.#priority = false;
        this.#returningFromPriority = false;
        this.#waypoints = waypoints;
        this.#previousWaypointIndex = 0;
        this.#currentWaypointIndex = 0;
        this.#baseWaypoints = waypoints;
        this.#previousBaseWaypointIndex = 0;
        this.#currentBaseWaypointIndex = 0;
    }
    getCurrentWaypoint(){
        return this.#waypoints[this.#currentWaypointIndex];
    }
    getCurrentWaypointX(){
        return this.getCurrentWaypoint()[0];
    }
    getCurrentWaypointZ(){
        return this.getCurrentWaypoint()[1];
    }
    getPreviousWaypoint(){
        return this.#waypoints[this.#previousWaypointIndex];
    }
    getPreviousWaypointX(){
        return this.getPreviousWaypoint()[0];
    }
    getPreviousWaypointZ(){
        return this.getPreviousWaypoint()[1];
    }
    setNextWaypoint(){
        this.#previousWaypointIndex = this.#currentWaypointIndex;
        this.#currentWaypointIndex++;
        if (this.#currentWaypointIndex >= this.#waypoints.length) {
            //  if we're currently on priority
            //  and we've reached the end
            //  then start back down the path
            //  that we travelled
            if (this.#priority){
                this.#priority = false;
                this.#returningFromPriority = true;
                this.#waypoints = this.#waypoints.toReversed();
                this.#currentWaypointIndex = 0;
            }
            //  if we returning from priority
            //  and we've reached the end
            //  then revert back to the base waypoints
            else if (this.#returningFromPriority){
                this.#returningFromPriority = false;
                this.#previousWaypointIndex = this.#previousBaseWaypointIndex;
                this.#currentWaypointIndex = this.#currentBaseWaypointIndex;
                this.#waypoints = this.#baseWaypoints;
            }
            else{
                this.#currentWaypointIndex = 0;
            }
        };
    }
    setPreviousWaypoint(){
        this.#currentWaypointIndex = this.#previousWaypointIndex;
    }
    setPriorityWaypoints(waypoints){
        if (!this.#priority){
            this.#previousBaseWaypointIndex = this.#previousWaypointIndex;
            this.#currentBaseWaypointIndex = this.#currentWaypointIndex;
        }
        this.#priority = true;
        this.#returningFromPriority = false;
        this.#waypoints = waypoints;
        this.#previousWaypointIndex = 0;
        this.#currentWaypointIndex = 0;
    }
}