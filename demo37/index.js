const State = {
    PENDING: 'pending',
    READY: 'ready',
    BROKEN: 'broken'
};

class App {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ antialias:true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0, 0);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.LinearToneMapping
        this.renderer.toneMappingExposure = 0.1;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(20, 10, 20);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        this.raycaster = new THREE.Raycaster();
        this.ndc = new THREE.Vector2();

        this.role = 0;

        this.selectObj = null;

        this.nodes = new Map();

        this.loadingCount = 0;

        window.onresize = e => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }

        document.body.addEventListener('click', (e) => {
            if (this.role === 0) { return; }

            this.ndc.set(e.clientX / window.innerWidth * 2 - 1, 1 - e.clientY / window.innerHeight * 2);
            this.raycaster.setFromCamera(this.ndc, this.camera);
            const intersects = this.raycaster.intersectObjects(this.scene.children);

            document.getElementById('name').innerText = '';
            if (this.selectObj !== null) {
                const color = Math.random() * 0.3 + 0.7;
                switch (this.selectObj.state) {
                    case State.PENDING:
                        this.selectObj.material.color.setScalar(color);
                        break;
                    case State.READY:
                        this.selectObj.material.color.setRGB(0, color, 0);
                        break;
                    case State.BROKEN:
                        this.selectObj.material.color.setRGB(color, 0, 0);
                        break;
                }
                this.selectObj = null;
            }

            for (const el of document.getElementsByClassName('switcher-button')) {
                el.style.display = 'none';
            }

            if (intersects.length > 0) {
                const obj = this.nodes.get(intersects[0].object.parent.name);
                if (obj !== undefined) {
                    if (this.role === 1){
                        for (const el of document.getElementsByClassName('switcher-button')) {
                            el.style.display = 'block';
                        }
                    }
                    obj.material.color.setRGB(0, 0, 0);
                    this.selectObj = obj;
                    document.getElementById('name').innerText = intersects[0].object.parent.name + ' [' + obj.state + ']';
                }
            }
        });

        this._createUI();

        const loop = () => {
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }

    _createUI() {
        const switcherDiv = document.createElement('div');
        switcherDiv.id = 'switcher';
        switcherDiv.innerText = 'Click on element';
        document.body.appendChild(switcherDiv);

        const switcherPendingDiv = document.createElement('div');
        switcherPendingDiv.className = 'switcher-button';
        switcherPendingDiv.innerText = 'Pending';
        switcherPendingDiv.style.background = '#aeaeae';
        switcherPendingDiv.style.left = '0vw';
        switcherDiv.appendChild(switcherPendingDiv);
        switcherPendingDiv.addEventListener('click', (event) => {
            event.stopPropagation();
            this.selectObj.state = State.PENDING;
            document.getElementById('name').innerText = this.selectObj.name + ' [' + this.selectObj.state + ']';
        });

        const switcherReadyDiv = document.createElement('div');
        switcherReadyDiv.className = 'switcher-button';
        switcherReadyDiv.innerText = 'Ready';
        switcherReadyDiv.style.background = '#00ae00';
        switcherReadyDiv.style.left = '30vw';
        switcherDiv.appendChild(switcherReadyDiv);
        switcherReadyDiv.addEventListener('click', (event) => {
            event.stopPropagation();
            this.selectObj.state = State.READY;
            document.getElementById('name').innerText = this.selectObj.name + ' [' + this.selectObj.state + ']';
        });

        const switcherBrokenDiv = document.createElement('div');
        switcherBrokenDiv.className = 'switcher-button';
        switcherBrokenDiv.innerText = 'Broken';
        switcherBrokenDiv.style.background = '#ae0000';
        switcherBrokenDiv.style.left = '60vw';
        switcherDiv.appendChild(switcherBrokenDiv);
        switcherBrokenDiv.addEventListener('click', (event) => {
            event.stopPropagation();
            this.selectObj.state = State.BROKEN;
            document.getElementById('name').innerText = this.selectObj.name + ' [' + this.selectObj.state + ']';
        });

        const nameDiv = document.createElement('div');
        nameDiv.id = 'name';
        nameDiv.innerText = '';
        document.body.appendChild(nameDiv);

        const rolesDiv = document.createElement('div');
        rolesDiv.id = 'roles';
        rolesDiv.innerText = 'Select role';
        document.body.appendChild(rolesDiv);

        const editDiv = document.createElement('div');
        editDiv.className = 'role-button';
        editDiv.innerText = 'Edit'
        rolesDiv.appendChild(editDiv);
        editDiv.onclick = (event) => {
            event.stopPropagation();
            this.role = 1;
            document.getElementById('roles').style.display = 'none';
        }

        const viewDiv = document.createElement('div');
        viewDiv.className = 'role-button';
        viewDiv.innerText = 'View'
        rolesDiv.appendChild(viewDiv);
        viewDiv.onclick = (event) => {
            event.stopPropagation();
            this.role = 2;
            document.getElementById('roles').style.display = 'none';
        }

        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading';
        loadingDiv.innerText = 'Loading...';
        document.body.appendChild(loadingDiv);
    }

    async load(url) {
        const loader = new THREE.GLTFLoader();
        loader.load(url, gltf => {
            gltf.scene.rotation.set(Math.PI * 0.5, 0, 0);
            gltf.scene.position.set(-5, -5, -5);

            gltf.scene.traverse(node => {
                if (node.name.includes('NAUO') === false) { return; }

                const material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color().setScalar(Math.random() * 0.3 + 0.7),
                    roughness: 0.5,
                    metalness: 0
                });

                const rnd = Math.random();
                this.nodes.set(node.name, {
                    name: node.name,
                    material,
                    state: rnd < 0.1 ? State.BROKEN : rnd < 0.5 ? State.READY : State.PENDING
                });

                node.traverse(mesh => {
                    if (mesh instanceof THREE.Mesh) {
                        mesh.material = material;
                    }
                });
            });

            this.scene.add(gltf.scene);

            for (const obj of this.nodes.values()) {
                const color = Math.random() * 0.3 + 0.7;
                switch (obj.state) {
                    case State.PENDING:
                        obj.material.color.setScalar(color);
                        break;
                    case State.READY:
                        obj.material.color.setRGB(0, color, 0);
                        break;
                    case State.BROKEN:
                        obj.material.color.setRGB(color, 0, 0);
                        break;
                }
            }

            this.loadingCount++;
            if (this.loadingCount === 2) {
                document.getElementById('loading').style.display = 'none';
            }
        });

        const envLoader = new THREE.RGBELoader();
        envLoader.load('./models/street.hdr', (texture) => {
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            texture.mapping = THREE.EquirectangularReflectionMapping;

            this.scene.environment = texture;

            this.loadingCount++;
            if (this.loadingCount === 2) {
                document.getElementById('loading').style.display = 'none';
            }
        });
    }
}

window.onload = async () => {
    const app = new App();

    await app.load('./models/MockUp-K1.gltf');
}
