uniform float uTime;

varying vec3 vNormal;
varying float vWave;

const float AMPLITUDE = 0.2;
const float FREQUENCY = 4.0;
const float SPEED = 2.5;

void main() {
  // "+ uTime" fait voyager la vague vers les x négatifs : de droite à gauche
  float phase = position.x * FREQUENCY + uTime * SPEED;
  float wave = sin(phase);
  vec3 displaced = position + vec3(0.0, 0.0, wave * AMPLITUDE);

  // Normale déduite de la pente de la vague
  float slope = cos(phase) * AMPLITUDE * FREQUENCY;
  vNormal = normalize(normalMatrix * vec3(-slope, 0.0, 1.0));
  vWave = wave;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
