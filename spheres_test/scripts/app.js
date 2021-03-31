(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["appLibrary"] = factory();
	else
		root["appLibrary"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/camera.ts":
/*!***********************!*\
  !*** ./src/camera.ts ***!
  \***********************/
/*! exports provided: Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return Camera; });
const ROTATE_SPEED = 0.002;
const MOVE_SPEED = 10;
const HALF_PI = Math.PI * 0.5;
const KEY_W_BIT = 0x01;
const KEY_S_BIT = 0x02;
const KEY_A_BIT = 0x04;
const KEY_D_BIT = 0x08;
const KEY_E_BIT = 0x10;
const KEY_Q_BIT = 0x20;
class Camera {
    constructor(options) {
        this.pMatrix = new Float32Array(16);
        this.vMatrix = new Float32Array(16);
        this.position = new Float32Array(3);
        const { gl, canvas } = options;
        this._gl = gl;
        this._canvas = canvas;
        this._polar = 0.2;
        this._azimuthal = 0;
        this._oldX = 0;
        this._oldY = 0;
        this._keyState = 0;
        this.position[1] = 10.0;
        this.position[2] = 50.0;
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        canvas.width = this._width;
        canvas.height = this._height;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.oncontextmenu = () => false;
        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        gl.clearColor(0.3, 0.3, 0.3, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        document.body.addEventListener('mousemove', e => {
            if (e.buttons === 1 && e.button === 0) {
                this._polar += (e.clientY - this._oldY) * ROTATE_SPEED;
                this._azimuthal += (e.clientX - this._oldX) * ROTATE_SPEED;
                this._polar = Math.max(Math.min(this._polar, HALF_PI), -HALF_PI);
            }
            this._oldX = e.clientX;
            this._oldY = e.clientY;
        });
        document.body.addEventListener('keyup', e => {
            switch (e.code) {
                case 'KeyW':
                    this._keyState &= ~KEY_W_BIT;
                    break;
                case 'KeyS':
                    this._keyState &= ~KEY_S_BIT;
                    break;
                case 'KeyA':
                    this._keyState &= ~KEY_A_BIT;
                    break;
                case 'KeyD':
                    this._keyState &= ~KEY_D_BIT;
                    break;
                case 'KeyQ':
                    this._keyState &= ~KEY_Q_BIT;
                    break;
                case 'KeyE':
                    this._keyState &= ~KEY_E_BIT;
                    break;
                default: break;
            }
        });
        document.body.addEventListener('keydown', e => {
            switch (e.code) {
                case 'KeyW':
                    this._keyState |= KEY_W_BIT;
                    break;
                case 'KeyS':
                    this._keyState |= KEY_S_BIT;
                    break;
                case 'KeyA':
                    this._keyState |= KEY_A_BIT;
                    break;
                case 'KeyD':
                    this._keyState |= KEY_D_BIT;
                    break;
                case 'KeyQ':
                    this._keyState |= KEY_Q_BIT;
                    break;
                case 'KeyE':
                    this._keyState |= KEY_E_BIT;
                    break;
                default: break;
            }
        });
    }
    update(dt) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (width !== this._width || height !== this._height) {
            this._width = width;
            this._height = height;
            this._canvas.width = width;
            this._canvas.height = height;
            this._gl.viewport(0, 0, width, height);
        }
        let dx = 0;
        let dy = 0;
        let dz = 0;
        if (this._keyState & KEY_W_BIT) {
            dz -= 1;
        }
        if (this._keyState & KEY_S_BIT) {
            dz += 1;
        }
        if (this._keyState & KEY_A_BIT) {
            dx -= 1;
        }
        if (this._keyState & KEY_D_BIT) {
            dx += 1;
        }
        if (this._keyState & KEY_Q_BIT) {
            dy += 1;
        }
        if (this._keyState & KEY_E_BIT) {
            dy -= 1;
        }
        dx *= MOVE_SPEED * dt;
        dy *= MOVE_SPEED * dt;
        dz *= MOVE_SPEED * dt;
        this._perspective();
        this._orbit(dx, dy, dz);
    }
    _perspective() {
        const mat = this.pMatrix;
        const far = 1000;
        const near = 0.1;
        const fov = 0.7;
        const aspect = this._width / this._height;
        mat.set(Camera._iMatrix);
        mat[15] = 0;
        mat[14] = -2 * far * near / (far - near);
        mat[11] = -1;
        mat[10] = -(far + near) / (far - near);
        mat[5] = 1 / Math.tan(fov * 0.5);
        mat[0] = mat[5] / aspect;
    }
    _orbit(dx, dy, dz) {
        const cosa = Math.cos(this._azimuthal);
        const sina = Math.sin(this._azimuthal);
        const cosp = Math.cos(this._polar);
        const sinp = Math.sin(this._polar);
        const mat = this.vMatrix;
        const position = this.position;
        mat.set(Camera._iMatrix);
        mat[0] = cosa;
        mat[4] = 0;
        mat[8] = sina;
        mat[1] = sina * sinp;
        mat[5] = cosp;
        mat[9] = -cosa * sinp;
        mat[2] = -sina * cosp;
        mat[6] = sinp;
        mat[10] = cosa * cosp;
        position[0] += mat[0] * dx + mat[1] * dy + mat[2] * dz;
        position[1] += mat[4] * dx + mat[5] * dy + mat[6] * dz;
        position[2] += mat[8] * dx + mat[9] * dy + mat[10] * dz;
        mat[12] -= position[0] * mat[0] + position[1] * mat[4] + position[2] * mat[8];
        mat[13] -= position[0] * mat[1] + position[1] * mat[5] + position[2] * mat[9];
        mat[14] -= position[0] * mat[2] + position[1] * mat[6] + position[2] * mat[10];
    }
}
Camera._iMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _shaders_grid_frag_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders/grid.frag.glsl */ "./src/shaders/grid.frag.glsl");
/* harmony import */ var _shaders_grid_frag_glsl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shaders_grid_frag_glsl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shaders_mesh_frag_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/mesh.frag.glsl */ "./src/shaders/mesh.frag.glsl");
/* harmony import */ var _shaders_mesh_frag_glsl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shaders_mesh_frag_glsl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shaders_grid_vert_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shaders/grid.vert.glsl */ "./src/shaders/grid.vert.glsl");
/* harmony import */ var _shaders_grid_vert_glsl__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_shaders_grid_vert_glsl__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shaders_mesh_vert_glsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shaders/mesh.vert.glsl */ "./src/shaders/mesh.vert.glsl");
/* harmony import */ var _shaders_mesh_vert_glsl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_shaders_mesh_vert_glsl__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _renderable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderable */ "./src/renderable.ts");
/* harmony import */ var _mesh__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mesh */ "./src/mesh.ts");
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./camera */ "./src/camera.ts");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui */ "./src/ui.ts");








