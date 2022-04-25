#version 300 es
layout(location = 0) in vec3 position;

layout(std140) uniform tn_camera { mat4 tn_pm; mat4 tn_vm; } ol;

out vec3 v_pos;

void main() {
    v_pos = position.xyz;
    gl_Position = (ol.tn_pm * vec4(mat3(ol.tn_vm) * position, 1.0)).xyww; // XYWW делает Z == 1!
}
