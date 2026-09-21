'use client';

import { useEffect, useId, useRef } from 'react';

import type { Locale } from '@/content/i18n';

const stages = [
  {
    code: '01',
    zh: '知识与轨迹',
    en: 'Knowledge & trace',
    detail: 'TASK · CONTEXT',
  },
  {
    code: '02',
    zh: '决策与行动',
    en: 'Decision & action',
    detail: 'DECISION · ACTION',
  },
  {
    code: '03',
    zh: '证据与结果',
    en: 'Evidence & outcome',
    detail: 'EVIDENCE · OUTCOME',
  },
  {
    code: '04',
    zh: '归因与知识',
    en: 'Attribution & knowledge',
    detail: 'EFFECT · KNOWLEDGE',
  },
] as const;

const CUBE_STOPS = [125, 375, 625, 875] as const;
const ENTRY_X = -125;
const CUBE_CENTER_Y = 103;
const ENTRY_DELAY_MS = 900;
const STEP_DURATION_MS = 1600;
const TRAVEL_DURATION_MS = 950;
const ENTRY_FADE_DURATION_MS = 450;
const FINAL_FADE_START_MS = TRAVEL_DURATION_MS - 300;
const FINAL_FADE_DURATION_MS = 650;
const ARRIVAL_DELAY_MS = 1200;
const SEQUENCE_DURATION_MS = CUBE_STOPS.length * STEP_DURATION_MS;
const CYCLE_DURATION_MS = ENTRY_DELAY_MS + SEQUENCE_DURATION_MS + ARRIVAL_DELAY_MS;
const FRAME_INTERVAL_MS = 1000 / 30;

type CubeMotion = {
  x: number;
  y: number;
  rotation: number;
  opacity: number;
};

type CubeVertex = {
  x: number;
  z: number;
  y: number;
};

type CubeFace = {
  className: string;
  vertices: readonly CubeVertex[];
  normal?: { x: number; z: number };
};

const vertex = (x: number, z: number, y: number): CubeVertex => ({ x, z, y });

const CUBE_FACES: readonly CubeFace[] = [
  {
    className: 'top',
    vertices: [vertex(-1, -1, -1), vertex(1, -1, -1), vertex(1, 1, -1), vertex(-1, 1, -1)],
  },
  {
    className: 'back',
    normal: { x: 0, z: -1 },
    vertices: [vertex(1, -1, -1), vertex(-1, -1, -1), vertex(-1, -1, 1), vertex(1, -1, 1)],
  },
  {
    className: 'left',
    normal: { x: -1, z: 0 },
    vertices: [vertex(-1, 1, -1), vertex(-1, -1, -1), vertex(-1, -1, 1), vertex(-1, 1, 1)],
  },
  {
    className: 'front',
    normal: { x: 0, z: 1 },
    vertices: [vertex(-1, 1, -1), vertex(1, 1, -1), vertex(1, 1, 1), vertex(-1, 1, 1)],
  },
  {
    className: 'right',
    normal: { x: 1, z: 0 },
    vertices: [vertex(1, -1, -1), vertex(1, 1, -1), vertex(1, 1, 1), vertex(1, -1, 1)],
  },
  {
    className: 'bottom',
    vertices: [vertex(-1, 1, 1), vertex(1, 1, 1), vertex(1, -1, 1), vertex(-1, -1, 1)],
  },
];

const projectCubeVertex = (cubeVertex: CubeVertex, cosine: number, sine: number) => {
  const rotatedX = cubeVertex.x * cosine + cubeVertex.z * sine;
  const rotatedZ = -cubeVertex.x * sine + cubeVertex.z * cosine;

  return {
    x: (rotatedX - rotatedZ) * 24,
    y: 7 + (rotatedX + rotatedZ) * 12 + cubeVertex.y * 29,
  };
};

const cubePath = (face: CubeFace, cosine: number, sine: number) => (
  face.vertices
    .map((cubeVertex, index) => {
      const point = projectCubeVertex(cubeVertex, cosine, sine);
      const command = index === 0 ? 'M' : 'L';
      return `${command} ${point.x.toFixed(3)} ${point.y.toFixed(3)}`;
    })
    .join(' ') + ' Z'
);

