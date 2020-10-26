export const vsh = `
varying vec3 vNor;
varying vec2 vUv;
varying float vZ;

void main() {
    mat3 nMatrix = mat3(transpose(inverse(modelMatrix)));
    vNor = nMatrix * normal;
    vUv = uv;
    vec4 pos = modelViewMatrix * vec4(position, 1.0);
    vZ = dot(pos.xyz, pos.xyz);
    gl_Position = projectionMatrix * pos;
}
`;

export const fsh = `
uniform sampler2D map;

varying vec3 vNor;
varying vec2 vUv;
varying float vZ;

vec3 color(vec3 nor) {
    vec3 light = normalize(vec3(0.25, 1., 0.5));
    float res = (dot(nor, light) + 1.) * 0.5;
    return vec3(mix(vec3(0.5, 0.5, 0.5), vec3(0.9, 0.9, 0.95), res));
}

void main() {
    vec4 tex = texture2D(map, vUv);
    if (tex.r + tex.g + tex.b == 0.0) discard;
    vec3 cl = mix(tex.rgb * color(vNor), vec3(0.5), min(vZ / 200000.0, 1.0));
    gl_FragColor = vec4(cl, 1.0);
}
`;
