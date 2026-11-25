/* Phase 24 — Vanilla WebGL ports of React Bits Aurora & Grainient (JS-CSS registry shaders, verbatim).
   No React runtime / no dependencies. Interactions & click-swirl disabled; light mode.
   Falls back to CSS gradients if WebGL2 unavailable; static frame under prefers-reduced-motion.

   Phase 25 — Slow color life (homepage hero only):
   • 流光 (grainient): seamless palette cycle across pastel tones, period 28s (24–32s band).
   • 光幕 (aurora):     independent slow color breathing, period 42s (36–48s band), plus a tiny brightness breath.
   Palette/period/opacity live in BG below (single source of truth; mirrored by CSS vars in hero-bg.css).
   Only the hero layers cycle; case-page inner-aurora stays as-is. */
const { AURORA_VERTEX, AURORA_FRAGMENT, GRAINIENT_VERTEX, GRAINIENT_FIELD, GRAINIENT_COMPOSITE } = window.RB_SHADERS;

/* ---- Light-effect design tokens (reference colors, not page background) ---- */
const BG = Object.freeze({
  base: '#F2F4F7',
  mist: '#A99BD4',   // 雾紫
  cool: '#92ADD2',   // 冷蓝
  teal: '#95BDB9',   // 灰青
  pink: '#C7A4BF',   // 淡粉
  warm: '#E5DFD6',   // 柔和暖白
  flowPeriod: 28,        // 流光完整循环（秒）
  curtainPeriod: 42,     // 光幕完整循环（秒）
  curtainBreath: 0.05,   // 光幕亮度呼吸幅度
  flowOpacity: 0.90,
  curtainOpacity: 0.90,
  sharpness: 1           // 混色柔和度（1=平滑）
});

/* Cyclic palette keyframes (each loops back to the first → no seam). */
const AURORA_PALETTES = [
  ['#A99BD4', '#92ADD2', '#95BDB9'],
  ['#92ADD2', '#95BDB9', '#C7A4BF'],
  ['#95BDB9', '#C7A4BF', '#A99BD4'],
  ['#C7A4BF', '#A99BD4', '#92ADD2']
];
const FLOW_PALETTES = [
  ['#F2F4F7', '#A99BD4', '#92ADD2', '#95BDB9', '#C7A4BF'],
  ['#F2F4F7', '#92ADD2', '#95BDB9', '#C7A4BF', '#A99BD4'],
  ['#F2F4F7', '#95BDB9', '#C7A4BF', '#A99BD4', '#92ADD2'],
  ['#F2F4F7', '#C7A4BF', '#A99BD4', '#92ADD2', '#95BDB9']
];

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });

function hexToRgb(value) {
  let rgb = [1, 1, 1];
  if (probe) {
    probe.clearRect(0, 0, 1, 1);
    probe.fillStyle = '#ffffff';
    probe.fillStyle = value;
    probe.fillRect(0, 0, 1, 1);
    const d = probe.getImageData(0, 0, 1, 1).data;
    rgb = [d[0] / 255, d[1] / 255, d[2] / 255];
  }
  return rgb;
}
function toOklch(rgb) {
  const [r, g, b] = rgb.map(c => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const lab = [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  ];
  return [lab[0], Math.hypot(lab[1], lab[2]), Math.atan2(lab[2], lab[1])];
}
function unwrapHues(stops) {
  const known = stops.findIndex(s => s[1] > 0.02);
  let prev = known === -1 ? 0 : stops[known][2];
  return stops.map(s => {
    let hue = s[1] > 0.02 ? s[2] : prev;
    while (hue - prev > Math.PI) hue -= Math.PI * 2;
    while (hue - prev < -Math.PI) hue += Math.PI * 2;
    prev = hue;
    return [s[0], s[1], hue];
  });
}
function toLinear(rgb) { return rgb.map(c => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))); }
function toLab(rgb) {
  const [r, g, b] = toLinear(rgb);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  ];
}
function compile(gl, type, src) { const sh = gl.createShader(type); if (!sh) return null; gl.shaderSource(sh, src); gl.compileShader(sh); if (gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return sh; gl.deleteShader(sh); return null; }
function link(gl, vs, fs, attrib) {
  const v = compile(gl, gl.VERTEX_SHADER, vs), f = compile(gl, gl.FRAGMENT_SHADER, fs), p = gl.createProgram();
  if (!v || !f || !p) return null;
  gl.attachShader(p, v); gl.attachShader(p, f);
  if (attrib) gl.bindAttribLocation(p, 0, attrib);
  gl.linkProgram(p); gl.deleteShader(v); gl.deleteShader(f);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { gl.deleteProgram(p); return null; }
  const uniforms = {}; const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < n; i++) { const info = gl.getActiveUniform(p, i); if (info) uniforms[info.name.replace('[0]', '')] = gl.getUniformLocation(p, info.name); }
  return { program: p, uniforms };
}
function dprCap() { return Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.25 : 1.6); }

