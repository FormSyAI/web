import { useEffect, useRef } from 'react';

type BannerShaderProps = {
  className?: string;
};

/*
 * Nova burst for the AURINOVA banner.
 *
 * The field pass paints an ignition: a gold-white core, ice-blue shock
 * shells, coronal filaments, and ejecta. A second pass keeps the site's
 * rectangular glyph grain so the burst still reads as a data field.
 */
const VERTEX_SHADER = `#version 300 es
void main() {
  vec2 position = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}
`;

const FIELD_SHADER = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uDarkBackground;
out vec4 fragColor;

const float CYCLE = 10.5;
const vec3 GOLD = vec3(1.18, 0.78, 0.30);
const vec3 HOT = vec3(1.28, 1.14, 0.92);
const vec3 ICE = vec3(0.46, 0.76, 1.2);
const vec3 DEEP = vec3(0.10, 0.30, 0.64);

float hash11(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    value += amplitude * noise(p);
    p = mat2(0.8, 0.6, -0.6, 0.8) * p * 2.02;
    amplitude *= 0.5;
  }
  return value;
}

float blueNoise(vec2 p, float frame) {
  p += 5.588238 * mod(frame, 64.0);
  return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
}

// Hard crest, gold inner lip, blue outer wash. The wake stays in a
// thin band behind the front so the burst never fills the hero.
vec3 shockShell(float r, float ang, float age) {
  float wobble = sin(ang * 5.0 + age * 1.6) * 0.016 * age
    + sin(ang * 12.0 - age * 0.7) * 0.008 * age;
  float radius = 0.045 + age * 0.092 + wobble;
  float width = 0.011 + age * 0.0032;
  float delta = r - radius;
  float fade = exp(-age * 0.23) * smoothstep(0.0, 0.28, age);
  float knots = 0.55 + 0.7 * pow(0.5 + 0.5 * sin(ang * 7.0 + age * 2.2), 5.0);
  float crest = exp(-pow(delta / width, 2.0));
  float front = exp(-pow(max(delta, 0.0) / (width * 1.7), 2.0));
  float lip = exp(-pow(max(-delta, 0.0) / (width * 1.05), 2.0));
  float wake = exp(-pow(max(-delta, 0.0) / 0.042, 2.0));
  float streaks = pow(abs(sin(ang * 16.0 - r * 5.0 + age * 0.8)), 4.0);

  vec3 color = ICE * front * fade * 0.42 * knots;
  color += HOT * crest * fade * 0.72 * knots;
  color += GOLD * lip * fade * 0.48 * knots;
  color += mix(DEEP, ICE, streaks) * wake * fade * 0.16;
  return color;
}

float ejecta(vec2 p, float t) {
  float acc = 0.0;
  for (int i = 0; i < 16; i++) {
    float id = float(i);
    float seed = hash11(id + 2.3);
    float seed2 = hash11(id + 11.7);
    float age = mod(t - seed * CYCLE, CYCLE);
    float life = age / CYCLE;
    float dir = id * 2.39996323 + seed * 0.55;
    dir += sin(t * 0.32 + seed * 12.0) * 0.14;
    float rad = 0.03 + age * (0.085 + seed2 * 0.15);
    vec2 heading = vec2(cos(dir), sin(dir));
    vec2 head = heading * rad;
    float fade = smoothstep(0.0, 0.07, life) * smoothstep(1.0, 0.18, life);
    float twinkle = 0.58 + 0.42 * sin(t * (4.2 + seed * 6.0) + seed * 40.0);
    float headDist = length(p - head);
    acc += exp(-headDist * headDist / 0.00026) * fade * twinkle;
    float tailDist = length(p - head + heading * (0.028 + life * 0.045));
    acc += exp(-tailDist * tailDist / 0.00085) * fade * 0.32;
  }
  return acc;
}

