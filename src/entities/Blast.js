import * as THREE from 'three';

export class Blast {
  constructor(position, size, scene, blasts) {
    this.scene = scene;
    this.blasts = blasts;
    
    const geometry = new THREE.CircleGeometry(size, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    this.mesh.rotation.x = -Math.PI / 2;
    this.size = 0;
    this.maxSize = 10;

    this.blasts.push(this);
    this.scene.add(this.mesh);
  }
  
  die(){
      this.scene.remove(this.mesh);
      this.blasts.splice(this.blasts.indexOf(this), 1);
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
  }

  update(delta) {
    this.size += 1;
    this.mesh.scale.x += 0.5;
    this.mesh.scale.y += 0.5;
    if (this.size >= this.maxSize) {
      this.die();
    }
  }
}