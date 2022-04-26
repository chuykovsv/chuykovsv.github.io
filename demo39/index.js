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
/******/ 	var __webpack_modules__ = ({

/***/ "./src/component.ts":
/*!**************************!*\
  !*** ./src/component.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
class Component {
    constructor(scene, owner) {
        this.owner = owner;
        scene.addComponent(this);
    }
}
Component.storageId = '';


/***/ }),

/***/ "./src/components/harmonic-fly.ts":
/*!****************************************!*\
  !*** ./src/components/harmonic-fly.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HarmonicFly": () => (/* binding */ HarmonicFly)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/component.ts");
/* harmony import */ var _math_vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/vector3 */ "./src/math/vector3.ts");


class HarmonicFly extends _component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(scene, owner, target, axis, force, speed) {
        super(scene, owner);
        this.force = force;
        this.speed = speed;
        this.axis = new _math_vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3().setFromVector3(axis);
        this.target = new _math_vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3().setFromVector3(target);
    }
}
HarmonicFly.storageId = 'harmonicFly';


/***/ }),

/***/ "./src/components/mesh.ts":
/*!********************************!*\
  !*** ./src/components/mesh.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Mesh": () => (/* binding */ Mesh)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/component.ts");

class Mesh extends _component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(scene, owner, renderable) {
        super(scene, owner);
        this.renderable = renderable;
    }
}
Mesh.storageId = 'mesh';


/***/ }),

/***/ "./src/components/transform.ts":
/*!*************************************!*\
  !*** ./src/components/transform.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transform": () => (/* binding */ Transform)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/component.ts");
/* harmony import */ var _math_vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/vector3 */ "./src/math/vector3.ts");
/* harmony import */ var _math_quaternion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/quaternion */ "./src/math/quaternion.ts");
/* harmony import */ var _math_matrix3h__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/matrix3h */ "./src/math/matrix3h.ts");




class Transform extends _component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(scene, owner) {
        super(scene, owner);
        const buffer = new ArrayBuffer(104);
        this.scale = new _math_vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3(buffer, 0);
        this.position = new _math_vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3(buffer, 12);
        this.orientation = new _math_quaternion__WEBPACK_IMPORTED_MODULE_2__.Quaternion(buffer, 24);
        this.matrix = new _math_matrix3h__WEBPACK_IMPORTED_MODULE_3__.Matrix3H(buffer, 40);
        this.scale.setFromElements(1, 1, 1);
    }
}
Transform.storageId = 'transform';


/***/ }),

/***/ "./src/core.ts":
/*!*********************!*\
  !*** ./src/core.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Core": () => (/* binding */ Core)
/* harmony export */ });
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Core_onFrameStartList, _Core_onFrameEndList, _Core_animationFrame;
class Core {
    constructor() { throw new Error('Core is all static class.'); }
    static async init(root, systems = [], events = ['onStart', 'onUpdate', 'onDraw', 'onEnd']) {
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        root.appendChild(canvas);
        canvas.width = root.clientWidth;
        canvas.height = root.clientHeight;
        const ctx = canvas.getContext('webgl2', {
            antialias: true,
            preserveDrawingBuffer: true
        });
        if (ctx === null) {
            throw new Error('WebGL2 context not supported.');
        }
        const extBuf = ctx.getExtension('EXT_color_buffer_float');
        if (extBuf === null) {
            throw new Error('Need EXT_color_buffer_float');
        }
        const extLin = ctx.getExtension('OES_texture_float_linear');
        if (extLin === null) {
            throw new Error('Need OES_texture_float_linear');
        }
        Core.ctx = ctx;
        Core.root = root;
        Core.events = events;
        Core.systems = systems;
        __classPrivateFieldSet(Core, _a, Core.calcEventsList('onFrameStart', systems), "f", _Core_onFrameStartList);
        __classPrivateFieldSet(Core, _a, Core.calcEventsList('onFrameEnd', systems), "f", _Core_onFrameEndList);
        requestAnimationFrame(__classPrivateFieldGet(Core, _a, "m", _Core_animationFrame));
    }
    static getResource(storageId, id) {
        const storage = this.resources.get(storageId);
        if (storage === undefined) {
            throw new Error('Storage not found.');
        }
        const resource = storage.get(id);
        if (resource === undefined) {
            throw new Error('Resource not found.');
        }
        return resource;
    }
    static getResourceStorage(storageId) {
        const storage = this.resources.get(storageId);
        if (storage === undefined) {
            throw new Error('Storage not found.');
        }
        return storage;
    }
    static calcEventsList(event, systems) {
        const rawEventsArray = [];
        for (const system of systems) {
            for (const property of Object.getOwnPropertyNames(system)) {
                if (property.startsWith(event) === false) {
                    continue;
                }
                let order = 256;
                const index = property.indexOf('$');
                if (index !== -1) {
                    order = parseInt(property.slice(index + 1), 10);
                }
                rawEventsArray.push({ method: system[property], order });
            }
        }
        rawEventsArray.sort((a, b) => a.order - b.order);
        return rawEventsArray.map(e => e.method);
    }
}
_a = Core, _Core_animationFrame = function _Core_animationFrame() {
    Core.frame++;
    for (const event of __classPrivateFieldGet(Core, _a, "f", _Core_onFrameStartList)) {
        event();
    }
    for (const frameRequest of Core.frameRequests) {
        Core.currentRequest = frameRequest;
        for (const eventName of Core.events) {
            for (const event of frameRequest.events[eventName]) {
                event();
            }
        }
    }
    for (const event of __classPrivateFieldGet(Core, _a, "f", _Core_onFrameEndList)) {
        event();
    }
    requestAnimationFrame(__classPrivateFieldGet(Core, _a, "m", _Core_animationFrame));
};
Core.frameRequests = [];
Core.resources = new Map();
Core.frame = 0;
_Core_onFrameStartList = { value: void 0 };
_Core_onFrameEndList = { value: void 0 };
Core.testId = 0;


/***/ }),

/***/ "./src/cullers/gpu-culler.ts":
/*!***********************************!*\
  !*** ./src/cullers/gpu-culler.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gpuCuller": () => (/* binding */ gpuCuller)
/* harmony export */ });
/* harmony import */ var _resources_texture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../resources/texture */ "./src/resources/texture.ts");
/* harmony import */ var _resources_render_target__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resources/render-target */ "./src/resources/render-target.ts");
/* harmony import */ var _resources_geometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../resources/geometry */ "./src/resources/geometry.ts");
/* harmony import */ var _resources_attribute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../resources/attribute */ "./src/resources/attribute.ts");
/* harmony import */ var _resources_buffer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../resources/buffer */ "./src/resources/buffer.ts");
/* harmony import */ var _resources_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../resources/material */ "./src/resources/material.ts");
/* harmony import */ var _resources_sampler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../resources/sampler */ "./src/resources/sampler.ts");
/* harmony import */ var _resources_shader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../resources/shader */ "./src/resources/shader.ts");
/* harmony import */ var _resources_scene__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../resources/scene */ "./src/resources/scene.ts");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core */ "./src/core.ts");










const vs = `#version 300 es
layout(location = 0) in vec3 position;

out vec2 v_pos;

void main() {
    v_pos = position.xy;
    gl_Position = vec4(position, 1.0);
}`;
const fs = `#version 300 es
precision highp float;

layout(std140) uniform tn_camera { mat4 tn_pm; mat4 tn_vm; } ol;

uniform sampler2D sr_texture;

in vec2 v_pos;
out uint outColor;

void main() {
    mat4 m = ol.tn_pm * ol.tn_vm;
    // transpose(m);

    vec4 left = m[3] + m[0];
    vec4 right = m[3] - m[0];
    vec4 bottom = m[3] + m[1];
    vec4 top = m[3] - m[1];
    vec4 near = m[3] + m[2];
    vec4 far = m[3] - m[2];

    left /= length(left.xyz);
    right /= length(right.xyz);
    bottom /= length(bottom.xyz);
    top /= length(top.xyz);
    near /= length(near.xyz);
    far /= length(far.xyz);

    vec2 uv = (v_pos + 1.0) * 0.5;
    vec4 bs = texture(sr_texture, uv);
    vec4 bsp = vec4(bs.xyz, 1.0);

    bool l = dot(bsp, left) >= -bs.w;
    bool r = dot(bsp, right) >= -bs.w;
    bool b = dot(bsp, bottom) >= -bs.w;
    bool t = dot(bsp, top) >= -bs.w;
    bool n = dot(bsp, near) >= -bs.w;
    bool f = dot(bsp, far) >= -bs.w;

    outColor = uint(l && r && b && t && n && f);

    // float l = step(-bs.w, dot(bsp, left));
    // float r = step(-bs.w, dot(bsp, right));
    // float b = step(-bs.w, dot(bsp, bottom));
    // float t = step(-bs.w, dot(bsp, top));
    // float n = step(-bs.w, dot(bsp, near));
    // float f = step(-bs.w, dot(bsp, far));

    // outColor = uint(l * r * b * t * n * f);
}`;
const sceneMap = new WeakMap();
function createFCObject() {
    const bsTexture = new _resources_texture__WEBPACK_IMPORTED_MODULE_0__.Texture(_resources_texture__WEBPACK_IMPORTED_MODULE_0__.TextureType.T2D, _resources_texture__WEBPACK_IMPORTED_MODULE_0__.TextureFormat.RGBA32F, 1, 1024, 256);
    const renderTarget = new _resources_render_target__WEBPACK_IMPORTED_MODULE_1__.RenderTarget(1024, 256);
    renderTarget.createAttchment(_resources_render_target__WEBPACK_IMPORTED_MODULE_1__.RenderTargetAttachment.COLOR_0, _resources_texture__WEBPACK_IMPORTED_MODULE_0__.TextureFormat.R8U);
    const geometry = new _resources_geometry__WEBPACK_IMPORTED_MODULE_2__.Geometry(_resources_geometry__WEBPACK_IMPORTED_MODULE_2__.GeometryPrimitive.TRIANGLE_LIST);
    const posBuffer = new _resources_buffer__WEBPACK_IMPORTED_MODULE_4__.Buffer(48);
    posBuffer.subData(0, new Float32Array([-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0]));
    const indBuffer = new _resources_buffer__WEBPACK_IMPORTED_MODULE_4__.Buffer(12, _resources_buffer__WEBPACK_IMPORTED_MODULE_4__.BufferUsage.INDEX);
    indBuffer.subData(0, new Uint16Array([0, 2, 1, 0, 3, 2]));
    geometry.setAttribute(0, new _resources_attribute__WEBPACK_IMPORTED_MODULE_3__.Attribute(posBuffer, _resources_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.F32x3, 4));
    geometry.setIndices(new _resources_attribute__WEBPACK_IMPORTED_MODULE_3__.Attribute(indBuffer, _resources_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.U16x1, 6));
    geometry.initVao();
    const sampler = new _resources_sampler__WEBPACK_IMPORTED_MODULE_6__.Sampler();
    const material = new _resources_material__WEBPACK_IMPORTED_MODULE_5__.Material(new _resources_shader__WEBPACK_IMPORTED_MODULE_7__.Shader(vs, fs));
    material.depthTest = false;
    material.uniforms.sr_texture.value.set([0, bsTexture.id, sampler.id]);
    return {
        bsTexture,
        renderTarget,
        material,
        geometry,
        outData: new Uint8Array(1024 * 256)
    };
}
function gpuCuller(fr) {
    let fcObject = sceneMap.get(fr.scene);
    if (fcObject === undefined) {
        fcObject = createFCObject();
        sceneMap.set(fr.scene, fcObject);
    }
    fcObject.bsTexture.setMipLevelData(new _resources_texture__WEBPACK_IMPORTED_MODULE_0__.TextureData(1024, 256, 1, fr.scene.bsData));
    fcObject.renderTarget.use();
    _core__WEBPACK_IMPORTED_MODULE_9__.Core.ctx.viewport(0, 0, fcObject.renderTarget.width, fcObject.renderTarget.height);
    fr.look.use();
    fcObject.material.use();
    fcObject.geometry.draw();
    console.time('r');
    _core__WEBPACK_IMPORTED_MODULE_9__.Core.ctx.readPixels(0, 0, 1024, 256, _core__WEBPACK_IMPORTED_MODULE_9__.Core.ctx.RED_INTEGER, _core__WEBPACK_IMPORTED_MODULE_9__.Core.ctx.UNSIGNED_BYTE, fcObject.outData);
    console.timeEnd('r');
    const renderables = fr.scene.renderables;
    for (let it = 0; it < renderables.length; it++) {
        if ((renderables[it] & _resources_scene__WEBPACK_IMPORTED_MODULE_8__.RenderableState.CULLING) === 0 || (renderables[it] & _resources_scene__WEBPACK_IMPORTED_MODULE_8__.RenderableState.EXIST) === 0) {
            continue;
        }
        fr.scene.setRenderableStateBit(it, _resources_scene__WEBPACK_IMPORTED_MODULE_8__.RenderableState.CULLING_VISIBLE, Boolean(fcObject.outData[it]));
    }
}


/***/ }),