void main() {
  vec2 resolution = iResolution.xy;
  vec2 pos = (gl_FragCoord.xy - 0.5 * resolution) / resolution.y;
  vec2 p = pos - vec2(0.02, -0.18);
  float r = length(p);
  float ang = atan(p.y, p.x);
  float t = iTime + 2.4;
  float ageA = mod(t, CYCLE);
  float ageB = mod(t + CYCLE * 0.5, CYCLE);
  float flash = exp(-ageA * 3.2) * 0.38 + exp(-ageB * 3.2) * 0.15;
  float pulse = 0.9 + 0.1 * sin(t * 1.6);

  vec3 glow = vec3(0.0);

  vec2 nebulaCoord = p * 1.7 + vec2(t * 0.03, -t * 0.02);
  float nebula = fbm(nebulaCoord + fbm(nebulaCoord * 1.8 + t * 0.04) * 0.45);
  nebula = smoothstep(0.42, 0.92, nebula) * exp(-r * 1.15);
  glow += DEEP * nebula * 0.1;
  glow += ICE * nebula * 0.035;

  float corona = exp(-r * r * 14.0) * pulse;
  float core = exp(-r * r * 90.0) * pulse;
  float bloom = exp(-r * r * 10.0) * flash;
  glow += mix(ICE, GOLD, exp(-r * 5.5)) * corona * 0.16;
  glow += mix(GOLD, HOT, 0.7) * core * (0.85 + flash);
  glow += HOT * bloom * 0.13;

  float spin = ang + t * 0.05;
  float warp = sin(spin * 3.0 + fbm(vec2(spin * 1.15, t * 0.1)) * 2.0);
  float fineRays = pow(abs(sin(spin * 10.0 + warp * 1.8)), 16.0);
  float broadRays = pow(0.5 + 0.5 * sin(spin * 5.0 - t * 0.2), 4.0);
  float rays = (fineRays * 0.85 + broadRays * 0.16) * exp(-r * 3.4);
  rays *= 0.65 + flash;
  glow += mix(GOLD, ICE, 0.5) * rays * 0.42;

  glow += shockShell(r, ang, ageA);
  glow += shockShell(r, ang, ageB) * 0.72;
  glow += shockShell(r, ang, mod(t * 0.38 + 4.0, 18.0)) * 0.16;

  float sparks = ejecta(p, t);
  glow += HOT * sparks * 0.55;
  glow += GOLD * sparks * 0.22;

  glow *= mix(1.0, 0.38, smoothstep(-0.02, 0.34, pos.y));
  glow *= 0.82;

  vec3 x = max(glow, 0.0);
  glow = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  glow = pow(clamp(glow, 0.0, 1.0), vec3(0.94, 0.98, 1.05));
  float edge = smoothstep(0.42, 1.45, length(pos));
  glow *= 1.0 - edge * 0.72;
  vec3 color = uDarkBackground + glow * (1.0 - uDarkBackground);
  color += (blueNoise(gl_FragCoord.xy, floor(iTime * 24.0)) - 0.5) / 255.0;
  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

const RARITY_SHADER = `#version 300 es
precision highp float;

uniform sampler2D tScene;
uniform sampler2D tGlyphs;
uniform vec2 iResolution;
uniform vec3 uDarkBackground;
uniform float uPixelRatio;
out vec4 fragColor;

const float uStrength = 1.05;
const float uScale = 0.76;
const float uGlyphCount = 10.0;
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

vec3 sceneInk(vec2 uv) {
  return max(texture(tScene, clamp(uv, 0.0, 1.0)).rgb - uDarkBackground, 0.0);
}

vec3 ascii(vec2 frag) {
  vec2 cellPx = vec2(0.62, 1.0) * floor(uScale * 9.0 * uPixelRatio + 0.5);
  vec2 cell = floor(frag / cellPx);
  vec2 centre = (cell + 0.5) * cellPx;
  vec3 ink = vec3(0.0);
  ink += sceneInk(centre / iResolution) * 2.0;
  ink += sceneInk((centre + cellPx * vec2(0.3, 0.3)) / iResolution);
  ink += sceneInk((centre + cellPx * vec2(-0.3, 0.3)) / iResolution);
  ink += sceneInk((centre + cellPx * vec2(0.3, -0.3)) / iResolution);
  ink += sceneInk((centre + cellPx * vec2(-0.3, -0.3)) / iResolution);
  ink /= 6.0;
  float level = pow(clamp(dot(ink, LUMA) * (0.9 + 0.3 * uStrength), 0.0, 1.0), 0.9);
  float glyph = floor(level * (uGlyphCount - 1.0) + 0.5);
  vec2 local = (frag - cell * cellPx) / cellPx;
  vec2 atlas = vec2((glyph + local.x) / uGlyphCount, local.y);
  float mask = texture(tGlyphs, atlas).r;
  vec3 under = sceneInk(frag / iResolution) * 0.5;
  return under + ink * mask;
}

void main() {
  vec3 ink = ascii(gl_FragCoord.xy);
  fragColor = vec4(clamp(uDarkBackground + ink, 0.0, 1.0), 1.0);
}
`;

const GLYPH_COUNT = 10;
const GLYPH_CELL = { width: 48, height: 80 };
const GLYPH_MIP_LEVELS = 5;
const MAX_PIXELS = 1_800_000;
const MAX_FPS = 45;
const FRAME_INTERVAL = 1000 / MAX_FPS;

function parseHex(hex: string) {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match)
    throw new Error(`Background colours must be #rrggbb, got "${hex}".`);
  return [0, 2, 4].map(
    (index) => parseInt(match[1].slice(index, index + 2), 16) / 255,
  );
}

