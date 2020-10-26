#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform vec3 color;

varying vec3 vCam;
varying vec3 vPos;
varying vec3 vNor;
varying vec2 vUv;
varying float vDepth;

vec3 getIBL(vec3 n, float nl) {
    float k = (n.y + 1.0) * 0.5;
    float l = max(0.0, nl) * 0.5;
    return mix(vec3(0.5, 0.4, 0.37), vec3(0.4, 0.47, 0.5), k) + l;
}

vec3 getHDR(vec3 n) {
    vec3 ret = vec3(0.86, 0.93, 1.0);
    if (n.y < 0.0) ret = vec3(0.52, 0.26, 0.2);
    return ret;
}

float GGX_G(float cs, float a) {
    float cos2 = cs * cs;
    float tan2 = (1.0 - cos2) / cos2;
    return 2.0 / (1.0 + sqrt(1.0 + a * a * tan2));
}

float GGX_D(float cs, float a) {
    float a2 = a * a;
    float cos2 = cs * cs;
    float den = cos2 * a2 + (1.0 - cos2);
    return a2 / (3.14159265 * den * den);
}

void main() {
    vec3 L = normalize(vec3(1.0, 1.0, -1.0));
    vec3 V = normalize(vCam - vPos);
    vec3 N = normalize(vNor);
    vec3 H = normalize(V + L);

    float R = 0.5;
    float M = 0.0;
    float AO = 1.0;
    float R2 = R * R;

    vec3 albedo = color;

    vec3 F0 = mix(vec3(0.04), albedo, M);
    vec3 F = F0 + (vec3(1.0) - F0) * pow(1.0 - abs(dot(V, N)), 5.0);
    F *= (1.0 - R2);
    vec3 K = vec3(1.0) - F;

    float NV = dot(N, V);
    float NL = dot(N, L);
    float NH = dot(N, H);

    vec3 diff = albedo * (1.0 - M) * getIBL(N, NL) * AO;
    vec3 spec = getHDR(N);

    NV = max(0.0001, NV);
    NL = max(0.0001, NL);
    float G = GGX_G(NV, R2) * GGX_G(NL, R2);
    float D = GGX_D(NH, R2);
    vec3 specl = vec3(0.5) * G * D * 0.25 / NV;

    vec3 fragColor = diff * K + spec * F * 0.5 + specl;

    fragColor = mix(fragColor, vec3(1.0), min(1.0, vDepth * vDepth));

    fragColor = pow(fragColor, vec3(1.0 / 2.2));
    gl_FragColor = vec4(fragColor, 1.0);
}
