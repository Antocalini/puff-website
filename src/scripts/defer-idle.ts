/** Run work after first paint — keeps GSAP and below-fold JS off the LCP path. */
export function whenIdle(task: () => void | Promise<void>, timeout = 2500) {
  const run = () => {
    void task();
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(run, { timeout });
    return;
  }

  setTimeout(run, 200);
}
