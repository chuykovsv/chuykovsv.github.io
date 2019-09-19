precision highp float;

uniform mat4 PM;
uniform mat4 WM;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

attribute vec3 ex;
attribute vec3 ey;
attribute vec3 ez;
attribute vec3 et;

varying vec3 vCam;
varying vec3 vPos;
varying vec3 vNor;
varying vec2 vUv;
varying float vDepth;

void main() {
    mat4 OM;

    OM[0] = vec4(ex, 0.0);
    OM[1] = vec4(ey, 0.0);
    OM[2] = vec4(ez, 0.0);
    OM[3] = vec4(et, 1.0);

    vCam = -WM[3].xyz;
    vPos = (OM * vec4(position, 1.0)).xyz;
    vNor = mat3(OM) * normal;
    vUv = uv;

    vec4 pos = WM * vec4(vPos, 1.0);
    vDepth = pos.z / 3000.0;

    gl_Position = PM * pos;
}
