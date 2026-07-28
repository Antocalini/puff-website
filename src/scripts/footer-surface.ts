/** Mirrors the last main section background onto the footer shell (overlap + rounded corners). */

function isTransparent(color: string) {
  return !color || color === "transparent" || color === "rgba(0, 0, 0, 0)";
}

function resolveBackground(el: HTMLElement) {
  let node: HTMLElement | null = el;

  while (node && node !== document.body) {
    const style = getComputedStyle(node);
    const color = style.backgroundColor;

    if (!isTransparent(color)) {
      return {
        color,
        image: style.backgroundImage !== "none" ? style.backgroundImage : "",
      };
    }

    node = node.parentElement;
  }

  return { color: "", image: "" };
}

export function syncFooterSurface() {
  const main = document.getElementById("main-content");
  const footer = document.querySelector<HTMLElement>(".site-footer");
  if (!main || !footer) return;

  const blocks = main.querySelectorAll<HTMLElement>(":scope > *");
  const lastBlock = blocks[blocks.length - 1];
  if (!lastBlock) return;

  const { color, image } = resolveBackground(lastBlock);

  if (color) {
    footer.style.setProperty("--footer-surface-bg", color);
  } else {
    footer.style.removeProperty("--footer-surface-bg");
  }

  if (image) {
    footer.style.setProperty("--footer-surface-bg-image", image);
  } else {
    footer.style.removeProperty("--footer-surface-bg-image");
  }
}