function compile(
  gl: WebGL2RenderingContext,
  fragmentSource: string,
): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error('WebGL could not create a shader program.');
  const vertex = gl.createShader(gl.VERTEX_SHADER);
  const fragment = gl.createShader(gl.FRAGMENT_SHADER);
  if (!vertex || !fragment) throw new Error('WebGL could not create a shader.');

  gl.shaderSource(vertex, VERTEX_SHADER);
  gl.compileShader(vertex);
  gl.shaderSource(fragment, fragmentSource);
  gl.compileShader(fragment);
  if (!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
    throw new Error(
      `Vertex shader failed to compile: ${gl.getShaderInfoLog(vertex)}`,
    );
  }
  if (!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
    throw new Error(
      `Fragment shader failed to compile: ${gl.getShaderInfoLog(fragment)}`,
    );
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Shader failed to link: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}

function getUniforms(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  names: string[],
) {
  return Object.fromEntries(
    names.map((name) => [name, gl.getUniformLocation(program, name)]),
  ) as Record<string, WebGLUniformLocation | null>;
}

function createGlyphAtlas() {
  const width = GLYPH_CELL.width * GLYPH_COUNT;
  const height = GLYPH_CELL.height;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('A 2D canvas context is needed for glyphs.');
  context.fillStyle = '#000';
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#fff';
  const widths = [0.42, 0.48, 0.54, 0.6, 0.66, 0.72, 0.78, 0.84, 0.9, 0.96];
  const heights = [0.32, 0.36, 0.4, 0.44, 0.48, 0.52, 0.56, 0.6, 0.64, 0.68];
  for (let index = 0; index < GLYPH_COUNT; index++) {
    const rectangleWidth = GLYPH_CELL.width * widths[index];
    const rectangleHeight = GLYPH_CELL.height * heights[index];
    context.fillRect(
      index * GLYPH_CELL.width + (GLYPH_CELL.width - rectangleWidth) / 2,
      (height - rectangleHeight) / 2,
      rectangleWidth,
      rectangleHeight,
    );
  }

  const levels: Uint8ClampedArray[] = [
    context.getImageData(0, 0, width, height).data,
  ];
  for (
    let level = 1, currentWidth = width, currentHeight = height;
    level < GLYPH_MIP_LEVELS;
    level++
  ) {
    const source = levels[level - 1];
    const nextWidth = currentWidth / 2;
    const nextHeight = currentHeight / 2;
    const next = new Uint8ClampedArray(nextWidth * nextHeight * 4);
    for (let y = 0; y < nextHeight; y++) {
      for (let x = 0; x < nextWidth; x++) {
        const a = (y * 2 * currentWidth + x * 2) * 4;
        const b = a + 4;
        const c = a + currentWidth * 4;
        const d = c + 4;
        for (let channel = 0; channel < 4; channel++) {
          next[(y * nextWidth + x) * 4 + channel] =
            (source[a + channel] +
              source[b + channel] +
              source[c + channel] +
              source[d + channel] +
              2) >>
            2;
        }
      }
    }
    levels.push(next);
    currentWidth = nextWidth;
    currentHeight = nextHeight;
  }
  return { width, height, levels };
}

function uploadGlyphAtlas(gl: WebGL2RenderingContext) {
  const atlas = createGlyphAtlas();
  const texture = gl.createTexture();
  if (!texture) throw new Error('WebGL could not create the glyph texture.');
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  atlas.levels.forEach((pixels, level) => {
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      gl.RGBA,
      atlas.width >> level,
      atlas.height >> level,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      pixels,
    );
  });
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MAX_LEVEL,
    atlas.levels.length - 1,
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_LINEAR,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}