class App {
    constructor() {
        this._time = 0;
        this._loop = (time) => {
            const gl = this._gl;
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            const dt = (time - this._time) * 0.001;
            this._time = time;
            this._camera.update(dt);
            this._mesh.draw(this._camera);
            this._grid.draw(this._camera);
            requestAnimationFrame(this._loop);
        };
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        const gl = canvas.getContext('webgl2', {
            depth: true,
            alpha: false,
            stencil: false,
            antialias: false,
            premultipliedAlpha: false,
            preserveDrawingBuffer: true
        });
        if (gl === null) {
            throw new Error('WebGL2 not supported');
        }
        this._gl = gl;
        this._camera = new _camera__WEBPACK_IMPORTED_MODULE_6__["Camera"]({ gl, canvas });
        this._ui = new _ui__WEBPACK_IMPORTED_MODULE_7__["UI"]();
        const vertexDataArray = [
            1, 0, 1, 0, 1, 0,
            1, 0, -1, 0, 1, 0,
            -1, 0, -1, 0, 1, 0,
            -1, 0, 1, 0, 1, 0
        ];
        this._grid = new _renderable__WEBPACK_IMPORTED_MODULE_4__["Renderable"]({
            gl,
            vertexShaderCode: _shaders_grid_vert_glsl__WEBPACK_IMPORTED_MODULE_2___default.a,
            fragmentShaderCode: _shaders_grid_frag_glsl__WEBPACK_IMPORTED_MODULE_0___default.a,
            vertexData: new Float32Array(vertexDataArray),
            indexData: new Uint8Array([0, 1, 2, 0, 2, 3])
        });
        this._load('./assets/spheres.json').then(() => this._loop(0));
    }
    async _load(url) {
        const response = await fetch(url);
        const json = await response.json();
        const options = {
            gl: this._gl,
            vertexShaderCode: _shaders_mesh_vert_glsl__WEBPACK_IMPORTED_MODULE_3___default.a,
            fragmentShaderCode: _shaders_mesh_frag_glsl__WEBPACK_IMPORTED_MODULE_1___default.a,
            ...Object(_mesh__WEBPACK_IMPORTED_MODULE_5__["createMesh"])(json)
        };
        this._mesh = new _renderable__WEBPACK_IMPORTED_MODULE_4__["Renderable"](options);
        this._ui.set(options.indexData.length / 3, options.vertexData.length / 6, options.indexData.length);
    }
    update(json) {
        this._mesh.destructor();
        const options = {
            gl: this._gl,
            vertexShaderCode: _shaders_mesh_vert_glsl__WEBPACK_IMPORTED_MODULE_3___default.a,
            fragmentShaderCode: _shaders_mesh_frag_glsl__WEBPACK_IMPORTED_MODULE_1___default.a,
            ...Object(_mesh__WEBPACK_IMPORTED_MODULE_5__["createMesh"])(json)
        };
        this._mesh = new _renderable__WEBPACK_IMPORTED_MODULE_4__["Renderable"](options);
    }
}


