import * as THREE from '../build/three.module.js';
import { OrbitControls } from '../build/OrbitControls.js';
import { Player } from './player.js';
import { Map } from './map.js';

class App {
    constructor() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

        const renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(new THREE.Color(0.5, 0.5, 0.5), 1);
        document.body.appendChild(renderer.domElement);

        this.map = new Map(scene);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(256, 84, 256);
        controls.maxDistance = 5;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.enableKeys = false;

        this.player = new Player(scene, controls, renderer.domElement, 256.5, 82, 256.5, this.map);

        this.time = 0;
        this.loop = (time) => {
            const dt = (time - this.time) * 0.001;
            this.time = time;
            this.map.update();
            this.player.update(dt);
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(this.loop);
        };

        this.loop(0);
    }
}

window.app = new App();