/***/ "./src/global.ts":
/*!***********************!*\
  !*** ./src/global.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Core": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_1__.Core),
/* harmony export */   "Loader": () => (/* reexport safe */ _loader__WEBPACK_IMPORTED_MODULE_2__.Loader),
/* harmony export */   "Resource": () => (/* reexport safe */ _resource__WEBPACK_IMPORTED_MODULE_3__.Resource),
/* harmony export */   "Component": () => (/* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_4__.Component),
/* harmony export */   "IVector2": () => (/* reexport safe */ _math_ivector2__WEBPACK_IMPORTED_MODULE_5__.IVector2),
/* harmony export */   "IVector3": () => (/* reexport safe */ _math_ivector3__WEBPACK_IMPORTED_MODULE_6__.IVector3),
/* harmony export */   "Matrix3A": () => (/* reexport safe */ _math_matrix3a__WEBPACK_IMPORTED_MODULE_7__.Matrix3A),
/* harmony export */   "Matrix3H": () => (/* reexport safe */ _math_matrix3h__WEBPACK_IMPORTED_MODULE_8__.Matrix3H),
/* harmony export */   "Quaternion": () => (/* reexport safe */ _math_quaternion__WEBPACK_IMPORTED_MODULE_9__.Quaternion),
/* harmony export */   "Vector3": () => (/* reexport safe */ _math_vector3__WEBPACK_IMPORTED_MODULE_10__.Vector3),
/* harmony export */   "Vector4": () => (/* reexport safe */ _math_vector4__WEBPACK_IMPORTED_MODULE_11__.Vector4),
/* harmony export */   "ArrayBufferLoader": () => (/* reexport safe */ _loaders_array_buffer_loader__WEBPACK_IMPORTED_MODULE_12__.ArrayBufferLoader),
/* harmony export */   "GltfLoader": () => (/* reexport safe */ _loaders_gltf_loader__WEBPACK_IMPORTED_MODULE_13__.GltfLoader),
/* harmony export */   "ImageLoader": () => (/* reexport safe */ _loaders_image_loader__WEBPACK_IMPORTED_MODULE_14__.ImageLoader),
/* harmony export */   "JsonLoader": () => (/* reexport safe */ _loaders_json_loader__WEBPACK_IMPORTED_MODULE_15__.JsonLoader),
/* harmony export */   "TextLoader": () => (/* reexport safe */ _loaders_text_loader__WEBPACK_IMPORTED_MODULE_16__.TextLoader),
/* harmony export */   "EnvLoader": () => (/* reexport safe */ _loaders_env_loader__WEBPACK_IMPORTED_MODULE_17__.EnvLoader),
/* harmony export */   "Attribute": () => (/* reexport safe */ _resources_attribute__WEBPACK_IMPORTED_MODULE_18__.Attribute),
/* harmony export */   "AttributeFormat": () => (/* reexport safe */ _resources_attribute__WEBPACK_IMPORTED_MODULE_18__.AttributeFormat),
/* harmony export */   "Buffer": () => (/* reexport safe */ _resources_buffer__WEBPACK_IMPORTED_MODULE_19__.Buffer),
/* harmony export */   "BufferUsage": () => (/* reexport safe */ _resources_buffer__WEBPACK_IMPORTED_MODULE_19__.BufferUsage),
/* harmony export */   "FrameRequest": () => (/* reexport safe */ _resources_frame_request__WEBPACK_IMPORTED_MODULE_20__.FrameRequest),
/* harmony export */   "FrameRequestClearMask": () => (/* reexport safe */ _resources_frame_request__WEBPACK_IMPORTED_MODULE_20__.FrameRequestClearMask),
/* harmony export */   "Geometry": () => (/* reexport safe */ _resources_geometry__WEBPACK_IMPORTED_MODULE_21__.Geometry),
/* harmony export */   "GeometryPrimitive": () => (/* reexport safe */ _resources_geometry__WEBPACK_IMPORTED_MODULE_21__.GeometryPrimitive),
/* harmony export */   "attributeMap": () => (/* reexport safe */ _resources_geometry__WEBPACK_IMPORTED_MODULE_21__.attributeMap),
/* harmony export */   "primitiveMap": () => (/* reexport safe */ _resources_geometry__WEBPACK_IMPORTED_MODULE_21__.primitiveMap),
/* harmony export */   "Look": () => (/* reexport safe */ _resources_look__WEBPACK_IMPORTED_MODULE_22__.Look),
/* harmony export */   "Material": () => (/* reexport safe */ _resources_material__WEBPACK_IMPORTED_MODULE_23__.Material),
/* harmony export */   "setUniformM3H": () => (/* reexport safe */ _resources_material__WEBPACK_IMPORTED_MODULE_23__.setUniformM3H),
/* harmony export */   "setUniformSR": () => (/* reexport safe */ _resources_material__WEBPACK_IMPORTED_MODULE_23__.setUniformSR),
/* harmony export */   "Sampler": () => (/* reexport safe */ _resources_sampler__WEBPACK_IMPORTED_MODULE_24__.Sampler),
/* harmony export */   "RenderableState": () => (/* reexport safe */ _resources_scene__WEBPACK_IMPORTED_MODULE_25__.RenderableState),
/* harmony export */   "Scene": () => (/* reexport safe */ _resources_scene__WEBPACK_IMPORTED_MODULE_25__.Scene),
/* harmony export */   "Shader": () => (/* reexport safe */ _resources_shader__WEBPACK_IMPORTED_MODULE_26__.Shader),
/* harmony export */   "Texture": () => (/* reexport safe */ _resources_texture__WEBPACK_IMPORTED_MODULE_27__.Texture),
/* harmony export */   "TextureData": () => (/* reexport safe */ _resources_texture__WEBPACK_IMPORTED_MODULE_27__.TextureData),
/* harmony export */   "TextureFormat": () => (/* reexport safe */ _resources_texture__WEBPACK_IMPORTED_MODULE_27__.TextureFormat),
/* harmony export */   "TextureType": () => (/* reexport safe */ _resources_texture__WEBPACK_IMPORTED_MODULE_27__.TextureType),
/* harmony export */   "RenderTarget": () => (/* reexport safe */ _resources_render_target__WEBPACK_IMPORTED_MODULE_28__.RenderTarget),
/* harmony export */   "RenderTargetAttachment": () => (/* reexport safe */ _resources_render_target__WEBPACK_IMPORTED_MODULE_28__.RenderTargetAttachment),
/* harmony export */   "DrawSystem": () => (/* reexport safe */ _systems_draw_system__WEBPACK_IMPORTED_MODULE_29__.DrawSystem),
/* harmony export */   "InputPointer": () => (/* reexport safe */ _systems_input_system__WEBPACK_IMPORTED_MODULE_30__.InputPointer),
/* harmony export */   "InputSystem": () => (/* reexport safe */ _systems_input_system__WEBPACK_IMPORTED_MODULE_30__.InputSystem),
/* harmony export */   "KeyCode": () => (/* reexport safe */ _systems_input_system__WEBPACK_IMPORTED_MODULE_30__.KeyCode),
/* harmony export */   "ScreenSystem": () => (/* reexport safe */ _systems_screen_system__WEBPACK_IMPORTED_MODULE_31__.ScreenSystem),
/* harmony export */   "LookOrbitSystem": () => (/* reexport safe */ _systems_look_orbit_system__WEBPACK_IMPORTED_MODULE_32__.LookOrbitSystem),
/* harmony export */   "TimeSystem": () => (/* reexport safe */ _systems_time_system__WEBPACK_IMPORTED_MODULE_33__.TimeSystem),
/* harmony export */   "TransformSystem": () => (/* reexport safe */ _systems_transform_system__WEBPACK_IMPORTED_MODULE_34__.TransformSystem),
/* harmony export */   "MeshSystem": () => (/* reexport safe */ _systems_mesh_system__WEBPACK_IMPORTED_MODULE_35__.MeshSystem),
/* harmony export */   "HarmonicFlySystem": () => (/* reexport safe */ _systems_harmonic_fly_system__WEBPACK_IMPORTED_MODULE_36__.HarmonicFlySystem),
/* harmony export */   "Mesh": () => (/* reexport safe */ _components_mesh__WEBPACK_IMPORTED_MODULE_37__.Mesh),
/* harmony export */   "Transform": () => (/* reexport safe */ _components_transform__WEBPACK_IMPORTED_MODULE_38__.Transform),
/* harmony export */   "HarmonicFly": () => (/* reexport safe */ _components_harmonic_fly__WEBPACK_IMPORTED_MODULE_39__.HarmonicFly),
/* harmony export */   "gpuCuller": () => (/* reexport safe */ _cullers_gpu_culler__WEBPACK_IMPORTED_MODULE_40__.gpuCuller)
/* harmony export */ });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./src/global.ts");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ "./src/core.ts");
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loader */ "./src/loader.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resource */ "./src/resource.ts");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component */ "./src/component.ts");
/* harmony import */ var _math_ivector2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./math/ivector2 */ "./src/math/ivector2.ts");
/* harmony import */ var _math_ivector3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./math/ivector3 */ "./src/math/ivector3.ts");
/* harmony import */ var _math_matrix3a__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./math/matrix3a */ "./src/math/matrix3a.ts");
/* harmony import */ var _math_matrix3h__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./math/matrix3h */ "./src/math/matrix3h.ts");
/* harmony import */ var _math_quaternion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./math/quaternion */ "./src/math/quaternion.ts");
/* harmony import */ var _math_vector3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./math/vector3 */ "./src/math/vector3.ts");
/* harmony import */ var _math_vector4__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./math/vector4 */ "./src/math/vector4.ts");
/* harmony import */ var _loaders_array_buffer_loader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./loaders/array-buffer-loader */ "./src/loaders/array-buffer-loader.ts");
/* harmony import */ var _loaders_gltf_loader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./loaders/gltf-loader */ "./src/loaders/gltf-loader/index.ts");
/* harmony import */ var _loaders_image_loader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./loaders/image-loader */ "./src/loaders/image-loader.ts");
/* harmony import */ var _loaders_json_loader__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./loaders/json-loader */ "./src/loaders/json-loader.ts");
/* harmony import */ var _loaders_text_loader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./loaders/text-loader */ "./src/loaders/text-loader.ts");
/* harmony import */ var _loaders_env_loader__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./loaders/env-loader */ "./src/loaders/env-loader.ts");
/* harmony import */ var _resources_attribute__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./resources/attribute */ "./src/resources/attribute.ts");
/* harmony import */ var _resources_buffer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./resources/buffer */ "./src/resources/buffer.ts");
/* harmony import */ var _resources_frame_request__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./resources/frame-request */ "./src/resources/frame-request.ts");
/* harmony import */ var _resources_geometry__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./resources/geometry */ "./src/resources/geometry.ts");
/* harmony import */ var _resources_look__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./resources/look */ "./src/resources/look.ts");
/* harmony import */ var _resources_material__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./resources/material */ "./src/resources/material.ts");
/* harmony import */ var _resources_sampler__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./resources/sampler */ "./src/resources/sampler.ts");
/* harmony import */ var _resources_scene__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./resources/scene */ "./src/resources/scene.ts");
/* harmony import */ var _resources_shader__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./resources/shader */ "./src/resources/shader.ts");
/* harmony import */ var _resources_texture__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./resources/texture */ "./src/resources/texture.ts");
/* harmony import */ var _resources_render_target__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./resources/render-target */ "./src/resources/render-target.ts");
/* harmony import */ var _systems_draw_system__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./systems/draw-system */ "./src/systems/draw-system.ts");
/* harmony import */ var _systems_input_system__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./systems/input-system */ "./src/systems/input-system.ts");
/* harmony import */ var _systems_screen_system__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./systems/screen-system */ "./src/systems/screen-system.ts");
/* harmony import */ var _systems_look_orbit_system__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./systems/look-orbit-system */ "./src/systems/look-orbit-system.ts");
/* harmony import */ var _systems_time_system__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./systems/time-system */ "./src/systems/time-system.ts");
/* harmony import */ var _systems_transform_system__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./systems/transform-system */ "./src/systems/transform-system.ts");
/* harmony import */ var _systems_mesh_system__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./systems/mesh-system */ "./src/systems/mesh-system.ts");
/* harmony import */ var _systems_harmonic_fly_system__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./systems/harmonic-fly-system */ "./src/systems/harmonic-fly-system.ts");
/* harmony import */ var _components_mesh__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./components/mesh */ "./src/components/mesh.ts");
/* harmony import */ var _components_transform__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./components/transform */ "./src/components/transform.ts");
/* harmony import */ var _components_harmonic_fly__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./components/harmonic-fly */ "./src/components/harmonic-fly.ts");
/* harmony import */ var _cullers_gpu_culler__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./cullers/gpu-culler */ "./src/cullers/gpu-culler.ts");











































/***/ }),

/***/ "./src/loader.ts":
/*!***********************!*\
  !*** ./src/loader.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Loader": () => (/* binding */ Loader)
/* harmony export */ });
class Loader {
    constructor() { throw new Error('Loader is all static class.'); }
    static async load(url, options = {}) {
        return new Promise(resolve => {
            const { responseType = 'json' } = options;
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = responseType;
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.send();
        });
    }
}


/***/ }),

/***/ "./src/loaders/array-buffer-loader.ts":
/*!********************************************!*\
  !*** ./src/loaders/array-buffer-loader.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrayBufferLoader": () => (/* binding */ ArrayBufferLoader)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader */ "./src/loader.ts");

class ArrayBufferLoader extends _loader__WEBPACK_IMPORTED_MODULE_0__.Loader {
    static async load(url) {
        return _loader__WEBPACK_IMPORTED_MODULE_0__.Loader.load(url, { responseType: 'arraybuffer' });
    }
}


/***/ }),

/***/ "./src/loaders/env-loader.ts":
/*!***********************************!*\
  !*** ./src/loaders/env-loader.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnvLoader": () => (/* binding */ EnvLoader)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader */ "./src/loader.ts");
/* harmony import */ var _resources_texture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resources/texture */ "./src/resources/texture.ts");
/* harmony import */ var _array_buffer_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array-buffer-loader */ "./src/loaders/array-buffer-loader.ts");



class EnvLoader extends _loader__WEBPACK_IMPORTED_MODULE_0__.Loader {
    static async load(url) {
        const dataBuffer = await _array_buffer_loader__WEBPACK_IMPORTED_MODULE_2__.ArrayBufferLoader.load(url);
        const sizeArray = new Float32Array(dataBuffer, 0, 2);
        const diffSize = sizeArray[0];
        const specSize = sizeArray[1];
        const specTexture = new _resources_texture__WEBPACK_IMPORTED_MODULE_1__.Texture(_resources_texture__WEBPACK_IMPORTED_MODULE_1__.TextureType.CUBE, _resources_texture__WEBPACK_IMPORTED_MODULE_1__.TextureFormat.RGBA32F, 1, specSize);
        for (let it = 0; it < 6; it++) {
            const data = new _resources_texture__WEBPACK_IMPORTED_MODULE_1__.TextureData(specSize, specSize, specSize, new Float32Array(dataBuffer, specSize * specSize * 16 * it + 8, specSize * specSize * 4));
            specTexture.setMipLevelData(data, 0, it);
        }
        const diffTexture = new _resources_texture__WEBPACK_IMPORTED_MODULE_1__.Texture(_resources_texture__WEBPACK_IMPORTED_MODULE_1__.TextureType.CUBE, _resources_texture__WEBPACK_IMPORTED_MODULE_1__.TextureFormat.RGBA32F, 1, diffSize);
        for (let it = 0; it < 6; it++) {
            const data = new _resources_texture__WEBPACK_IMPORTED_MODULE_1__.TextureData(diffSize, diffSize, diffSize, new Float32Array(dataBuffer, diffSize * diffSize * 16 * it + specSize * specSize * 16 * 6 + 8, diffSize * diffSize * 4));
            diffTexture.setMipLevelData(data, 0, it);
        }
        return {
            diffTexture,
            specTexture
        };
    }
}


/***/ }),

/***/ "./src/loaders/gltf-loader/index.ts":
/*!******************************************!*\
  !*** ./src/loaders/gltf-loader/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GltfLoader": () => (/* binding */ GltfLoader)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../loader */ "./src/loader.ts");
/* harmony import */ var _math_vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../math/vector3 */ "./src/math/vector3.ts");
/* harmony import */ var _math_matrix3h__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../math/matrix3h */ "./src/math/matrix3h.ts");
/* harmony import */ var _math_quaternion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../math/quaternion */ "./src/math/quaternion.ts");
/* harmony import */ var _resources_scene__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../resources/scene */ "./src/resources/scene.ts");
/* harmony import */ var _resources_buffer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/buffer */ "./src/resources/buffer.ts");
/* harmony import */ var _resources_shader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../resources/shader */ "./src/resources/shader.ts");
/* harmony import */ var _resources_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../resources/material */ "./src/resources/material.ts");
/* harmony import */ var _resources_geometry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../resources/geometry */ "./src/resources/geometry.ts");
/* harmony import */ var _resources_attribute__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../resources/attribute */ "./src/resources/attribute.ts");
/* harmony import */ var _array_buffer_loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../array-buffer-loader */ "./src/loaders/array-buffer-loader.ts");
/* harmony import */ var _components_mesh__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/mesh */ "./src/components/mesh.ts");
/* harmony import */ var _components_transform__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/transform */ "./src/components/transform.ts");
/* harmony import */ var _pbr_v_glsl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pbr.v.glsl */ "./src/loaders/gltf-loader/pbr.v.glsl");
/* harmony import */ var _pbr_v_glsl__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_pbr_v_glsl__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _pbr_f_glsl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pbr.f.glsl */ "./src/loaders/gltf-loader/pbr.f.glsl");
/* harmony import */ var _pbr_f_glsl__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_pbr_f_glsl__WEBPACK_IMPORTED_MODULE_14__);
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _GltfLoader_shader;















class GltfLoader extends _loader__WEBPACK_IMPORTED_MODULE_0__.Loader {
    static async load(url) {
        const rawGltf = await _loader__WEBPACK_IMPORTED_MODULE_0__.Loader.load(url, { responseType: 'json' });
        rawGltf.path = url.slice(0, url.lastIndexOf('/') + 1);
        for (const scene of rawGltf.scenes) {
            await GltfLoader.parseScene(rawGltf, scene);
        }
        return {
            scenes: rawGltf.scenes.map(e => e.data)
        };
    }
    static async parseScene(gltf, scene) {
        if (scene.isReady) {
            return;
        }
        scene.data = new _resources_scene__WEBPACK_IMPORTED_MODULE_4__.Scene();
        for (const nodeId of scene.nodes) {
            const node = gltf.nodes[nodeId];
            await GltfLoader.parseNode(gltf, scene, node, null);
        }
        scene.isReady = true;
    }
    static async parseNode(gltf, scene, node, parent) {
        if (node.isReady) {
            return;
        }
        const mesh = gltf.meshes[node.mesh ?? 0];
        await GltfLoader.parseMesh(gltf, mesh);
        const entity = scene.data.addEntity(parent?.data.entity ?? null);
        node.data = {
            mesh,
            scale: new _math_vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3(),
            position: new _math_vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3(),
            orientation: new _math_quaternion__WEBPACK_IMPORTED_MODULE_3__.Quaternion(),
            matrix: new _math_matrix3h__WEBPACK_IMPORTED_MODULE_2__.Matrix3H(),
            entity
        };
        node.data.scale.set([1, 1, 1]);
        if (node.matrix !== undefined) {
            node.data.matrix.set(node.matrix);
        }
        else {
            if (node.scale !== undefined) {
                node.data.scale.set(node.scale);
            }
            if (node.translation !== undefined) {
                node.data.position.set(node.translation);
            }
            if (node.rotation !== undefined) {
                node.data.orientation.set(node.rotation);
            }
        }
        const transform = new _components_transform__WEBPACK_IMPORTED_MODULE_12__.Transform(scene.data, entity);
        transform.scale.set(node.data.scale);
        transform.position.set(node.data.position);
        transform.orientation.set(node.data.orientation);
        for (const primitive of node.data.mesh.primitives) {
            const renderable = scene.data.addRenderable(primitive.data.geometry, primitive.data.material);
            new _components_mesh__WEBPACK_IMPORTED_MODULE_11__.Mesh(scene.data, entity, renderable);
        }
        node.isReady = true;
        if (node.children === undefined) {
            return;
        }
        for (const childId of node.children) {
            const childNode = gltf.nodes[childId];
            await GltfLoader.parseNode(gltf, scene, childNode, node);
        }
    }
    static async parseMesh(gltf, mesh) {
        if (mesh.isReady) {
            return;
        }
        for (const primitives of mesh.primitives) {
            await GltfLoader.parsePrimitive(gltf, primitives);
        }
        mesh.isReady = true;
    }
    static async parsePrimitive(gltf, primitive) {
        if (primitive.isReady) {
            return;
        }
        const geometry = new _resources_geometry__WEBPACK_IMPORTED_MODULE_8__.Geometry(_resources_geometry__WEBPACK_IMPORTED_MODULE_8__.GeometryPrimitive.TRIANGLE_LIST);
        if (primitive.attributes.POSITION !== undefined) {
            const accessor = gltf.accessors[primitive.attributes.POSITION];
            await GltfLoader.parseAccessor(gltf, accessor, false, _resources_attribute__WEBPACK_IMPORTED_MODULE_9__.AttributeFormat.F32x3, geometry.bs);
            geometry.setAttribute(0, accessor.data);
        }
        if (primitive.attributes.NORMAL !== undefined) {
            const accessor = gltf.accessors[primitive.attributes.NORMAL];
            await GltfLoader.parseAccessor(gltf, accessor, false, _resources_attribute__WEBPACK_IMPORTED_MODULE_9__.AttributeFormat.F32x3);
            geometry.setAttribute(1, accessor.data);
        }
        if (primitive.indices !== undefined) {
            const accessor = gltf.accessors[primitive.indices];
            await GltfLoader.parseAccessor(gltf, accessor, true, accessor.componentType === 5123 ? _resources_attribute__WEBPACK_IMPORTED_MODULE_9__.AttributeFormat.U16x1 : _resources_attribute__WEBPACK_IMPORTED_MODULE_9__.AttributeFormat.U32x1);
            geometry.setIndices(accessor.data);
        }
        geometry.initVao();
        const material = gltf.materials[primitive.material];
        await GltfLoader.parseMaterial(gltf, material);
        primitive.data = {
            material: material.data,
            geometry
        };
        primitive.isReady = true;
    }
    static _calcBS(bs, pos) {
        const bbox = {
            minx: Infinity,
            miny: Infinity,
            minz: Infinity,
            maxx: -Infinity,
            maxy: -Infinity,
            maxz: -Infinity
        };
        for (let it = 0; it < pos.length; it += 3) {
            bbox.minx = Math.min(bbox.minx, pos[it + 0]);
            bbox.miny = Math.min(bbox.miny, pos[it + 1]);
            bbox.minz = Math.min(bbox.minz, pos[it + 2]);
            bbox.maxx = Math.max(bbox.maxx, pos[it + 0]);
            bbox.maxy = Math.max(bbox.maxy, pos[it + 1]);
            bbox.maxz = Math.max(bbox.maxz, pos[it + 2]);
        }
        bs.x = (bbox.minx + bbox.maxx) * 0.5;
        bs.y = (bbox.miny + bbox.maxy) * 0.5;
        bs.z = (bbox.minz + bbox.maxz) * 0.5;
        bs.w = Math.sqrt((bbox.maxx - bbox.minx) ** 2 + (bbox.maxy - bbox.miny) ** 2 + (bbox.maxz - bbox.minz) ** 2) * 0.5;
    }
    static async parseAccessor(gltf, accessor, isIndexes, format, bs = null) {
        if (accessor.isReady) {
            return;
        }
        const bufferView = gltf.bufferViews[accessor.bufferView];
        await GltfLoader.parseBufferView(gltf, bufferView);
        const buffer = new _resources_buffer__WEBPACK_IMPORTED_MODULE_5__.Buffer(bufferView.byteLength, isIndexes ? _resources_buffer__WEBPACK_IMPORTED_MODULE_5__.BufferUsage.INDEX : _resources_buffer__WEBPACK_IMPORTED_MODULE_5__.BufferUsage.VERTEX);
        buffer.subData(0, new Uint8Array(bufferView.data, bufferView.byteOffset, bufferView.byteLength));
        if (bs !== null) {
            GltfLoader._calcBS(bs, new Float32Array(bufferView.data, bufferView.byteOffset, bufferView.byteLength / 4));
        }
        accessor.data = new _resources_attribute__WEBPACK_IMPORTED_MODULE_9__.Attribute(buffer, format, accessor.count);
        accessor.isReady = true;
    }
    static async parseBufferView(gltf, bufferView) {
        if (bufferView.isReady) {
            return;
        }
        const buffer = gltf.buffers[bufferView.buffer];
        await GltfLoader.parseBuffer(gltf, buffer);
        bufferView.data = buffer.data;
        bufferView.isReady = true;
    }
    static async parseMaterial(gltf, material) {
        if (material.isReady) {
            return;
        }
        if (__classPrivateFieldGet(GltfLoader, _a, "f", _GltfLoader_shader) === undefined) {
            __classPrivateFieldSet(GltfLoader, _a, new _resources_shader__WEBPACK_IMPORTED_MODULE_6__.Shader((_pbr_v_glsl__WEBPACK_IMPORTED_MODULE_13___default()), (_pbr_f_glsl__WEBPACK_IMPORTED_MODULE_14___default())), "f", _GltfLoader_shader);
        }
        material.data = new _resources_material__WEBPACK_IMPORTED_MODULE_7__.Material(__classPrivateFieldGet(GltfLoader, _a, "f", _GltfLoader_shader));
        material.data.uniforms.c4_color.value.set(material.pbrMetallicRoughness.baseColorFactor ?? [1, 1, 1, 1]);
        material.data.uniforms.v1_metalness.value = material.pbrMetallicRoughness.metallicFactor ?? 0;
        material.data.uniforms.v1_roughness.value = material.pbrMetallicRoughness.roughnessFactor ?? 0.5;
        material.isReady = true;
    }
    static async parseBuffer(gltf, buffer) {
        if (buffer.isReady) {
            return;
        }
        const arrayBuffer = await _array_buffer_loader__WEBPACK_IMPORTED_MODULE_10__.ArrayBufferLoader.load(gltf.path + buffer.uri);
        buffer.data = arrayBuffer;
        buffer.isReady = true;
    }
}
_a = GltfLoader;
_GltfLoader_shader = { value: void 0 };


