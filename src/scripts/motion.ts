import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function initMotion() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Lenis Smooth Scrolling
  let lenis: Lenis | null = null;
  if (!reduceMotion) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // 3. Dynamic Metric Counters with GSAP ScrollTrigger
  const metricCards = document.querySelectorAll<HTMLElement>(".metric[data-target]");
  metricCards.forEach((card) => {
    const targetVal = parseFloat(card.dataset.target || "0");
    const numEl = card.querySelector<HTMLElement>(".metric-number");
    if (!numEl) return;

    if (reduceMotion) {
      numEl.textContent = String(targetVal);
      return;
    }

    const counterObj = { val: 0 };
    gsap.to(counterObj, {
      val: targetVal,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        numEl.textContent = Math.round(counterObj.val).toString();
      },
    });
  });

  // 4. Scroll-Triggered Reveal Animations for Sections
  if (!reduceMotion) {
    const revealSections = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    revealSections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Timeline Glow Line in Working Log
    const timeline = document.querySelector<HTMLElement>(".timeline");
    const timelineItems = document.querySelectorAll<HTMLElement>(".timeline li");
    if (timeline && timelineItems.length > 0) {
      timelineItems.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          end: "bottom 65%",
          onEnter: () => item.classList.add("timeline-active"),
          onLeaveBack: () => item.classList.remove("timeline-active"),
        });
      });
    }
  }

  // 5. Magnetic Button Effect
  if (!reduceMotion) {
    const magneticButtons = document.querySelectorAll<HTMLElement>(".button-magnetic");
    magneticButtons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.28,
          y: y * 0.28,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      });
    });
  }

  return () => {
    lenis?.destroy();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
