#version 300 es
precision highp float;

uniform sampler2D sr_texture;

in vec2 v_pos;
out vec4 outColor;

void main() {
    vec2 uv = (v_pos + 1.0) * 0.5;
    float vk = 1.0 - pow(dot(v_pos, v_pos), 2.0) * 0.05;
    vec4 color = texture(sr_texture, uv) * vk;
    outColor = vec4(color.xyz, 1.0);
}