/***/ }),

/***/ "./src/loaders/image-loader.ts":
/*!*************************************!*\
  !*** ./src/loaders/image-loader.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageLoader": () => (/* binding */ ImageLoader)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader */ "./src/loader.ts");

class ImageLoader extends _loader__WEBPACK_IMPORTED_MODULE_0__.Loader {
    static async load(url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.onerror = (e) => {
                reject(e);
            };
            image.src = url;
        });
    }
}


/***/ }),

/***/ "./src/loaders/json-loader.ts":
/*!************************************!*\
  !*** ./src/loaders/json-loader.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonLoader": () => (/* binding */ JsonLoader)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader */ "./src/loader.ts");

class JsonLoader extends _loader__WEBPACK_IMPORTED_MODULE_0__.Loader {
    static async load(url) {
        return _loader__WEBPACK_IMPORTED_MODULE_0__.Loader.load(url, { responseType: 'json' });
    }
}


/***/ }),

/***/ "./src/loaders/text-loader.ts":
/*!************************************!*\
  !*** ./src/loaders/text-loader.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextLoader": () => (/* binding */ TextLoader)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader */ "./src/loader.ts");

class TextLoader extends _loader__WEBPACK_IMPORTED_MODULE_0__.Loader {
    static async load(url) {
        return _loader__WEBPACK_IMPORTED_MODULE_0__.Loader.load(url, { responseType: 'text' });
    }
}


/***/ }),

/***/ "./src/math/ivector2.ts":
/*!******************************!*\
  !*** ./src/math/ivector2.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IVector2": () => (/* binding */ IVector2)
/* harmony export */ });
const INIT_STATE = new Int32Array([0, 0]);
class IVector2 extends Int32Array {
    constructor(buffer = new ArrayBuffer(8), offset = 0) {
        super(buffer, offset, 2);
        this.set(INIT_STATE);
    }
    get x() { return this[0]; }
    set x(value) { this[0] = value; }
    get y() { return this[1]; }
    set y(value) { this[1] = value; }
}


/***/ }),

/***/ "./src/math/ivector3.ts":
/*!******************************!*\
  !*** ./src/math/ivector3.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IVector3": () => (/* binding */ IVector3)
/* harmony export */ });
const INIT_STATE = new Int32Array([0, 0, 0]);
class IVector3 extends Int32Array {
    constructor(buffer = new ArrayBuffer(12), offset = 0) {
        super(buffer, offset, 3);
        this.set(INIT_STATE);
    }
    get x() { return this[0]; }
    set x(value) { this[0] = value; }
    get y() { return this[1]; }
    set y(value) { this[1] = value; }
    get z() { return this[2]; }
    set z(value) { this[2] = value; }
}


/***/ }),

/***/ "./src/math/matrix3a.ts":
/*!******************************!*\
  !*** ./src/math/matrix3a.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Matrix3A": () => (/* binding */ Matrix3A)
/* harmony export */ });
const INIT_STATE = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]);
class Matrix3A extends Float32Array {
    constructor(buffer = new ArrayBuffer(48), offset = 0) {
        super(buffer, offset, 12);
        this.set(INIT_STATE);
    }
}


/***/ }),

/***/ "./src/math/matrix3h.ts":
/*!******************************!*\
  !*** ./src/math/matrix3h.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Matrix3H": () => (/* binding */ Matrix3H)
/* harmony export */ });
const INIT_STATE = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
class Matrix3H extends Float32Array {
    constructor(buffer = new ArrayBuffer(64), offset = 0) {
        super(buffer, offset, 16);
        this.set(INIT_STATE);
    }
    perspective(aspect, fov, zNear, zFar) {
        this.set(INIT_STATE);
        this[15] = 0;
        this[14] = -2 * zFar * zNear / (zFar - zNear);
        this[11] = -1;
        this[10] = (zFar + zNear) / (zNear - zFar);
        this[5] = 1 / Math.tan(fov * 0.5);
        this[0] = this[5] / aspect;
        return this;
    }
    orbit(polar, azimuthal, dist, target) {
        const cosa = Math.cos(azimuthal);
        const sina = Math.sin(azimuthal);
        const cosp = Math.cos(polar);
        const sinp = Math.sin(polar);
        this.set(INIT_STATE);
        this[0] = cosa;
        this[4] = 0;
        this[8] = sina;
        this[1] = sina * sinp;
        this[5] = cosp;
        this[9] = -cosa * sinp;
        this[2] = -sina * cosp;
        this[6] = sinp;
        this[10] = cosa * cosp;
        this[12] = -dist * (this[2] * this[0] + this[6] * this[4] + this[10] * this[8]);
        this[13] = -dist * (this[2] * this[1] + this[6] * this[5] + this[10] * this[9]);
        this[14] = -dist * (this[2] * this[2] + this[6] * this[6] + this[10] * this[10]);
        this[12] -= target[0] * this[0] + target[1] * this[4] + target[2] * this[8];
        this[13] -= target[0] * this[1] + target[1] * this[5] + target[2] * this[9];
        this[14] -= target[0] * this[2] + target[1] * this[6] + target[2] * this[10];
        return this;
    }
    setFromMatrix3H(mat) {
        this.set(mat);
        return this;
    }
    setFromQuaternion(quat) {
        const [x, y, z, w] = quat;
        const xx = 2 * x * x;
        const yy = 2 * y * y;
        const zz = 2 * z * z;
        const ww = 2 * w * w;
        const xy = 2 * x * y;
        const xz = 2 * x * z;
        const xw = 2 * x * w;
        const yz = 2 * y * z;
        const yw = 2 * y * w;
        const zw = 2 * z * w;
        const s = (xx + yy + zz + ww) * 0.5;
        this[0] = s - (yy + zz);
        this[1] = (xy + zw);
        this[2] = (xz - yw);
        this[3] = 0;
        this[4] = (xy - zw);
        this[5] = s - (xx + zz);
        this[6] = (yz + xw);
        this[7] = 0;
        this[8] = (xz + yw);
        this[9] = (yz - xw);
        this[10] = s - (xx + yy);
        this[11] = 0;
        this[12] = 0;
        this[13] = 0;
        this[14] = 0;
        this[15] = 1;
        return this;
    }
    fromTRS(position, orientation, scale) {
        this.setFromQuaternion(orientation);
        this[0] *= scale[0];
        this[1] *= scale[0];
        this[2] *= scale[0];
        this[4] *= scale[1];
        this[5] *= scale[1];
        this[6] *= scale[1];
        this[8] *= scale[2];
        this[9] *= scale[2];
        this[10] *= scale[2];
        this[12] = position[0];
        this[13] = position[1];
        this[14] = position[2];
        return this;
    }
    applyMatrix3H(matrix) {
        const [l00, l01, l02, l03, l10, l11, l12, l13, l20, l21, l22, l23, l30, l31, l32, l33] = matrix;
        const [r00, r01, r02, r03, r10, r11, r12, r13, r20, r21, r22, r23, r30, r31, r32, r33] = this;
        this[0] = l00 * r00 + l10 * r01 + l20 * r02 + l30 * r03;
        this[1] = l01 * r00 + l11 * r01 + l21 * r02 + l31 * r03;
        this[2] = l02 * r00 + l12 * r01 + l22 * r02 + l32 * r03;
        this[3] = l03 * r00 + l13 * r01 + l23 * r02 + l33 * r03;
        this[4] = l00 * r10 + l10 * r11 + l20 * r12 + l30 * r13;
        this[5] = l01 * r10 + l11 * r11 + l21 * r12 + l31 * r13;
        this[6] = l02 * r10 + l12 * r11 + l22 * r12 + l32 * r13;
        this[7] = l03 * r10 + l13 * r11 + l23 * r12 + l33 * r13;
        this[8] = l00 * r20 + l10 * r21 + l20 * r22 + l30 * r23;
        this[9] = l01 * r20 + l11 * r21 + l21 * r22 + l31 * r23;
        this[10] = l02 * r20 + l12 * r21 + l22 * r22 + l32 * r23;
        this[11] = l03 * r20 + l13 * r21 + l23 * r22 + l33 * r23;
        this[12] = l00 * r30 + l10 * r31 + l20 * r32 + l30 * r33;
        this[13] = l01 * r30 + l11 * r31 + l21 * r32 + l31 * r33;
        this[14] = l02 * r30 + l12 * r31 + l22 * r32 + l32 * r33;
        this[15] = l03 * r30 + l13 * r31 + l23 * r32 + l33 * r33;
        return this;
    }
}


/***/ }),

/***/ "./src/math/quaternion.ts":
/*!********************************!*\
  !*** ./src/math/quaternion.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Quaternion": () => (/* binding */ Quaternion)
/* harmony export */ });
const INIT_STATE = new Float32Array([0, 0, 0, 1]);
class Quaternion extends Float32Array {
    constructor(buffer = new ArrayBuffer(16), offset = 0) {
        super(buffer, offset, 4);
        this.set(INIT_STATE);
    }
    get x() { return this[0]; }
    set x(value) { this[0] = value; }
    get y() { return this[1]; }
    set y(value) { this[1] = value; }
    get z() { return this[2]; }
    set z(value) { this[2] = value; }
    get w() { return this[3]; }
    set w(value) { this[3] = value; }
    setFormQuaternion(quat) {
        this.set(quat);
        return this;
    }
    multiply(quat) {
        const [x, y, z, w] = this;
        this[0] = w * quat.x + x * quat.w + y * quat.z - z * quat.y;
        this[1] = w * quat.y - x * quat.z + y * quat.w + z * quat.x;
        this[2] = w * quat.z + x * quat.y - y * quat.x + z * quat.w;
        this[3] = w * quat.w - x * quat.x - y * quat.y - z * quat.z;
        return this;
    }
    premultiply(quat) {
        const [x, y, z, w] = this;
        this[0] = quat.w * x + quat.x * w + quat.y * z - quat.z * y;
        this[1] = quat.w * y - quat.x * z + quat.y * w + quat.z * x;
        this[2] = quat.w * z + quat.x * y - quat.y * x + quat.z * w;
        this[3] = quat.w * w - quat.x * x - quat.y * y - quat.z * z;
        return this;
    }
    fromAxisAngle(axis, angle) {
        const tmp = Math.sin(angle * 0.5);
        this.x = axis[0] * tmp;
        this.y = axis[1] * tmp;
        this.z = axis[2] * tmp;
        this.w = Math.cos(angle * 0.5);
        return this;
    }
}


/***/ }),

/***/ "./src/math/vector3.ts":
/*!*****************************!*\
  !*** ./src/math/vector3.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vector3": () => (/* binding */ Vector3)
/* harmony export */ });
const INIT_STATE = new Float32Array([0, 0, 0]);
class Vector3 extends Float32Array {
    constructor(buffer = new ArrayBuffer(12), offset = 0) {
        super(buffer, offset, 3);
        this.set(INIT_STATE);
    }
    get x() { return this[0]; }
    set x(value) { this[0] = value; }
    get y() { return this[1]; }
    set y(value) { this[1] = value; }
    get z() { return this[2]; }
    set z(value) { this[2] = value; }
    setFromElements(x, y, z) {
        this[0] = x;
        this[1] = y;
        this[2] = z;
        return this;
    }
    setFromVector3(vec) {
        this[0] = vec[0];
        this[1] = vec[1];
        this[2] = vec[2];
        return this;
    }
    addVector3(vec) {
        this[0] += vec[0];
        this[1] += vec[1];
        this[2] += vec[2];
        return this;
    }
    mulScalar(value) {
        this[0] *= value;
        this[1] *= value;
        this[2] *= value;
        return this;
    }
    applyMatrix3H(mat) {
        const [x, y, z] = this;
        this[0] = x * mat[0] + y * mat[4] + z * mat[8] + x * mat[12];
        this[1] = x * mat[1] + y * mat[5] + z * mat[9] + x * mat[13];
        this[2] = x * mat[2] + y * mat[6] + z * mat[10] + x * mat[14];
        return this;
    }
}


/***/ }),

/***/ "./src/math/vector4.ts":
/*!*****************************!*\
  !*** ./src/math/vector4.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vector4": () => (/* binding */ Vector4)
/* harmony export */ });
const INIT_STATE = new Float32Array([0, 0, 0, 0]);
class Vector4 extends Float32Array {
    constructor(buffer = new ArrayBuffer(16), offset = 0) {
        super(buffer, offset, 4);
        this.set(INIT_STATE);
    }
    get x() { return this[0]; }
    set x(value) { this[0] = value; }
    get y() { return this[1]; }
    set y(value) { this[1] = value; }
    get z() { return this[2]; }
    set z(value) { this[2] = value; }
    get w() { return this[3]; }
    set w(value) { this[3] = value; }
}


/***/ }),

/***/ "./src/resource-storage.ts":
/*!*********************************!*\
  !*** ./src/resource-storage.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResourceStorage": () => (/* binding */ ResourceStorage)
/* harmony export */ });
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ResourceStorage_nextId, _ResourceStorage_freeIds;
class ResourceStorage extends Map {
    constructor() {
        super(...arguments);
        _ResourceStorage_nextId.set(this, 1);
        _ResourceStorage_freeIds.set(this, []);
    }
    set() { throw new Error('Use add method.'); }
    add(res) {
        var _a, _b;
        const id = __classPrivateFieldGet(this, _ResourceStorage_freeIds, "f").pop() ?? (__classPrivateFieldSet(this, _ResourceStorage_nextId, (_b = __classPrivateFieldGet(this, _ResourceStorage_nextId, "f"), _a = _b++, _b), "f"), _a);
        super.set(id, res);
        return id;
    }
    delete(id) {
        __classPrivateFieldGet(this, _ResourceStorage_freeIds, "f").push(id);
        return super.delete(id);
    }
}
_ResourceStorage_nextId = new WeakMap(), _ResourceStorage_freeIds = new WeakMap();


/***/ }),

/***/ "./src/resource.ts":
/*!*************************!*\
  !*** ./src/resource.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resource": () => (/* binding */ Resource)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./src/core.ts");
/* harmony import */ var _resource_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resource-storage */ "./src/resource-storage.ts");
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Resource_useCount;