/***/ }),

/***/ "./src/mesh.ts":
/*!*********************!*\
  !*** ./src/mesh.ts ***!
  \*********************/
/*! exports provided: createMesh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMesh", function() { return createMesh; });
function createSphere(options) {
    const { matrix, radialSegments, heightSegments, startAngle, parameters, backSide, vertices, indices } = options;
    let { itv, iti } = options;
    const startIt = itv / 6;
    const deltaPolar = (Math.PI - startAngle) / heightSegments;
    const deltaAzimuthal = Math.PI * 2 / radialSegments;
    const radius = parameters[3];
    let x = 0;
    let y = 0;
    let z = 0;
    let tx = 0;
    let ty = 0;
    let tz = 0;
    let sinPolar = 0;
    let cosPolar = 0;
    let sinAzimuthal = 0;
    let cosAzimuthal = 0;
    for (let ih = 0; ih <= heightSegments; ih++) {
        for (let ir = 0; ir < radialSegments; ir++) {
            sinPolar = Math.sin(ih * deltaPolar + startAngle);
            cosPolar = Math.cos(ih * deltaPolar + startAngle);
            sinAzimuthal = Math.sin(-ir * deltaAzimuthal);
            cosAzimuthal = Math.cos(ir * deltaAzimuthal);
            tx = sinPolar * cosAzimuthal;
            ty = cosPolar;
            tz = sinPolar * sinAzimuthal;
            x = tx * matrix[0] + ty * matrix[3] + tz * matrix[6];
            y = tx * matrix[1] + ty * matrix[4] + tz * matrix[7];
            z = tx * matrix[2] + ty * matrix[5] + tz * matrix[8];
            vertices[itv++] = x * radius + parameters[0];
            vertices[itv++] = y * radius + parameters[1];
            vertices[itv++] = z * radius + parameters[2];
            if (backSide) {
                vertices[itv++] = -x;
                vertices[itv++] = -y;
                vertices[itv++] = -z;
            }
            else {
                vertices[itv++] = x;
                vertices[itv++] = y;
                vertices[itv++] = z;
            }
            if (backSide) {
                if (ih < heightSegments) {
                    indices[iti++] = ir + ih * radialSegments + startIt;
                    indices[iti++] = (ir + 1) % radialSegments + (ih + 1) * radialSegments + startIt;
                    indices[iti++] = ir + (ih + 1) * radialSegments + startIt;
                    indices[iti++] = ir + ih * radialSegments + startIt;
                    indices[iti++] = (ir + 1) % radialSegments + ih * radialSegments + startIt;
                    indices[iti++] = (ir + 1) % radialSegments + (ih + 1) * radialSegments + startIt;
                }
            }
            else {
                if (ih < heightSegments) {
                    indices[iti++] = ir + ih * radialSegments + startIt;
                    indices[iti++] = ir + (ih + 1) * radialSegments + startIt;
                    indices[iti++] = (ir + 1) % radialSegments + (ih + 1) * radialSegments + startIt;
                    indices[iti++] = ir + ih * radialSegments + startIt;
                    indices[iti++] = (ir + 1) % radialSegments + (ih + 1) * radialSegments + startIt;
                    indices[iti++] = (ir + 1) % radialSegments + ih * radialSegments + startIt;
                }
            }
        }
    }
    options.itv = itv;
    options.iti = iti;
}
function createMesh(options) {
    const resolution = Math.max(Math.ceil(options.resolution), 4);
    const radialSegments = resolution;
    const radius1 = options.sphere1[3];
    const radius2 = options.sphere2[3];
    let startAngle1 = 0;
    let startAngle2 = 0;
    let heightSegments1 = Math.ceil(resolution * 0.5);
    let heightSegments2 = 0;
    const sx = options.sphere1[0] - options.sphere2[0];
    const sy = options.sphere1[1] - options.sphere2[1];
    const sz = options.sphere1[2] - options.sphere2[2];
    const length = Math.sqrt(sx * sx + sy * sy + sz * sz);
    const matrix = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    if (length < radius1 + radius2 && length + Math.min(radius1, radius2) > Math.max(radius1, radius2)) {
        startAngle1 = Math.acos((length * length + radius1 * radius1 - radius2 * radius2) / (2 * radius1 * length));
        startAngle2 = Math.PI - Math.acos((length * length + radius2 * radius2 - radius1 * radius1) / (2 * radius2 * length));
        heightSegments1 = Math.ceil(resolution * (Math.PI - startAngle1) / Math.PI);
        heightSegments2 = Math.ceil(resolution * (Math.PI - startAngle2) / Math.PI);
        const polar = Math.acos(Math.min(Math.max(sy / length, -1), 1));
        const azimuthal = Math.atan2(sx, sz);
        const cosa = Math.cos(azimuthal);
        const sina = Math.sin(azimuthal);
        const cosp = Math.cos(polar);
        const sinp = Math.sin(polar);
        matrix[0] = cosa;
        matrix[1] = 0;
        matrix[2] = -sina;
        matrix[3] = -sina * sinp;
        matrix[4] = -cosp;
        matrix[5] = -cosa * sinp;
        matrix[6] = -sina * cosp;
        matrix[7] = sinp;
        matrix[8] = -cosa * cosp;
    }
    const heightSegments = heightSegments1 + heightSegments2;
    const vertexCount = radialSegments * (heightSegments + (startAngle1 === 0 ? 1 : 2));
    const elementCount = radialSegments * heightSegments * 6;
    let ElementArrayConstructor = Uint32Array;
    if (vertexCount < 256) {
        ElementArrayConstructor = Uint8Array;
    }
    else if (vertexCount < 65536) {
        ElementArrayConstructor = Uint16Array;
    }
    const vertices = new Float32Array(vertexCount * 6);
    const indices = new ElementArrayConstructor(elementCount);
    const sphereOptions = {
        matrix,
        radialSegments,
        heightSegments: heightSegments1,
        parameters: options.sphere1,
        startAngle: startAngle1,
        backSide: false,
        vertices,
        indices,
        itv: 0,
        iti: 0
    };
    createSphere(sphereOptions);
    if (startAngle1 !== 0) {
        sphereOptions.heightSegments = heightSegments2;
        sphereOptions.parameters = options.sphere2;
        sphereOptions.startAngle = startAngle2;
        sphereOptions.backSide = true;
        createSphere(sphereOptions);
    }
    const result = {
        vertexData: vertices,
        indexData: indices
    };
    return result;
}


/***/ }),

