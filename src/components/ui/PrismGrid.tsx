// Prism Grid — Originkit
// Adapted for Puff hero: yellow background + yellow hover palette.

import {
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { motion } from "framer-motion";

const PUFF_YELLOW_COLORS = {
  paletteCount: 8,
  color1: "#FFFFFF",
  color2: "#FFF3A3",
  color3: "#FFEB66",
  color4: "#FFE566",
  color5: "#FFD100",
  color6: "#F5D76E",
  color7: "#F0C400",
  color8: "#E6BC00",
};

const DEFAULT_COLORS = [
  "#FFFFFF",
  "#FFF3A3",
  "#FFEB66",
  "#FFE566",
  "#FFD100",
  "#F5D76E",
  "#F0C400",
  "#E6BC00",
];

const PERSPECTIVE = 1000;

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

interface Cell {
  id: number;
  row: number;
  col: number;
  color: string;
}

interface Rotate {
  x?: number;
  y?: number;
}

interface ColorsProp {
  paletteCount?: number;
  [key: string]: string | number | undefined;
}

interface BackgroundBoxesProps {
  backgroundColor?: string;
  boxSize?: number;
  borderWidth?: number;
  borderColor?: string;
  rotate?: Rotate;
  colors?: ColorsProp;
  style?: CSSProperties;
}

export default function PrismGrid({
  // Transparent so the CSS grid on [data-prism-grid-layer] shows through
  backgroundColor = "transparent",
  boxSize = 40,
  borderWidth: _borderWidth = 2,
  borderColor: _borderColor = "rgba(26,26,26,0.16)",
  rotate = { x: 0, y: 0 },
  colors: colorsProp = PUFF_YELLOW_COLORS,
  style,
}: BackgroundBoxesProps) {
  const inDuration = 0;
  const outDuration = 1;

  const containerRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(24);
  const [cols, setCols] = useState(32);

  const swingX = rotate?.x ?? 0;
  const swingY = rotate?.y ?? 0;

  const colors = useMemo(() => {
    const entries: string[] = [];
    if (colorsProp) {
      const count = Math.max(1, Math.min(10, colorsProp.paletteCount || 6));
      for (let i = 1; i <= count; i++) {
        const value = colorsProp[`color${i}`];
        if (typeof value === "string" && value.trim().length > 0) {
          entries.push(value.trim());
        }
      }
    }
    if (entries.length === 0) return DEFAULT_COLORS;
    return entries;
  }, [colorsProp]);

  const getRandomColor = () => {
    if (colors.length === 0) return DEFAULT_COLORS[0] || "#FFD100";
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const calculateGrid = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const w = container.clientWidth || container.offsetWidth || 1;
    const h = container.clientHeight || container.offsetHeight || 1;
    setCols(Math.max(1, Math.ceil(w / boxSize)));
    setRows(Math.max(1, Math.ceil(h / boxSize)));
  }, [boxSize]);

  useLayoutEffect(() => {
    calculateGrid();
    const container = containerRef.current;
    const observer =
      typeof ResizeObserver !== "undefined" && container
        ? new ResizeObserver(() => calculateGrid())
        : null;
    if (container) observer?.observe(container);
    window.addEventListener("resize", calculateGrid);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", calculateGrid);
    };
  }, [calculateGrid]);

  const gridWidth = cols * boxSize;
  const gridHeight = rows * boxSize;

  const [lit, setLit] = useState<Cell | null>(null);
  const [fading, setFading] = useState<Cell[]>([]);
  const idRef = useRef(0);

  const leave = useCallback(() => {
    setLit((current) => {
      if (current) setFading((f) => [...f, current]);
      return null;
    });
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const sx = event.clientX - rect.left - rect.width / 2;
      const sy = event.clientY - rect.top - rect.height / 2;

      const point = screenToPlane(sx, sy, swingX, swingY);
      if (!point) return leave();

      const gx = point.x + gridWidth / 2;
      const gy = point.y + gridHeight / 2;
      const col = Math.floor(gx / boxSize);
      const row = Math.floor(gy / boxSize);
      if (col < 0 || col >= cols || row < 0 || row >= rows) return leave();

      setLit((current) => {
        if (current && current.row === row && current.col === col) {
          return current;
        }
        if (current) setFading((f) => [...f, current]);
        return {
          id: ++idRef.current,
          row,
          col,
          color: getRandomColor(),
        };
      });
    },
    [swingX, swingY, gridWidth, gridHeight, boxSize, cols, rows, colors, leave],
  );

  useLayoutEffect(() => {
    if (fading.length === 0) return;
    const timer = setTimeout(() => setFading((f) => f.slice(1)), outDuration * 1000);
    return () => clearTimeout(timer);
  }, [fading, outDuration]);

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
      onPointerMove={handlePointerMove}
      onPointerLeave={leave}
      style={{
        ...style,
        // Absolute fill — Astro islands use `display: contents`, so % height
        // collapses; the sticky layer parent must supply real dimensions.
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor,
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
            transform: `translate(-50%, -50%) rotateY(${swingX}deg) rotateX(${swingY}deg)`,
            position: "absolute",
            left: "50%",
            top: "50%",
            transformOrigin: "center center",
            width: `${gridWidth}px`,
            height: `${gridHeight}px`,
            zIndex: 0,
          }}
        >
          {fading.map((cell) => (
            <motion.div
              key={cell.id}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: outDuration }}
              style={cellStyle(cell)}
            />
          ))}
          {lit && (
            <motion.div
              key={lit.id}
              initial={{ opacity: inDuration > 0 ? 0 : 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: inDuration }}
              style={cellStyle(lit)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
