export function initSpotlight() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const spotlightCards = document.querySelectorAll<HTMLElement>(
    ".bento-card, .project-card, .archive-card, .capability, .metric, .belief-card, .value-item, .channel-card, .post-card, .contact-card"
  );

  let mouseX = -9999;
  let mouseY = -9999;
  let rafId: number | null = null;

  function onMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!rafId) {
      rafId = requestAnimationFrame(updateSpotlight);
    }
  }

  function updateSpotlight() {
    rafId = null;

    document.documentElement.style.setProperty("--cursor-x", `${mouseX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${mouseY}px`);

    spotlightCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = mouseX - rect.left;
      const y = mouseY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  }

  window.addEventListener("mousemove", onMouseMove, { passive: true });

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("mousemove", onMouseMove);
  };
}
