const CAL_SCRIPT = "https://app.cal.com/embed/embed.js";

let calReady: Promise<void> | undefined;
let calInitialized = false;

function injectCalStub() {
  const w = window as Window & {
    Cal?: CalGlobal;
  };

  if (w.Cal) return;

  const queue: CalQueue = function (...args: unknown[]) {
    queue.q.push(args);
  };
  queue.q = [];
  queue.ns = {};

  w.Cal = queue as CalGlobal;
}

function loadCalScript(): Promise<void> {
  if (calReady) return calReady;

  calReady = new Promise((resolve, reject) => {
    injectCalStub();

    const existing = document.querySelector<HTMLScriptElement>('script[data-cal-embed="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Cal embed failed")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = CAL_SCRIPT;
    script.async = true;
    script.dataset.calEmbed = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Cal embed failed"));
    document.head.appendChild(script);
  });

  return calReady;
}

function initCalUi() {
  if (calInitialized) return;

  const Cal = (window as Window & { Cal?: CalGlobal }).Cal;
  if (!Cal) return;

  Cal("init", { origin: "https://cal.com" });
  Cal("ui", {
    theme: "dark",
    layout: "month_view",
    hideEventTypeDetails: false,
    styles: { branding: { brandColor: "#ffd100" } },
    cssVarsPerTheme: {
      dark: {
        "cal-brand": "#ffd100",
        "cal-brand-text": "#1a1a1a",
        "cal-brand-emphasis": "#e6bc00",
        "cal-bg": "#1a1a1a",
        "cal-bg-emphasis": "#2c2c2c",
        "cal-bg-subtle": "#242424",
        "cal-text": "#ffffff",
        "cal-text-emphasis": "#ffffff",
        "cal-text-subtle": "#ffffffb3",
        "cal-border-booker": "#ffffff1a",
        "cal-border": "#ffffff1a",
        radius: "1rem",
      },
    },
  });

  calInitialized = true;
}

async function ensureCalReady() {
  await loadCalScript();
  initCalUi();
}

export function setupCalEmbed() {
  const triggers = document.querySelectorAll<HTMLElement>("[data-cal-link]");
  if (triggers.length === 0) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener(
      "click",
      (event) => {
        if (calInitialized) return;

        event.preventDefault();
        event.stopPropagation();

        void ensureCalReady().then(() => {
          trigger.click();
        });
      },
      { capture: true },
    );
  });
}

type CalQueue = {
  (...args: unknown[]): void;
  q: unknown[][];
  ns: Record<string, unknown>;
  loaded?: boolean;
};

type CalGlobal = CalQueue & {
  (command: "init", config: { origin: string }): void;
  (command: "ui", config: Record<string, unknown>): void;
};
