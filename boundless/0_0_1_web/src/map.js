import * as THREE from '../build/three.module.js';
import { vsh, fsh } from './shaders.js';
import { Chunk } from './chunk.js';

const SIZE = 16;
const HEIGHT = 8;
const COUNT = 8;

export class Map {
    static nullChank = new Chunk();

    constructor(scene) {
        this.scene = scene;
        this.requests = new Set();
        this.genChunks = [];
        this.chunks = new Array(SIZE * SIZE * HEIGHT);

        let it = 0;
        for (let h = 0; h < HEIGHT; h++) {
            for (let z = 0; z < SIZE; z++) {
                for (let x = 0; x < SIZE; x++) {
                    it = x + z * SIZE + h * SIZE * SIZE;
                    this.chunks[it] = new Chunk();
                    this.chunks[it].calc(x, z, h);
                    this.requests.add({ type: 'generate', x, z, h });
                }
            }
        }

        const texture = new THREE.TextureLoader().load('./img/map.png');
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;//NearestMipmapLinearFilter;
        texture.flipY = false;
        texture.anisotropy = 1;

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                map: { type: 't', value: texture }
            },
            vertexShader: vsh,
            fragmentShader: fsh
        });
    }

    update() {
        let it = 0;
        for (let count = 0; count < COUNT; count++) {
            if (this.requests.size === 0) { return; }

            const request = this.requests.values().next().value;
            this.requests.delete(request);

            const { type, x, z, h } = request;
            it = x + z * SIZE + h * SIZE * SIZE;

            this.chunks[it].generate(this.material, this.getGenChunks(x, z, h));
            this.chunks[it].mesh.position.set(x * Chunk.SIZE, h * Chunk.SIZE, z * Chunk.SIZE);
            this.scene.add(this.chunks[it].mesh);
        }
    }

    getGenChunks(x, z, h) {
        // PX
        if (x < SIZE - 1) { this.genChunks[0] = this.chunks[x + 1 + z * SIZE + h * SIZE * SIZE]; }
        else { this.genChunks[0] = Map.nullChank; }
        // NX
        if (x > 0) { this.genChunks[1] = this.chunks[x - 1 + z * SIZE + h * SIZE * SIZE]; }
        else { this.genChunks[1] = Map.nullChank; }
        // PZ
        if (z < SIZE - 1) { this.genChunks[2] = this.chunks[x + (z + 1) * SIZE + h * SIZE * SIZE]; }
        else { this.genChunks[2] = Map.nullChank; }
        // NZ
        if (z > 0) { this.genChunks[3] = this.chunks[x + (z - 1) * SIZE + h * SIZE * SIZE]; }
        else { this.genChunks[3] = Map.nullChank; }
        // PH
        if (h < HEIGHT - 1) { this.genChunks[4] = this.chunks[x + z * SIZE + (h + 1) * SIZE * SIZE]; }
        else { this.genChunks[4] = Map.nullChank; }
        // NH
        if (h > 0) { this.genChunks[5] = this.chunks[x + z * SIZE + (h - 1) * SIZE * SIZE]; }
        else { this.genChunks[5] = Map.nullChank; }

        return this.genChunks;
    }

    testBlock(x, y, z) {
        const cx = Math.floor(x / Chunk.SIZE);
        const cy = Math.floor(y / Chunk.SIZE);
        const cz = Math.floor(z / Chunk.SIZE);
        const it = cx + cz * SIZE + cy * SIZE * SIZE;

        const ix = Math.floor(x - cx * Chunk.SIZE);
        const iy = Math.floor(y - cy * Chunk.SIZE);
        const iz = Math.floor(z - cz * Chunk.SIZE);

        if (this.chunks[it].getBlock(ix, iz, iy) > 0) {
            return true;
        }
        return false;
    }
}
