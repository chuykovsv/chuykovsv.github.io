#version 300 es
precision highp float;

uniform samplerCube sr_texture;

in vec3 v_pos;
out vec4 outColor;

vec3 linearToSrgb(vec3 color) {
    return max(vec3(0.0), 1.055 * (pow(color, vec3(1.0 / 2.4))) - 0.055);
}

void main() {
    vec3 uv = normalize(v_pos);
    vec3 color = texture(sr_texture, uv).xyz * 0.002;
    outColor = vec4(linearToSrgb(color), 1.0);
}