/***/ "./src/renderable.ts":
/*!***************************!*\
  !*** ./src/renderable.ts ***!
  \***************************/
/*! exports provided: Renderable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderable", function() { return Renderable; });
class Renderable {
    constructor(options) {
        const { gl, vertexShaderCode, fragmentShaderCode, vertexData, indexData } = options;
        this._count = indexData.length;
        this._gl = gl;
        const program = gl.createProgram();
        const vShader = gl.createShader(gl.VERTEX_SHADER);
        const fShader = gl.createShader(gl.FRAGMENT_SHADER);
        if (program === null || vShader === null || fShader === null) {
            throw new Error('Create shader program error');
        }
        this._program = program;
        gl.shaderSource(vShader, vertexShaderCode);
        gl.compileShader(vShader);
        gl.shaderSource(fShader, fragmentShaderCode);
        gl.compileShader(fShader);
        if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
            throw new Error(String(gl.getShaderInfoLog(vShader)));
        }
        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
            throw new Error(String(gl.getShaderInfoLog(fShader)));
        }
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(String(gl.getProgramInfoLog(program)));
        }
        gl.deleteShader(vShader);
        gl.deleteShader(fShader);
        const pMatrix = gl.getUniformLocation(program, 'pMatrix');
        const vMatrix = gl.getUniformLocation(program, 'vMatrix');
        if (pMatrix === null || vMatrix === null) {
            throw new Error('Sahder matrices not found');
        }
        this._pMatrix = pMatrix;
        this._vMatrix = vMatrix;
        this._position = gl.getUniformLocation(program, 'camera');
        if (indexData instanceof Uint32Array) {
            this._type = gl.UNSIGNED_INT;
        }
        else if (indexData instanceof Uint16Array) {
            this._type = gl.UNSIGNED_SHORT;
        }
        else {
            this._type = gl.UNSIGNED_BYTE;
        }
        const vbo = gl.createBuffer();
        const ebo = gl.createBuffer();
        const vao = gl.createVertexArray();
        if (vbo === null || ebo === null || vao === null) {
            throw new Error('Create buffers error');
        }
        this._vao = vao;
        this._vbo = vbo;
        this._ebo = ebo;
        gl.bindVertexArray(vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexData, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
        gl.bindVertexArray(null);
    }
    destructor() {
        const gl = this._gl;
        gl.deleteVertexArray(this._vao);
        gl.deleteBuffer(this._vbo);
        gl.deleteBuffer(this._ebo);
        gl.deleteProgram(this._program);
    }
    draw(camera) {
        const gl = this._gl;
        gl.useProgram(this._program);
        gl.uniformMatrix4fv(this._pMatrix, false, camera.pMatrix);
        gl.uniformMatrix4fv(this._vMatrix, false, camera.vMatrix);
        if (this._position !== null) {
            gl.uniform3fv(this._position, camera.position);
        }
        gl.bindVertexArray(this._vao);
        gl.drawElements(gl.TRIANGLES, this._count, this._type, 0);
    }
}


/***/ }),

