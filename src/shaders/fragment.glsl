varying vec3 vNormal;
varying float vWave;

void main() {
  vec3 colorA = vec3(0.15, 0.1, 0.5);
  vec3 colorB = vec3(1.0, 0.4, 0.6);
  vec3 color = mix(colorA, colorB, vWave * 0.5 + 0.5);

  // Eclairage 
  float light = dot(normalize(vNormal), normalize(vec3(0.5, 1.0, 1.0))) * 0.5 + 0.5;

  gl_FragColor = vec4(color * light, 1.0);

  #include <colorspace_fragment>
}
