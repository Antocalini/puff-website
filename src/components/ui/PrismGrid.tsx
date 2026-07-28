// Prism Grid — hover cells + fading trail.
// Grid lines are CSS on [data-prism-grid-layer]. React paints lit + fading cells only.

import {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
  type CSSProperties,
} from "react";

const PUFF_YELLOW_COLORS = [
  "#FFFFFF",
  "#FFF3A3",
  "#FFEB66",
  "#FFE566",
  "#FFD100",
  "#F5D76E",
  "#F0C400",
  "#E6BC00",
];

const BOX_SIZE = 40;
const OUT_DURATION_MS = 1000;
const PERSPECTIVE = 1000;

interface Cell {
  id: number;
  row: number;
  col: number;
  color: string;
}

interface BackgroundBoxesProps {
  boxSize?: number;
  style?: CSSProperties;
}

function screenToPlane(
  sx: number,
  sy: number,
  yawDeg: number,
  pitchDeg: number,
  p = PERSPECTIVE,
): { x: number; y: number } | null {
  const a = (yawDeg * Math.PI) / 180;
  const b = (pitchDeg * Math.PI) / 180;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  const cb = Math.cos(b);
  const sb = Math.sin(b);

  const a11 = p * ca - sx * sa * cb;
  const a12 = sx * sb;
  const a21 = p * sa * sb - sy * sa * cb;
  const a22 = p * cb + sy * sb;

  const det = a11 * a22 - a12 * a21;
  if (!isFinite(det) || Math.abs(det) < 1e-6) return null;

  const b1 = sx * p;
  const b2 = sy * p;
  return {
    x: (b1 * a22 - a12 * b2) / det,
    y: (a11 * b2 - b1 * a21) / det,
  };
}

/** Mount at opacity 1, then fade out — creates the prism trail (destello). */
function FadingCell({
  cell,
  boxSize,
  durationMs,
  onDone,
}: {
  cell: Cell;
  boxSize: number;
  durationMs: number;
  onDone: (id: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "1";
    el.style.transition = "none";
    void el.offsetHeight;
    el.style.transition = `opacity ${durationMs}ms linear`;
    el.style.opacity = "0";

    const timer = window.setTimeout(() => onDone(cell.id), durationMs);
    return () => window.clearTimeout(timer);
  }, [cell.id, durationMs, onDone]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: cell.col * boxSize,
        top: cell.row * boxSize,
        width: boxSize,
        height: boxSize,
        backgroundColor: cell.color,
        pointerEvents: "none",
      }}
    />
  );
}

export default function PrismGrid({
  boxSize = BOX_SIZE,
  style,
}: BackgroundBoxesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(1);
  const [rows, setRows] = useState(1);
  const [lit, setLit] = useState<Cell | null>(null);
  const [fading, setFading] = useState<Cell[]>([]);
  const idRef = useRef(0);
  const colors = useMemo(() => PUFF_YELLOW_COLORS, []);

  const gridWidth = cols * boxSize;
  const gridHeight = rows * boxSize;

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const zone = container.closest("[data-hero-prism-zone]") as HTMLElement | null;
    const w =
      container.clientWidth || zone?.clientWidth || window.innerWidth || 1;
    const h =
      container.clientHeight || zone?.clientHeight || window.innerHeight || 1;
    setCols(Math.max(1, Math.ceil(w / boxSize)));
    setRows(Math.max(1, Math.ceil(h / boxSize)));
  }, [boxSize]);

  useLayoutEffect(() => {
    measure();
    const container = containerRef.current;
    const zone = container?.closest("[data-hero-prism-zone]") ?? null;
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => measure())
        : null;
    if (container) observer?.observe(container);
    if (zone) observer?.observe(zone);
    window.addEventListener("resize", measure);
    const t1 = window.setTimeout(measure, 50);
    const t2 = window.setTimeout(measure, 300);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [measure]);

  const removeFading = useCallback((id: number) => {
    setFading((f) => f.filter((c) => c.id !== id));
  }, []);

  const leave = useCallback(() => {
    setLit((current) => {
      if (current) setFading((f) => [...f, current]);
      return null;
    });
  }, []);

  const lightAtClient = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom ||
        rect.width < 2 ||
        rect.height < 2
      ) {
        return leave();
      }

      const sx = clientX - rect.left - rect.width / 2;
      const sy = clientY - rect.top - rect.height / 2;
      const point = screenToPlane(sx, sy, 0, 0);
      if (!point) return leave();

      const gx = point.x + gridWidth / 2;
      const gy = point.y + gridHeight / 2;
      const col = Math.floor(gx / boxSize);
      const row = Math.floor(gy / boxSize);
      if (col < 0 || col >= cols || row < 0 || row >= rows) return leave();

      setLit((current) => {
        if (current && current.row === row && current.col === col) return current;
        if (current) setFading((f) => [...f, current]);
        return {
          id: ++idRef.current,
          row,
          col,
          color: colors[Math.floor(Math.random() * colors.length)] ?? "#FFD100",
        };
      });
    },
    [boxSize, cols, rows, gridWidth, gridHeight, colors, leave],
  );

  useLayoutEffect(() => {
    const isUiChrome = (el: Element | null) =>
      Boolean(
        el?.closest(
          "a, button, input, textarea, select, label, [data-site-header], .nav-pill-3d, .hero-sticker-wrap, [data-hero-media]",
        ),
      );

    const onMove = (event: PointerEvent) => {
      const top = document.elementFromPoint(event.clientX, event.clientY);
      if (isUiChrome(top)) {
        leave();
        return;
      }
      lightAtClient(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", leave);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", leave);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [lightAtClient, leave]);

  const cellStyle = (cell: Cell): CSSProperties => ({
    position: "absolute",
    left: cell.col * boxSize,
    top: cell.row * boxSize,
    width: boxSize,
    height: boxSize,
    backgroundColor: cell.color,
    pointerEvents: "none",
  });

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: `${PERSPECTIVE}px`,
          perspectiveOrigin: "center center",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            transform: "translate(-50%, -50%)",
            position: "absolute",
            left: "50%",
            top: "50%",
            transformOrigin: "center center",
            width: `${gridWidth}px`,
            height: `${gridHeight}px`,
          }}
        >
          {fading.map((cell) => (
            <FadingCell
              key={cell.id}
              cell={cell}
              boxSize={boxSize}
              durationMs={OUT_DURATION_MS}
              onDone={removeFading}
            />
          ))}
          {lit ? <div key={lit.id} style={cellStyle(lit)} /> : null}
        </div>
      </div>
    </div>
  );
}