const cubeFaces = (className: string) => (
  <g className={className}>
    <path className="top" d="M 0 -46 L 48 -22 L 0 2 L -48 -22 Z" />
    <path className="left" d="M -48 -22 L 0 2 L 0 60 L -48 36 Z" />
    <path className="right" d="M 0 2 L 48 -22 L 48 36 L 0 60 Z" />
  </g>
);

export function CausalEvidenceArt({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh-CN';
  const stageRef = useRef<SVGSVGElement>(null);
  const activeCubeRef = useRef<SVGGElement>(null);
  const id = useId().replaceAll(':', '');
  const markerId = `fw-cube-arrow-${id}`;

  useEffect(() => {
    const svg = stageRef.current;
    const activeCube = activeCubeRef.current;
    const activeCubePaths = activeCube?.querySelectorAll('path');

    if (!svg || !activeCube || !activeCubePaths || activeCubePaths.length !== CUBE_FACES.length) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;
    let isVisible = true;
    let isDocumentVisible = document.visibilityState === 'visible';
    let animationFrame = 0;
    let lastFrameTime = 0;
    let lastPaintTime = 0;
    let timeline = 0;

    const renderCubeAtRotation = (rotation: number) => {
      const radians = (rotation * Math.PI) / 180;
      const cosine = Math.cos(radians);
      const sine = Math.sin(radians);

      CUBE_FACES.forEach((face, index) => {
        const path = activeCubePaths[index];
        const normal = face.normal;
        const opacity = normal
          ? Math.max(
              0,
              Math.min(
                1,
                (normal.x * cosine + normal.z * sine)
                  + (-normal.x * sine + normal.z * cosine),
              ),
            )
          : face.className === 'top' ? 1 : 0;

        path.setAttribute('d', cubePath(face, cosine, sine));
        path.setAttribute('opacity', opacity.toFixed(3));
      });
    };

    const setMotion = ({ x, y, rotation, opacity }: CubeMotion) => {
      activeCube.setAttribute('transform', `translate(${x} ${y})`);
      activeCube.setAttribute('opacity', opacity.toFixed(3));
      renderCubeAtRotation(rotation);
    };

    const easeInOut = (progress: number) => progress * progress * (3 - 2 * progress);

    const renderAt = (timeMs: number) => {
      const cycleTime = timeMs % CYCLE_DURATION_MS;

      if (
        cycleTime < ENTRY_DELAY_MS
        || cycleTime >= ENTRY_DELAY_MS + SEQUENCE_DURATION_MS
      ) {
        setMotion({
          x: ENTRY_X,
          y: CUBE_CENTER_Y,
          rotation: 0,
          opacity: 0,
        });
        return;
      }

      const sequenceTime = cycleTime - ENTRY_DELAY_MS;
      const stageIndex = Math.floor(sequenceTime / STEP_DURATION_MS);
      const stageTime = sequenceTime % STEP_DURATION_MS;
      const travelProgress = Math.min(
        1,
        Math.max(0, stageTime / TRAVEL_DURATION_MS),
      );
      const easedProgress = easeInOut(travelProgress);
      const finalFadeProgress = stageIndex === CUBE_STOPS.length - 1
        ? Math.min(
            1,
            Math.max(0, (stageTime - FINAL_FADE_START_MS) / FINAL_FADE_DURATION_MS),
          )
        : 0;
      const entryFadeProgress = stageIndex === 0
        ? Math.min(1, Math.max(0, stageTime / ENTRY_FADE_DURATION_MS))
        : 1;
      const fromX = stageIndex === 0 ? ENTRY_X : CUBE_STOPS[stageIndex - 1];
      const toX = CUBE_STOPS[stageIndex];

      setMotion({
        x: fromX + (toX - fromX) * easedProgress,
        y: CUBE_CENTER_Y - Math.sin(easedProgress * Math.PI) * 10,
        rotation: stageIndex * 90 + easedProgress * 90,
        opacity: easeInOut(entryFadeProgress) * (1 - finalFadeProgress),
      });
    };

    const shouldAnimate = () => !reducedMotion && isVisible && isDocumentVisible;

    const stop = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
      lastFrameTime = 0;
    };

    const tick = (now: number) => {
      if (!shouldAnimate()) {
        stop();
        return;
      }

      if (!lastFrameTime) {
        lastFrameTime = now;
      }
      timeline += Math.min(now - lastFrameTime, 100);
      lastFrameTime = now;

      if (now - lastPaintTime >= FRAME_INTERVAL_MS) {
        renderAt(timeline);
        lastPaintTime = now;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (shouldAnimate() && !animationFrame) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    const handleMotionPreferenceChange = () => {
      reducedMotion = reducedMotionQuery.matches;
      if (reducedMotion) {
        stop();
        renderAt(0);
      } else {
        start();
      }
    };

    const handleDocumentVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === 'visible';
      if (isDocumentVisible) {
        start();
      } else {
        stop();
      }
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          isVisible = entry?.isIntersecting ?? true;
          if (isVisible) {
            start();
          } else {
            stop();
          }
        }, { threshold: 0.1 })
      : undefined;

    reducedMotionQuery.addEventListener('change', handleMotionPreferenceChange);
    document.addEventListener('visibilitychange', handleDocumentVisibilityChange);
    observer?.observe(svg);

    renderAt(0);
    start();

    return () => {
      stop();
      observer?.disconnect();
      reducedMotionQuery.removeEventListener('change', handleMotionPreferenceChange);
      document.removeEventListener('visibilitychange', handleDocumentVisibilityChange);
    };
  }, []);

  return (
    <figure className="fw-causal-art">
      <header>
        <span>FORMSY</span>
        <small>Agent Context Platform</small>
      </header>

      <svg
        ref={stageRef}
        className="fw-causal-cube-stage"
        viewBox="0 0 1000 245"
        aria-hidden="true"
      >
        <defs>
          <marker
            id={markerId}
            markerHeight="7"
            markerWidth="7"
            orient="auto-start-reverse"
            refX="6"
            refY="3.5"
            viewBox="0 0 7 7"
          >
            <path d="M 0 0 L 7 3.5 L 0 7 Z" />
          </marker>
        </defs>

        {CUBE_STOPS.slice(0, -1).map((x, index) => (
          <path
            key={`connector-${x}`}
            className="fw-cube-connector"
            d={`M ${x + 58} ${CUBE_CENTER_Y + 10} H ${CUBE_STOPS[index + 1] - 58}`}
            markerEnd={`url(#${markerId})`}
          />
        ))}

        {stages.map((stage, index) => {
          const x = CUBE_STOPS[index];

          return (
            <g key={stage.code} className="fw-cube-stage" aria-hidden="true">
              <text className="fw-cube-code" x={x} y="18" textAnchor="middle">
                {stage.code}
              </text>
              {index === CUBE_STOPS.length - 1 ? (
                <g className="fw-fixed-cube" transform={`translate(${x} ${CUBE_CENTER_Y})`}>
                  {cubeFaces('fw-fixed-cube-faces')}
                </g>
              ) : (
                <g className="fw-wire-cube" transform={`translate(${x} ${CUBE_CENTER_Y})`}>
                  {cubeFaces('fw-wire-cube-faces')}
                </g>
              )}
              <text className="fw-cube-title" x={x} y="181" textAnchor="middle">
                {isZh ? stage.zh : stage.en}
              </text>
              <text className="fw-cube-detail" x={x} y="209" textAnchor="middle">
                {stage.detail}
              </text>
            </g>
          );
        })}

        <g ref={activeCubeRef} className="fw-active-cube" aria-hidden="true" opacity="0">
          <path className="top" d="M 0 -46 L 48 -22 L 0 2 L -48 -22 Z" />
          <path className="back" d="M 48 -22 L 0 -46 L 0 12 L 48 36 Z" opacity="0" />
          <path className="left" d="M -48 -22 L 0 -46 L 0 12 L -48 36 Z" opacity="0" />
          <path className="front" d="M -48 -22 L 0 2 L 0 60 L -48 36 Z" />
          <path className="right" d="M 0 2 L 48 -22 L 48 36 L 0 60 Z" />
          <path className="bottom" d="M -48 36 L 0 60 L 48 36 L 0 12 Z" opacity="0" />
        </g>
      </svg>

      <ol className="fw-causal-cube-sr-list">
        {stages.map((stage) => (
          <li key={stage.code}>
            <strong>{stage.code} · {isZh ? stage.zh : stage.en}</strong>
            <span>{stage.detail}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
