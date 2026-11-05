// Home hero: a field of LED "light poles" rendered in a single fragment shader.
// Progressive enhancement: the CSS gradient stays visible if WebGL is unavailable,
// rendering stops off-screen / in background tabs, and reduced motion gets a still frame.
const canvas = document.querySelector('[data-hero-canvas]');

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uScroll;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

vec3 palette(float t) {
  // warm stage palette: deep amber -> orange -> warm white, with a touch of magenta
  vec3 a = vec3(0.85, 0.45, 0.18);
  vec3 b = vec3(0.35, 0.30, 0.25);
  vec3 c = vec3(1.0, 0.9, 0.8);
  vec3 d = vec3(0.0, 0.12, 0.30);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Grid of LED columns ("poles"); fewer columns on narrow screens
  float cols = clamp(floor(aspect * 9.0), 7.0, 22.0);
  float colW = aspect / cols;
  float ledH = colW * 0.55;
  vec2 cell = vec2(floor(p.x / colW), floor(p.y / ledH));
  vec2 local = vec2(fract(p.x / colW), fract(p.y / ledH)) - 0.5;

  float colSeed = hash(vec2(cell.x, 3.0));
  // each pole has its own height and phase
  float poleTop = 0.35 + 0.6 * hash(vec2(cell.x, 9.0));
  float ny = cell.y * ledH;

  // WLED-like effects: travelling wave + per-column chase + slow breathing
  float t = uTime * 0.6;
  float wave = 0.5 + 0.5 * sin(cell.x * 0.55 - t * 1.4 + ny * 4.0);
  float chase = smoothstep(0.85, 1.0, sin(ny * 9.0 - t * (2.0 + colSeed * 3.0) + colSeed * 20.0));
  float breathe = 0.6 + 0.4 * sin(t * 0.7 + colSeed * 6.28);

  // pointer: brighten and warm the poles near the cursor
  vec2 pp = vec2(uPointer.x * aspect, uPointer.y);
  float d = distance(vec2((cell.x + 0.5) * colW, ny + ledH * 0.5), pp);
  float near = exp(-d * d * 9.0);

  float intensity = (0.18 + 0.55 * wave * breathe + 0.9 * chase + 1.2 * near);
  // poles fade towards their top, and the whole field dims as the user scrolls away
  intensity *= smoothstep(poleTop + 0.05, poleTop - 0.25, ny) * (1.0 - uScroll * 0.8);

  // round LED with soft glow
  float r = length(local * vec2(1.0, 0.9));
  float core = smoothstep(0.22, 0.05, r);
  float glow = exp(-r * r * 9.0) * 0.55;

  vec3 col = palette(colSeed * 0.35 + wave * 0.25 + uTime * 0.02 + near * 0.2);
  vec3 led = col * intensity * (core + glow);

  // ambient bloom from the pointer
  float halo = exp(-distance(p, pp) * 2.4) * 0.22;
  vec3 bg = vec3(0.055, 0.047, 0.043) + vec3(1.0, 0.55, 0.2) * halo;

  // vignette
  float vig = smoothstep(1.25, 0.35, length((uv - vec2(0.55, 0.6)) * vec2(aspect * 0.8, 1.0)));
  vec3 color = (bg + led) * mix(0.35, 1.0, vig);
  gl_FragColor = vec4(color, 1.0);
}`;

function init() {
  if (!canvas) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (saveData) return;

  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  let prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) {
    return; // keep CSS fallback
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'uRes');
  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uPointer = gl.getUniformLocation(prog, 'uPointer');
  const uScroll = gl.getUniformLocation(prog, 'uScroll');

  const pointer = { x: 0.7, y: 0.55, tx: 0.7, ty: 0.55 };
  let scroll = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  };

  const draw = (time) => {
    resize();
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, time / 1000);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.uniform1f(uScroll, scroll);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  canvas.classList.add('is-ready');

  if (reduce) {
    draw(12000);
    window.addEventListener('resize', () => draw(12000));
    return;
  }

  const hero = canvas.parentElement;
  hero.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.tx = (e.clientX - r.left) / r.width;
    pointer.ty = 1 - (e.clientY - r.top) / r.height;
  }, { passive: true });
  window.addEventListener('scroll', () => {
    scroll = Math.min(1, window.scrollY / (hero.offsetHeight || 1));
  }, { passive: true });

  let visible = true;
  let raf = 0;
  const loop = (t) => { draw(t); raf = requestAnimationFrame(loop); };
  const update = () => {
    const run = visible && !document.hidden;
    if (run && !raf) raf = requestAnimationFrame(loop);
    if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
  };
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }).observe(hero);
  document.addEventListener('visibilitychange', update);
  update();
}

// Defer the GPU work until the browser is idle so it never competes with first paint
('requestIdleCallback' in window ? requestIdleCallback : (cb) => setTimeout(cb, 200))(init);
