import { useEffect, useRef } from 'react';

type BannerShaderProps = {
  className?: string;
};

/*
 * Adapted from the copyable WebGL source published at:
 * https://openshaders.com/@lcooood
 *
 * The two-pass pipeline is kept local to the site: a warped colour field is
 * rendered first, then converted into a denser rectangular glyph treatment.
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

const float HUE = 0.784962595;
const float HUE_SPREAD = -0.185845569;
const float HUE_TRAVEL = 1.83426464;
const float CHROMA = 0.13627468;
const float LIGHTNESS = 0.616213441;
const float COLOUR_CYCLE = 0.106183872;
const float THETA = 2.1189847;
const float SHEAR = 0.963287175;
const float SHRINK = 0.958471835;
const float LAYERS = 93.0;
const float WARP_FREQ_X = 0.410834283;
const float WARP_FREQ_Y = 2.73448634;
const float WARP_AMP_X = 0.122415952;
const float WARP_AMP_Y = 0.0307484511;
const float ASPECT_X = 2.4587791;
const float ASPECT_Y = 0.137313738;
const float OFFSET_X = 0.307960659;
const float OFFSET_Y = 0.0591536984;
const float TILT = -1.44359934;
const float ZOOM = 1.19593573;
const float CENTRE_X = 0.039739456;
const float CENTRE_Y = -0.510607064;
const float GLOW_SIZE = 0.00144975947;
const float HIGHLIGHT_DIM = 0.22;
const float FALLOFF = 0.456030816;
const float VIGNETTE = 0.0562364906;
const float FLOW_SPEED = 0.350565672;
const float FLOW_DIRECTION = -1.0;
const float BREATH_RATE = 0.396597177;
const float BREATH_AMOUNT = 0.0968502313;
const float PHASE = 48.095047;
const float ECHO = 0.0;
const float ECHO_SHIFT = -0.172911301;
const float SOFTNESS = 0.00120062532;
const float LIGHT_SWING = 0.15078932;
const float TAU = 6.28318530718;

vec3 oklchToLinear(float L, float C, float h) {
  float a = C * cos(h), b = C * sin(h);
  float l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  float m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  float s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  vec3 lms = vec3(l_, m_, s_);
  lms = lms * lms * lms;
  return mat3(4.0767416621, -1.2684380046, -0.0041960863,
              -3.3077115913, 2.6097574011, -0.7034186147,
              0.2309699292, -0.3413193965, 1.7076147010) * lms;
}

float blueNoise(vec2 p, float frame) {
  p += 5.588238 * mod(frame, 64.0);
  return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
}

void main() {
  vec2 R = iResolution.xy;
  vec2 pos = (gl_FragCoord.xy - 0.5 * R) / R.y;
  float t = iTime * FLOW_SPEED * FLOW_DIRECTION + PHASE;
  float breath = (-sin(iTime * BREATH_RATE * 1.5) + sin(iTime * BREATH_RATE + 1.0)) * 0.25 + 0.5;

  vec2 u = (pos - vec2(CENTRE_X, CENTRE_Y)) * (ZOOM - breath * BREATH_AMOUNT);
  float ct = cos(TILT), st = sin(TILT);
  u = mat2(ct, st, -st, ct) * u;
  mat2 fold = mat2(cos(THETA), sin(THETA), -SHEAR, cos(THETA));

  float hue0 = HUE * TAU;
  float hue1 = hue0 + HUE_SPREAD * TAU;
  vec3 color = vec3(0.0);

  for (float i = 1.0; i <= LAYERS; i += 1.0) {
    u.x += -sin(u.y * WARP_FREQ_X + t + i * 0.007) * WARP_AMP_X;
    u.y += -sin(u.x * WARP_FREQ_Y - t + i * 0.02) * WARP_AMP_Y;
    u = fold * u * SHRINK;

    vec2 q = u - vec2(OFFSET_X + breath * 0.1, OFFSET_Y);
    vec2 s = vec2(q.x * ASPECT_X, q.y * ASPECT_Y);
    float glow = GLOW_SIZE / (dot(s, s) + SOFTNESS);
#ifndef SKIP_ECHO
    vec2 e = vec2((q.x - ECHO_SHIFT) * ASPECT_X, s.y);
    glow += ECHO * GLOW_SIZE / (dot(e, e) + SOFTNESS);
#endif
    glow *= 0.25 + breath * 0.4;

    float r = length(u);
    float k = sin(i * COLOUR_CYCLE + t * 1.2 + r * HUE_TRAVEL) * 0.5 + 0.5;
    vec3 tint = clamp(oklchToLinear(LIGHTNESS + LIGHT_SWING * k, CHROMA * (0.75 + 0.35 * k), mix(hue0, hue1, k)), 0.0, 1.0);
    color += glow * tint * exp2(-r * FALLOFF);
  }

  vec3 x = max(color, 0.0);
  color = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  color = pow(clamp(color, 0.0, 1.0), vec3(0.85, 0.92, 0.98));
  float peak = max(color.r, max(color.g, color.b));
  color *= 1.0 - smoothstep(0.42, 0.92, peak) * HIGHLIGHT_DIM;
  float edge = smoothstep(0.5, 1.6, length(pos));
  color *= 1.0 - edge * VIGNETTE;
  color = uDarkBackground + color * (1.0 - uDarkBackground);
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

const float uStrength = 1.2343297;
const float uScale = 0.93;
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
  vec3 under = sceneInk(frag / iResolution) * 0.45;
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
