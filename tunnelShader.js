// tunnelShader.js
// Custom GLSL shaders for the Hero zoom/lens distortion effect

export const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */`
  uniform sampler2D uTexture;
  uniform float uProgress;   // 0.0 → 1.0 (scroll progress)
  uniform vec2 uResolution;  // canvas size in pixels
  varying vec2 vUv;

  // Subtle barrel/zoom distortion centred at vec2(0.5,0.5)
  vec2 distort(vec2 uv, float strength) {
    vec2 centered = uv - 0.5;
    float dist = length(centered);
    float factor = 1.0 + dist * dist * strength;
    return centered / factor + 0.5;
  }

  void main() {
    // Zoom scale driven by scroll: 1.0 → 1.25
    float zoomScale = 1.0 + uProgress * 0.25;

    // Apply zoom from centre
    vec2 centered = vUv - 0.5;
    vec2 zoomed = centered / zoomScale + 0.5;

    // Lens distortion — subtle concave warp (strength goes 0 → -0.4)
    float distortStrength = -0.4 * uProgress;
    vec2 distorted = distort(zoomed, distortStrength);

    // Clamp so we never sample outside the texture
    distorted = clamp(distorted, 0.001, 0.999);

    vec4 texColor = texture2D(uTexture, distorted);

    // Slight brightness lift at the start to feel cinematic
    float brightness = 1.0 + (1.0 - uProgress) * 0.15;
    gl_FragColor = vec4(texColor.rgb * brightness, texColor.a);
  }
`;
