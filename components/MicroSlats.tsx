'use client';

import { useEffect, useRef } from 'react';

export default function MicroSlats({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let raf = 0;
    let width = 1;
    let height = 1;
    let time = 0;
    const pointer = { x: 0.5, y: 0.5, active: false };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      width = canvas.clientWidth || 1;
      height = canvas.clientHeight || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      if (!reduced) time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / 18) + 2;
      const rows = Math.ceil(height / 38) + 2;

      for (let y = -1; y < rows; y += 1) {
        const depth = 0.45 + ((rows - y) / rows) * 0.65;
        const barHeight = 22 * depth;

        for (let x = -1; x < cols; x += 1) {
          const nx = x / cols;
          const ny = y / rows;
          const wave = Math.sin(nx * 9.5 + time * 1.4 + Math.sin(ny * 6 + time) * 0.35) * 8;
          const distance = Math.hypot(nx - pointer.x, ny - pointer.y);
          const cursor = pointer.active ? Math.max(0, 1 - distance * 5.2) : 0;
          const shift = wave + cursor * 11;
          const alpha = 0.09 + 0.18 * Math.max(0, Math.sin(nx * 5 + ny * 3 + time));
          const px = x * 18 + shift;
          const py = y * 38 + (1 - depth) * 12;

          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.roundRect(px, py, 10 * depth, barHeight, 5);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    const leave = () => { pointer.active = false; };
    const observer = new ResizeObserver(resize);

    observer.observe(canvas);
    canvas.addEventListener('pointermove', move, { passive: true });
    canvas.addEventListener('pointerleave', leave, { passive: true });
    resize();
    render();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
    };
  }, []);

  return <canvas ref={ref} className={`micro-slats ${className}`} aria-hidden="true" />;
}
