import * as THREE from 'three';

export class BuildingBlock {
    constructor(x, z, width, height, depth, recessed, opacity, baseColor) {
        this.x = x;
        this.z = z;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.group = new THREE.Group();
        
        const textureLoader = new THREE.TextureLoader();
        const map = textureLoader.load("./resources/textures/floor/tile.png");
        map.colorSpace = THREE.SRGBColorSpace;
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.repeat.set(width - 2, depth - 2);
        const material = new THREE.MeshStandardMaterial({ color: baseColor, transparent: opacity == 1 ? false : true, opacity: opacity });
        const mapMaterial = new THREE.MeshStandardMaterial({ map: map });
        if (recessed){
            //  box shape with roof recessed
            //  (could probably do this better with a cut out)
            const centralBox = new THREE.Mesh(
                new THREE.BoxGeometry(width - 2, height - 0.25, depth - 2), mapMaterial);
            centralBox.position.x = width / 2;
            centralBox.position.y = height / 2;
            centralBox.position.z = depth / 2;
            centralBox.castShadow = true;
            centralBox.receiveShadow = true;
            this.group.add(centralBox);

            const acBox = new THREE.Mesh(
                new THREE.BoxGeometry(1, 0.5, 1), material);
            acBox.position.x = width - 2;
            acBox.position.y = height - 0.25;
            acBox.position.z = 2;
            acBox.castShadow = true;
            acBox.receiveShadow = true;
            this.group.add(acBox);

            const topWall = new THREE.Mesh(
                new THREE.BoxGeometry(width, height, 1), material);
            topWall.position.x = width / 2;
            topWall.position.y = height / 2;
            topWall.position.z = 0.5;
            topWall.castShadow = true;
            topWall.receiveShadow = true;
            this.group.add(topWall);

            const rightWall = new THREE.Mesh(
                new THREE.BoxGeometry(1, height, depth - 2), material);
            rightWall.position.x = width -0.5;
            rightWall.position.y = height / 2;
            rightWall.position.z = depth / 2;
            rightWall.castShadow = true;
            rightWall.receiveShadow = true;
            this.group.add(rightWall);

            const bottomWall = new THREE.Mesh(
                new THREE.BoxGeometry(width, height, 1), material);
            bottomWall.position.x = width / 2;
            bottomWall.position.y = height / 2;
            bottomWall.position.z = depth - 0.5;
            bottomWall.castShadow = true;
            bottomWall.receiveShadow = true;
            this.group.add(bottomWall);

            const leftWall = new THREE.Mesh(
                new THREE.BoxGeometry(1, height, depth - 2), material);
            leftWall.position.x = 0.5;
            leftWall.position.y = height / 2;
            leftWall.position.z = depth / 2;
            leftWall.castShadow = true;
            leftWall.receiveShadow = true;
            this.group.add(leftWall);

            this.group.position.x = x;
            this.group.position.z = z;
        }
        else{
            //  simple box shape
            const box = new THREE.Mesh(
                new THREE.BoxGeometry(width, height, depth), material);
            box.position.x = width / 2;
            box.position.y = height / 2;
            box.position.z = depth / 2;
            box.castShadow = true;
            box.receiveShadow = true;
            this.group.add(box);
        }
        this.group.position.x = x;
        this.group.position.z = z;
    }
    update(delta) {

    }
}