/***/ "./src/shaders/grid.frag.glsl":
/*!************************************!*\
  !*** ./src/shaders/grid.frag.glsl ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision highp float;\n\nin vec2 vUv;\nout vec4 outColor;\n\nvoid main() {\n    vec2 grid = abs(fract(vUv - 0.5) - 0.5) / fwidth(vUv) * 0.5;\n    vec2 grid2 = abs(fract(vUv * 0.1 - 0.5) - 0.5) / fwidth(vUv) * 5.0;\n    vec2 axis = abs(vUv) / fwidth(vUv) * 0.5;\n\n    float al = max(0.0, 1.0 - length(vUv) * 0.01);\n    float ad = 0.5;\n\n    float l = 1.0 - min(min(grid.x, grid.y), 1.0);\n    float l2 = 1.0 - min(min(grid2.x, grid2.y), 1.0);\n    float x = 1.0 - min(axis.y, 1.0);\n    float y = 1.0 - min(axis.x, 1.0);\n\n    vec4 xc = vec4(x, 0.1, 0.2, x * al);\n    vec4 yc = vec4(0.2, y, 0.1, y * al);\n    vec4 lc = vec4(l, l, l, l * ad * al * 0.1);\n    vec4 lc2 = vec4(l2, l2, l2, l2 * al * 0.2);\n    vec4 color;\n    color = mix(lc, lc2, l2);\n    color = mix(color, xc, x);\n    color = mix(color, yc, y);\n\n    outColor = color;\n}\n"

/***/ }),

