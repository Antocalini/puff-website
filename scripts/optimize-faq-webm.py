"""
Optimize faq.mp4 → seamless-loop transparent WebM (VP9 + alpha).

Pipeline:
1. Interpolate to 60fps for smoother motion
2. Flood-fill black background from edges (preserves black line art)
3. Stabilize subject scale (dampen baked-in scale pulse)
4. Crossfade last frames into first frames for a perfect loop
5. Encode libvpx-vp9 yuva420p
"""

from __future__ import annotations

import math
import shutil
import subprocess
import sys
import tempfile
from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC_MP4 = ROOT / "src" / "assets" / "images" / "faq.mp4"
OUT_WEBM = ROOT / "src" / "assets" / "images" / "faq.webm"

TARGET_FPS = 48
BLEND_SECONDS = 0.4
# Drop Gemini watermark (bottom-right) and excess letterboxing before keying
CROP_FILTER = "crop=940:780:0:0"
BG_TOLERANCE = 22
EDGE_FEATHER = 1
# 0 = lock scale fully; 1 = keep original scale pulse
SCALE_RETENTION = 0.18
ALPHA_THRESHOLD = 12
# Peel outer sticker rim (near-white pixels close to transparent)
WHITE_MIN = 175
WHITE_MAX_CHROMA = 36
WHITE_PEEL_DIST = 22
GRAY_EDGE_MAX = 210


def run(cmd: list[str]) -> None:
    print("+", " ".join(cmd))
    subprocess.run(cmd, check=True)


def is_background(px: tuple[int, int, int, int], tol: int) -> bool:
    r, g, b, _a = px
    return r <= tol and g <= tol and b <= tol


def remove_corner_watermark(img: Image.Image) -> Image.Image:
    """Erase isolated gray Gemini mark that survives a loose right-edge crop."""
    img = img.convert("RGBA")
    w, h = img.size
    pix = img.load()
    x0 = int(w * 0.84)
    y0 = int(h * 0.84)
    for y in range(y0, h):
        for x in range(x0, w):
            r, g, b, a = pix[x, y]
            if a < 12:
                continue
            if max(r, g, b) <= 130 and max(r, g, b) - min(r, g, b) <= 20:
                pix[x, y] = (0, 0, 0, 0)
    return img


