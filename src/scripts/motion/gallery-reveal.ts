import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initGalleryReveal() {
  const mediaItems = document.querySelectorAll(".case-media");

  mediaItems.forEach((item) => {
    gsap.fromTo(
      item,
      {
        y: 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%", // Trigger when the top of the item hits 90% down the viewport
          toggleActions: "play none none none",
        },
      }
    );
  });
}