class Resource {
    constructor() {
        _Resource_useCount.set(this, 0);
        this.id = 0;
        this.label = null;
        const storageId = this.constructor.storageId;
        let storage = _core__WEBPACK_IMPORTED_MODULE_0__.Core.resources.get(storageId);
        if (storage === undefined) {
            storage = new _resource_storage__WEBPACK_IMPORTED_MODULE_1__.ResourceStorage();
            _core__WEBPACK_IMPORTED_MODULE_0__.Core.resources.set(storageId, storage);
        }
        this.id = storage.add(this);
    }
    destructor() { }
    retain() {
        var _a;
        __classPrivateFieldSet(this, _Resource_useCount, (_a = __classPrivateFieldGet(this, _Resource_useCount, "f"), _a++, _a), "f");
    }
    release() {
        var _a;
        __classPrivateFieldSet(this, _Resource_useCount, (_a = __classPrivateFieldGet(this, _Resource_useCount, "f"), _a--, _a), "f");
        if (__classPrivateFieldGet(this, _Resource_useCount, "f") <= 0) {
            const storageId = this.constructor.storageId;
            const storage = _core__WEBPACK_IMPORTED_MODULE_0__.Core.resources.get(storageId);
            if (storage === undefined) {
                return;
            }
            storage.delete(this.id);
            this.destructor();
        }
    }
}
_Resource_useCount = new WeakMap();
Resource.storageId = '';


/***/ }),

/***/ "./src/resources/attribute.ts":
/*!************************************!*\
  !*** ./src/resources/attribute.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AttributeFormat": () => (/* binding */ AttributeFormat),
/* harmony export */   "Attribute": () => (/* binding */ Attribute)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resource */ "./src/resource.ts");


var AttributeFormat;
(function (AttributeFormat) {
    AttributeFormat[AttributeFormat["U8x2"] = 0] = "U8x2";
    AttributeFormat[AttributeFormat["U8x4"] = 1] = "U8x4";
    AttributeFormat[AttributeFormat["S8x2"] = 2] = "S8x2";
    AttributeFormat[AttributeFormat["S8x4"] = 3] = "S8x4";
    AttributeFormat[AttributeFormat["UN8x2"] = 4] = "UN8x2";
    AttributeFormat[AttributeFormat["UN8x4"] = 5] = "UN8x4";
    AttributeFormat[AttributeFormat["SN8x2"] = 6] = "SN8x2";
    AttributeFormat[AttributeFormat["SN8x4"] = 7] = "SN8x4";
    AttributeFormat[AttributeFormat["U16x1"] = 8] = "U16x1";
    AttributeFormat[AttributeFormat["U32x1"] = 9] = "U32x1";
    AttributeFormat[AttributeFormat["F16x2"] = 10] = "F16x2";
    AttributeFormat[AttributeFormat["F16x4"] = 11] = "F16x4";
    AttributeFormat[AttributeFormat["F32x1"] = 12] = "F32x1";
    AttributeFormat[AttributeFormat["F32x2"] = 13] = "F32x2";
    AttributeFormat[AttributeFormat["F32x3"] = 14] = "F32x3";
    AttributeFormat[AttributeFormat["F32x4"] = 15] = "F32x4";
})(AttributeFormat || (AttributeFormat = {}));
class Attribute extends _resource__WEBPACK_IMPORTED_MODULE_1__.Resource {
    constructor(buffer, format, count, offset, stride) {
        super();
        buffer.retain();
        this.buffer = buffer;
        this.format = format;
        this.count = count;
        this.offset = offset ?? 0;
        this.stride = stride ?? 0;
    }
    destructor() {
        this.buffer.release();
    }
}
Attribute.storageId = 'attribute';
Attribute.testId = _core__WEBPACK_IMPORTED_MODULE_0__.Core.testId++;


/***/ }),

/***/ "./src/resources/buffer.ts":
/*!*********************************!*\
  !*** ./src/resources/buffer.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BufferUsage": () => (/* binding */ BufferUsage),
/* harmony export */   "Buffer": () => (/* binding */ Buffer)
/* harmony export */ });
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../resource */ "./src/resource.ts");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core */ "./src/core.ts");


var BufferUsage;
(function (BufferUsage) {
    BufferUsage[BufferUsage["INDEX"] = 0] = "INDEX";
    BufferUsage[BufferUsage["VERTEX"] = 1] = "VERTEX";
    BufferUsage[BufferUsage["UNIFORM"] = 2] = "UNIFORM";
})(BufferUsage || (BufferUsage = {}));
const usageMap = {
    [BufferUsage.INDEX]: 0x8893,
    [BufferUsage.VERTEX]: 0x8892,
    [BufferUsage.UNIFORM]: 0x8A11
};
class Buffer extends _resource__WEBPACK_IMPORTED_MODULE_0__.Resource {
    constructor(size, usage = BufferUsage.VERTEX) {
        super();
        const ctx = _core__WEBPACK_IMPORTED_MODULE_1__.Core.ctx;
        const buffer = ctx.createBuffer();
        if (buffer === null) {
            throw new Error('Fatal error.');
        }
        const target = usageMap[usage];
        ctx.bindBuffer(target, buffer);
        ctx.bufferData(target, size, ctx.STATIC_DRAW);
        ctx.bindBuffer(target, null);
        this.size = size;
        this.usage = usage;
        this.buffer = buffer;
    }
    destructor() {
        _core__WEBPACK_IMPORTED_MODULE_1__.Core.ctx.deleteBuffer(this.buffer);
    }
    bind() {
        _core__WEBPACK_IMPORTED_MODULE_1__.Core.ctx.bindBuffer(usageMap[this.usage], this.buffer);
    }
    subData(offset, data, dataOffset, dataLength) {
        const ctx = _core__WEBPACK_IMPORTED_MODULE_1__.Core.ctx;
        const target = usageMap[this.usage];
        ctx.bindBuffer(target, this.buffer);
        ctx.bufferSubData(target, offset, data, dataOffset ?? 0, dataLength ?? data.length);
        ctx.bindBuffer(target, null);
    }
}
Buffer.storageId = 'buffer';
Buffer.testId = _core__WEBPACK_IMPORTED_MODULE_1__.Core.testId++;


/***/ }),

/***/ "./src/resources/frame-request.ts":
/*!****************************************!*\
  !*** ./src/resources/frame-request.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FrameRequestClearMask": () => (/* binding */ FrameRequestClearMask),
/* harmony export */   "FrameRequest": () => (/* binding */ FrameRequest)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resource */ "./src/resource.ts");


var FrameRequestClearMask;
(function (FrameRequestClearMask) {
    FrameRequestClearMask[FrameRequestClearMask["NONE"] = 0] = "NONE";
    FrameRequestClearMask[FrameRequestClearMask["COLOR"] = 16384] = "COLOR";
    FrameRequestClearMask[FrameRequestClearMask["DEPTH"] = 1024] = "DEPTH";
    FrameRequestClearMask[FrameRequestClearMask["STENCIL"] = 256] = "STENCIL";
    FrameRequestClearMask[FrameRequestClearMask["COLOR_DEPTH"] = 17408] = "COLOR_DEPTH";
    FrameRequestClearMask[FrameRequestClearMask["COLOR_STENCIL"] = 16640] = "COLOR_STENCIL";
    FrameRequestClearMask[FrameRequestClearMask["DEPTH_STENCIL"] = 1280] = "DEPTH_STENCIL";
    FrameRequestClearMask[FrameRequestClearMask["ALL"] = 17664] = "ALL";
})(FrameRequestClearMask || (FrameRequestClearMask = {}));
class FrameRequest extends _resource__WEBPACK_IMPORTED_MODULE_1__.Resource {
    constructor(scene, look, renderTraget = null, systems = [..._core__WEBPACK_IMPORTED_MODULE_0__.Core.systems]) {
        super();
        this.events = {};
        this.culler = null;
        this.width = 1;
        this.height = 1;
        this.staticSize = false;
        this.clearColor = [0, 0, 0, 0];
        this.clearMask = FrameRequestClearMask.ALL;
        scene.retain();
        look.retain();
        this.renderTarget = renderTraget;
        this.systems = systems;
        this.scene = scene;
        this.look = look;
        for (const event of _core__WEBPACK_IMPORTED_MODULE_0__.Core.events) {
            this.events[event] = _core__WEBPACK_IMPORTED_MODULE_0__.Core.calcEventsList(event, systems);
        }
    }
    destructor() {
        this.scene.release();
        this.look.release();
    }
    draw() {
        const [r, g, b, a] = this.clearColor;
        if (this.culler !== null) {
            this.culler(this);
        }
        if (this.renderTarget !== null) {
            this.renderTarget.use();
        }
        else {
            _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.bindFramebuffer(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.FRAMEBUFFER, null);
        }
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.clearColor(r, g, b, a);
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.viewport(0, 0, this.width, this.height);
        if (this.clearMask !== FrameRequestClearMask.NONE) {
            _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.clear(this.clearMask);
        }
        this.look.use();
        this.scene.draw();
    }
}
FrameRequest.storageId = 'frame-request';


/***/ }),

/***/ "./src/resources/geometry.ts":
/*!***********************************!*\
  !*** ./src/resources/geometry.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeometryPrimitive": () => (/* binding */ GeometryPrimitive),
/* harmony export */   "attributeMap": () => (/* binding */ attributeMap),
/* harmony export */   "primitiveMap": () => (/* binding */ primitiveMap),
/* harmony export */   "Geometry": () => (/* binding */ Geometry)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _math_vector4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/vector4 */ "./src/math/vector4.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../resource */ "./src/resource.ts");
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attribute */ "./src/resources/attribute.ts");




var GeometryPrimitive;
(function (GeometryPrimitive) {
    GeometryPrimitive[GeometryPrimitive["POINT_LIST"] = 0] = "POINT_LIST";
    GeometryPrimitive[GeometryPrimitive["LINE_LIST"] = 1] = "LINE_LIST";
    GeometryPrimitive[GeometryPrimitive["LINE_STRIP"] = 2] = "LINE_STRIP";
    GeometryPrimitive[GeometryPrimitive["TRIANGLE_LIST"] = 3] = "TRIANGLE_LIST";
    GeometryPrimitive[GeometryPrimitive["TRIANGLE_STRIP"] = 4] = "TRIANGLE_STRIP";
})(GeometryPrimitive || (GeometryPrimitive = {}));
const attributeMap = {
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.U8x2]: { size: 2, type: 0x1401, normalized: false },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.U8x4]: { size: 4, type: 0x1401, normalized: false },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.S8x2]: { size: 2, type: 0x1400, normalized: false },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.S8x4]: { size: 4, type: 0x1400, normalized: false },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.UN8x2]: { size: 2, type: 0x1401, normalized: true },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.UN8x4]: { size: 4, type: 0x1401, normalized: true },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.SN8x2]: { size: 2, type: 0x1400, normalized: true },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.SN8x4]: { size: 4, type: 0x1400, normalized: true },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.U16x1]: { size: 1, type: 0x1403, normalized: false },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.U32x1]: { size: 1, type: 0x1405, normalized: false },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.F16x2]: { size: 2, type: 0x140B, normalized: false },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.F16x4]: { size: 4, type: 0x140B, normalized: false },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.F32x1]: { size: 1, type: 0x1406, normalized: false },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.F32x2]: { size: 2, type: 0x1406, normalized: false },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.F32x3]: { size: 3, type: 0x1406, normalized: false },
    [_attribute__WEBPACK_IMPORTED_MODULE_3__.AttributeFormat.F32x4]: { size: 4, type: 0x1406, normalized: false }
};
const primitiveMap = {
    [GeometryPrimitive.POINT_LIST]: 0x0000,
    [GeometryPrimitive.LINE_LIST]: 0x0001,
    [GeometryPrimitive.LINE_STRIP]: 0x0003,
    [GeometryPrimitive.TRIANGLE_LIST]: 0x0004,
    [GeometryPrimitive.TRIANGLE_STRIP]: 0x0005
};
class Geometry extends _resource__WEBPACK_IMPORTED_MODULE_2__.Resource {
    constructor(primitive = GeometryPrimitive.TRIANGLE_LIST) {
        super();
        this.attributes = new Map();
        this.indices = null;
        this.bs = new _math_vector4__WEBPACK_IMPORTED_MODULE_1__.Vector4();
        this.primitive = primitive;
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        const vao = ctx.createVertexArray();
        if (vao === null) {
            throw new Error('Fatal error.');
        }
        this.vao = vao;
    }
    destructor() {
        this.indices?.release();
        for (const attribute of this.attributes.values()) {
            attribute.release();
        }
        this.attributes.clear();
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.deleteVertexArray(this.vao);
    }
    setAttribute(location, attribute) {
        this.attributes.get(location)?.release();
        attribute?.retain();
        if (attribute !== null) {
            this.attributes.set(location, attribute);
        }
        else {
            this.attributes.delete(location);
        }
    }
    setIndices(indices) {
        this.indices?.release();
        indices?.retain();
        this.indices = indices;
    }
    initVao() {
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        ctx.bindVertexArray(this.vao);
        for (const [location, attribute] of this.attributes) {
            attribute.buffer.bind();
            const attrMapElement = attributeMap[attribute.format];
            ctx.enableVertexAttribArray(location);
            ctx.vertexAttribPointer(location, attrMapElement.size, attrMapElement.type, attrMapElement.normalized, attribute.stride, attribute.offset);
        }
        this.indices?.buffer.bind();
        ctx.bindVertexArray(null);
    }
    draw() {
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        const { primitive, indices, attributes } = this;
        ctx.bindVertexArray(this.vao);
        if (indices !== null) {
            ctx.drawElements(primitiveMap[primitive], indices.count, attributeMap[indices.format].type, 0);
        }
        else {
            const positions = attributes.get(0);
            if (positions !== undefined) {
                ctx.drawArrays(primitiveMap[primitive], 0, positions.count);
            }
        }
        ctx.bindVertexArray(null);
    }
}
Geometry.storageId = 'geometry';
Geometry.testId = _core__WEBPACK_IMPORTED_MODULE_0__.Core.testId++;


/***/ }),

/***/ "./src/resources/look.ts":
/*!*******************************!*\
  !*** ./src/resources/look.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Look": () => (/* binding */ Look)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _math_matrix3h__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/matrix3h */ "./src/math/matrix3h.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../resource */ "./src/resource.ts");
/* harmony import */ var _buffer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./buffer */ "./src/resources/buffer.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Look_bufferStorage;




class Look extends _resource__WEBPACK_IMPORTED_MODULE_2__.Resource {
    constructor() {
        super();
        _Look_bufferStorage.set(this, void 0);
        this.aspect = 1;
        __classPrivateFieldSet(this, _Look_bufferStorage, new Float32Array(32), "f");
        this.buffer = new _buffer__WEBPACK_IMPORTED_MODULE_3__.Buffer(__classPrivateFieldGet(this, _Look_bufferStorage, "f").byteLength, _buffer__WEBPACK_IMPORTED_MODULE_3__.BufferUsage.UNIFORM);
        this.buffer.retain();
        this.perspectiveMatrix = new _math_matrix3h__WEBPACK_IMPORTED_MODULE_1__.Matrix3H(__classPrivateFieldGet(this, _Look_bufferStorage, "f").buffer);
        this.viewMatrix = new _math_matrix3h__WEBPACK_IMPORTED_MODULE_1__.Matrix3H(__classPrivateFieldGet(this, _Look_bufferStorage, "f").buffer, 64);
        this.buffer.subData(0, __classPrivateFieldGet(this, _Look_bufferStorage, "f"));
    }
    destructor() {
        this.buffer.release();
    }
    use() {
        this.buffer.subData(0, __classPrivateFieldGet(this, _Look_bufferStorage, "f"));
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.bindBufferBase(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.UNIFORM_BUFFER, 0, this.buffer.buffer);
    }
}
_Look_bufferStorage = new WeakMap();
Look.storageId = 'look';


/***/ }),

/***/ "./src/resources/material.ts":
/*!***********************************!*\
  !*** ./src/resources/material.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setUniformSR": () => (/* binding */ setUniformSR),
/* harmony export */   "setUniformM3H": () => (/* binding */ setUniformM3H),
/* harmony export */   "Material": () => (/* binding */ Material)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _math_ivector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/ivector3 */ "./src/math/ivector3.ts");
/* harmony import */ var _math_matrix3h__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/matrix3h */ "./src/math/matrix3h.ts");
/* harmony import */ var _math_vector3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/vector3 */ "./src/math/vector3.ts");
/* harmony import */ var _math_vector4__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math/vector4 */ "./src/math/vector4.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../resource */ "./src/resource.ts");
/* harmony import */ var _sampler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sampler */ "./src/resources/sampler.ts");
/* harmony import */ var _texture__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./texture */ "./src/resources/texture.ts");








