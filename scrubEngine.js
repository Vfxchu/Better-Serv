// scrubEngine.js
// Handles frame preloading, Three.js scene, and scroll-based texture scrubbing.

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';
import { vertexShader, fragmentShader } from './tunnelShader.js';

const TOTAL_FRAMES = 190;
const FRAME_DIR    = './HeroFrames/';
const FRAME_PREFIX = 'ezgif-frame-';
const FRAME_EXT    = '.jpg';

function padIndex(i) {
  return String(i).padStart(3, '0');
}

export class ScrubEngine {
  constructor(canvas) {
    this.canvas   = canvas;
    this.frames   = [];           // HTMLImageElement[]
    this.textures = [];           // THREE.Texture[]
    this.memory   = [];           // ImageBitmap[] (for texture recycling)
    this.loaded   = 0;
    this.progress = 0;            // 0‥1 – set from outside (ScrollTrigger)
    this._raf     = null;
    this._running = false;

    // ── Three.js bootstrap ──────────────────────────────────────────────
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    this.scene  = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Plane fills the whole "screen"
    const geo = new THREE.PlaneGeometry(2, 2);

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture:    { value: null },
        uProgress:   { value: 0.0 },
        uResolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
      },
    });

    this.mesh = new THREE.Mesh(geo, this.material);
    this.scene.add(this.mesh);

    // Resize observer keeps renderer in sync
    this._ro = new ResizeObserver(() => this._onResize());
    this._ro.observe(canvas.parentElement || document.body);
  }

  // ── Public API ────────────────────────────────────────────────────────

  /** Returns a Promise that resolves when the FIRST frame is usable. */
  async preload(onProgress) {
    return new Promise((resolve) => {
      let firstFrameResolved = false;

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.decoding = 'async';
        const idx   = padIndex(i);
        img.src      = `${FRAME_DIR}${FRAME_PREFIX}${idx}${FRAME_EXT}`;
        const frameIndex = i - 1;

        img.onload = () => {
          this.frames[frameIndex] = img;
          this.loaded++;

          if (typeof onProgress === 'function') {
            onProgress(this.loaded / TOTAL_FRAMES);
          }

          // Resolve as soon as frame 0 is ready
          if (frameIndex === 0 && !firstFrameResolved) {
            firstFrameResolved = true;
            this._applyFrame(0);
            resolve();
          }

          // Also resolve if frames arrived out of order and 0 wasn't first
          if (!firstFrameResolved && i === 1 && this.frames[0]) {
            firstFrameResolved = true;
            this._applyFrame(0);
            resolve();
          }
        };

        img.onerror = () => {
          // Skip missing frames gracefully
          this.loaded++;
          if (!firstFrameResolved && this.loaded === TOTAL_FRAMES) {
            firstFrameResolved = true;
            resolve();
          }
        };
      }
    });
  }

  /** Call this every time ScrollTrigger reports new progress (0‥1). */
  setProgress(p) {
    this.progress = Math.max(0, Math.min(1, p));
    this.material.uniforms.uProgress.value = this.progress;

    const frameIdx = Math.round(this.progress * (TOTAL_FRAMES - 1));
    this._applyFrame(frameIdx);
  }

  /** Start the render loop. */
  start() {
    if (this._running) return;
    this._running = true;
    this._loop();
  }

  /** Stop the render loop (e.g. when hero section leaves viewport). */
  stop() {
    this._running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  dispose() {
    this.stop();
    this._ro.disconnect();
    this.textures.forEach(t => t && t.dispose());
    this.renderer.dispose();
  }

  // ── Private helpers ───────────────────────────────────────────────────

  _applyFrame(idx) {
    const img = this.frames[idx];
    if (!img) return;

    // Reuse or create texture
    if (!this.textures[idx]) {
      const tex = new THREE.Texture(img);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      this.textures[idx] = tex;
    }

    if (this.material.uniforms.uTexture.value !== this.textures[idx]) {
      this.material.uniforms.uTexture.value = this.textures[idx];
    }
  }

  _loop() {
    if (!this._running) return;
    this._raf = requestAnimationFrame(() => this._loop());
    this.renderer.render(this.scene, this.camera);
  }

  _onResize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    this.renderer.setSize(w, h, false);
    this.material.uniforms.uResolution.value.set(w, h);
  }
}
