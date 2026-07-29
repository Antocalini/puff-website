function initFaqLoop(root: HTMLElement) {
  const video = root.querySelector<HTMLVideoElement>("[data-faq-loop]");
  if (!video) return;

  video.playbackRate = 0.62;

  const play = () => {
    video.play().catch(() => {});
  };

  if (video.readyState >= 2) play();
  else video.addEventListener("loadeddata", play, { once: true });
}

function initFaqAccordion(root: HTMLElement) {
  initFaqLoop(root);

  const items = root.querySelectorAll<HTMLElement>(".faq-item");

  items.forEach((item) => {
    const trigger = item.querySelector<HTMLElement>(".faq-trigger");
    if (!trigger) return;

    trigger.replaceWith(trigger.cloneNode(true));
    const newTrigger = item.querySelector<HTMLElement>(".faq-trigger");
    if (!newTrigger) return;

    newTrigger.addEventListener("click", () => {
      const isActive = item.classList.contains("is-active");
      items.forEach((entry) => entry.classList.remove("is-active"));
      if (!isActive) item.classList.add("is-active");
    });
  });
}

export function initFaq() {
  const section = document.querySelector<HTMLElement>("#faq");
  if (!section) return;
  initFaqAccordion(section);
}
