'use client';

import { useEffect, useRef } from 'react';
import './MicroSlats.css';

type Preset = 'swell' | 'tide' | 'storm' | 'signal';

type Props = {
  className?: string;
  color?: string;
  glintColor?: string;
  backgroundColor?: string;
  preset?: Preset;
  slatWidth?: number;
  slatHeight?: number;
  gap?: number;
  roundness?: number;
  scale?: number;
  speed?: number;
  direction?: number;
  chop?: number;
  stretch?: number;
  glint?: number;
  contrast?: number;
  perspective?: number;
  fog?: number;
  interactive?: boolean;
  cursorStrength?: number;
  cursorSize?: number;
  swirl?: number;
  trail?: number;
  lean?: number;
  intro?: boolean;
  introDuration?: number;
  paused?: boolean;
};

/**
 * Performance-first MicroSlats.
 *
 * It keeps the same public prop language as the React Bits example while
 * rendering a lightweight canvas field instead of a full fluid simulation.
 * IntersectionObserver, capped DPR and configurable density keep the effect
 * animated without making the rest of the product page expensive.
 */
export default function MicroSlats({
  className = '',
  color = '#c8c8c8',
  glintColor = '#ffffff',
  backgroundColor = '#000000',
  preset = 'swell',
  slatWidth = 10,
  slatHeight = 25,
  gap = 3,
  roundness = 0.75,
  scale = 1,
  speed = 0.6,
  direction = 250,
  chop = 0.55,
  stretch = 0.1,
  glint = 0.7,
  contrast = 1.2,
  perspective = 0.6,
  fog = 0.45,
  interactive = true,
  cursorStrength = 1,
  cursorSize = 40,
  swirl = 0,
  trail = 1.4,
  lean = 0.1,
  intro = true,
  introDuration = 1.5,
  paused = false
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const presets = {
      swell: { speed: 0.42, scale: 1.1, chop: 0.55, contrast: 1.2, fog: 0.52 },
      tide: { speed: 0.3, scale: 1.3, chop: 0.25, contrast: 1.1, fog: 0.38 },
      storm: { speed: 0.95, scale: 0.7, chop: 1, contrast: 1.55, fog: 0.28 },
      signal: { speed: 0.7, scale: 0.9, chop: 0.65, contrast: 1.15, fog: 0 }
    } as const;
    const presetValues = presets[preset];

    const parse = (value: string, fallback: [number, number, number]) => {
      const m = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(value);
      if (!m) return fallback;
      return [
        parseInt(m[1], 16),
        parseInt(m[2], 16),
        parseInt(m[3], 16)
      ] as [number, number, number];
    };

    const base = parse(color, [200, 200, 200]);
    const highlight = parse(glintColor, [255, 255, 255]);
    const bg = parse(backgroundColor, [0, 0, 0]);

    let width = 1;
    let height = 1;
    let dpr = 1;
    let raf = 0;
    let time = 0;
    let introClock = intro ? 0 : 1;
    let visible = true;
    let last = performance.now();

    const pointer = {
      x: 0.5,
      y: 0.5,
      tx: 0.5,
      ty: 0.5,
      active: false
    };

    const resize = () => {
      width = Math.max(1, canvas.clientWidth);
      height = Math.max(1, canvas.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const render = (now: number) => {
      raf = 0;
      if (!visible) return;

      const dt = Math.min(0.04, Math.max(0, (now - last) / 1000));
      last = now;

      const effectiveSpeed = speed === undefined ? presetValues.speed : speed;
      if (!paused && !reduced) time += dt * effectiveSpeed;
      if (intro && !reduced && introClock < 1) {
        introClock = Math.min(1, introClock + dt / Math.max(0.2, introDuration));
      } else if (!intro || reduced) {
        introClock = 1;
      }

      pointer.x += (pointer.tx - pointer.x) * 0.09;
      pointer.y += (pointer.ty - pointer.y) * 0.09;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(' + bg[0] + ',' + bg[1] + ',' + bg[2] + ',1)';
      ctx.fillRect(0, 0, width, height);

      const pitchX = Math.max(5, slatWidth + gap);
      const pitchY = Math.max(6, slatHeight + gap);
      const cols = Math.ceil(width / pitchX) + 3;
      const rows = Math.ceil(height / pitchY) + 3;
      const safeScale = Math.max(0.25, scale ?? presetValues.scale);
      const baseAngle = ((direction ?? 250) * Math.PI) / 180;
      const waveSpeed = (reduced ? 0 : 0.75 + effectiveSpeed * 0.7) / safeScale;
      const densityLimit = width * height > 1700000 ? 12500 : 18000;
      const stepX = cols * rows > densityLimit ? Math.ceil(cols / 120) : 1;
      const stepY = cols * rows > densityLimit ? 2 : 1;
      const round = clamp(roundness, 0, 1);
      const maxCursor = Math.max(24, cursorSize);
      const fade = clamp(fog ?? presetValues.fog, 0, 1);
      const strength = clamp(cursorStrength, 0, 3);
      const introProgress = introClock < 1 ? introClock : 1;

      for (let y = 0; y < rows; y += stepY) {
        const ny = (y + 0.5) / rows;
        const depth = 0.34 + (1 - ny) * (0.72 + perspective * 0.28);
        const horizonFade = Math.max(0.12, 1 - Math.pow(1 - ny, 1.35) * fade);
        const reveal = introProgress < 1 ? clamp((introProgress * 1.25 - ny) * 5, 0, 1) : 1;

        for (let x = 0; x < cols; x += stepX) {
          const nx = (x + 0.5) / cols;
          const worldX = (nx - 0.5) / safeScale;
          const worldY = (ny - 0.5) / safeScale;
          const directional = worldX * Math.cos(baseAngle) + worldY * Math.sin(baseAngle);
          const cross = worldX * Math.sin(baseAngle) - worldY * Math.cos(baseAngle);

          let wave =
            Math.sin(directional * 10.0 - time * waveSpeed + cross * 2.7) * 0.52 +
            Math.sin(cross * 7.5 + time * waveSpeed * 0.62) * 0.24 +
            Math.sin((directional + cross) * 15.0 - time * waveSpeed * 0.4) * 0.12;

          wave += Math.sin(ny * 6.5 + time * 0.45) * 0.05;
          const normalized = 0.5 + 0.5 * wave;
          const crest = clamp((normalized - (0.54 - chop * 0.05)) / 0.46, 0, 1);
          const contrastValue = Math.pow(Math.max(0.02, normalized), clamp(contrast, 0.3, 3));
          const distortion = (wave * 0.85 + Math.sin(cross * 7 - time * 0.28) * 0.15) * slatWidth * 0.7;

          const dx = (nx - pointer.x) * width;
          const dy = (ny - pointer.y) * height;
          const distance = Math.hypot(dx, dy);
          const cursor = interactive
            ? Math.max(0, 1 - distance / maxCursor)
            : 0;
          const curl = swirl > 0
            ? Math.sin(distance * 0.035 - time * 2.4) * cursor * swirl * 0.55
            : 0;

          const leanShift = cursor * lean * Math.sin(baseAngle) * 12;
          const shiftX = distortion + cursor * Math.cos(baseAngle) * 18 * strength + leanShift + curl;
          const shiftY = cursor * Math.sin(baseAngle) * 18 * strength - leanShift * 0.4;

          const px = (x * pitchX) + (width - cols * pitchX) * 0.5 + shiftX;
          const py = (y * pitchY) + (height - rows * pitchY) * 0.5 + shiftY;
          const span = clamp((0.72 + normalized * (0.28 + stretch * 0.2)) * depth, 0.2, 1.25);
          const w = Math.max(2, slatWidth * (0.74 + depth * 0.22));
          const h = Math.max(2, slatHeight * span);

          const glintMix = clamp((crest * glint + cursor * strength * 0.72) / 1.6, 0, 1);
          const alpha = clamp((0.075 + contrastValue * 0.24 + crest * glint * 0.16 + cursor * 0.2) * depth * horizonFade * reveal, 0.015, 0.94);

          const r = Math.round(base[0] + (highlight[0] - base[0]) * glintMix);
          const g = Math.round(base[1] + (highlight[1] - base[1]) * glintMix);
          const b = Math.round(base[2] + (highlight[2] - base[2]) * glintMix);

          ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
          ctx.beginPath();

          const radius = Math.min(w, h) * 0.5 * round;
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(px, py, w, h, radius);
          } else {
            ctx.rect(px, py, w, h);
          }

          ctx.fill();
        }
      }

      if (!reduced && trail > 0) {
        const glow = ctx.createRadialGradient(
          pointer.x * width,
          pointer.y * height,
          0,
          pointer.x * width,
          pointer.y * height,
          Math.max(18, maxCursor * 0.75)
        );
        glow.addColorStop(0, 'rgba(' + highlight[0] + ',' + highlight[1] + ',' + highlight[2] + ',' + clamp(strength * 0.07, 0, 0.2) + ')');
        glow.addColorStop(1, 'rgba(' + highlight[0] + ',' + highlight[1] + ',' + highlight[2] + ',0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      if (visible && (!paused || introClock < 1 || pointer.active)) {
        raf = requestAnimationFrame(render);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      pointer.tx = clamp((event.clientX - rect.left) / Math.max(1, rect.width), 0, 1);
      pointer.ty = clamp((event.clientY - rect.top) / Math.max(1, rect.height), 0, 1);
      pointer.active = true;
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onLeave = () => {
      pointer.active = false;
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(render);
    });

    ro.observe(canvas);
    io.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    canvas.addEventListener('pointerleave', onLeave, { passive: true });

    resize();
    raf = requestAnimationFrame(render);

    return () => {
      visible = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [
    color,
    glintColor,
    backgroundColor,
    preset,
    slatWidth,
    slatHeight,
    gap,
    roundness,
    scale,
    speed,
    direction,
    chop,
    stretch,
    glint,
    contrast,
    perspective,
    fog,
    interactive,
    cursorStrength,
    cursorSize,
    swirl,
    trail,
    lean,
    intro,
    introDuration,
    paused
  ]);

  return <canvas ref={ref} className={('micro-slats ' + className).trim()} aria-hidden="true" />;
}
