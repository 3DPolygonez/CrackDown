import * as THREE from 'three';

export class CameraSystem {
    #cameraRotationPosition;
    #cameraDefaultX;
    #cameraDefaultYZ;
    #cameraTargetX;
    #cameraTargetZ;
    #cameraMovementSnapMultiplier;
    constructor(
        controls,
        renderer,
        input, 
        target, 
        cameraDefaultYZ){
        this.controls = controls;
        this.renderer = renderer;
        this.input = input;
        this.target = target;
        this.#cameraDefaultYZ = cameraDefaultYZ;
        this.#cameraRotationPosition = 0;
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000);
        this.camera.position.x = this.target.position.x;
        this.camera.position.y = this.#cameraDefaultYZ
        this.camera.position.z = this.target.position.z + this.#cameraDefaultYZ;
        this.#cameraTargetX = this.camera.position.x;
        this.#cameraTargetZ = this.camera.position.z;

        window.addEventListener('resize', () => {
            // Update camera aspect, projection matrix, and renderer size
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    update(delta) {
        let cameraX = 0;
        let cameraY = this.#cameraDefaultYZ;
        let cameraZ = 0;
        let cameraDiagonalOffset = 0;
        //  determine camera direction (prevCameraPosition and nextCameraPosition)
        let lastKey = this.input.lastKey();
        let cameraPositionChanged = false;
        if (lastKey == this.controls.nextCameraPosition) {
            this.#cameraRotationPosition += 1;
            cameraPositionChanged = true;
        }
        else if (lastKey == this.controls.prevCameraPosition) {
            this.#cameraRotationPosition -= 1;
            cameraPositionChanged = true;
        }
        //  capture bounds
        if (this.#cameraRotationPosition < 0){
            this.#cameraRotationPosition = 7;
        }
        if (this.#cameraRotationPosition > 7){
            this.#cameraRotationPosition = 0;
        }
        //  determine zoom (cameraZoomIn and cameraZoomOut)
        if (this.input.isDown(this.controls.cameraZoomIn)){
            this.#cameraDefaultYZ -= delta * 8;
        }
        if (this.input.isDown(this.controls.cameraZoomOut)){
            this.#cameraDefaultYZ += delta * 8;
        }
        //  capture bounds
        if (this.#cameraDefaultYZ < 10){
            this.#cameraDefaultYZ = 10;
        }

        /*
            0 camera bottom pointing to top
            1 camera bottom left pointing to top right
            2 camera left pointing to right
            3 camera top left pointing to bottom right
            4 camera top pointing to bottom
            5 camera top right pointing to bottom left
            6 camera right pointing to left
            7 camera bottom right pointing to top left
        */
        switch (this.#cameraRotationPosition){
            case 0: // camera bottom pointing to top
                this.#cameraTargetX = this.target.position.x;
                this.#cameraTargetZ = this.target.position.z + this.#cameraDefaultYZ;
                break;
            case 1: // camera bottom left pointing to top right
                this.#cameraTargetX = this.target.position.x - this.#cameraDefaultYZ + cameraDiagonalOffset;
                this.#cameraTargetZ = this.target.position.z + this.#cameraDefaultYZ - cameraDiagonalOffset;
                break;
            case 2: // camera left pointing to right
                this.#cameraTargetX = this.target.position.x - this.#cameraDefaultYZ;
                this.#cameraTargetZ = this.target.position.z;
                break;
            case 3: // camera top left pointing to bottom right
                this.#cameraTargetX = this.target.position.x - this.#cameraDefaultYZ + cameraDiagonalOffset;
                this.#cameraTargetZ = this.target.position.z - this.#cameraDefaultYZ + cameraDiagonalOffset;
                break;
            case 4: // camera top pointing to bottom
                this.#cameraTargetX = this.target.position.x;
                this.#cameraTargetZ = this.target.position.z - this.#cameraDefaultYZ;
                break;
            case 5: // camera top right pointing to bottom left
                this.#cameraTargetX = this.target.position.x + this.#cameraDefaultYZ - cameraDiagonalOffset;
                this.#cameraTargetZ = this.target.position.z - this.#cameraDefaultYZ + cameraDiagonalOffset; 
                break
            case 6: // camera right pointing to left
                this.#cameraTargetX = this.target.position.x + this.#cameraDefaultYZ;
                this.#cameraTargetZ = this.target.position.z;
                break;
            case 7: // camera bottom right pointing to top left
                this.#cameraTargetX = this.target.position.x + this.#cameraDefaultYZ - cameraDiagonalOffset;
                this.#cameraTargetZ = this.target.position.z + this.#cameraDefaultYZ - cameraDiagonalOffset;
                break;
        }
        //  set the camera positions
        if (Math.abs(this.camera.position.x - this.#cameraTargetX) > 0.5 || cameraPositionChanged){
            if (this.camera.position.x < this.#cameraTargetX){
                this.camera.position.x += delta * 32;
            }
            else if (this.camera.position.x > this.#cameraTargetX){
                this.camera.position.x -= delta * 32;
            }
        }
        else{
            this.camera.position.x = this.#cameraTargetX;
        }
        if (Math.abs(this.camera.position.z - this.#cameraTargetZ) > 0.5 || cameraPositionChanged){
            if (this.camera.position.z < this.#cameraTargetZ){
                this.camera.position.z += delta * 32;
            }
            else if (this.camera.position.z > this.#cameraTargetZ){
                this.camera.position.z -= delta * 32;
            }
        }
        else{
            this.camera.position.z = this.#cameraTargetZ;
        }
        this.camera.position.y = cameraY;
        this.camera.lookAt(this.target.position);
    }
    cameraRotationPosition(){
        return this.#cameraRotationPosition;
    }
}