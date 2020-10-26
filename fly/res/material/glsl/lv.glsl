precision highp float;

uniform mat4 PM;
uniform mat4 WM;
uniform mat4 OM;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

varying vec3 vCam;
varying vec3 vPos;
varying vec3 vNor;
varying vec2 vUv;
varying float vDepth;

void main() {
    vCam = -WM[3].xyz;
    vPos = (OM * vec4(position, 1.0)).xyz;
    vNor = mat3(OM) * normal;
    vUv = uv;

    vec4 pos = WM * vec4(vPos, 1.0);
    vDepth = pos.z / 3000.0;
    
    gl_Position = PM * pos;
}