function setUniformSR(location, value) {
    _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.uniform1i(location, value[0]);
    if (value[1] !== 0) {
        const texture = _core__WEBPACK_IMPORTED_MODULE_0__.Core.getResource(_texture__WEBPACK_IMPORTED_MODULE_7__.Texture.storageId, value[1]);
        texture.use(value[0]);
    }
    if (value[2] !== 0) {
        const sampler = _core__WEBPACK_IMPORTED_MODULE_0__.Core.getResource(_sampler__WEBPACK_IMPORTED_MODULE_6__.Sampler.storageId, value[2]);
        sampler.use(value[0]);
    }
}
function setUniformV1(location, value) { _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.uniform1f(location, value); }
function setUniformV3(location, value) { _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.uniform3fv(location, value); }
function setUniformV4(location, value) { _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.uniform4fv(location, value); }
function setUniformM3H(location, value) { _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.uniformMatrix4fv(location, false, value); }
const uniformsMap = {
    sr_: { UnClass: _math_ivector3__WEBPACK_IMPORTED_MODULE_1__.IVector3, method: setUniformSR },
    c3_: { UnClass: _math_vector3__WEBPACK_IMPORTED_MODULE_3__.Vector3, method: setUniformV3 },
    c4_: { UnClass: _math_vector4__WEBPACK_IMPORTED_MODULE_4__.Vector4, method: setUniformV4 },
    v1_: { UnClass: Number, method: setUniformV1 },
    v3_: { UnClass: _math_vector3__WEBPACK_IMPORTED_MODULE_3__.Vector3, method: setUniformV3 },
    m4_: { UnClass: _math_matrix3h__WEBPACK_IMPORTED_MODULE_2__.Matrix3H, method: setUniformM3H }
};
class Material extends _resource__WEBPACK_IMPORTED_MODULE_5__.Resource {
    constructor(shader) {
        super();
        this.uniforms = {};
        this.depthTest = true;
        this.depthWrite = true;
        shader.retain();
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        this.depthFunc = ctx.LESS;
        const numUniforms = ctx.getProgramParameter(shader.program, ctx.ACTIVE_UNIFORMS);
        for (let i = 0; i < numUniforms; ++i) {
            const info = ctx.getActiveUniform(shader.program, i);
            if (info !== null && info.name.startsWith('tn_') === false) {
                const uniformType = info.name.slice(0, 3);
                this.uniforms[info.name] = { location: ctx.getUniformLocation(shader.program, info.name), type: uniformType, value: new uniformsMap[uniformType].UnClass() };
            }
        }
        this.shader = shader;
    }
    destructor() {
        this.shader.release();
    }
    use() {
        this.shader.use();
        if (this.depthTest) {
            _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.enable(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.DEPTH_TEST);
        }
        else {
            _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.disable(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.DEPTH_TEST);
        }
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.depthMask(this.depthWrite);
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.depthFunc(this.depthFunc);
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.enable(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.CULL_FACE);
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.cullFace(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.BACK);
        for (const [, uniform] of Object.entries(this.uniforms)) {
            uniformsMap[uniform.type].method(uniform.location, uniform.value);
        }
    }
}
Material.storageId = 'material';


/***/ }),

/***/ "./src/resources/render-target.ts":
/*!****************************************!*\
  !*** ./src/resources/render-target.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderTargetAttachment": () => (/* binding */ RenderTargetAttachment),
/* harmony export */   "RenderTarget": () => (/* binding */ RenderTarget)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resource */ "./src/resource.ts");
/* harmony import */ var _texture__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./texture */ "./src/resources/texture.ts");
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RenderTarget_attachments;



var RenderTargetAttachment;
(function (RenderTargetAttachment) {
    RenderTargetAttachment[RenderTargetAttachment["COLOR_0"] = 0] = "COLOR_0";
    RenderTargetAttachment[RenderTargetAttachment["COLOR_1"] = 1] = "COLOR_1";
    RenderTargetAttachment[RenderTargetAttachment["COLOR_2"] = 2] = "COLOR_2";
    RenderTargetAttachment[RenderTargetAttachment["COLOR_3"] = 3] = "COLOR_3";
    RenderTargetAttachment[RenderTargetAttachment["COLOR_4"] = 4] = "COLOR_4";
    RenderTargetAttachment[RenderTargetAttachment["COLOR_5"] = 5] = "COLOR_5";
    RenderTargetAttachment[RenderTargetAttachment["COLOR_6"] = 6] = "COLOR_6";
    RenderTargetAttachment[RenderTargetAttachment["COLOR_7"] = 7] = "COLOR_7";
    RenderTargetAttachment[RenderTargetAttachment["DEPTH"] = 8] = "DEPTH";
})(RenderTargetAttachment || (RenderTargetAttachment = {}));
const attachmentMap = {
    [RenderTargetAttachment.COLOR_0]: 0x8CE0,
    [RenderTargetAttachment.COLOR_1]: 0x8CE1,
    [RenderTargetAttachment.COLOR_2]: 0x8CE2,
    [RenderTargetAttachment.COLOR_3]: 0x8CE3,
    [RenderTargetAttachment.COLOR_4]: 0x8CE4,
    [RenderTargetAttachment.COLOR_5]: 0x8CE5,
    [RenderTargetAttachment.COLOR_6]: 0x8CE6,
    [RenderTargetAttachment.COLOR_7]: 0x8CE7,
    [RenderTargetAttachment.DEPTH]: 0x8D00
};
class RenderTarget extends _resource__WEBPACK_IMPORTED_MODULE_1__.Resource {
    constructor(width, height) {
        super();
        _RenderTarget_attachments.set(this, new Map());
        this.width = width;
        this.height = height;
        const framebuffer = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.createFramebuffer();
        if (framebuffer === null) {
            throw new Error('Fatal error.');
        }
        this.framebuffer = framebuffer;
    }
    destructor() {
        for (const texture of __classPrivateFieldGet(this, _RenderTarget_attachments, "f").values()) {
            texture.release();
        }
    }
    use() {
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.bindFramebuffer(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.FRAMEBUFFER, this.framebuffer);
    }
    resize(width, height) {
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        this.width = width;
        this.height = height;
        ctx.bindFramebuffer(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.FRAMEBUFFER, this.framebuffer);
        for (const [target, texture] of __classPrivateFieldGet(this, _RenderTarget_attachments, "f")) {
            texture.resize(width, height);
            ctx.framebufferTexture2D(ctx.FRAMEBUFFER, attachmentMap[target], ctx.TEXTURE_2D, texture.texture, 0);
        }
        ctx.bindFramebuffer(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.FRAMEBUFFER, null);
    }
    createAttchment(target, textureFormat) {
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        const texture = new _texture__WEBPACK_IMPORTED_MODULE_2__.Texture(_texture__WEBPACK_IMPORTED_MODULE_2__.TextureType.T2D, textureFormat, 1, this.width, this.height);
        texture.retain();
        __classPrivateFieldGet(this, _RenderTarget_attachments, "f").get(target)?.release();
        ctx.bindFramebuffer(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.FRAMEBUFFER, this.framebuffer);
        ctx.framebufferTexture2D(ctx.FRAMEBUFFER, attachmentMap[target], ctx.TEXTURE_2D, texture.texture, 0);
        ctx.bindFramebuffer(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.FRAMEBUFFER, null);
        __classPrivateFieldGet(this, _RenderTarget_attachments, "f").set(target, texture);
    }
    setAttachment(target, texture) {
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        texture?.retain();
        __classPrivateFieldGet(this, _RenderTarget_attachments, "f").get(target)?.release();
        ctx.bindFramebuffer(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.FRAMEBUFFER, this.framebuffer);
        ctx.framebufferTexture2D(ctx.FRAMEBUFFER, attachmentMap[target], ctx.TEXTURE_2D, texture ? texture.texture : null, 0);
        ctx.bindFramebuffer(_core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.FRAMEBUFFER, null);
        if (texture !== null) {
            __classPrivateFieldGet(this, _RenderTarget_attachments, "f").set(target, texture);
        }
    }
    getAttachment(target) {
        return __classPrivateFieldGet(this, _RenderTarget_attachments, "f").get(target) ?? null;
    }
}
_RenderTarget_attachments = new WeakMap();
RenderTarget.storageId = 'renderTarget';


/***/ }),

/***/ "./src/resources/sampler.ts":
/*!**********************************!*\
  !*** ./src/resources/sampler.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sampler": () => (/* binding */ Sampler)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resource */ "./src/resource.ts");


class Sampler extends _resource__WEBPACK_IMPORTED_MODULE_1__.Resource {
    constructor() {
        super();
        const sampler = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.createSampler();
        if (sampler === null) {
            throw new Error('Fatal error.');
        }
        this.sampler = sampler;
    }
    destructor() {
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.deleteSampler(this.sampler);
    }
    use(layer) {
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.bindSampler(layer, this.sampler);
    }
    setState(state, value) {
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.samplerParameteri(this.sampler, state, value);
    }
}
Sampler.storageId = 'sampler';


/***/ }),

/***/ "./src/resources/scene.ts":
/*!********************************!*\
  !*** ./src/resources/scene.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderableState": () => (/* binding */ RenderableState),
/* harmony export */   "Scene": () => (/* binding */ Scene)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _math_matrix3h__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/matrix3h */ "./src/math/matrix3h.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../resource */ "./src/resource.ts");
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./geometry */ "./src/resources/geometry.ts");
/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./material */ "./src/resources/material.ts");
/* harmony import */ var _buffer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./buffer */ "./src/resources/buffer.ts");
/* harmony import */ var _texture__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./texture */ "./src/resources/texture.ts");
/* harmony import */ var _math_ivector3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../math/ivector3 */ "./src/math/ivector3.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Batch_instances, _Batch_vao, _Batch_initVao, _Scene_instances, _a, _Scene_ivec, _Scene_queue, _Scene_batches, _Scene_batchesBigint, _Scene_instanceBuffer, _Scene_instanceTexture, _Scene_bsData, _Scene_renderables, _Scene_renderablesData, _Scene_renderablesIndices, _Scene_freeRenderableId, _Scene_needsUpdateInstanceBuffer, _Scene_updateInstanceBuffer;








var RenderableState;
(function (RenderableState) {
    RenderableState[RenderableState["VISIBLE"] = 1] = "VISIBLE";
    RenderableState[RenderableState["CULLING"] = 2] = "CULLING";
    RenderableState[RenderableState["CULLING_VISIBLE"] = 4] = "CULLING_VISIBLE";
    RenderableState[RenderableState["EXIST"] = 2147483648] = "EXIST";
})(RenderableState || (RenderableState = {}));
class Batch extends _resource__WEBPACK_IMPORTED_MODULE_2__.Resource {
    constructor(geometry, material, buffer) {
        super();
        _Batch_instances.add(this);
        _Batch_vao.set(this, void 0);
        this.offset = 0;
        this.count = 0;
        this.renderables = new Set();
        this.buffer = buffer;
        this.geometry = geometry;
        this.material = material;
        geometry.retain();
        material.retain();
        const vao = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.createVertexArray();
        if (vao === null) {
            throw new Error('Fatal error.');
        }
        __classPrivateFieldSet(this, _Batch_vao, vao, "f");
        __classPrivateFieldGet(this, _Batch_instances, "m", _Batch_initVao).call(this);
    }
    destructor() {
        this.geometry.release();
        this.material.release();
        this.renderables.clear();
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.deleteVertexArray(__classPrivateFieldGet(this, _Batch_vao, "f"));
    }
    draw(needsUpdateVAO) {
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        const { primitive, indices, attributes } = this.geometry;
        ctx.bindVertexArray(__classPrivateFieldGet(this, _Batch_vao, "f"));
        if (needsUpdateVAO) {
            this.buffer.bind();
            ctx.vertexAttribIPointer(15, 1, _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.INT, 4, this.offset * 4);
        }
        if (indices !== null) {
            ctx.drawElementsInstanced(_geometry__WEBPACK_IMPORTED_MODULE_3__.primitiveMap[primitive], indices.count, _geometry__WEBPACK_IMPORTED_MODULE_3__.attributeMap[indices.format].type, 0, this.count);
        }
        else {
            const positions = attributes.get(0);
            if (positions !== undefined) {
                ctx.drawArraysInstanced(_geometry__WEBPACK_IMPORTED_MODULE_3__.primitiveMap[primitive], 0, positions.count, this.count);
            }
        }
        ctx.bindVertexArray(null);
    }
}
_Batch_vao = new WeakMap(), _Batch_instances = new WeakSet(), _Batch_initVao = function _Batch_initVao() {
    const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
    ctx.bindVertexArray(__classPrivateFieldGet(this, _Batch_vao, "f"));
    for (const [location, attribute] of this.geometry.attributes) {
        attribute.buffer.bind();
        const attrMapElement = _geometry__WEBPACK_IMPORTED_MODULE_3__.attributeMap[attribute.format];
        ctx.enableVertexAttribArray(location);
        ctx.vertexAttribPointer(location, attrMapElement.size, attrMapElement.type, attrMapElement.normalized, attribute.stride, attribute.offset);
    }
    ctx.enableVertexAttribArray(15);
    ctx.vertexAttribDivisor(15, 1);
    this.geometry.indices?.buffer.bind();
    ctx.bindVertexArray(null);
};
Batch.storageId = 'batch';
class Scene extends _resource__WEBPACK_IMPORTED_MODULE_2__.Resource {
    constructor(maxRenderableCount = 262144) {
        super();
        _Scene_instances.add(this);
        _Scene_queue.set(this, []);
        _Scene_batches.set(this, new Map());
        _Scene_batchesBigint.set(this, new Map());
        _Scene_instanceBuffer.set(this, void 0);
        _Scene_instanceTexture.set(this, void 0);
        _Scene_bsData.set(this, void 0);
        _Scene_renderables.set(this, void 0);
        _Scene_renderablesData.set(this, void 0);
        _Scene_renderablesIndices.set(this, void 0);
        _Scene_freeRenderableId.set(this, 0);
        _Scene_needsUpdateInstanceBuffer.set(this, false);
        this.entities = [];
        this.components = {};
        this.maxRenderableCount = maxRenderableCount;
        __classPrivateFieldSet(this, _Scene_renderables, new Uint32Array(maxRenderableCount), "f");
        __classPrivateFieldSet(this, _Scene_renderablesData, new Float32Array(maxRenderableCount * 16), "f");
        __classPrivateFieldSet(this, _Scene_renderablesIndices, new Uint32Array(maxRenderableCount), "f");
        __classPrivateFieldSet(this, _Scene_instanceBuffer, new _buffer__WEBPACK_IMPORTED_MODULE_5__.Buffer(maxRenderableCount * 4), "f");
        __classPrivateFieldSet(this, _Scene_instanceTexture, new _texture__WEBPACK_IMPORTED_MODULE_6__.Texture(_texture__WEBPACK_IMPORTED_MODULE_6__.TextureType.T2D, _texture__WEBPACK_IMPORTED_MODULE_6__.TextureFormat.RGBA32F, 1, 1024, 1024), "f");
        __classPrivateFieldSet(this, _Scene_bsData, new Float32Array(maxRenderableCount * 4), "f");
        for (let it = 0; it < maxRenderableCount; it++) {
            __classPrivateFieldGet(this, _Scene_renderables, "f")[it] = (it + 1) % maxRenderableCount;
        }
    }
    destructor() { }
    get instanceTexture() {
        return __classPrivateFieldGet(this, _Scene_instanceTexture, "f");
    }
    get renderablesData() {
        return __classPrivateFieldGet(this, _Scene_renderablesData, "f");
    }
    get bsData() {
        return __classPrivateFieldGet(this, _Scene_bsData, "f");
    }
    get renderables() {
        return __classPrivateFieldGet(this, _Scene_renderables, "f");
    }
    addRenderable(geometry, material) {
        const id = __classPrivateFieldGet(this, _Scene_freeRenderableId, "f");
        __classPrivateFieldSet(this, _Scene_freeRenderableId, __classPrivateFieldGet(this, _Scene_renderables, "f")[id], "f");
        __classPrivateFieldGet(this, _Scene_renderables, "f")[id] = RenderableState.EXIST | RenderableState.VISIBLE | RenderableState.CULLING | RenderableState.CULLING_VISIBLE;
        const batchId = BigInt(geometry.id) << 32n | BigInt(material.id);
        let batch = __classPrivateFieldGet(this, _Scene_batchesBigint, "f").get(batchId);
        if (batch === undefined) {
            batch = new Batch(geometry, material, __classPrivateFieldGet(this, _Scene_instanceBuffer, "f"));
            __classPrivateFieldGet(this, _Scene_batches, "f").set(batch.id, batch);
            __classPrivateFieldGet(this, _Scene_batchesBigint, "f").set(batchId, batch);
        }
        const renderable = {
            id,
            geometry,
            material,
            matrix: new _math_matrix3h__WEBPACK_IMPORTED_MODULE_1__.Matrix3H()
        };
        __classPrivateFieldSet(this, _Scene_needsUpdateInstanceBuffer, true, "f");
        batch.renderables.add(renderable);
        return renderable;
    }
    setRenderableVisibility(id, visibility) {
        if (visibility) {
            __classPrivateFieldGet(this, _Scene_renderables, "f")[id] |= RenderableState.VISIBLE;
        }
        else {
            __classPrivateFieldGet(this, _Scene_renderables, "f")[id] &= ~RenderableState.VISIBLE;
        }
        __classPrivateFieldSet(this, _Scene_needsUpdateInstanceBuffer, true, "f");
    }
    setRenderableStateBit(id, mask, value) {
        if (value) {
            __classPrivateFieldGet(this, _Scene_renderables, "f")[id] |= mask;
        }
        else {
            __classPrivateFieldGet(this, _Scene_renderables, "f")[id] &= ~mask;
        }
        __classPrivateFieldSet(this, _Scene_needsUpdateInstanceBuffer, true, "f");
    }
    addEntity(parent) {
        const entity = {
            depth: parent?.depth ?? -1 + 1,
            parent,
            children: [],
            components: {}
        };
        this.entities.push(entity);
        this.entities.sort((a, b) => a.depth - b.depth);
        return entity;
    }
    addComponent(component) {
        const storageId = component.constructor.storageId;
        const entity = component.owner;
        if (this.components[storageId] === undefined) {
            this.components[storageId] = new Set();
        }
        this.components[storageId].add(component);
        if (entity.components[storageId] === undefined) {
            entity.components[storageId] = [];
        }
        entity.components[storageId].push(component);
    }
    getComponents(CompClass) {
        const components = this.components[CompClass.storageId];
        return components ?? new Set();
    }
    getEntityComponents(entity, CompClass) {
        const components = entity.components[CompClass.storageId];
        return components ?? [];
    }
    draw() {
        let currentMaterialId = 0;
        const needsUpdateVAO = __classPrivateFieldGet(this, _Scene_needsUpdateInstanceBuffer, "f");
        __classPrivateFieldGet(this, _Scene_instances, "m", _Scene_updateInstanceBuffer).call(this);
        let ind = 0;
        for (const batch of __classPrivateFieldGet(this, _Scene_queue, "f")) {
            if (currentMaterialId !== batch.material.id) {
                currentMaterialId = batch.material.id;
                batch.material.use();
                if (batch.material.uniforms.sr_instances !== undefined) {
                    __classPrivateFieldGet(Scene, _a, "f", _Scene_ivec)[0] = 15;
                    __classPrivateFieldGet(Scene, _a, "f", _Scene_ivec)[1] = __classPrivateFieldGet(this, _Scene_instanceTexture, "f").id;
                    __classPrivateFieldGet(Scene, _a, "f", _Scene_ivec)[2] = 1;
                    (0,_material__WEBPACK_IMPORTED_MODULE_4__.setUniformSR)(batch.material.uniforms.sr_instances.location, __classPrivateFieldGet(Scene, _a, "f", _Scene_ivec));
                }
            }
            batch.draw(needsUpdateVAO);
            if (ind >= 64) {
                ind = 0;
                _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.flush();
            }
        }
    }
}
_a = Scene, _Scene_queue = new WeakMap(), _Scene_batches = new WeakMap(), _Scene_batchesBigint = new WeakMap(), _Scene_instanceBuffer = new WeakMap(), _Scene_instanceTexture = new WeakMap(), _Scene_bsData = new WeakMap(), _Scene_renderables = new WeakMap(), _Scene_renderablesData = new WeakMap(), _Scene_renderablesIndices = new WeakMap(), _Scene_freeRenderableId = new WeakMap(), _Scene_needsUpdateInstanceBuffer = new WeakMap(), _Scene_instances = new WeakSet(), _Scene_updateInstanceBuffer = function _Scene_updateInstanceBuffer() {
    if (__classPrivateFieldGet(this, _Scene_needsUpdateInstanceBuffer, "f") === false) {
        return;
    }
    __classPrivateFieldSet(this, _Scene_needsUpdateInstanceBuffer, false, "f");
    let offset = 0;
    __classPrivateFieldGet(this, _Scene_queue, "f").length = 0;
    for (const batch of __classPrivateFieldGet(this, _Scene_batches, "f").values()) {
        batch.count = 0;
        batch.offset = offset;
        for (const renderable of batch.renderables) {
            if ((__classPrivateFieldGet(this, _Scene_renderables, "f")[renderable.id] & RenderableState.VISIBLE) === 0
                || (__classPrivateFieldGet(this, _Scene_renderables, "f")[renderable.id] & RenderableState.CULLING_VISIBLE) === 0) {
                continue;
            }
            __classPrivateFieldGet(this, _Scene_renderablesIndices, "f")[offset] = renderable.id;
            batch.count++;
            offset++;
        }
        if (batch.count !== 0) {
            __classPrivateFieldGet(this, _Scene_queue, "f").push(batch);
        }
    }
    __classPrivateFieldGet(this, _Scene_queue, "f").sort((a, b) => {
        return a.material.id - b.material.id;
    });
    __classPrivateFieldGet(this, _Scene_instanceBuffer, "f").subData(0, __classPrivateFieldGet(this, _Scene_renderablesIndices, "f"));
};
Scene.storageId = 'scene';
_Scene_ivec = { value: new _math_ivector3__WEBPACK_IMPORTED_MODULE_7__.IVector3() };


