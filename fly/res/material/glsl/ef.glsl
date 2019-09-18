precision highp float;

uniform sampler2D tex;

varying vec2 vUv;
varying vec3 vPos;

void main() {
    vec3 eye = normalize(vPos);
    float h = pow(1.0 - dot(eye, vec3(0, 1, 0)), 3.0);

    vec3 color = texture2D(tex, vUv).rgb;

    gl_FragColor = vec4(mix(color, vec3(1.0), h), 1.0);
}