def remove_black_background(
    img: Image.Image,
    tol: int = BG_TOLERANCE,
    feather: bool = True,
) -> Image.Image:
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    visited = bytearray(w * h)
    queue: deque[tuple[int, int]] = deque()

    seeds = [
        (0, 0),
        (w - 1, 0),
        (0, h - 1),
        (w - 1, h - 1),
        (w // 2, 0),
        (w // 2, h - 1),
        (0, h // 2),
        (w - 1, h // 2),
    ]
    for x, y in seeds:
        if is_background(pixels[x, y], tol):
            queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        idx = y * w + x
        if visited[idx]:
            continue
        if not is_background(pixels[x, y], tol):
            continue
        visited[idx] = 1
        pixels[x, y] = (0, 0, 0, 0)
        if x + 1 < w:
            queue.append((x + 1, y))
        if x > 0:
            queue.append((x - 1, y))
        if y + 1 < h:
            queue.append((x, y + 1))
        if y > 0:
            queue.append((x, y - 1))

    if feather and EDGE_FEATHER > 0:
        alpha = img.getchannel("A")
        soft = alpha.filter(ImageFilter.GaussianBlur(EDGE_FEATHER))
        img.putalpha(soft)

    return img


def is_near_white(r: int, g: int, b: int) -> bool:
    if min(r, g, b) < WHITE_MIN:
        return False
    return max(r, g, b) - min(r, g, b) <= WHITE_MAX_CHROMA


def is_soft_gray_edge(r: int, g: int, b: int) -> bool:
    if max(r, g, b) < 40 or max(r, g, b) > GRAY_EDGE_MAX:
        return False
    return max(r, g, b) - min(r, g, b) <= 18


def remove_white_outline(img: Image.Image) -> Image.Image:
    """Strip outer sticker white rim; stop at black outlines so shoes/eyes survive."""
    img = img.convert("RGBA")
    w, h = img.size
    pix = img.load()

    def is_clear(x: int, y: int) -> bool:
        return pix[x, y][3] < ALPHA_THRESHOLD

    def peelable(r: int, g: int, b: int) -> bool:
        return is_near_white(r, g, b) or is_soft_gray_edge(r, g, b)

    # Seed frontier: opaque peelable pixels touching transparent
    frontier: deque[tuple[int, int]] = deque()
    seen = bytearray(w * h)
    for y in range(h):
        for x in range(w):
            r, g, b, a = pix[x, y]
            if a < ALPHA_THRESHOLD or not peelable(r, g, b):
                continue
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if nx < 0 or ny < 0 or nx >= w or ny >= h or is_clear(nx, ny):
                    frontier.append((x, y))
                    seen[y * w + x] = 1
                    break

    # Grow peel through contiguous white/gray only (halts at black/yellow)
    while frontier:
        x, y = frontier.popleft()
        r, g, b, a = pix[x, y]
        if a < ALPHA_THRESHOLD or not peelable(r, g, b):
            continue
        pix[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if nx < 0 or ny < 0 or nx >= w or ny >= h:
                continue
            idx = ny * w + nx
            if seen[idx]:
                continue
            nr, ng, nb, na = pix[nx, ny]
            if na < ALPHA_THRESHOLD or not peelable(nr, ng, nb):
                continue
            seen[idx] = 1
            frontier.append((nx, ny))

    # Hard-clip soft garbage left by blur/encode
    for y in range(h):
        for x in range(w):
            r, g, b, a = pix[x, y]
            if a < 40:
                pix[x, y] = (0, 0, 0, 0)

    if EDGE_FEATHER > 0:
        alpha = img.getchannel("A")
        soft = alpha.filter(ImageFilter.GaussianBlur(EDGE_FEATHER))
        img.putalpha(soft)

    return img


def subject_bbox(img: Image.Image, threshold: int = ALPHA_THRESHOLD) -> tuple[int, int, int, int] | None:
    alpha = img.getchannel("A")
    # getbbox on thresholded alpha
    mask = alpha.point(lambda a: 255 if a >= threshold else 0)
    return mask.getbbox()


def stabilize_scale(
    frames: list[Image.Image],
    retention: float = SCALE_RETENTION,
) -> list[Image.Image]:
    """Normalize subject size toward a constant target to soften baked-in scale."""
    boxes: list[tuple[int, int, int, int]] = []
    sizes: list[float] = []
    centers: list[tuple[float, float]] = []

    for frame in frames:
        box = subject_bbox(frame)
        if box is None:
            boxes.append((0, 0, frame.width, frame.height))
            sizes.append(float(min(frame.width, frame.height)))
            centers.append((frame.width / 2, frame.height / 2))
            continue
        x0, y0, x1, y1 = box
        bw, bh = x1 - x0, y1 - y0
        boxes.append(box)
        sizes.append(math.hypot(bw, bh))
        centers.append((x0 + bw / 2, y0 + bh / 2))

    target = sorted(sizes)[len(sizes) // 2]  # median size
    print(
        f"Scale stabilize: min={min(sizes):.1f} med={target:.1f} "
        f"max={max(sizes):.1f} retention={retention}"
    )

    out: list[Image.Image] = []
    for frame, size, (cx, cy) in zip(frames, sizes, centers):
        if size <= 1:
            out.append(frame)
            continue

        # Dampen deviation from median size
        natural_scale = target / size
        scale = 1.0 + (natural_scale - 1.0) * (1.0 - retention)

        canvas = Image.new("RGBA", frame.size, (0, 0, 0, 0))
        if abs(scale - 1.0) < 0.001:
            # Still recenter lightly if needed — keep as-is
            canvas.paste(frame, (0, 0))
            out.append(canvas)
            continue

        new_w = max(1, round(frame.width * scale))
        new_h = max(1, round(frame.height * scale))
        scaled = frame.resize((new_w, new_h), Image.Resampling.LANCZOS)

        # Keep subject center roughly fixed
        new_cx = cx * scale
        new_cy = cy * scale
        paste_x = round(cx - new_cx)
        paste_y = round(cy - new_cy)
        canvas.alpha_composite(scaled, (paste_x, paste_y))
        out.append(canvas)

    return out


def blend_rgba(a: Image.Image, b: Image.Image, t: float) -> Image.Image:
    t = max(0.0, min(1.0, t))
    return Image.blend(a.convert("RGBA"), b.convert("RGBA"), t)


def smoothstep(t: float) -> float:
    t = max(0.0, min(1.0, t))
    return t * t * (3.0 - 2.0 * t)


def make_perfect_loop(frames: list[Image.Image], blend_count: int) -> list[Image.Image]:
    if blend_count < 2 or blend_count * 2 >= len(frames):
        return frames

    out = [f.copy() for f in frames]
    n = len(out)
    for i in range(blend_count):
        t = smoothstep((i + 1) / (blend_count + 1))
        end_idx = n - blend_count + i
        out[end_idx] = blend_rgba(out[end_idx], out[i], t)
    return out


def main() -> int:
    if not SRC_MP4.exists():
        print(f"Missing source: {SRC_MP4}", file=sys.stderr)
        return 1

    work = Path(tempfile.mkdtemp(prefix="faq-webm-"))
    raw_dir = work / "raw"
    keyed_dir = work / "keyed"
    raw_dir.mkdir()
    keyed_dir.mkdir()

    try:
        run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(SRC_MP4),
                "-vf",
                (
                    f"{CROP_FILTER},"
                    f"minterpolate=fps={TARGET_FPS}:mi_mode=mci:mc_mode=aobmc:"
                    "me_mode=bidir:vsbmc=1"
                ),
                "-an",
                str(raw_dir / "%04d.png"),
            ]
        )

        raw_frames = sorted(raw_dir.glob("*.png"))
        if not raw_frames:
            print("No frames extracted", file=sys.stderr)
            return 1

        print(f"Extracted {len(raw_frames)} frames @ {TARGET_FPS}fps")

        keyed: list[Image.Image] = []
        for i, path in enumerate(raw_frames):
            img = Image.open(path)
            keyed_img = remove_black_background(img, feather=True)
            keyed_img = remove_corner_watermark(keyed_img)
            # Keep sticker white rim — do not peel outline
            keyed.append(keyed_img)
            keyed_img.save(keyed_dir / f"{i:04d}.png")
            if i % 20 == 0:
                print(f"  keyed {i + 1}/{len(raw_frames)}")

        stabilized = stabilize_scale(keyed, retention=SCALE_RETENTION)

        blend_count = max(2, round(BLEND_SECONDS * TARGET_FPS))
        print(f"Loop blend window: {blend_count} frames ({BLEND_SECONDS}s)")
        looped = make_perfect_loop(stabilized, blend_count)

        loop_dir = work / "loop"
        loop_dir.mkdir()
        for i, frame in enumerate(looped):
            frame.save(loop_dir / f"{i:04d}.png")

        preview = ROOT / "src" / "assets" / "images" / "_faq-probe"
        preview.mkdir(exist_ok=True)
        looped[0].save(preview / "keyed-first.png")
        looped[-1].save(preview / "keyed-last.png")
        looped[len(looped) // 2].save(preview / "keyed-mid.png")

        run(
            [
                "ffmpeg",
                "-y",
                "-framerate",
                str(TARGET_FPS),
                "-i",
                str(loop_dir / "%04d.png"),
                "-c:v",
                "libvpx-vp9",
                "-pix_fmt",
                "yuva420p",
                "-b:v",
                "0",
                "-crf",
                "32",
                "-row-mt",
                "1",
                "-auto-alt-ref",
                "0",
                "-an",
                str(OUT_WEBM),
            ]
        )

        size_kb = OUT_WEBM.stat().st_size / 1024
        print(f"Wrote {OUT_WEBM} ({size_kb:.1f} KB)")
        return 0
    finally:
        shutil.rmtree(work, ignore_errors=True)


if __name__ == "__main__":
    raise SystemExit(main())