/***/ }),

/***/ "./src/resources/shader.ts":
/*!*********************************!*\
  !*** ./src/resources/shader.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shader": () => (/* binding */ Shader)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resource */ "./src/resource.ts");


class Shader extends _resource__WEBPACK_IMPORTED_MODULE_1__.Resource {
    constructor(vShaderCode, fShaderCode) {
        super();
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        const program = ctx.createProgram();
        if (program === null) {
            throw new Error('Fatal error.');
        }
        const vShader = ctx.createShader(ctx.VERTEX_SHADER);
        const fShader = ctx.createShader(ctx.FRAGMENT_SHADER);
        if (vShader === null || fShader === null) {
            throw new Error('Fatal error.');
        }
        ctx.shaderSource(vShader, vShaderCode);
        ctx.shaderSource(fShader, fShaderCode);
        ctx.compileShader(vShader);
        ctx.compileShader(fShader);
        if (ctx.getShaderParameter(vShader, ctx.COMPILE_STATUS) === false || ctx.getShaderParameter(fShader, ctx.COMPILE_STATUS) === false) {
            console.info(ctx.getShaderInfoLog(vShader), this.id);
            console.info(ctx.getShaderInfoLog(fShader));
            throw new Error('Shader error.');
        }
        ctx.attachShader(program, vShader);
        ctx.attachShader(program, fShader);
        ctx.linkProgram(program);
        if (ctx.getProgramParameter(program, ctx.LINK_STATUS) === false) {
            throw new Error('Shader program link status:' + ctx.getProgramInfoLog(program));
        }
        ctx.deleteShader(vShader);
        ctx.deleteShader(fShader);
        const index = ctx.getUniformBlockIndex(program, 'tn_camera');
        if (index !== ctx.INVALID_INDEX) {
            ctx.uniformBlockBinding(program, index, 0);
        }
        this.program = program;
    }
    destructor() {
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.deleteProgram(this.program);
    }
    use() {
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.useProgram(this.program);
    }
}
Shader.storageId = 'shader';


/***/ }),

/***/ "./src/resources/texture.ts":
/*!**********************************!*\
  !*** ./src/resources/texture.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextureType": () => (/* binding */ TextureType),
/* harmony export */   "TextureFormat": () => (/* binding */ TextureFormat),
/* harmony export */   "TextureData": () => (/* binding */ TextureData),
/* harmony export */   "Texture": () => (/* binding */ Texture)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resource */ "./src/resource.ts");


var TextureType;
(function (TextureType) {
    TextureType[TextureType["T2D"] = 0] = "T2D";
    TextureType[TextureType["T2D_ARRAY"] = 1] = "T2D_ARRAY";
    TextureType[TextureType["CUBE"] = 2] = "CUBE";
    TextureType[TextureType["T3D"] = 3] = "T3D";
})(TextureType || (TextureType = {}));
var TextureFormat;
(function (TextureFormat) {
    TextureFormat[TextureFormat["R8U"] = 0] = "R8U";
    TextureFormat[TextureFormat["R8S"] = 1] = "R8S";
    TextureFormat[TextureFormat["R8UN"] = 2] = "R8UN";
    TextureFormat[TextureFormat["R8SN"] = 3] = "R8SN";
    TextureFormat[TextureFormat["R16U"] = 4] = "R16U";
    TextureFormat[TextureFormat["R16S"] = 5] = "R16S";
    TextureFormat[TextureFormat["R16F"] = 6] = "R16F";
    TextureFormat[TextureFormat["RG8U"] = 7] = "RG8U";
    TextureFormat[TextureFormat["RG8S"] = 8] = "RG8S";
    TextureFormat[TextureFormat["RG8UN"] = 9] = "RG8UN";
    TextureFormat[TextureFormat["RG8SN"] = 10] = "RG8SN";
    TextureFormat[TextureFormat["R32U"] = 11] = "R32U";
    TextureFormat[TextureFormat["R32S"] = 12] = "R32S";
    TextureFormat[TextureFormat["R32F"] = 13] = "R32F";
    TextureFormat[TextureFormat["RG16U"] = 14] = "RG16U";
    TextureFormat[TextureFormat["RG16S"] = 15] = "RG16S";
    TextureFormat[TextureFormat["RG16F"] = 16] = "RG16F";
    TextureFormat[TextureFormat["RGBA8U"] = 17] = "RGBA8U";
    TextureFormat[TextureFormat["RGBA8S"] = 18] = "RGBA8S";
    TextureFormat[TextureFormat["RGBA8UN"] = 19] = "RGBA8UN";
    TextureFormat[TextureFormat["SRGBA8UN"] = 20] = "SRGBA8UN";
    TextureFormat[TextureFormat["RGBA8SN"] = 21] = "RGBA8SN";
    TextureFormat[TextureFormat["RG32U"] = 22] = "RG32U";
    TextureFormat[TextureFormat["RG32S"] = 23] = "RG32S";
    TextureFormat[TextureFormat["RG32F"] = 24] = "RG32F";
    TextureFormat[TextureFormat["RGBA16U"] = 25] = "RGBA16U";
    TextureFormat[TextureFormat["RGBA16S"] = 26] = "RGBA16S";
    TextureFormat[TextureFormat["RGBA16F"] = 27] = "RGBA16F";
    TextureFormat[TextureFormat["RGBA32U"] = 28] = "RGBA32U";
    TextureFormat[TextureFormat["RGBA32S"] = 29] = "RGBA32S";
    TextureFormat[TextureFormat["RGBA32F"] = 30] = "RGBA32F";
    TextureFormat[TextureFormat["D16UN"] = 31] = "D16UN";
    TextureFormat[TextureFormat["D24P"] = 32] = "D24P";
    TextureFormat[TextureFormat["D24PS8"] = 33] = "D24PS8";
    TextureFormat[TextureFormat["D32F"] = 34] = "D32F";
})(TextureFormat || (TextureFormat = {}));
const textureTypeMap = {
    [TextureType.T2D]: 0x0DE1,
    [TextureType.T2D_ARRAY]: 0x8C1A,
    [TextureType.CUBE]: 0x8513,
    [TextureType.T3D]: 0x806F
};
const textureFormatMap = {
    [TextureFormat.R8U]: { format: 0x8232, dataFormat: 0x8D94, dataType: 0x1401 },
    [TextureFormat.R8S]: { format: 0x8231, dataFormat: 0x8D94, dataType: 0x1400 },
    [TextureFormat.R8UN]: { format: 0x8229, dataFormat: 0x1903, dataType: 0x1401 },
    [TextureFormat.R8SN]: { format: 0x8F94, dataFormat: 0x1903, dataType: 0x1400 },
    [TextureFormat.R16U]: { format: 0x8234, dataFormat: 0x8D94, dataType: 0x1403 },
    [TextureFormat.R16S]: { format: 0x8233, dataFormat: 0x8D94, dataType: 0x1402 },
    [TextureFormat.R16F]: { format: 0x822D, dataFormat: 0x1903, dataType: 0x140B },
    [TextureFormat.RG8U]: { format: 0x8238, dataFormat: 0x8228, dataType: 0x1401 },
    [TextureFormat.RG8S]: { format: 0x8237, dataFormat: 0x8228, dataType: 0x1400 },
    [TextureFormat.RG8UN]: { format: 0x822B, dataFormat: 0x8227, dataType: 0x1401 },
    [TextureFormat.RG8SN]: { format: 0x8F95, dataFormat: 0x8227, dataType: 0x1400 },
    [TextureFormat.R32U]: { format: 0x8236, dataFormat: 0x8D94, dataType: 0x1405 },
    [TextureFormat.R32S]: { format: 0x8235, dataFormat: 0x8D94, dataType: 0x1404 },
    [TextureFormat.R32F]: { format: 0x822E, dataFormat: 0x1903, dataType: 0x1406 },
    [TextureFormat.RG16U]: { format: 0x823A, dataFormat: 0x8228, dataType: 0x1403 },
    [TextureFormat.RG16S]: { format: 0x8239, dataFormat: 0x8228, dataType: 0x1402 },
    [TextureFormat.RG16F]: { format: 0x822F, dataFormat: 0x8227, dataType: 0x140B },
    [TextureFormat.RGBA8U]: { format: 0x8D7C, dataFormat: 0x8D99, dataType: 0x1401 },
    [TextureFormat.RGBA8S]: { format: 0x8D8E, dataFormat: 0x8D99, dataType: 0x1400 },
    [TextureFormat.RGBA8UN]: { format: 0x8058, dataFormat: 0x1908, dataType: 0x1401 },
    [TextureFormat.SRGBA8UN]: { format: 0x8C43, dataFormat: 0x8C43, dataType: 0x1401 },
    [TextureFormat.RGBA8SN]: { format: 0x8F97, dataFormat: 0x1908, dataType: 0x1400 },
    [TextureFormat.RG32U]: { format: 0x823C, dataFormat: 0x8228, dataType: 0x1405 },
    [TextureFormat.RG32S]: { format: 0x823B, dataFormat: 0x8228, dataType: 0x1404 },
    [TextureFormat.RG32F]: { format: 0x8230, dataFormat: 0x8227, dataType: 0x1406 },
    [TextureFormat.RGBA16U]: { format: 0x8D76, dataFormat: 0x8D99, dataType: 0x1403 },
    [TextureFormat.RGBA16S]: { format: 0x8D88, dataFormat: 0x8D99, dataType: 0x1402 },
    [TextureFormat.RGBA16F]: { format: 0x881A, dataFormat: 0x1908, dataType: 0x140B },
    [TextureFormat.RGBA32U]: { format: 0x8D70, dataFormat: 0x8D99, dataType: 0x1405 },
    [TextureFormat.RGBA32S]: { format: 0x8D82, dataFormat: 0x8D99, dataType: 0x1404 },
    [TextureFormat.RGBA32F]: { format: 0x8814, dataFormat: 0x1908, dataType: 0x1406 },
    [TextureFormat.D16UN]: { format: 0x81A5, dataFormat: 0x1902, dataType: 0x1403 },
    [TextureFormat.D24P]: { format: 0x81A6, dataFormat: 0x1902, dataType: 0x1405 },
    [TextureFormat.D24PS8]: { format: 0x88F0, dataFormat: 0x84F9, dataType: 0x1405 },
    [TextureFormat.D32F]: { format: 0x8CAC, dataFormat: 0x1902, dataType: 0x1406 }
};
class TextureData {
    constructor(width, height, depth, data) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.data = data;
    }
}
class Texture extends _resource__WEBPACK_IMPORTED_MODULE_1__.Resource {
    constructor(type, format, mipLevels, width, height = width, depth = height) {
        super();
        this.type = type;
        this.format = format;
        this.mipLevels = mipLevels;
        this.width = width;
        this.height = height;
        this.depth = depth;
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        const texture = ctx.createTexture();
        if (texture === null) {
            throw new Error('Fatal error.');
        }
        ctx.bindTexture(textureTypeMap[this.type], texture);
        const glFormat = textureFormatMap[format].format;
        switch (type) {
            case TextureType.T2D:
                ctx.texStorage2D(ctx.TEXTURE_2D, mipLevels, glFormat, width, height);
                break;
            case TextureType.CUBE:
                ctx.texStorage2D(ctx.TEXTURE_CUBE_MAP, mipLevels, glFormat, width, height);
                break;
            case TextureType.T2D_ARRAY:
                ctx.texStorage3D(ctx.TEXTURE_2D_ARRAY, mipLevels, glFormat, width, height, depth);
                break;
            case TextureType.T3D:
                ctx.texStorage3D(ctx.TEXTURE_3D, mipLevels, glFormat, width, height, depth);
                break;
            default:
                throw new Error('Unknown texture type.');
        }
        this.texture = texture;
    }
    destructor() {
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.deleteTexture(this.texture);
    }
    setMipLevelData(data, mipLevel = 0, layer = 0) {
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        ctx.bindTexture(textureTypeMap[this.type], this.texture);
        const { width, height } = data;
        const { dataFormat, dataType } = textureFormatMap[this.format];
        switch (this.type) {
            case TextureType.T2D:
                if (data instanceof TextureData) {
                    ctx.texSubImage2D(ctx.TEXTURE_2D, mipLevel, 0, 0, width, height, dataFormat, dataType, data.data);
                }
                else {
                    ctx.texSubImage2D(ctx.TEXTURE_2D, mipLevel, 0, 0, width, height, ctx.RGBA, ctx.UNSIGNED_BYTE, data);
                }
                break;
            case TextureType.CUBE:
                if (data instanceof TextureData) {
                    ctx.texSubImage2D(ctx.TEXTURE_CUBE_MAP_POSITIVE_X + layer, mipLevel, 0, 0, width, height, dataFormat, dataType, data.data, 0);
                }
                else {
                    ctx.texSubImage2D(ctx.TEXTURE_CUBE_MAP_POSITIVE_X + layer, mipLevel, 0, 0, width, height, ctx.RGBA, ctx.UNSIGNED_BYTE, data);
                }
                break;
            case TextureType.T2D_ARRAY:
                if (data instanceof TextureData) {
                    ctx.texSubImage3D(ctx.TEXTURE_2D_ARRAY, mipLevel, 0, 0, layer, width, height, data.depth, dataFormat, dataType, data.data);
                }
                else {
                    ctx.texSubImage3D(ctx.TEXTURE_2D_ARRAY, mipLevel, 0, 0, layer, width, height, 1, ctx.RGBA, ctx.UNSIGNED_BYTE, data);
                }
                break;
            case TextureType.T3D:
                if (data instanceof TextureData) {
                    ctx.texSubImage3D(ctx.TEXTURE_3D, mipLevel, 0, 0, layer, width, height, data.depth, dataFormat, dataType, data.data);
                }
                else {
                    ctx.texSubImage3D(ctx.TEXTURE_3D, mipLevel, 0, 0, layer, width, height, 1, ctx.RGBA, ctx.UNSIGNED_BYTE, data);
                }
                break;
            default:
                throw new Error('Unknown texture type.');
        }
    }
    use(index) {
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        ctx.activeTexture(ctx.TEXTURE0 + index);
        ctx.bindTexture(textureTypeMap[this.type], this.texture);
    }
    resize(width, height = width, depth = height) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        const ctx = _core__WEBPACK_IMPORTED_MODULE_0__.Core.ctx;
        ctx.deleteTexture(this.texture);
        const texture = ctx.createTexture();
        if (texture === null) {
            throw new Error('Fatal error.');
        }
        ctx.bindTexture(textureTypeMap[this.type], texture);
        const glFormat = textureFormatMap[this.format].format;
        switch (this.type) {
            case TextureType.T2D:
                ctx.texStorage2D(ctx.TEXTURE_2D, this.mipLevels, glFormat, width, height);
                break;
            case TextureType.CUBE:
                ctx.texStorage2D(ctx.TEXTURE_CUBE_MAP, this.mipLevels, glFormat, width, height);
                break;
            case TextureType.T2D_ARRAY:
                ctx.texStorage3D(ctx.TEXTURE_2D_ARRAY, this.mipLevels, glFormat, width, height, depth);
                break;
            case TextureType.T3D:
                ctx.texStorage3D(ctx.TEXTURE_3D, this.mipLevels, glFormat, width, height, depth);
                break;
            default:
                throw new Error('Unknown texture type.');
        }
        this.texture = texture;
    }
}
Texture.storageId = 'texture';