/* ---- Cyclic blending helpers (seamless, weight-normalised) ---- */
function weightsAt(elapsed, period, k) {
  const theta = 2 * Math.PI * (((elapsed % period) + period) % period) / period;
  const w = new Array(k); let sum = 0;
  for (let i = 0; i < k; i++) { const v = 0.5 * (1 + Math.cos(theta - 2 * Math.PI * i / k)); const p = Math.pow(v, BG.sharpness); w[i] = p; sum += p; }
  if (sum <= 0) { w.fill(0); w[0] = 1; sum = 1; }
  for (let i = 0; i < k; i++) w[i] /= sum;
  return w;
}
function fillAuroraPalette(out, rgbPals, weights) {
  const n = rgbPals[0].length, rgb = [];
  for (let i = 0; i < n; i++) {
    let r = 0, g = 0, b = 0;
    for (let k = 0; k < rgbPals.length; k++) { const w = weights[k], c = rgbPals[k][i]; r += c[0] * w; g += c[1] * w; b += c[2] * w; }
    rgb.push([r, g, b]);
  }
  unwrapHues(rgb.map(toOklch)).forEach((v, i) => out.set(v, i * 3));
}
function buildRamp(colors) {
  const labs = colors.map(v => toLab(hexToRgb(v))); const LIFT = .06;
  const blanks = labs.map(([L]) => Math.abs(L - labs[0][0]) < .1);
  const tints = labs.filter((_, i) => !blanks[i]).reverse();
  const ramp = new Float32Array(colors.length * 3);
  labs.forEach((_, i) => { const [L, a, b] = blanks[i] ? [1, 0, 0] : tints.shift(); ramp.set([L + (1 - L) * LIFT, a * (1 - LIFT), b * (1 - LIFT)], i * 3); });
  return ramp;
}
function blendRamp(out, rampsK, weights) {
  out.fill(0);
  for (let k = 0; k < rampsK.length; k++) { const w = weights[k], src = rampsK[k]; for (let i = 0; i < out.length; i++) out[i] += src[i] * w; }
}

