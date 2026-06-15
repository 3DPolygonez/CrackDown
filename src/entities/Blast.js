import * as THREE from 'three';

export class Blast {
  constructor(position, size) {
    const geometry = new THREE.CircleGeometry(Math.random(), 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.copy(position);
    this.mesh.rotation.x = -Math.PI / 2;

    this.mesh.castShadow = true;
  }

  dispose(){
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }

  update(delta) {
    
  }
}