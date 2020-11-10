import * as THREE from '../build/three.module.js';

const yAxis = new THREE.Vector3(0, 1, 0);
const tempVector = new THREE.Vector3();
const posVector = new THREE.Vector3();

export class Player {
    constructor(scene, controller, dom, x, y, z, map) {
        this.node = new THREE.Object3D();
        scene.add(this.node);

        this.back = 0;
        this.left = 0;
        this.front = 0;
        this.right = 0;
        this.controller = controller;

        dom.addEventListener('keydown', (e) => {
            if (e.repeat) { return; }
            switch (e.code) {
                case 'KeyW': this.front = 1; break;
                case 'KeyS': this.back = 1; break;
                case 'KeyA': this.right = 1; break;
                case 'KeyD': this.left = 1; break;
                default: break;
            }
        });
        dom.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'KeyW': this.front = 0; break;
                case 'KeyS': this.back = 0; break;
                case 'KeyA': this.right = 0; break;
                case 'KeyD': this.left = 0; break;
                default: break;
            }
        });

        this.node.position.set(x, y, z);
        this.map = map;

        const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0, 0) });
        const geometry = new THREE.BoxBufferGeometry(0.8, 1.6, 0.8);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 0.8;

        this.node.add(mesh);
    }

    update(dt) {
        const SPEED = 5;
        posVector.copy(this.node.position);
        this.node.quaternion.setFromAxisAngle(yAxis, this.controller.getAzimuthalAngle());
        tempVector.set(-1, 0, 0).applyQuaternion(this.node.quaternion).multiplyScalar((this.right - this.left) * dt * SPEED);
        this.node.position.add(tempVector);
        tempVector.set(0, 0, -1).applyQuaternion(this.node.quaternion).multiplyScalar((this.front - this.back) * dt * SPEED);
        this.node.position.add(tempVector);

        if (this.map.requests.size === 0) {
                const { x, y, z } = this.node.position;
                const height = this.map.testBlock(x, y, z);
                const dh = height - y;
                if (Math.abs(dh) > 0.05) {
                    if (dh > 0) {
                        this.node.position.y += Math.min(5 * dt, dh);
                    } else {
                        this.node.position.y -= Math.max(5 * dt, dh);
                    }
                }
        }

        posVector.sub(this.node.position).multiplyScalar(-1);

        this.controller.target.add(posVector);
        this.controller.object.position.add(posVector);
    }
}