function createShader(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
  });
  if (!gl) throw new Error('WebGL2 is not available in this browser.');

  const dark = parseHex('#06182d');
  const field = compile(gl, FIELD_SHADER);
  const post = compile(gl, RARITY_SHADER);
  const fieldUniforms = getUniforms(gl, field, [
    'iResolution',
    'iTime',
    'uDarkBackground',
  ]);
  const postUniforms = getUniforms(gl, post, [
    'tScene',
    'tGlyphs',
    'iResolution',
    'uDarkBackground',
    'uPixelRatio',
  ]);
  const framebuffer = gl.createFramebuffer();
  const scene = gl.createTexture();
  if (!framebuffer || !scene) {
    gl.deleteProgram(field);
    gl.deleteProgram(post);
    throw new Error('WebGL could not create the shader framebuffer.');
  }
  gl.bindTexture(gl.TEXTURE_2D, scene);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const glyphs = uploadGlyphAtlas(gl);
  let sceneWidth = 0;
  let sceneHeight = 0;
  let cssWidth = canvas.clientWidth;
  let cssHeight = canvas.clientHeight;
  const deviceRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  const maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
  let frame = 0;
  let elapsed = 0;
  let previous: number | null = null;
  let lastRendered = Number.NEGATIVE_INFINITY;
  let visible = true;
  let disposed = false;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const canDraw = () =>
    !disposed && !document.hidden && visible && cssWidth > 0 && cssHeight > 0;

  const fitCanvas = () => {
    const scale = Math.min(
      deviceRatio,
      1.5,
      Math.sqrt(MAX_PIXELS / (cssWidth * cssHeight)),
      maxTextureSize / cssWidth,
      maxRenderbufferSize / cssHeight,
    );
    const width = Math.max(1, Math.floor(cssWidth * scale));
    const height = Math.max(1, Math.floor(cssHeight * scale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    return width / cssWidth;
  };

  const setFrame = (
    locations: Record<string, WebGLUniformLocation | null>,
    time: number,
    pixelRatio = 1,
  ) => {
    gl.uniform2f(locations.iResolution ?? null, canvas.width, canvas.height);
    gl.uniform1f(locations.iTime ?? null, time);
    gl.uniform3fv(locations.uDarkBackground ?? null, dark);
    gl.uniform1f(locations.uPixelRatio ?? null, pixelRatio);
  };

  const draw = (time: number) => {
    if (!canDraw()) return;
    const pixelRatio = fitCanvas();
    const { width, height } = canvas;
    gl.viewport(0, 0, width, height);
    if (sceneWidth !== width || sceneHeight !== height) {
      sceneWidth = width;
      sceneHeight = height;
      gl.bindTexture(gl.TEXTURE_2D, scene);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        width,
        height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null,
      );
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        scene,
        0,
      );
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.useProgram(field);
    setFrame(fieldUniforms, time);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    gl.useProgram(post);
    setFrame(postUniforms, time, pixelRatio);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, scene);
    gl.uniform1i(postUniforms.tScene ?? null, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, glyphs);
    gl.uniform1i(postUniforms.tGlyphs ?? null, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const render = (time: number) => {
    try {
      draw(time);
    } catch (error) {
      console.error(error instanceof Error ? error : new Error(String(error)));
    }
  };

  const tick = (now: number) => {
    frame = 0;
    if (!canDraw()) {
      previous = null;
      return;
    }
    const delta =
      previous === null ? 0 : Math.min((now - previous) / 1000, 0.1);
    previous = now;
    if (!motion.matches) elapsed += delta;
    if (motion.matches || now - lastRendered >= FRAME_INTERVAL) {
      render(motion.matches ? 0 : elapsed);
      lastRendered = now;
    }
    if (!motion.matches) frame = requestAnimationFrame(tick);
    else previous = null;
  };

  const refresh = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = null;
    if (!canDraw()) return;
    render(motion.matches ? 0 : elapsed);
    if (!motion.matches) frame = requestAnimationFrame(tick);
  };

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    cssWidth = Math.max(1, bounds.width);
    cssHeight = Math.max(1, bounds.height);
    refresh();
  };
  const handleVisibility = () => refresh();
  const handleMotion = () => refresh();
  const resizeObserver = new ResizeObserver(resize);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    refresh();
  });

  resizeObserver.observe(canvas);
  intersection.observe(canvas);
  motion.addEventListener('change', handleMotion);
  document.addEventListener('visibilitychange', handleVisibility);
  window.addEventListener('resize', resize);
  resize();

  return () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersection.disconnect();
    motion.removeEventListener('change', handleMotion);
    document.removeEventListener('visibilitychange', handleVisibility);
    window.removeEventListener('resize', resize);
    gl.deleteProgram(field);
    gl.deleteProgram(post);
    gl.deleteFramebuffer(framebuffer);
    gl.deleteTexture(scene);
    gl.deleteTexture(glyphs);
  };
}

export function BannerShader({ className }: BannerShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      return createShader(canvas);
    } catch (error) {
      console.error(error instanceof Error ? error : new Error(String(error)));
    }
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
