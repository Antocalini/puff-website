import { testimonials } from "../content/testimonials";
import { ensureGsap, prefersReducedMotion } from "./motion/setup";

let tiltCleanup: (() => void) | undefined;
let autoplayTimer: ReturnType<typeof setInterval> | undefined;
let sectionAbort: AbortController | undefined;

export async function setupTestimonials() {
  teardownTestimonials();

  const section = document.querySelector<HTMLElement>("#testimonials");
  if (!section) return;

  sectionAbort = new AbortController();
  const { signal } = sectionAbort;

  const { gsap } = await ensureGsap();
  let currentIndex = 0;
  let isAnimating = false;

  const quoteEl = section.querySelector<HTMLElement>("[data-testimonial-quote]");
  const authorEl = section.querySelector<HTMLElement>("[data-testimonial-author]");
  const companyEl = section.querySelector<HTMLElement>("[data-testimonial-company]");
  const metaEl = section.querySelector<HTMLElement>("[data-testimonial-meta]");
  const dots = section.querySelectorAll<HTMLElement>("[data-testimonial-dot]");

  if (!quoteEl || !authorEl || !companyEl || !metaEl || dots.length === 0) return;

  function goToSlide(index: number) {
    if (isAnimating || index === currentIndex) return;

    isAnimating = true;

    gsap.to([quoteEl, metaEl], {
      yPercent: -120,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        currentIndex = index;
        const data = testimonials[index];

        quoteEl!.textContent = `"${data.quote}"`;
        authorEl!.textContent = data.author;
        companyEl!.textContent = data.company;

        gsap.set([quoteEl, metaEl], { yPercent: 120, opacity: 0 });

        gsap.to([quoteEl, metaEl], {
          yPercent: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
          onComplete: () => {
            isAnimating = false;
          },
        });
      },
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle("is-active", idx === index);
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => goToSlide(idx), { signal });
  });

  autoplayTimer = setInterval(() => {
    goToSlide((currentIndex + 1) % testimonials.length);
  }, 6500);

  const accentEl = section.querySelector<HTMLElement>("[data-testimonial-accent]");
  const cardStack = section.querySelector<HTMLElement>("[data-testimonial-container]");

  if (accentEl && cardStack) {
    const tiltDeg = 3.5;

    gsap.set(accentEl, {
      rotate: 0,
      transformOrigin: "center center",
    });

    if (prefersReducedMotion()) {
      gsap.set(accentEl, { rotate: tiltDeg });
    } else {
      const tiltTween = gsap.fromTo(
        accentEl,
        { rotate: 0 },
        {
          rotate: tiltDeg,
          ease: "none",
          scrollTrigger: {
            trigger: cardStack,
            start: "top 92%",
            end: "top 48%",
            scrub: 0.65,
          },
        },
      );

      tiltCleanup = () => {
        tiltTween.scrollTrigger?.kill();
        tiltTween.kill();
      };
    }
  }
}

export function teardownTestimonials() {
  tiltCleanup?.();
  tiltCleanup = undefined;

  if (autoplayTimer !== undefined) {
    clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  }

  sectionAbort?.abort();
  sectionAbort = undefined;
}
