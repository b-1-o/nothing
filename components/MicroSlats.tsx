'use client';

import { useEffect, useRef } from 'react';
import './MicroSlats.css';

type Props = {
  className?: string;
  color?: string;
  glintColor?: string;
  backgroundColor?: string;
  interactive?: boolean;
};

/**
 * Lightweight canvas MicroSlats-style field.
 * Optimized for performance while keeping continuous swell + cursor interaction.
 */
export default function MicroSlats({
  className = '',
  color = '#c8c8c8',
  glintColor = '#ffffff',
  backgroundColor = '#000000',
  interactive = true
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = 1;
    let height = 1;
    let time = 0;
    let visible = true;
    const pointer = { x: 0.5, y: 0.55, active: false, tx: 0.5, ty: 0.55 };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const parse = (hex: string, fallback: [number, number, number]) => {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!m) return fallback;
      return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] as [number, number, number];
    };
    const base = parse(color, [200, 200, 200]);
    const glint = parse(glintColor, [255, 255, 255]);
    const bg = parse(backgroundColor, [0, 0, 0]);

    const resize = () => {
      width = Math.max(1, canvas.clientWidth);
      height = Math.max(1, canvas.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      if (!reduced) time += 0.012;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      ctx.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
      ctx.fillRect(0, 0, width, height);

      const pitchX = 14;
      const pitchY = 28;
      const cols = Math.ceil(width / pitchX) + 3;
      const rows = Math.ceil(height / pitchY) + 3;
      const originX = (width - (cols * pitchX - 4)) * 0.5;
      const originY = (height - (rows * pitchY - 6)) * 0.5;

      for (let y = 0; y < rows; y++) {
        const v = y / rows;
        const depth = 0.35 + (1 - v) * 0.75;
        const fog = Math.pow(1 - v, 1.35);
        const rowH = 18 * depth;

        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          const ny = y / rows;

          const wave =
            Math.sin(nx * 8.2 + time * 1.15 + Math.sin(ny * 5.1 + time * 0.55) * 0.4) * 7 +
            Math.sin(nx * 3.4 - time * 0.7 + ny * 2.2) * 3.5;

          const dx = nx - pointer.x;
          const dy = ny - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const cursor = pointer.active || interactive ? Math.max(0, 1 - dist * 4.2) : 0;
          const shift = wave + cursor * 14 * (0.6 + depth * 0.4);

          const level = 0.5 + 0.5 * Math.sin(nx * 6 + ny * 4 + time * 0.9 + cursor * 2);
          const crest = Math.max(0, (level - 0.55) / 0.45);
          const alpha = (0.07 + 0.22 * level * fog + crest * 0.2 + cursor * 0.18) * depth;

          const r = Math.round(base[0] + (glint[0] - base[0]) * (crest * 0.85 + cursor * 0.4));
          const g = Math.round(base[1] + (glint[1] - base[1]) * (crest * 0.85 + cursor * 0.4));
          const b = Math.round(base[2] + (glint[2] - base[2]) * (crest * 0.85 + cursor * 0.4));

          const px = originX + x * pitchX + shift;
          const py = originY + y * pitchY + (1 - depth) * 10;
          const span = 0.55 + level * 0.45 + cursor * 0.2;
          const h = rowH * span;
          const w = 8 * depth;

          ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(0.95, alpha)})`;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(px, py, w, h, Math.min(4, h * 0.45));
          } else {
            ctx.rect(px, py, w, h);
          }
          ctx.fill();
        }
      }

      if (visible) raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / Math.max(1, rect.width);
      pointer.ty = (e.clientY - rect.top) / Math.max(1, rect.height);
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        raf = requestAnimationFrame(render);
      }
    });
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
  }, [color, glintColor, backgroundColor, interactive]);

  return <canvas ref={ref} className={`micro-slats ${className}`.trim()} aria-hidden="true" />;
}