/***/ }),

/***/ "./src/systems/draw-system.ts":
/*!************************************!*\
  !*** ./src/systems/draw-system.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DrawSystem": () => (/* binding */ DrawSystem)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");

class DrawSystem {
    static onDraw() {
        _core__WEBPACK_IMPORTED_MODULE_0__.Core.currentRequest.draw();
    }
}


/***/ }),

/***/ "./src/systems/harmonic-fly-system.ts":
/*!********************************************!*\
  !*** ./src/systems/harmonic-fly-system.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HarmonicFlySystem": () => (/* binding */ HarmonicFlySystem)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _components_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/transform */ "./src/components/transform.ts");
/* harmony import */ var _components_harmonic_fly__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/harmonic-fly */ "./src/components/harmonic-fly.ts");
/* harmony import */ var _math_vector3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/vector3 */ "./src/math/vector3.ts");
/* harmony import */ var _time_system__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./time-system */ "./src/systems/time-system.ts");
/* harmony import */ var _transform_system__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transform-system */ "./src/systems/transform-system.ts");
/* harmony import */ var _mesh_system__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mesh-system */ "./src/systems/mesh-system.ts");







class HarmonicFlySystem {
    static onUpdate$128() {
        const scene = _core__WEBPACK_IMPORTED_MODULE_0__.Core.currentRequest.scene;
        const harmonicFlySet = scene.getComponents(_components_harmonic_fly__WEBPACK_IMPORTED_MODULE_2__.HarmonicFly);
        for (const hf of harmonicFlySet) {
            const transforms = scene.getEntityComponents(hf.owner, _components_transform__WEBPACK_IMPORTED_MODULE_1__.Transform);
            const progress = _time_system__WEBPACK_IMPORTED_MODULE_4__.TimeSystem.time * hf.speed;
            const dMove = Math.sin(progress * Math.PI) * hf.force;
            HarmonicFlySystem.delta.setFromVector3(hf.axis).mulScalar(dMove);
            transforms[0].position.setFromVector3(HarmonicFlySystem.delta).addVector3(hf.target);
        }
        _transform_system__WEBPACK_IMPORTED_MODULE_5__.TransformSystem.needsUpdate = true;
        _mesh_system__WEBPACK_IMPORTED_MODULE_6__.MeshSystem.needsUpdate = true;
    }
}
HarmonicFlySystem.delta = new _math_vector3__WEBPACK_IMPORTED_MODULE_3__.Vector3();


/***/ }),

/***/ "./src/systems/input-system.ts":
/*!*************************************!*\
  !*** ./src/systems/input-system.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyCode": () => (/* binding */ KeyCode),
/* harmony export */   "InputPointer": () => (/* binding */ InputPointer),
/* harmony export */   "InputSystem": () => (/* binding */ InputSystem)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _InputPointer_x, _InputPointer_y, _InputPointer_dx, _InputPointer_dy, _InputPointer_state, _a, _InputSystem_isInit, _InputSystem_keyUp, _InputSystem_keyDown, _InputSystem_keyState, _InputSystem_asyncKeyUp, _InputSystem_asyncKeyDown, _InputSystem_asyncKeyState, _InputSystem_init, _InputSystem_onKeyDown, _InputSystem_onKeyUp, _InputSystem_onPointerEnter, _InputSystem_onPointerOut;

var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["Digit0"] = 0] = "Digit0";
    KeyCode[KeyCode["Digit1"] = 1] = "Digit1";
    KeyCode[KeyCode["Digit2"] = 2] = "Digit2";
    KeyCode[KeyCode["Digit3"] = 3] = "Digit3";
    KeyCode[KeyCode["Digit4"] = 4] = "Digit4";
    KeyCode[KeyCode["Digit5"] = 5] = "Digit5";
    KeyCode[KeyCode["Digit6"] = 6] = "Digit6";
    KeyCode[KeyCode["Digit7"] = 7] = "Digit7";
    KeyCode[KeyCode["Digit8"] = 8] = "Digit8";
    KeyCode[KeyCode["Digit9"] = 9] = "Digit9";
    KeyCode[KeyCode["Numpad0"] = 10] = "Numpad0";
    KeyCode[KeyCode["Numpad1"] = 11] = "Numpad1";
    KeyCode[KeyCode["Numpad2"] = 12] = "Numpad2";
    KeyCode[KeyCode["Numpad3"] = 13] = "Numpad3";
    KeyCode[KeyCode["Numpad4"] = 14] = "Numpad4";
    KeyCode[KeyCode["Numpad5"] = 15] = "Numpad5";
    KeyCode[KeyCode["Numpad6"] = 16] = "Numpad6";
    KeyCode[KeyCode["Numpad7"] = 17] = "Numpad7";
    KeyCode[KeyCode["Numpad8"] = 18] = "Numpad8";
    KeyCode[KeyCode["Numpad9"] = 19] = "Numpad9";
    KeyCode[KeyCode["ArrowUp"] = 20] = "ArrowUp";
    KeyCode[KeyCode["ArrowDown"] = 21] = "ArrowDown";
    KeyCode[KeyCode["ArrowLeft"] = 22] = "ArrowLeft";
    KeyCode[KeyCode["ArrowRight"] = 23] = "ArrowRight";
    KeyCode[KeyCode["KeyA"] = 24] = "KeyA";
    KeyCode[KeyCode["KeyB"] = 25] = "KeyB";
    KeyCode[KeyCode["KeyC"] = 26] = "KeyC";
    KeyCode[KeyCode["KeyD"] = 27] = "KeyD";
    KeyCode[KeyCode["KeyE"] = 28] = "KeyE";
    KeyCode[KeyCode["KeyF"] = 29] = "KeyF";
    KeyCode[KeyCode["KeyG"] = 30] = "KeyG";
    KeyCode[KeyCode["KeyH"] = 31] = "KeyH";
    KeyCode[KeyCode["KeyI"] = 32] = "KeyI";
    KeyCode[KeyCode["KeyJ"] = 33] = "KeyJ";
    KeyCode[KeyCode["KeyK"] = 34] = "KeyK";
    KeyCode[KeyCode["KeyL"] = 35] = "KeyL";
    KeyCode[KeyCode["KeyM"] = 36] = "KeyM";
    KeyCode[KeyCode["KeyN"] = 37] = "KeyN";
    KeyCode[KeyCode["KeyO"] = 38] = "KeyO";
    KeyCode[KeyCode["KeyP"] = 39] = "KeyP";
    KeyCode[KeyCode["KeyQ"] = 40] = "KeyQ";
    KeyCode[KeyCode["KeyR"] = 41] = "KeyR";
    KeyCode[KeyCode["KeyS"] = 42] = "KeyS";
    KeyCode[KeyCode["KeyT"] = 43] = "KeyT";
    KeyCode[KeyCode["KeyU"] = 44] = "KeyU";
    KeyCode[KeyCode["KeyV"] = 45] = "KeyV";
    KeyCode[KeyCode["KeyW"] = 46] = "KeyW";
    KeyCode[KeyCode["KeyX"] = 47] = "KeyX";
    KeyCode[KeyCode["KeyY"] = 48] = "KeyY";
    KeyCode[KeyCode["KeyZ"] = 49] = "KeyZ";
    KeyCode[KeyCode["Space"] = 50] = "Space";
    KeyCode[KeyCode["Tab"] = 51] = "Tab";
    KeyCode[KeyCode["Enter"] = 52] = "Enter";
    KeyCode[KeyCode["Escape"] = 53] = "Escape";
    KeyCode[KeyCode["ControlLeft"] = 54] = "ControlLeft";
    KeyCode[KeyCode["ControlRight"] = 55] = "ControlRight";
    KeyCode[KeyCode["ShiftLeft"] = 56] = "ShiftLeft";
    KeyCode[KeyCode["ShiftRight"] = 57] = "ShiftRight";
    KeyCode[KeyCode["NumpadDivide"] = 58] = "NumpadDivide";
    KeyCode[KeyCode["NumpadMultiply"] = 59] = "NumpadMultiply";
    KeyCode[KeyCode["NumpadSubtract"] = 60] = "NumpadSubtract";
    KeyCode[KeyCode["NumpadAdd"] = 61] = "NumpadAdd";
    KeyCode[KeyCode["NumpadEnter"] = 62] = "NumpadEnter";
    KeyCode[KeyCode["NumpadDecimal"] = 63] = "NumpadDecimal";
})(KeyCode || (KeyCode = {}));
class InputPointer {
    constructor(id, type) {
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.state = 0;
        _InputPointer_x.set(this, 0);
        _InputPointer_y.set(this, 0);
        _InputPointer_dx.set(this, 0);
        _InputPointer_dy.set(this, 0);
        _InputPointer_state.set(this, 0);
        this.id = id;
        this.type = type;
    }
    update() {
        this.x = __classPrivateFieldGet(this, _InputPointer_x, "f");
        this.y = __classPrivateFieldGet(this, _InputPointer_y, "f");
        this.dx = __classPrivateFieldGet(this, _InputPointer_dx, "f");
        this.dy = __classPrivateFieldGet(this, _InputPointer_dy, "f");
        this.state = __classPrivateFieldGet(this, _InputPointer_state, "f");
        __classPrivateFieldSet(this, _InputPointer_dx, 0, "f");
        __classPrivateFieldSet(this, _InputPointer_dy, 0, "f");
    }
    setState(event) {
        __classPrivateFieldSet(this, _InputPointer_x, event.clientX, "f");
        __classPrivateFieldSet(this, _InputPointer_y, event.clientY, "f");
        __classPrivateFieldSet(this, _InputPointer_dx, __classPrivateFieldGet(this, _InputPointer_dx, "f") + event.movementX, "f");
        __classPrivateFieldSet(this, _InputPointer_dy, __classPrivateFieldGet(this, _InputPointer_dy, "f") + event.movementY, "f");
        __classPrivateFieldSet(this, _InputPointer_state, event.buttons, "f");
    }
}
_InputPointer_x = new WeakMap(), _InputPointer_y = new WeakMap(), _InputPointer_dx = new WeakMap(), _InputPointer_dy = new WeakMap(), _InputPointer_state = new WeakMap();
class InputSystem {
    static onFrameStart$256() {
        if (__classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_isInit) === false) {
            __classPrivateFieldGet(InputSystem, _a, "m", _InputSystem_init).call(InputSystem);
        }
        for (let it = 0; it < 8; it++) {
            __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_keyUp)[it] = __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyUp)[it];
            __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyUp)[it] = 0;
            __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_keyDown)[it] = __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyDown)[it];
            __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyDown)[it] = 0;
            __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_keyState)[it] = __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyState)[it];
        }
        for (const pointer of InputSystem.pointers.values()) {
            pointer.update();
        }
    }
    static keyUp(code) {
        const element = (code / 32) | 0;
        const num = code % 32;
        return Boolean(__classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_keyUp)[element] & ((1 << num) >>> 0));
    }
    static keyDown(code) {
        const element = (code / 32) | 0;
        const num = code % 32;
        return Boolean(__classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_keyDown)[element] & ((1 << num) >>> 0));
    }
    static keyState(code) {
        const element = (code / 32) | 0;
        const num = code % 32;
        return Boolean(__classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_keyState)[element] & ((1 << num) >>> 0));
    }
}
_a = InputSystem, _InputSystem_init = function _InputSystem_init() {
    __classPrivateFieldSet(InputSystem, _a, true, "f", _InputSystem_isInit);
    _core__WEBPACK_IMPORTED_MODULE_0__.Core.root.addEventListener('keydown', __classPrivateFieldGet(InputSystem, _a, "m", _InputSystem_onKeyDown));
    _core__WEBPACK_IMPORTED_MODULE_0__.Core.root.addEventListener('keyup', __classPrivateFieldGet(InputSystem, _a, "m", _InputSystem_onKeyUp));
    _core__WEBPACK_IMPORTED_MODULE_0__.Core.root.addEventListener('pointerenter', __classPrivateFieldGet(InputSystem, _a, "m", _InputSystem_onPointerEnter));
    _core__WEBPACK_IMPORTED_MODULE_0__.Core.root.addEventListener('pointerout', __classPrivateFieldGet(InputSystem, _a, "m", _InputSystem_onPointerOut));
    _core__WEBPACK_IMPORTED_MODULE_0__.Core.root.addEventListener('pointercancel', __classPrivateFieldGet(InputSystem, _a, "m", _InputSystem_onPointerOut));
    _core__WEBPACK_IMPORTED_MODULE_0__.Core.root.addEventListener('pointerup', __classPrivateFieldGet(InputSystem, _a, "m", _InputSystem_onPointerEnter));
    _core__WEBPACK_IMPORTED_MODULE_0__.Core.root.addEventListener('pointerdown', __classPrivateFieldGet(InputSystem, _a, "m", _InputSystem_onPointerEnter));
    _core__WEBPACK_IMPORTED_MODULE_0__.Core.root.addEventListener('pointermove', __classPrivateFieldGet(InputSystem, _a, "m", _InputSystem_onPointerEnter));
}, _InputSystem_onKeyDown = function _InputSystem_onKeyDown(e) {
    const code = KeyCode[e.code] ?? 255;
    const element = (code / 32) | 0;
    const num = code % 32;
    const oldState = __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyState)[element];
    __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyState)[element] |= (1 << num) >>> 0;
    __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyDown)[element] |= ~oldState & __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyState)[element];
}, _InputSystem_onKeyUp = function _InputSystem_onKeyUp(e) {
    const code = KeyCode[e.code] ?? 255;
    const element = (code / 32) | 0;
    const num = code % 32;
    const oldState = __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyState)[element];
    __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyState)[element] &= ~((1 << num) >>> 0);
    __classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyUp)[element] |= oldState & ~__classPrivateFieldGet(InputSystem, _a, "f", _InputSystem_asyncKeyState)[element];
}, _InputSystem_onPointerEnter = function _InputSystem_onPointerEnter(e) {
    let pointer = InputSystem.pointers.get(e.pointerId);
    if (pointer === undefined) {
        pointer = new InputPointer(e.pointerId, e.pointerType);
        InputSystem.pointers.set(e.pointerId, pointer);
    }
    pointer.setState(e);
}, _InputSystem_onPointerOut = function _InputSystem_onPointerOut(e) {
    InputSystem.pointers.delete(e.pointerId);
};
_InputSystem_isInit = { value: false };
_InputSystem_keyUp = { value: new Uint32Array(8) };
_InputSystem_keyDown = { value: new Uint32Array(8) };
_InputSystem_keyState = { value: new Uint32Array(8) };
_InputSystem_asyncKeyUp = { value: new Uint32Array(8) };
_InputSystem_asyncKeyDown = { value: new Uint32Array(8) };
_InputSystem_asyncKeyState = { value: new Uint32Array(8) };
InputSystem.pointers = new Map();


/***/ }),

/***/ "./src/systems/look-orbit-system.ts":
/*!******************************************!*\
  !*** ./src/systems/look-orbit-system.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LookOrbitSystem": () => (/* binding */ LookOrbitSystem)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _math_vector3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/vector3 */ "./src/math/vector3.ts");
/* harmony import */ var _input_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input-system */ "./src/systems/input-system.ts");



class LookOrbitSystem {
    static onStart$128() {
        const pointer = [..._input_system__WEBPACK_IMPORTED_MODULE_2__.InputSystem.pointers.values()][0];
        if (pointer !== undefined && (pointer.state & 1) === 1) {
            LookOrbitSystem.polar += pointer.dy * 0.01;
            LookOrbitSystem.azimuthal += pointer.dx * 0.01;
        }
        const { currentRequest } = _core__WEBPACK_IMPORTED_MODULE_0__.Core;
        const { polar, azimuthal, distance, target } = LookOrbitSystem;
        currentRequest.look.viewMatrix.orbit(polar, azimuthal, distance, target);
        currentRequest.look.perspectiveMatrix.perspective(currentRequest.width / currentRequest.height, 1.04, 0.1, 1000);
    }
}
LookOrbitSystem.polar = 0;
LookOrbitSystem.azimuthal = 0;
LookOrbitSystem.target = new _math_vector3__WEBPACK_IMPORTED_MODULE_1__.Vector3();
LookOrbitSystem.distance = 1;


/***/ }),

/***/ "./src/systems/mesh-system.ts":
/*!************************************!*\
  !*** ./src/systems/mesh-system.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MeshSystem": () => (/* binding */ MeshSystem)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _components_mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/mesh */ "./src/components/mesh.ts");
/* harmony import */ var _components_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/transform */ "./src/components/transform.ts");
/* harmony import */ var _resources_texture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../resources/texture */ "./src/resources/texture.ts");




class MeshSystem {
    static onUpdate$512() {
        if (MeshSystem.needsUpdate === false) {
            return;
        }
        const scene = _core__WEBPACK_IMPORTED_MODULE_0__.Core.currentRequest.scene;
        const meshes = scene.getComponents(_components_mesh__WEBPACK_IMPORTED_MODULE_1__.Mesh);
        for (const mesh of meshes) {
            const transforms = scene.getEntityComponents(mesh.owner, _components_transform__WEBPACK_IMPORTED_MODULE_2__.Transform);
            mesh.renderable.matrix.setFromMatrix3H(transforms[0].matrix);
            scene.renderablesData.set(transforms[0].matrix, mesh.renderable.id * 16);
            const m = transforms[0].matrix;
            const scale = Math.sqrt(m[0] ** 2 + m[1] ** 2 + m[2] ** 2
                + m[4] ** 2 + m[5] ** 2 + m[6] ** 2
                + m[8] ** 2 + m[9] ** 2 + m[10] ** 2);
            scene.bsData[mesh.renderable.id * 4 + 0] = mesh.renderable.geometry.bs[0] + m[12];
            scene.bsData[mesh.renderable.id * 4 + 1] = mesh.renderable.geometry.bs[1] + m[13];
            scene.bsData[mesh.renderable.id * 4 + 2] = mesh.renderable.geometry.bs[2] + m[14];
            scene.bsData[mesh.renderable.id * 4 + 3] = mesh.renderable.geometry.bs[3] * scale;
        }
        scene.instanceTexture.setMipLevelData(new _resources_texture__WEBPACK_IMPORTED_MODULE_3__.TextureData(1024, 1024, 1, scene.renderablesData));
        MeshSystem.needsUpdate = false;
    }
}
MeshSystem.needsUpdate = true;


