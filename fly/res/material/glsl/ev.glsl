precision highp float;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
varying vec3 vPos;

void main() {
    vUv = uv;
    vPos = position;
    vPos.z = 3.0;
    gl_Position = vec4(position, 1.0);
}