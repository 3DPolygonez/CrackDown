import * as THREE from 'three';

export class Blast {
  constructor(position, scene, blasts) {
    const geometry = new THREE.CircleGeometry(0.05, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.castShadow = true;
    this.size = 0;
    this.maxSize = 10;

    blasts.push(this);
    scene.add(this.mesh);
  }
  
  die(scene, blasts){
      scene.remove(this.mesh);
      blasts.splice(blasts.indexOf(this), 1);
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
  }

  update(delta, scene, blasts) {
    this.size += 1;
    this.mesh.scale.x += 0.5;
    this.mesh.scale.y += 0.5;
    if (this.size >= this.maxSize) {
      this.die(scene, blasts);
    }
  }
}