/***/ }),

/***/ "./src/systems/screen-system.ts":
/*!**************************************!*\
  !*** ./src/systems/screen-system.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScreenSystem": () => (/* binding */ ScreenSystem)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");

class ScreenSystem {
    static onStart$128() {
        const { currentRequest, root, ctx } = _core__WEBPACK_IMPORTED_MODULE_0__.Core;
        if (currentRequest.staticSize === false) {
            const width = root.clientWidth * window.devicePixelRatio;
            const height = root.clientHeight * window.devicePixelRatio;
            if (currentRequest.width !== width || currentRequest.height !== height) {
                currentRequest.width = width;
                currentRequest.height = height;
                if (currentRequest.renderTarget === null) {
                    ctx.canvas.width = width;
                    ctx.canvas.height = height;
                }
                else {
                    currentRequest.renderTarget.resize(width, height);
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/systems/time-system.ts":
/*!************************************!*\
  !*** ./src/systems/time-system.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeSystem": () => (/* binding */ TimeSystem)
/* harmony export */ });
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _TimeSystem_oldTime;
class TimeSystem {
    static onFrameStart$128() {
        const time = performance.now() * 0.001;
        TimeSystem.dt = (time - __classPrivateFieldGet(TimeSystem, _a, "f", _TimeSystem_oldTime)) * TimeSystem.scale;
        TimeSystem.time += TimeSystem.dt;
        __classPrivateFieldSet(TimeSystem, _a, time, "f", _TimeSystem_oldTime);
    }
}
_a = TimeSystem;
TimeSystem.dt = 0;
TimeSystem.time = 0;
TimeSystem.scale = 1;
_TimeSystem_oldTime = { value: 0 };


/***/ }),

/***/ "./src/systems/transform-system.ts":
/*!*****************************************!*\
  !*** ./src/systems/transform-system.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransformSystem": () => (/* binding */ TransformSystem)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core.ts");
/* harmony import */ var _components_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/transform */ "./src/components/transform.ts");


class TransformSystem {
    static onUpdate$256() {
        if (TransformSystem.needsUpdate === false) {
            return;
        }
        const scene = _core__WEBPACK_IMPORTED_MODULE_0__.Core.currentRequest.scene;
        for (const entity of scene.entities) {
            const transforms = scene.getEntityComponents(entity, _components_transform__WEBPACK_IMPORTED_MODULE_1__.Transform);
            const transform = transforms[0];
            transform.matrix.fromTRS(transform.position, transform.orientation, transform.scale);
            if (entity.parent !== null) {
                transform.matrix.applyMatrix3H(scene.getEntityComponents(entity.parent, _components_transform__WEBPACK_IMPORTED_MODULE_1__.Transform)[0].matrix);
            }
        }
        TransformSystem.needsUpdate = false;
    }
}
TransformSystem.needsUpdate = true;


/***/ }),

/***/ "./src/loaders/gltf-loader/pbr.f.glsl":
/*!********************************************!*\
  !*** ./src/loaders/gltf-loader/pbr.f.glsl ***!
  \********************************************/
/***/ ((module) => {

module.exports = "#version 300 es\nprecision highp float;\n\nuniform vec4 c4_color;\nuniform float v1_metalness;\nuniform float v1_roughness;\n\nuniform samplerCube sr_diffTexture;\nuniform samplerCube sr_specTexture;\n\nin vec3 v_nor;\nin vec3 v_cam;\nin vec3 v_pos;\n\nout vec4 outColor;\n\n#define CAMERA_EXP 0.002;\n\nvec3 diff(vec3 nor) {\n    return texture(sr_diffTexture, nor).xyz * CAMERA_EXP;\n}\n\nvec3 spec(vec3 nor) {\n    return texture(sr_specTexture, nor).xyz * CAMERA_EXP;\n}\n\nvec3 linearToSrgb(vec3 color) {\n    return max(vec3(0.0), 1.055 * (pow(color, vec3(1.0 / 2.4))) - 0.055);\n}\n\nvoid main() {\n    vec3 nor = normalize(v_nor);\n    vec3 eye = normalize(v_pos - v_cam);\n\n    vec3 d = diff(nor);\n    vec3 s = spec(reflect(eye, nor));\n\n    vec3 F0 = mix(vec3(0.04), c4_color.xyz, v1_metalness);\n\n    vec3 fren = F0 + (max(vec3(1.0 - v1_roughness), F0) - F0) * pow(min(1.0, max(0.0, 1.0 + dot(eye, nor))), 5.0);\n\n    outColor = vec4(linearToSrgb(mix(c4_color.xyz * d, s, fren)), c4_color.w);\n}\n"

/***/ }),

/***/ "./src/loaders/gltf-loader/pbr.v.glsl":
/*!********************************************!*\
  !*** ./src/loaders/gltf-loader/pbr.v.glsl ***!
  \********************************************/
/***/ ((module) => {

module.exports = "#version 300 es\n\nlayout(location = 0) in vec3 position;\nlayout(location = 1) in vec3 normal;\n\nlayout(location = 15) in int instances;\n\nlayout(std140) uniform tn_camera { mat4 tn_pm; mat4 tn_vm; } ol;\n\nuniform sampler2D sr_instances;\n\nout vec3 v_nor;\nout vec3 v_cam;\nout vec3 v_pos;\n\nmat4 getMatrix() {\n    int x = (instances * 4) % 1024;\n    int y = (instances * 4) / 1024;\n    vec4 xAxis = texelFetch(sr_instances, ivec2(x + 0, y), 0);\n    vec4 yAxis = texelFetch(sr_instances, ivec2(x + 1, y), 0);\n    vec4 zAxis = texelFetch(sr_instances, ivec2(x + 2, y), 0);\n    vec4 wAxis = texelFetch(sr_instances, ivec2(x + 3, y), 0);\n    mat4 rot = mat4(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, -1.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0));\n return rot*mat4(xAxis, yAxis, zAxis, wAxis);\n}\n\nvoid main() {\n    mat4 objectMatrix = getMatrix();\n    mat3 normalMatrix = transpose(inverse(mat3(objectMatrix)));\n    mat4 tmp = ol.tn_vm; // TODO fix for mobile\n    v_cam = inverse(tmp)[3].xyz;\n    v_pos = vec3(objectMatrix * vec4(position, 1.0));\n    v_nor = normalMatrix * normal;\n    gl_Position = ol.tn_pm * ol.tn_vm * objectMatrix * vec4(position, 1.0);\n}\n"

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************************!*\
  !*** ./examples/faded/src/index.ts ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src */ "./src/index.ts");

class MySystem {
    static onFrameStart$512() {
        if (_src__WEBPACK_IMPORTED_MODULE_0__.InputSystem.keyState(_src__WEBPACK_IMPORTED_MODULE_0__.KeyCode.ArrowUp)) {
            _src__WEBPACK_IMPORTED_MODULE_0__.LookOrbitSystem.distance -= _src__WEBPACK_IMPORTED_MODULE_0__.TimeSystem.dt * 50;
        }
        if (_src__WEBPACK_IMPORTED_MODULE_0__.InputSystem.keyState(_src__WEBPACK_IMPORTED_MODULE_0__.KeyCode.ArrowDown)) {
            _src__WEBPACK_IMPORTED_MODULE_0__.LookOrbitSystem.distance += _src__WEBPACK_IMPORTED_MODULE_0__.TimeSystem.dt * 50;
        }
        if (_src__WEBPACK_IMPORTED_MODULE_0__.InputSystem.keyState(_src__WEBPACK_IMPORTED_MODULE_0__.KeyCode.KeyA)) {
            _src__WEBPACK_IMPORTED_MODULE_0__.LookOrbitSystem.target.x += _src__WEBPACK_IMPORTED_MODULE_0__.TimeSystem.dt * 50;
        }
        if (_src__WEBPACK_IMPORTED_MODULE_0__.InputSystem.keyState(_src__WEBPACK_IMPORTED_MODULE_0__.KeyCode.KeyD)) {
            _src__WEBPACK_IMPORTED_MODULE_0__.LookOrbitSystem.target.x -= _src__WEBPACK_IMPORTED_MODULE_0__.TimeSystem.dt * 50;
        }
        if (_src__WEBPACK_IMPORTED_MODULE_0__.InputSystem.keyState(_src__WEBPACK_IMPORTED_MODULE_0__.KeyCode.KeyW)) {
            _src__WEBPACK_IMPORTED_MODULE_0__.LookOrbitSystem.target.y -= _src__WEBPACK_IMPORTED_MODULE_0__.TimeSystem.dt * 50;
        }
        if (_src__WEBPACK_IMPORTED_MODULE_0__.InputSystem.keyState(_src__WEBPACK_IMPORTED_MODULE_0__.KeyCode.KeyS)) {
            _src__WEBPACK_IMPORTED_MODULE_0__.LookOrbitSystem.target.y += _src__WEBPACK_IMPORTED_MODULE_0__.TimeSystem.dt * 50;
        }
    }
    static onStart$256() {
        if (_src__WEBPACK_IMPORTED_MODULE_0__.InputSystem.keyUp(_src__WEBPACK_IMPORTED_MODULE_0__.KeyCode.KeyW)) {
            console.info('KeyWUp');
        }
        if (_src__WEBPACK_IMPORTED_MODULE_0__.InputSystem.keyDown(_src__WEBPACK_IMPORTED_MODULE_0__.KeyCode.KeyW)) {
            console.info('KeyWDown');
        }
    }
}
async function createPPFrameRequest(texture) {
    const geometry = new _src__WEBPACK_IMPORTED_MODULE_0__.Geometry(_src__WEBPACK_IMPORTED_MODULE_0__.GeometryPrimitive.TRIANGLE_LIST);
    const posBuffer = new _src__WEBPACK_IMPORTED_MODULE_0__.Buffer(48);
    posBuffer.subData(0, new Float32Array([-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0]));
    const indBuffer = new _src__WEBPACK_IMPORTED_MODULE_0__.Buffer(12, _src__WEBPACK_IMPORTED_MODULE_0__.BufferUsage.INDEX);
    indBuffer.subData(0, new Uint16Array([0, 2, 1, 0, 3, 2]));
    geometry.setAttribute(0, new _src__WEBPACK_IMPORTED_MODULE_0__.Attribute(posBuffer, _src__WEBPACK_IMPORTED_MODULE_0__.AttributeFormat.F32x3, 4));
    geometry.setIndices(new _src__WEBPACK_IMPORTED_MODULE_0__.Attribute(indBuffer, _src__WEBPACK_IMPORTED_MODULE_0__.AttributeFormat.U16x1, 6));
    geometry.initVao();
    const vs = await _src__WEBPACK_IMPORTED_MODULE_0__.TextLoader.load('./resources/pp.v.glsl');
    const fs = await _src__WEBPACK_IMPORTED_MODULE_0__.TextLoader.load('./resources/pp.f.glsl');
    const sampler = new _src__WEBPACK_IMPORTED_MODULE_0__.Sampler();
    const material = new _src__WEBPACK_IMPORTED_MODULE_0__.Material(new _src__WEBPACK_IMPORTED_MODULE_0__.Shader(vs, fs));
    material.depthTest = false;
    material.uniforms.sr_texture.value.set([0, texture.id, sampler.id]);
    const scene = new _src__WEBPACK_IMPORTED_MODULE_0__.Scene();
    scene.addRenderable(geometry, material);
    return new _src__WEBPACK_IMPORTED_MODULE_0__.FrameRequest(scene, new _src__WEBPACK_IMPORTED_MODULE_0__.Look(), null, [_src__WEBPACK_IMPORTED_MODULE_0__.ScreenSystem, _src__WEBPACK_IMPORTED_MODULE_0__.DrawSystem]);
}
async function createSkyBox(scene, texturePath) {
    const geometry = new _src__WEBPACK_IMPORTED_MODULE_0__.Geometry(_src__WEBPACK_IMPORTED_MODULE_0__.GeometryPrimitive.TRIANGLE_LIST);
    const posBuffer = new _src__WEBPACK_IMPORTED_MODULE_0__.Buffer(96);
    posBuffer.subData(0, new Float32Array([
        -1, -1, -1,
        1, -1, -1,
        1, -1, 1,
        -1, -1, 1,
        -1, 1, -1,
        1, 1, -1,
        1, 1, 1,
        -1, 1, 1
    ]));
    const indBuffer = new _src__WEBPACK_IMPORTED_MODULE_0__.Buffer(72, _src__WEBPACK_IMPORTED_MODULE_0__.BufferUsage.INDEX);
    indBuffer.subData(0, new Uint16Array([
        0, 2, 1, 0, 3, 2,
        4, 5, 6, 4, 6, 7,
        5, 1, 2, 5, 2, 6,
        4, 7, 3, 4, 3, 0,
        7, 6, 2, 7, 2, 3,
        4, 1, 5, 4, 0, 1
    ]));
    geometry.setAttribute(0, new _src__WEBPACK_IMPORTED_MODULE_0__.Attribute(posBuffer, _src__WEBPACK_IMPORTED_MODULE_0__.AttributeFormat.F32x3, 8));
    geometry.setIndices(new _src__WEBPACK_IMPORTED_MODULE_0__.Attribute(indBuffer, _src__WEBPACK_IMPORTED_MODULE_0__.AttributeFormat.U16x1, 36));
    geometry.initVao();
    const vs = await _src__WEBPACK_IMPORTED_MODULE_0__.TextLoader.load('./resources/sky.v.glsl');
    const fs = await _src__WEBPACK_IMPORTED_MODULE_0__.TextLoader.load('./resources/sky.f.glsl');
    const { diffTexture, specTexture } = await _src__WEBPACK_IMPORTED_MODULE_0__.EnvLoader.load(texturePath);
    const sampler = new _src__WEBPACK_IMPORTED_MODULE_0__.Sampler();
    sampler.setState(_src__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.TEXTURE_MIN_FILTER, _src__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.LINEAR);
    sampler.setState(_src__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.TEXTURE_MAG_FILTER, _src__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.LINEAR);
    const material = new _src__WEBPACK_IMPORTED_MODULE_0__.Material(new _src__WEBPACK_IMPORTED_MODULE_0__.Shader(vs, fs));
    material.depthFunc = _src__WEBPACK_IMPORTED_MODULE_0__.Core.ctx.LEQUAL;
    material.uniforms.sr_texture.value.set([0, specTexture.id, sampler.id]);
    const renderable = scene.addRenderable(geometry, material);
    scene.setRenderableStateBit(renderable.id, _src__WEBPACK_IMPORTED_MODULE_0__.RenderableState.CULLING, false);
    const materialStorage = _src__WEBPACK_IMPORTED_MODULE_0__.Core.getResourceStorage('material');
    if (materialStorage === undefined) {
        return;
    }
    for (const pbrMaterial of materialStorage.values()) {
        if (pbrMaterial.uniforms.sr_specTexture !== undefined) {
            pbrMaterial.uniforms.sr_specTexture.value.set([0, specTexture.id, sampler.id]);
        }
        if (pbrMaterial.uniforms.sr_diffTexture !== undefined) {
            pbrMaterial.uniforms.sr_diffTexture.value.set([1, diffTexture.id, sampler.id]);
        }
    }
}
_src__WEBPACK_IMPORTED_MODULE_0__.Core.init(document.body, [
    _src__WEBPACK_IMPORTED_MODULE_0__.TimeSystem,
    _src__WEBPACK_IMPORTED_MODULE_0__.InputSystem,
    _src__WEBPACK_IMPORTED_MODULE_0__.DrawSystem,
    _src__WEBPACK_IMPORTED_MODULE_0__.ScreenSystem,
    _src__WEBPACK_IMPORTED_MODULE_0__.LookOrbitSystem,
    _src__WEBPACK_IMPORTED_MODULE_0__.TransformSystem,
    _src__WEBPACK_IMPORTED_MODULE_0__.MeshSystem,
    MySystem
]).then(async () => {
    _src__WEBPACK_IMPORTED_MODULE_0__.LookOrbitSystem.distance = 100;
    _src__WEBPACK_IMPORTED_MODULE_0__.LookOrbitSystem.target.y = 50;
    const look = new _src__WEBPACK_IMPORTED_MODULE_0__.Look();
    const gltf = await _src__WEBPACK_IMPORTED_MODULE_0__.GltfLoader.load('./resources/Stones.gltf');
    const scene = gltf.scenes[0];
    await createSkyBox(scene, './resources/env.tnenv');
    const renderTarget = new _src__WEBPACK_IMPORTED_MODULE_0__.RenderTarget(window.innerWidth, window.innerHeight);
    renderTarget.createAttchment(_src__WEBPACK_IMPORTED_MODULE_0__.RenderTargetAttachment.COLOR_0, _src__WEBPACK_IMPORTED_MODULE_0__.TextureFormat.RGBA8UN);
    renderTarget.createAttchment(_src__WEBPACK_IMPORTED_MODULE_0__.RenderTargetAttachment.DEPTH, _src__WEBPACK_IMPORTED_MODULE_0__.TextureFormat.D24P);
    const fr1 = new _src__WEBPACK_IMPORTED_MODULE_0__.FrameRequest(scene, look, renderTarget);
    fr1.clearColor = [1, 1, 1, 1];
    _src__WEBPACK_IMPORTED_MODULE_0__.Core.frameRequests.push(fr1);
    const fr2 = await createPPFrameRequest(renderTarget.getAttachment(_src__WEBPACK_IMPORTED_MODULE_0__.RenderTargetAttachment.COLOR_0));
    _src__WEBPACK_IMPORTED_MODULE_0__.Core.frameRequests.push(fr2);
});
window.TN = _src__WEBPACK_IMPORTED_MODULE_0__;

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});