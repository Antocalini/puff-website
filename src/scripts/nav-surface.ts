export type NavSurface = "yellow" | "ink";

/** Single source of truth for nav chrome — CSS reads html[data-nav-surface]. */
export function setNavSurface(tone: NavSurface) {
  if (document.documentElement.dataset.navSurface === tone) return;
  document.documentElement.dataset.navSurface = tone;
}

export function getNavSurface(): NavSurface {
  return document.documentElement.dataset.navSurface === "ink" ? "ink" : "yellow";
}
