/** Scroll hash targets into view after View Transitions + layout settle. */
export function initHashScroll() {
  const scrollToHash = () => {
    if (!window.location.hash) return;
    const targetId = window.location.hash.replace("#", "");
    const el = document.getElementById(targetId);
    if (!el) return;
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "instant" });
      }, 60);
    });
  };

  document.addEventListener("astro:page-load", scrollToHash);

  return () => {
    document.removeEventListener("astro:page-load", scrollToHash);
  };
}
