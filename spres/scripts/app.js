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
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/camera.ts":
/*!***********************!*\
  !*** ./src/camera.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Camera": () => (/* binding */ Camera)
/* harmony export */ });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/node.ts");

class Camera extends _node__WEBPACK_IMPORTED_MODULE_0__.Node {
    constructor(options) {
        super(options);
        this.zoom = options.zoom ?? 1;
    }
}


/***/ }),

/***/ "./src/def.ts":
/*!********************!*\
  !*** ./src/def.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Def": () => (/* binding */ Def)
/* harmony export */ });
const SVG = 'http://www.w3.org/2000/svg';
class Def {
    constructor(parent, options) {
        this.id = options.id;
        this.type = options.type;
        this.element = document.createElementNS(SVG, this.type);
        this.element.setAttribute('id', options.id);
        parent.appendChild(this.element);
        if (options.attributes !== undefined) {
            for (const attribute of options.attributes) {
                if (attribute.type === 'inner') {
                    this.element.innerHTML = attribute.value;
                }
                else {
                    this.element.setAttribute(attribute.type, attribute.value);
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/layer.ts":
/*!**********************!*\
  !*** ./src/layer.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Layer": () => (/* binding */ Layer)
/* harmony export */ });
const SVG = 'http://www.w3.org/2000/svg';
class Layer {
    constructor(parent, options) {
        const x = options.moveSpeed?.x ?? 1;
        const y = options.moveSpeed?.y ?? 1;
        this.moveX = options.moveX ?? 'x';
        this.moveY = options.moveY ?? 'y';
        this.moveSpeed = { x, y };
        this.element = document.createElementNS(SVG, 'g');
        this.element.setAttribute('id', options.id);
        parent.appendChild(this.element);
    }
    update(x, y, w, h) {
        let lx = 0;
        let ly = 0;
        switch (this.moveX) {
            case 'x':
                lx = x * this.moveSpeed.x;
                break;
            case 'y':
                lx = y * this.moveSpeed.x;
                break;
            default:
                lx = (x * x + y * y) ** 0.5 * this.moveSpeed.x;
                break;
        }
        switch (this.moveY) {
            case 'x':
                ly = x * this.moveSpeed.y;
                break;
            case 'y':
                ly = y * this.moveSpeed.y;
                break;
            default:
                ly = (x * x + y * y) ** 0.5 * this.moveSpeed.y;
                break;
        }
        this.element.setAttribute('transform', `translate(${-lx + w * 0.5}, ${-ly + h * 0.5})`);
    }
}


/***/ }),

/***/ "./src/node.ts":
/*!*********************!*\
  !*** ./src/node.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Node": () => (/* binding */ Node)
/* harmony export */ });
class Node {
    constructor(options) {
        this.id = options.id;
        this.matrix = new Float32Array([1, 0, 0, 1, 0, 0]);
        this.skew = {
            x: options.skew?.x ?? 0,
            y: options.skew?.y ?? 0
        };
        this.scale = {
            x: options.scale?.x ?? 1,
            y: options.scale?.y ?? 1
        };
        this.position = {
            x: options.position?.x ?? 0,
            y: options.position?.y ?? 0
        };
        this.orientation = options.orientation ?? 0;
    }
    update() {
        const cos = Math.cos(this.orientation);
        const sin = Math.sin(this.orientation);
        const tanx = Math.tan(this.skew.x);
        const tany = Math.tan(this.skew.y);
        const a = this.scale.x * cos;
        const b = this.scale.y * sin;
        const c = -this.scale.x * sin;
        const d = this.scale.y * cos;
        this.matrix[0] = a + c * tany;
        this.matrix[1] = b + d * tany;
        this.matrix[2] = a * tanx + c;
        this.matrix[3] = b * tanx + d;
        this.matrix[4] = this.position.x;
        this.matrix[5] = this.position.y;
    }
    getMatrixString() {
        return `matrix(${this.matrix[0]},${this.matrix[1]},${this.matrix[2]},${this.matrix[3]},${this.matrix[4]},${this.matrix[5]})`;
    }
}


/***/ }),

/***/ "./src/shape.ts":
/*!**********************!*\
  !*** ./src/shape.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shape": () => (/* binding */ Shape)
/* harmony export */ });
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ "./src/node.ts");

const SVG = 'http://www.w3.org/2000/svg';
class Shape extends _node__WEBPACK_IMPORTED_MODULE_0__.Node {
    constructor(parent, options) {
        super(options);
        this.def = options.def;
        this.element = document.createElementNS(SVG, 'use');
        this.element.setAttribute('id', options.id);
        parent.appendChild(this.element);
        this.element.setAttribute('href', '#' + this.def);
        if (options.fill !== undefined) {
            this.element.setAttribute('fill', options.fill);
        }
        if (options.stroke !== undefined) {
            this.element.setAttribute('stroke', options.stroke);
        }
        if (options.strokeWidth !== undefined) {
            this.element.setAttribute('stroke-width', options.strokeWidth);
        }
        this.update();
    }
    update() {
        super.update();
        this.element.setAttribute('transform', this.getMatrixString());
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Viewer": () => (/* binding */ Viewer)
/* harmony export */ });
/* harmony import */ var _def__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./def */ "./src/def.ts");
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layer */ "./src/layer.ts");
/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shape */ "./src/shape.ts");
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./camera */ "./src/camera.ts");