/* ---------------- Aurora (光幕) ---------------- */
function initAurora(layer, overrides = {}, opts = {}) {
  const cycle = !!opts.cycle;
  const canvas = document.createElement('canvas'); canvas.className = 'aurora-canvas'; layer.appendChild(canvas);
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
  if (!gl) { canvas.remove(); return; }
  const prog = link(gl, AURORA_VERTEX, AURORA_FRAGMENT, 'aPosition'); if (!prog) { canvas.remove(); return; }
  layer.classList.add('has-canvas');
  const S = { stops: ['#BDAAF1', '#B6D5F3', '#D2C2F2'], amplitude: .78, blend: .48, speed: 2.2, height: .48, scale: .85, glow: .55, brightness: 1.1, layers: 2, opacity: cycle ? BG.curtainOpacity : .86, ...overrides };
  const u = prog.uniforms, vao = gl.createVertexArray(), buf = gl.createBuffer();
  gl.bindVertexArray(vao); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const palette = new Float32Array(S.stops.length * 3);
  const rgbPals = AURORA_PALETTES.map(p => p.map(hexToRgb));
  const w0 = new Array(rgbPals.length).fill(0); w0[0] = 1;
  if (cycle) fillAuroraPalette(palette, rgbPals, w0);
  else unwrapHues(S.stops.map(v => toOklch(hexToRgb(v)))).forEach((s, i) => palette.set(s, i * 3));
  let clock = 0, elapsed = 0, reveal = reduceMotion ? 1 : 0, raf = 0, last = 0, visible = true;
  function render() {
    gl.viewport(0, 0, canvas.width, canvas.height); gl.useProgram(prog.program); gl.bindVertexArray(vao);
    gl.uniform2f(u.uResolution, canvas.width, canvas.height);
    gl.uniform1f(u.uTime, clock);
    gl.uniform3fv(u.uStops, palette);
    gl.uniform1i(u.uStopCount, S.stops.length);
    gl.uniform1f(u.uAmplitude, S.amplitude); gl.uniform1f(u.uBlend, S.blend); gl.uniform1f(u.uHeight, S.height);
    gl.uniform1f(u.uScale, S.scale); gl.uniform1f(u.uGlow, S.glow);
    const breath = cycle ? (1 + BG.curtainBreath * Math.sin(2 * Math.PI * elapsed / BG.curtainPeriod + 0.7)) : 1;
    gl.uniform1f(u.uBrightness, S.brightness * breath);
    gl.uniform1i(u.uLayers, S.layers); gl.uniform1f(u.uFlip, 0);
    gl.uniform3f(u.uPointer, 0, .5, 0);           /* interactions disabled */
    gl.uniform1f(u.uReveal, 1 - Math.pow(1 - reveal, 3));
    gl.uniform1f(u.uOpacity, S.opacity); gl.uniform1f(u.uLightMode, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function resize() { const r = dprCap(); canvas.width = Math.max(1, Math.round(layer.clientWidth * r)); canvas.height = Math.max(1, Math.round(layer.clientHeight * r)); render(); }
  function frame(now) {
    raf = 0; if (document.hidden || !visible) { last = 0; return; }
    const heroEl = document.querySelector('.hero-v2x');
    if (heroEl && heroEl.getAttribute('data-bg') !== 'aurora') { last = 0; raf = requestAnimationFrame(frame); return; }
    const dt = last ? clamp((now - last) / 1000, .0005, .05) : 1 / 60; last = now;
    if (!reduceMotion) {
      clock += dt * S.speed; reveal = Math.min(1, reveal + dt / 2.4); elapsed += dt;
      if (cycle) fillAuroraPalette(palette, rgbPals, weightsAt(elapsed, BG.curtainPeriod, rgbPals.length));
    }
    render();
    if (!reduceMotion) raf = requestAnimationFrame(frame); else last = 0;
  }
  function wake() { if (!raf && !reduceMotion) raf = requestAnimationFrame(frame); else if (reduceMotion) render(); }
  new ResizeObserver(resize).observe(layer);
  if (layer.classList.contains('inner-aurora-layer') && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); }, { threshold: 0 }).observe(layer);
  }
  resize(); wake();
  return { wake, render };
}

