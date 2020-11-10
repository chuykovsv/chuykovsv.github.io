import * as THREE from '../build/three.module.js';

function rand(x, z) {
    const res = Math.sin(x * 4153 + 5465 * z + x * z * 17 + 8754) * 43758.5453123;
    return res - Math.floor(res);
}

function noise(x, z, f) {
    const r0 = rand(Math.ceil(x / f), Math.ceil(z / f));
    const r1 = rand(Math.floor(x / f), Math.ceil(z / f));
    const r2 = rand(Math.ceil(x / f), Math.floor(z / f));
    const r3 = rand(Math.floor(x / f), Math.floor(z / f));
    let xf = x / f - Math.floor(x / f);
    xf = xf * xf * (3 - 2 * xf);
    let zf = z / f - Math.floor(z / f);
    zf = zf * zf * (3 - 2 * zf);
    const t0 = r0 * xf + r1 * (1 - xf);
    const t1 = r2 * xf + r3 * (1 - xf);
    return t0 * zf + t1 * (1 - zf);
}

function setUv(uv, id, size) {
    const min = 0.25 / size;
    const max = 0.75 / size;

    const x = (id % size) / size;
    const y = Math.floor(id / size) / size;

    uv.push(x + min, y + max);
    uv.push(x + min, y + min);
    uv.push(x + max, y + min);
    uv.push(x + max, y + max);
}

export class Chunk {
    static SIZE = 32;
    static heightMap = new Float32Array(Chunk.SIZE * Chunk.SIZE);

    constructor() {
        this.units = new Int8Array(Chunk.SIZE * Chunk.SIZE * Chunk.SIZE);
        this.mesh = null;
    }

    static genHeightMap(mx, mz) {
        let gx = 0;
        let gz = 0;
        for (let z = 0; z < Chunk.SIZE; z++) {
            gz = mz * Chunk.SIZE + z;
            for (let x = 0; x < Chunk.SIZE; x++) {
                gx = mx * Chunk.SIZE + x;
                Chunk.heightMap[x + z * Chunk.SIZE] = Math.round((noise(gx, gz, 128) * 120 + noise(gx, gz, 16) * 5 + noise(gx, gz, 4) * 1 + 5) * 2) * 0.5;
            }
        }
    }

    calc(mx, mz, mh) {
        let gx = 0;
        let gz = 0;
        let gh = 0;
        Chunk.genHeightMap(mx, mz);
        for (let h = 0; h < Chunk.SIZE; h++) {
            gh = mh * Chunk.SIZE + h;
            for (let z = 0; z < Chunk.SIZE; z++) {
                gz = mz * Chunk.SIZE + z;
                for (let x = 0; x < Chunk.SIZE; x++) {
                    gx = mx * Chunk.SIZE + x;
                    // const hh = Math.round((noise(gx, gz, 128) * 120 + noise(gx, gz, 16) * 5 + noise(gx, gz, 4) * 1 + 5) * 2) * 0.5;
                    const hh = Chunk.heightMap[x + z * Chunk.SIZE];
                    if (gh - hh <= 0.5) {
                        const gr = hh - gh + noise(gx, gz, 4) * 3 < ((100 - hh) / 5);
                        if (hh - gh == -0.5) {
                            this.units[x + z * Chunk.SIZE + h * Chunk.SIZE * Chunk.SIZE] = gr ? 12 : 11;
                        } else {
                            this.units[x + z * Chunk.SIZE + h * Chunk.SIZE * Chunk.SIZE] = gr ? 2 : 1;
                        }
                    } else {
                        this.units[x + z * Chunk.SIZE + h * Chunk.SIZE * Chunk.SIZE] = 0;
                        if ((gh - hh == 1 || gh - hh == 1.5) && (hh - gh < ((90 - hh) / 5)) && noise(gx, gz, 1) < (150 - hh) / 150) {
                            this.units[x + z * Chunk.SIZE + h * Chunk.SIZE * Chunk.SIZE] = -(noise(gx, gz, 1.5) * 37 % 2 + 1);
                        }
                        // Tree
                        // if ((gh - hh == 1 || gh - hh == 1.5) && noise(gx, gz, 1) < 0.001) {
                        //     this.units[x + z * Chunk.SIZE + h * Chunk.SIZE * Chunk.SIZE] = 21;
                        // }
                    }
                }
            }
        }
    }