const SVG = 'http://www.w3.org/2000/svg';
class Viewer {
    constructor() {
        this.mainLoop = (time) => {
            const dt = this._time - time * 0.001;
            this._time = time * 0.001;
            if (this._actionStart) {
                this._actionStart = false;
                let action = null;
                if (this._json !== null) {
                    for (const ao of this._json.actions) {
                        if (ao.id === this._actionId) {
                            action = ao;
                        }
                    }
                }
                if (action !== null) {
                    const node = this._nodes.get(action.node);
                    if (node !== undefined) {
                        this._actionStartX = node.position.x;
                        this._actionStartY = node.position.y;
                        this._actionStartTime = this._time;
                        this._actionPlay = true;
                    }
                }
            }
            if (this._actionPlay) {
                let action = null;
                if (this._json !== null) {
                    for (const ao of this._json.actions) {
                        if (ao.id === this._actionId) {
                            action = ao;
                        }
                    }
                }
                if (action !== null) {
                    const node = this._nodes.get(action.node);
                    if (node !== undefined) {
                        let k = (this._time - this._actionStartTime) / action.time;
                        if (k >= 1) {
                            this._actionPlay = false;
                            this._actionId = action.next;
                            k = 1;
                        }
                        node.position.x = this._actionStartX * (1 - k) + action.position.x * k;
                        node.position.y = this._actionStartY * (1 - k) + action.position.y * k;
                    }
                }
            }
            if (this._camera !== null) {
                const x = this._camera.position.x;
                const y = this._camera.position.y;
                for (const layer of this._layers.values()) {
                    layer.update(x, y, this._width, this._height);
                }
            }
            requestAnimationFrame(this.mainLoop);
        };
        const svg = document.createElementNS(SVG, 'svg');
        document.body.appendChild(svg);
        svg.style.display = 'block';
        svg.style.margin = 'auto';
        this._svgDoc = svg;
        this._defs = new Map();
        this._nodes = new Map();
        this._layers = new Map();
        this._shapes = new Map();
        this._cameras = new Map();
        this._width = 1;
        this._height = 1;
        this._camera = null;
        this._json = null;
        this._actionId = '';
        this._actionPlay = false;
        this._actionStart = false;
        this._actionStartX = 0;
        this._actionStartY = 0;
        this._actionStartTime = 0;
        this._time = performance.now() * 0.001;
        this._svgDefs = document.createElementNS(SVG, 'defs');
        svg.appendChild(this._svgDefs);
        requestAnimationFrame(this.mainLoop);
    }
    async load(url) {
        const svg = this._svgDoc;
        const request = await fetch(url);
        const json = await request.json();
        const { width, height, background } = json;
        this._json = json;
        this._width = width;
        this._height = height;
        svg.setAttribute('width', String(width));
        svg.setAttribute('height', String(height));
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.style.backgroundColor = background;
        for (const defOptions of json.defs) {
            this._defs.set(defOptions.id, new _def__WEBPACK_IMPORTED_MODULE_0__.Def(this._svgDefs, defOptions));
        }
        for (const layerOptions of json.layers) {
            this._layers.set(layerOptions.id, new _layer__WEBPACK_IMPORTED_MODULE_1__.Layer(svg, layerOptions));
        }
        for (const shapeOptions of json.shapes) {
            const layer = this._layers.get(shapeOptions.layer);
            if (layer === undefined) {
                throw new Error('Layer not exist.');
            }
            const shape = new _shape__WEBPACK_IMPORTED_MODULE_2__.Shape(layer.element, shapeOptions);
            this._nodes.set(shapeOptions.id, shape);
            this._shapes.set(shapeOptions.id, shape);
        }
        for (const cameraOptions of json.cameras) {
            const camera = new _camera__WEBPACK_IMPORTED_MODULE_3__.Camera(cameraOptions);
            this._nodes.set(cameraOptions.id, camera);
            this._cameras.set(cameraOptions.id, camera);
            this._camera = camera;
        }
        if (json.actions.length !== 0) {
            this._actionId = json.actions[0].id;
            this._actionPlay = false;
            this._actionStartTime = 0;
        }
        document.addEventListener('keydown', e => {
            switch (e.code) {
                case 'ArrowRight':
                    this._actionStart =  true && !this._actionPlay;
                    break;
                default: break;
            }
        });
    }
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});