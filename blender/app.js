const vs = `
varying vec2 vUv;

void main() {
    vUv = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const fs = `
#extension GL_OES_standard_derivatives : enable

uniform float opacity;
uniform float dist;

varying vec2 vUv;

void main() {
    vec2 grid = abs(fract(vUv - 0.5) - 0.5) / fwidth(vUv) * 0.5;
    vec2 grid2 = abs(fract(vUv * 0.1 - 0.5) - 0.5) / fwidth(vUv) * 5.0;
    vec2 axis = abs(vUv) / fwidth(vUv) * 0.5;

    float al = max(0.0, 1.0 - length(vUv) * 0.005) * opacity;
    float ad = pow(max(0.0, 1.0 - dist * 0.02), 0.5);

    float l = 1.0 - min(min(grid.x, grid.y), 1.0);
    float l2 = 1.0 - min(min(grid2.x, grid2.y), 1.0);
    float x = 1.0 - min(axis.y, 1.0);
    float y = 1.0 - min(axis.x, 1.0);

    vec4 xc = vec4(x, 0.1, 0.2, x * al);
    vec4 yc = vec4(0.2, y, 0.1, y * al);
    vec4 lc = vec4(l, l, l, l * ad * al * 0.1);
    vec4 lc2 = vec4(l2, l2, l2, l2 * al * 0.2);
    vec4 color;
    color = mix(lc, lc2, l2);
    color = mix(color, xc, x);
    color = mix(color, yc, y);

    gl_FragColor = color;
}
`;

class App {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 10);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('app')
        });
        this.renderer.setClearColor(new THREE.Color(0.3, 0.3, 0.3), 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.orbit.zoomSpeed = 3;
        this.addGeometry();

        this.render = () => {
            this.orbit.update();
            this.material.uniforms.opacity.value = Math.min(1, 2 * Math.pow(Math.abs(this.orbit.getPolarAngle() / Math.PI - 0.5) * 2, 0.4));
            this.material.uniforms.dist.value = this.orbit.object.position.distanceTo(this.orbit.target);
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.render);
        }
        this.render();
    }

    addGeometry() {
        const planeGeometry = new THREE.PlaneGeometry(400, 400, 1, 1);
        const planeMaterial = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            uniforms: {
                opacity: { value: 0 },
                dist: { value: 0 }
            },
            vertexShader: vs,
            fragmentShader: fs
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.quaternion.set(0.707, 0, 0, 0.707);
        this.scene.add(plane);
        this.material = planeMaterial;

        const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
        const boxMaterial = new THREE.MeshLambertMaterial({ color: new THREE.Color(0.9, 0.9, 0.9) });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        this.scene.add(box);

        const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.7);
        dirLight.position.set(2, 7, 5);
        dirLight.target.position.set(0, 0, 0);
        this.scene.add(dirLight);
        this.scene.add(dirLight.target);

        this.scene.add(new THREE.AmbientLight(0xFFFFFF, 0.3));
    }
}