/* ---------------- Grainient (流光) ---------------- */
function initGrainient(layer, opts = {}) {
  const cycle = !!opts.cycle;
  const canvas = document.createElement('canvas'); canvas.className = 'grainient-canvas'; layer.appendChild(canvas);
  const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, depth: false, stencil: false });
  if (!gl) { canvas.remove(); return; }
  const field = link(gl, GRAINIENT_VERTEX, GRAINIENT_FIELD), comp = link(gl, GRAINIENT_VERTEX, GRAINIENT_COMPOSITE);
  if (!field || !comp) { canvas.remove(); return; }
  layer.classList.add('has-canvas');
  const S = { colors: layer.closest('.home-v2') ? ['#E2EAF3', '#749CE4', '#FFF2AE', '#B4CEE9', '#E2EAF3'] : ['#F2F4F7', '#C9BDF1', '#BFD8F2', '#DED2F4', '#F2F4F7'], type: 0, angle: 55, bands: 1, speed: .72, flow: .85, scale: 1, softness: .88, silk: .2, grainAmount: .052, grainSize: 1.1, grainAnimated: true, contrast: 1.02, saturation: 1, variation: 0, interactive: false, clickSwirl: false, intro: false, opacity: cycle ? BG.flowOpacity : 1 };
  if (cycle) S.colors = FLOW_PALETTES[0];
  const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
  const target = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, target);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const buffer = gl.createFramebuffer(); const fieldSize = { w: 0, h: 0 };
  const ramp = new Float32Array(5 * 3), stirs = new Float32Array(24 * 4), stirW = new Float32Array(24), twirls = new Float32Array(4 * 4);
  const rampsK = (cycle ? FLOW_PALETTES : [S.colors]).map(buildRamp);
  ramp.set(rampsK[0]);
  let time = 0, elapsed = 0, grainFrame = 0, raf = 0, last = 0, grainClock = 0;
  function draw() {
    const f = field.uniforms, c = comp.uniforms;
    gl.bindVertexArray(vao); gl.disable(gl.BLEND); gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
    gl.viewport(0, 0, fieldSize.w, fieldSize.h); gl.useProgram(field.program);
    gl.uniform1f(f.uAspect, canvas.width / canvas.height); gl.uniform1f(f.uTime, time);
    gl.uniform3fv(f.uRamp, ramp); gl.uniform1i(f.uCount, 5);
    const rad = S.angle * Math.PI / 180;
    gl.uniform1i(f.uType, S.type); gl.uniform2f(f.uDir, Math.sin(rad), Math.cos(rad));
    gl.uniform1f(f.uExtent, (canvas.width / canvas.height) * Math.abs(Math.sin(rad)) + Math.abs(Math.cos(rad)));
    gl.uniform1f(f.uBands, S.bands); gl.uniform1f(f.uSoftness, S.softness); gl.uniform1f(f.uFlow, S.flow);
    gl.uniform1f(f.uScale, S.scale); gl.uniform1f(f.uSilk, S.silk);
    gl.uniform4fv(f.uStir, stirs); gl.uniform1fv(f.uStirWeight, stirW); gl.uniform4fv(f.uTwirl, twirls);
    gl.uniform2f(f.uSeed, 0, 0); gl.uniform1f(f.uContrast, S.contrast); gl.uniform1f(f.uSaturation, S.saturation);
    gl.uniform1f(f.uSettle, 1); gl.uniform1f(f.uReveal, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, canvas.width, canvas.height); gl.useProgram(comp.program);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, target); gl.uniform1i(c.uField, 0);
    gl.uniform1f(c.uGrain, S.grainAmount); gl.uniform1f(c.uGrainSize, S.grainSize * dprCap()); gl.uniform1f(c.uFrame, grainFrame);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function resize() {
    const r = dprCap(); const W = Math.max(1, Math.round(layer.clientWidth * r)), H = Math.max(1, Math.round(layer.clientHeight * r));
    canvas.width = W; canvas.height = H;
    const w = Math.max(1, Math.round(W / 2)), h = Math.max(1, Math.round(H / 2));
    if (w !== fieldSize.w || h !== fieldSize.h) {
      fieldSize.w = w; fieldSize.h = h;
      gl.bindTexture(gl.TEXTURE_2D, target); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, buffer); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    draw();
  }
  function frame(now) {
    raf = 0; if (document.hidden) return;
    const heroEl = document.querySelector('.hero-v2x');
    if (heroEl && heroEl.getAttribute('data-bg') !== 'grainient') { last = 0; raf = requestAnimationFrame(frame); return; }
    const dt = last ? clamp((now - last) / 1000, .001, .05) : 1 / 60; last = now;
    time += dt * S.speed * .5; grainClock += dt; elapsed += dt;
    if (S.grainAnimated && grainClock > 1 / 16) { grainClock = 0; grainFrame = (grainFrame + 1) % 97; }
    if (cycle && !reduceMotion) blendRamp(ramp, rampsK, weightsAt(elapsed, BG.flowPeriod, rampsK.length));
    draw(); raf = requestAnimationFrame(frame);
  }
  function wake() { if (!raf && !reduceMotion) raf = requestAnimationFrame(frame); else if (reduceMotion) draw(); }
  new ResizeObserver(resize).observe(layer);
  resize(); wake();
  return { wake, render: draw };
}

function boot() {
  const hero = document.querySelector('.hero-v2x');
  const aLayer = hero?.querySelector('.bg-aurora');
  const gLayer = hero?.querySelector('.bg-grainient');
  const a = aLayer ? initAurora(aLayer, { opacity: BG.curtainOpacity }, { cycle: true }) : null;
  const g = gLayer ? initGrainient(gLayer, { cycle: true }) : null;
  const innerLayer = document.querySelector('.inner-aurora-layer');
  const inner = innerLayer ? initAurora(innerLayer, {
    stops: ['#6999E9', '#F6E9A2', '#99BDE7'],
    amplitude: .62, blend: .7, speed: .85, height: .42,
    scale: .8, glow: .6, brightness: 1.05, layers: 2, opacity: .72
  }, { cycle: false }) : null;
  /* ensure only the active scheme animates: pause inactive by skipping frames */
  document.addEventListener('visibilitychange', () => { if (a) a.wake(); if (g) g.wake(); if (inner) inner.wake(); });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
