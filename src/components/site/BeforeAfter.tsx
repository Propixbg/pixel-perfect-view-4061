import { useCallback, useRef, useState } from "react";

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-16/10 w-full cursor-ew-resize overflow-hidden border border-border select-none"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      <img src={before} alt={beforeLabel} loading="lazy" className="img-cover absolute inset-0 grayscale-[0.55] brightness-75" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={after} alt={afterLabel} loading="lazy" className="img-cover" />
      </div>

      <div className="absolute inset-y-0 w-px bg-primary" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-ink/85 font-mono text-[10px] text-primary">
          ↔
        </div>
      </div>

      <span className="absolute bottom-4 left-4 bg-ink/80 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase">
        {beforeLabel}
      </span>
      <span className="absolute right-4 bottom-4 bg-primary px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-primary-foreground uppercase">
        {afterLabel}
      </span>
    </div>
  );
}