/***/ "./src/shaders/grid.vert.glsl":
/*!************************************!*\
  !*** ./src/shaders/grid.vert.glsl ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#version 300 es\n\nuniform mat4 pMatrix;\nuniform mat4 vMatrix;\n\nlayout (location = 0) in vec3 position;\nlayout (location = 1) in vec3 normal;\n\nout vec2 vUv;\n\nvoid main() {\n    vec3 pos = position * 128.0;\n    vUv = pos.xz;\n    gl_Position = pMatrix * vMatrix * vec4(pos, 1.0);\n}\n"

/***/ }),

/***/ "./src/shaders/mesh.frag.glsl":
/*!************************************!*\
  !*** ./src/shaders/mesh.frag.glsl ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#version 300 es\nprecision highp float;\n\nuniform vec3 camera;\n\nin vec3 vNor;\nin vec3 vPos;\nout vec4 outColor;\n\nvec3 lg = normalize(vec3(1.0, 4.0, 3.0));\n\nvec3 getEnv(vec3 nor) {\n    vec2 uv;\n    vec3 res = vec3(0.5);\n\n    if (nor.y < 0.0) {\n        float k = pow(max(-nor.y, 0.0), 0.8);\n        uv = nor.xz / nor.y;\n        vec2 stp = step(vec2(0.5, 0.5), fract(uv * 0.5));\n        res = vec3(stp.x != stp.y ? 0.8 : 0.5);\n        res = mix(vec3(0.5), res, k);\n    }\n\n    return res;\n}\n\nvec3 light(vec3 nor) {\n    float k = max(dot(lg, nor), 0.0);\n    return vec3(k * 0.9 + 0.1);\n}\n\nvoid main() {\n    vec3 nor = normalize(vNor);\n\n    vec3 color = vec3(0.6, 0.16, 0.1) * light(nor);\n\n    float spec = pow(1.0 - abs(dot(normalize(vPos - camera), -nor)), 3.0) * 0.99 + 0.01;\n\n    color = mix(color, getEnv(nor), spec);\n\n    outColor = vec4(color, 1);\n}\n"

/***/ }),

/***/ "./src/shaders/mesh.vert.glsl":
/*!************************************!*\
  !*** ./src/shaders/mesh.vert.glsl ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#version 300 es\n\nuniform mat4 pMatrix;\nuniform mat4 vMatrix;\n\nlayout (location = 0) in vec3 position;\nlayout (location = 1) in vec3 normal;\n\nout vec3 vNor;\nout vec3 vPos;\n\nvoid main() {\n    vNor = normal;\n    vPos = position;\n    gl_Position = pMatrix * vMatrix * vec4(position, 1.0);\n}\n"

/***/ }),

/***/ "./src/ui.ts":
/*!*******************!*\
  !*** ./src/ui.ts ***!
  \*******************/
/*! exports provided: UI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI", function() { return UI; });
class UI {
    set(triangles, vertices, indices) {
        const trianglesElement = document.getElementById('triangles');
        const verticesElement = document.getElementById('vertices');
        const indicesElement = document.getElementById('indices');
        if (trianglesElement === null || verticesElement === null || indicesElement === null) {
            return;
        }
        trianglesElement.innerText = String(triangles);
        verticesElement.innerText = String(vertices);
        indicesElement.innerText = String(indices);
    }
}


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.ts */"./src/index.ts");


/***/ })

/******/ });
});