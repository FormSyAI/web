import { useEffect, useRef } from 'react';

type BannerShaderProps = {
  className?: string;
};

/*
 * Nova burst for the AURINOVA banner.
 *
 * The field pass paints an ignition: a gold-white core, a faint shock
 * wash, and coronal filaments that surge outward and pull back. A second
 * pass keeps the site's rectangular glyph grain.
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

// A wide, broken wash. No hard crest, so the blast never draws a circle.
vec3 shockShell(float r, float ang, float age) {
  float radius = 0.08 + age * 0.09;
  float delta = r - radius;
  float fade = exp(-age * 0.28) * smoothstep(0.0, 0.4, age);
  float wash = exp(-pow(delta / 0.11, 2.0));
  float broken = pow(0.5 + 0.5 * sin(ang * 7.0 + age * 0.6), 1.4);
  broken *= 0.25 + 0.75 * pow(abs(sin(ang * 15.0 - age * 0.35)), 0.8);
  return mix(GOLD, ICE, 0.45) * wash * fade * 0.16 * broken;
}

const float BURST = 4.8;

// Fast surge, slow retract. Peaks just after ignition.
float burstEnvelope(float t) {
  float phase = fract(t / BURST);
  float rise = smoothstep(0.0, 0.14, phase);
  float fall = 1.0 - smoothstep(0.16, 1.0, phase);
  return min(rise, fall);
}

float burstRays(float ang, float r, float t) {
  const float count = 26.0;
  float sector = (ang + 3.14159265) * count / 6.2831853;
  float id = floor(sector);
  float local = fract(sector) - 0.5;
  float seed = hash11(id + 4.2);
  float width = 0.026 + seed * 0.018;
  float line = exp(-pow(local / width, 2.0));
  // Three waves a third of a cycle apart. Inner rays stay short and
  // snap back; outer rays leave later and reach farther.
  float wave = floor(seed * 3.0);
  float phase = fract(t / BURST + wave * 0.33);
  float rise = smoothstep(0.0, 0.07 + wave * 0.08, phase);
  float fall = 1.0 - smoothstep(0.12 + wave * 0.04, 0.42 + wave * 0.22, phase);
  float envelope = min(rise, fall);
  float layerReach = 0.22 + wave * 0.36 + fract(seed * 5.0) * 0.1;
  float reach = 1.0 - smoothstep(0.05, 0.09 + envelope * layerReach, r);
  float heat = 1.0 - wave * 0.16;
  return line * reach * (0.16 + 0.84 * envelope) * heat;
}

void main() {
  vec2 resolution = iResolution.xy;
  vec2 pos = (gl_FragCoord.xy - 0.5 * resolution) / resolution.y;
  // Ignition sits on the product diagram, so the shell opens around it.
  vec2 p = pos - vec2(0.0, -0.1);
  float r = length(p);
  float ang = atan(p.y, p.x);
  float t = iTime + 1.6;
  float ageA = mod(t, CYCLE);
  float ageB = mod(t + CYCLE * 0.5, CYCLE);
  float envelope = burstEnvelope(t);
  float pulse = 0.92 + 0.08 * sin(t * 1.5);

  vec3 glow = vec3(0.0);

  vec2 nebulaCoord = p * 1.8 + vec2(t * 0.02, -t * 0.015);
  float nebula = fbm(nebulaCoord);
  nebula = smoothstep(0.48, 0.9, nebula) * exp(-r * 1.8);
  glow += DEEP * nebula * 0.07;

  float core = exp(-pow(r / 0.055, 2.0)) * pulse;
  glow += HOT * core * (0.65 + envelope * 1.05);
  glow += GOLD * exp(-pow(r / 0.11, 2.0)) * (0.16 + envelope * 0.5);

  float spikes = pow(abs(cos(ang * 8.0)), 48.0) * exp(-r * 11.0);
  glow += HOT * spikes * (0.15 + envelope * 0.4);

  float rays = burstRays(ang, r, t);
  glow += mix(GOLD, ICE, smoothstep(0.1, 0.85, r)) * rays * 0.9;

  glow += shockShell(r, ang, ageA) * (0.35 + envelope * 0.65);
  glow += shockShell(r, ang, ageB) * 0.2;

  // The headline and lead sit in the upper middle. Darken that pocket
  // and leave the shell bright toward the sides and around the diagram.
  float pocket = smoothstep(0.0, 0.2, pos.y)
    * (1.0 - smoothstep(0.18, 0.58, abs(pos.x)));
  glow *= 1.0 - pocket * 0.72;

  vec3 x = max(glow, 0.0);
  glow = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  glow = pow(clamp(glow, 0.0, 1.0), vec3(0.94, 0.98, 1.05));
  glow *= 1.0 - smoothstep(0.9, 1.45, r) * 0.82;
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
  float luma = dot(ink, LUMA);
  float presence = smoothstep(0.04, 0.12, luma);
  float level = pow(clamp(luma * (0.9 + 0.3 * uStrength), 0.0, 1.0), 0.9);
  float glyph = floor(level * (uGlyphCount - 1.0) + 0.5);
  vec2 local = (frag - cell * cellPx) / cellPx;
  vec2 atlas = vec2((glyph + local.x) / uGlyphCount, local.y);
  float mask = texture(tGlyphs, atlas).r;
  vec3 under = sceneInk(frag / iResolution) * 0.34;
  return (under + ink * mask) * presence;
}

void main() {
  vec3 glyph = uDarkBackground + ascii(gl_FragCoord.xy);
  vec3 raw = texture(tScene, gl_FragCoord.xy / iResolution).rgb;
  fragColor = vec4(clamp(mix(raw, glyph, 0.7), 0.0, 1.0), 1.0);
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
