#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform sampler2D amap;
uniform sampler2D nmap;
uniform sampler2D pmap;

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
    if (n.y < 0.0) ret = vec3(0.89, 0.79, 0.63);
    return ret;
}

vec3 getNormale() {
    vec3 q0 = dFdx(vPos);
    vec3 q1 = dFdy(vPos);
    vec2 st0 = dFdx(vUv);
    vec2 st1 = dFdy(vUv);

    vec3 S = normalize(q0 * st1.t - q1 * st0.t);
    vec3 T = normalize(-q0 * st1.s + q1 * st0.s);
    vec3 N = normalize(vNor);

    vec3 NfromST = cross(S, T);
    if (dot(NfromST, N) < 0.0) {
        S *= -1.0;
        T *= -1.0;
    }

    mat3 TSN = mat3(S, T, N);
    vec3 nor = texture2D(nmap, vUv).rgb * 2.0 - vec3(1.0);
    return normalize(TSN * nor);
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
    vec3 N = getNormale();
    vec3 H = normalize(V + L);

    vec3 phy = texture2D(pmap, vUv).rgb;

    float R = phy.r;
    float M = phy.g;
    float AO = phy.b;
    float R2 = R * R;

    vec3 albedo = texture2D(amap, vUv).rgb;

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