    generate(material, genChunks) {
        const op = {
            ver: [],
            nor: [],
            uv: [],
            ind: [],
            genChunks,
            x: 0,
            z: 0,
            h: 0
        };

        for (let h = 0; h < Chunk.SIZE; h++) {
            for (let z = 0; z < Chunk.SIZE; z++) {
                for (let x = 0; x < Chunk.SIZE; x++) {
                    const uid = this.getUnit(x, z, h, genChunks);
                    const uiddown = this.getUnit(x, z, h - 1, genChunks);
                    if (uid === 0) { continue; }
                    op.x = x;
                    op.z = z;
                    op.h = h;
                    if (uid === 1) this.genBlock(op, 0);
                    else if (uid === 2) this.genBlock(op, 2, 1);
                    else if (uid === 11) this.genBlock2(op, 0);
                    else if (uid === 12) this.genBlock2(op, 2, 1);
                    else if (uid === 21) this.genBlockSmall(op, 4); 
                    else if (uid === -1) this.genGrass(op, 12, 1, uiddown < 11 ? 0 : 0.5);
                    else if (uid === -2) this.genGrass(op, 14, 2, uiddown < 11 ? 0 : 0.5);
                }
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(op.ver), 3));
        geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(op.nor), 3));
        geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(op.uv), 2));
        geometry.index = new THREE.BufferAttribute(new Uint32Array(op.ind), 1);

        this.mesh = new THREE.Mesh(geometry, material);
    }

    genGrass(op, id, hh, dh) {
        let len = 0;
        const { ver, nor, uv, ind, x: mx, z: mz, h } = op;
        const x = mx + (rand(mx, mz) - 0.5) * 0.5;
        const z = mz + (rand(mz, mx) - 0.5) * 0.5;
        // 1
        ver.push(x + 0.14645, h - dh, z + 0.14645);
        ver.push(x + 0.14645, h + hh - dh, z + 0.14645);
        ver.push(x + 0.85355, h + hh - dh, z + 0.85355);
        ver.push(x + 0.85355, h - dh, z + 0.85355);
        nor.push(0.7071, 0, -0.7071);
        nor.push(0.7071, 0, -0.7071);
        nor.push(0.7071, 0, -0.7071);
        nor.push(0.7071, 0, -0.7071);
        setUv(uv, id, 4);
        len = (ver.length / 3) - 1;
        ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        // 2
        ver.push(x + 0.14645, h - dh, z + 0.14645);
        ver.push(x + 0.14645, h + hh - dh, z + 0.14645);
        ver.push(x + 0.85355, h + hh - dh, z + 0.85355);
        ver.push(x + 0.85355, h - dh, z + 0.85355);
        nor.push(-0.7071, 0, 0.7071);
        nor.push(-0.7071, 0, 0.7071);
        nor.push(-0.7071, 0, 0.7071);
        nor.push(-0.7071, 0, 0.7071);
        setUv(uv, id, 4);
        len = (ver.length / 3) - 1;
        ind.push(len - 3, len - 1, len - 2, len - 3, len, len - 1);
        // 3
        ver.push(x + 0.14645, h - dh, z + 0.85355);
        ver.push(x + 0.14645, h + hh - dh, z + 0.85355);
        ver.push(x + 0.85355, h + hh - dh, z + 0.14645);
        ver.push(x + 0.85355, h - dh, z + 0.14645);
        nor.push(0.7071, 0, 0.7071);
        nor.push(0.7071, 0, 0.7071);
        nor.push(0.7071, 0, 0.7071);
        nor.push(0.7071, 0, 0.7071);
        setUv(uv, id, 4);
        len = (ver.length / 3) - 1;
        ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        // 4
        ver.push(x + 0.14645, h - dh, z + 0.85355);
        ver.push(x + 0.14645, h + hh - dh, z + 0.85355);
        ver.push(x + 0.85355, h + hh - dh, z + 0.14645);
        ver.push(x + 0.85355, h - dh, z + 0.14645);
        nor.push(-0.7071, 0, -0.7071);
        nor.push(-0.7071, 0, -0.7071);
        nor.push(-0.7071, 0, -0.7071);
        nor.push(-0.7071, 0, -0.7071);
        setUv(uv, id, 4);
        len = (ver.length / 3) - 1;
        ind.push(len - 3, len - 1, len - 2, len - 3, len, len - 1);
    }

    genBlock(op, id, idup) {
        let len = 0;
        const { ver, nor, uv, ind, genChunks, x, z, h } = op;
        // UP
        if (this.getUnit(x, z, h + 1, genChunks) <= 0 || this.getUnit(x, z, h + 1, genChunks) > 20) {
            ver.push(x, h + 1, z);
            ver.push(x, h + 1, z + 1);
            ver.push(x + 1, h + 1, z + 1);
            ver.push(x + 1, h + 1, z);
            nor.push(0, 1, 0);
            nor.push(0, 1, 0);
            nor.push(0, 1, 0);
            nor.push(0, 1, 0);
            setUv(uv, idup !== undefined ? idup : id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // DOWN
        if (this.getUnit(x, z, h - 1, genChunks) <= 0) {
            ver.push(x, h, z);
            ver.push(x + 1, h, z);
            ver.push(x + 1, h, z + 1);
            ver.push(x, h, z + 1);
            nor.push(0, -1, 0);
            nor.push(0, -1, 0);
            nor.push(0, -1, 0);
            nor.push(0, -1, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // LEFT
        if (this.getUnit(x - 1, z, h, genChunks) <= 0) {
            ver.push(x, h, z);
            ver.push(x, h, z + 1);
            ver.push(x, h + 1, z + 1);
            ver.push(x, h + 1, z);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // FRONT
        if (this.getUnit(x, z - 1, h, genChunks) <= 0) {
            ver.push(x, h, z);
            ver.push(x, h + 1, z);
            ver.push(x + 1, h + 1, z);
            ver.push(x + 1, h, z);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // RIGHT
        if (this.getUnit(x + 1, z, h, genChunks) <= 0) {
            ver.push(x + 1, h, z);
            ver.push(x + 1, h + 1, z);
            ver.push(x + 1, h + 1, z + 1);
            ver.push(x + 1, h, z + 1);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // BACK
        if (this.getUnit(x, z + 1, h, genChunks) <= 0) {
            ver.push(x, h, z + 1);
            ver.push(x + 1, h, z + 1);
            ver.push(x + 1, h + 1, z + 1);
            ver.push(x, h + 1, z + 1);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
    }

    genBlock2(op, id, idup) {
        let len = 0;
        let unit = null;
        const { ver, nor, uv, ind, genChunks, x, z, h } = op;
        // UP
        if (this.getUnit(x, z, h + 1, genChunks) <= 0 || this.getUnit(x, z, h + 1, genChunks) > 20) {
            ver.push(x, h + 0.5, z);
            ver.push(x, h + 0.5, z + 1);
            ver.push(x + 1, h + 0.5, z + 1);
            ver.push(x + 1, h + 0.5, z);
            nor.push(0, 1, 0);
            nor.push(0, 1, 0);
            nor.push(0, 1, 0);
            nor.push(0, 1, 0);
            setUv(uv, idup !== undefined ? idup : id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // DOWN
        if (this.getUnit(x, z, h - 1, genChunks) <= 0) {
            ver.push(x, h, z);
            ver.push(x + 1, h, z);
            ver.push(x + 1, h, z + 1);
            ver.push(x, h, z + 1);
            nor.push(0, -1, 0);
            nor.push(0, -1, 0);
            nor.push(0, -1, 0);
            nor.push(0, -1, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // LEFT
        unit = this.getUnit(x - 1, z, h, genChunks);
        if (unit <= 0) {
            ver.push(x, h, z);
            ver.push(x, h, z + 1);
            ver.push(x, h + 0.5, z + 1);
            ver.push(x, h + 0.5, z);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        } else if (unit < 11) {
            ver.push(x, h + 1, z);
            ver.push(x, h + 1, z + 1);
            ver.push(x, h + 0.5, z + 1);
            ver.push(x, h + 0.5, z);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // RIGHT
        unit = this.getUnit(x + 1, z, h, genChunks);
        if (unit <= 0) {
            ver.push(x + 1, h, z);
            ver.push(x + 1, h + 0.5, z);
            ver.push(x + 1, h + 0.5, z + 1);
            ver.push(x + 1, h, z + 1);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        } else if (unit < 11) {
            ver.push(x + 1, h + 1, z);
            ver.push(x + 1, h + 0.5, z);
            ver.push(x + 1, h + 0.5, z + 1);
            ver.push(x + 1, h + 1, z + 1);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // FRONT
        unit = this.getUnit(x, z - 1, h, genChunks);
        if (unit <= 0) {
            ver.push(x, h, z);
            ver.push(x, h + 0.5, z);
            ver.push(x + 1, h + 0.5, z);
            ver.push(x + 1, h, z);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        } else if (unit < 11) {
            ver.push(x, h + 1, z);
            ver.push(x, h + 0.5, z);
            ver.push(x + 1, h + 0.5, z);
            ver.push(x + 1, h + 1, z);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // // BACK
        unit = this.getUnit(x, z + 1, h, genChunks);
        if (unit <= 0) {
            ver.push(x, h, z + 1);
            ver.push(x + 1, h, z + 1);
            ver.push(x + 1, h + 0.5, z + 1);
            ver.push(x, h + 0.5, z + 1);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        } else if (unit < 11) {
            ver.push(x, h + 1, z + 1);
            ver.push(x + 1, h + 1, z + 1);
            ver.push(x + 1, h + 0.5, z + 1);
            ver.push(x, h + 0.5, z + 1);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
    }

    genBlockSmall(op, id) {
        let len = 0;
        const { ver, nor, uv, ind, genChunks, x, z, h } = op;
        // UP
        if (this.getUnit(x, z, h + 1, genChunks) <= 0) {
            ver.push(x + 0.1, h + 1, z + 0.1);
            ver.push(x + 0.1, h + 1, z + 0.9);
            ver.push(x + 0.9, h + 1, z + 0.9);
            ver.push(x + 0.9, h + 1, z + 0.1);
            nor.push(0, 1, 0);
            nor.push(0, 1, 0);
            nor.push(0, 1, 0);
            nor.push(0, 1, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // DOWN
        if (this.getUnit(x, z, h - 1, genChunks) <= 0) {
            ver.push(x + 0.1, h, z + 0.1);
            ver.push(x + 0.9, h, z + 0.1);
            ver.push(x + 0.9, h, z + 0.9);
            ver.push(x + 0.1, h, z + 0.9);
            nor.push(0, -1, 0);
            nor.push(0, -1, 0);
            nor.push(0, -1, 0);
            nor.push(0, -1, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // LEFT
        if (true) {
            ver.push(x + 0.1, h, z + 0.1);
            ver.push(x + 0.1, h, z + 0.9);
            ver.push(x + 0.1, h + 1, z + 0.9);
            ver.push(x + 0.1, h + 1, z + 0.1);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            nor.push(1, 0, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // FRONT
        if (true) {
            ver.push(x + 0.1, h, z + 0.1);
            ver.push(x + 0.1, h + 1, z + 0.1);
            ver.push(x + 0.9, h + 1, z + 0.1);
            ver.push(x + 0.9, h, z + 0.1);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            nor.push(0, 0, 1);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // RIGHT
        if (true) {
            ver.push(x + 0.9, h, z + 0.1);
            ver.push(x + 0.9, h + 1, z + 0.1);
            ver.push(x + 0.9, h + 1, z + 0.9);
            ver.push(x + 0.9, h, z + 0.9);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            nor.push(-1, 0, 0);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
        // BACK
        if (true) {
            ver.push(x + 0.1, h, z + 0.9);
            ver.push(x + 0.9, h, z + 0.9);
            ver.push(x + 0.9, h + 1, z + 0.9);
            ver.push(x + 0.1, h + 1, z + 0.9);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            nor.push(0, 0, -1);
            setUv(uv, id, 4);
            len = (ver.length / 3) - 1;
            ind.push(len - 3, len - 2, len - 1, len - 3, len - 1, len);
        }
    }

    getUnit(x, z, h, genChunks) {
        const s = Chunk.SIZE - 1;
        if (x < 0) return genChunks[1].units[s + z * Chunk.SIZE + h * Chunk.SIZE * Chunk.SIZE];
        if (x >= Chunk.SIZE) return genChunks[0].units[z * Chunk.SIZE + h * Chunk.SIZE * Chunk.SIZE];

        if (z < 0) return genChunks[3].units[x + s * Chunk.SIZE + h * Chunk.SIZE * Chunk.SIZE];
        if (z >= Chunk.SIZE) return genChunks[2].units[x + h * Chunk.SIZE * Chunk.SIZE];

        if (h < 0) return genChunks[5].units[x + z * Chunk.SIZE + s * Chunk.SIZE * Chunk.SIZE];
        if (h >= Chunk.SIZE) return genChunks[4].units[x + z * Chunk.SIZE];

        return this.units[x + z * Chunk.SIZE + h * Chunk.SIZE * Chunk.SIZE];
    }

    getBlock(x, z, h) {
        return this.units[x + z * Chunk.SIZE + h * Chunk.SIZE * Chunk.SIZE];
    }
}
