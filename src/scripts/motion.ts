import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, ScrollToPlugin);

const SCRAMBLE_CHARS = "01ABCDEF·/_";

export function initMotion() {
  const mm = gsap.matchMedia();
  let lenis: Lenis | null = null;
  let lenisTicker: ((time: number) => void) | null = null;
  const cleanupCallbacks: Array<() => void> = [];

  // 1. Metric Counters (runs in both reduced and full motion, instant when reduced)
  function initMetricCounters(instant: boolean) {
    const metricCards = document.querySelectorAll<HTMLElement>(".metric[data-target]");
    metricCards.forEach((card) => {
      const targetVal = parseFloat(card.dataset.target || "0");
      const numEl = card.querySelector<HTMLElement>(".metric-number");
      if (!numEl) return;

      if (instant) {
        numEl.textContent = String(targetVal);
        return;
      }

      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: targetVal,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 86%",
          once: true,
        },
        onUpdate: () => {
          numEl.textContent = Math.round(counterObj.val).toString();
        },
      });
    });
  }

  mm.add("(prefers-reduced-motion: reduce)", () => {
    initMetricCounters(true);
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // A. Lenis Smooth Scroll synchronized with GSAP Ticker
    lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    lenisTicker = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(lenisTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor navigation with header offset
    const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
    anchorLinks.forEach((link) => {
      const handler = (e: MouseEvent) => {
        const href = link.getAttribute("href");
        if (!href) return;
        const hashIndex = href.indexOf("#");
        if (hashIndex === -1) return;
        const hash = href.slice(hashIndex);
        if (hash === "#" || hash.length < 2) return;
        const target = document.querySelector<HTMLElement>(hash);
        if (!target) return;

        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -84, duration: 1.1 });
        } else {
          gsap.to(window, { scrollTo: { y: target, offsetY: 84 }, duration: 0.9, ease: "power3.out" });
        }
      };
      link.addEventListener("click", handler);
      cleanupCallbacks.push(() => link.removeEventListener("click", handler));
    });

    // B. Global Hairline Scroll Progress Bar
    let progressBar = document.querySelector<HTMLElement>(".scroll-progress-bar");
    if (!progressBar) {
      progressBar = document.createElement("div");
      progressBar.className = "scroll-progress-bar";
      progressBar.setAttribute("aria-hidden", "true");
      document.body.prepend(progressBar);
    }

    gsap.to(progressBar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });

    // C. Master Hero Entrance Choreography (SplitText + ScrambleText + Dossier)
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const heroEyebrow = document.querySelector<HTMLElement>(".hero-identity-strip .eyebrow");
    const heroTitle = document.querySelector<HTMLElement>("#hero-title");
    const dossierCard = document.querySelector<HTMLElement>(".engineer-dossier");

    if (heroEyebrow) {
      const originalEyebrow = heroEyebrow.textContent || "";
      heroTl.fromTo(
        heroEyebrow,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.65,
          scrambleText: { text: originalEyebrow, chars: SCRAMBLE_CHARS, speed: 0.6 },
        },
        0
      );
    }

    if (heroTitle) {
      const split = SplitText.create(heroTitle, {
        type: "words,lines",
        mask: "lines",
      });

      heroTl.from(
        split.lines,
        {
          yPercent: 105,
          opacity: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: "power4.out",
          onComplete: () => {
            split.revert();
          },
        },
        0.08
      );
    }

    heroTl
      .from(
        ".hero-fullname",
        { y: 12, opacity: 0, duration: 0.5 },
        0.12
      )
      .from(
        ".hero-summary",
        { y: 18, opacity: 0, duration: 0.65 },
        0.26
      )
      .from(
        ".hero-actions > *",
        { y: 14, opacity: 0, duration: 0.5, stagger: 0.07, clearProps: "transform" },
        0.34
      )
      .from(
        ".stack-pill-list li",
        { y: 10, opacity: 0, scale: 0.94, duration: 0.4, stagger: 0.035, clearProps: "transform" },
        0.42
      )
      .from(
        ".hero-quick-links li",
        { y: 10, opacity: 0, duration: 0.4, stagger: 0.06 },
        0.52
      );

    if (dossierCard) {
      heroTl
        .from(
          dossierCard,
          { y: 26, scale: 0.96, opacity: 0, duration: 0.85, ease: "power3.out", clearProps: "transform" },
          0.16
        )
        .from(
          ".dossier-hud-footer .hud-cell",
          { y: 10, opacity: 0, duration: 0.45, stagger: 0.08 },
          0.48
        );

      // Scrubbed subtle depth parallax on Hero Dossier
      gsap.to(dossierCard, {
        y: -26,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // 60fps 3D Specular Tilt via gsap.quickTo
      const rotXTo = gsap.quickTo(dossierCard, "rotateX", { duration: 0.45, ease: "power3.out" });
      const rotYTo = gsap.quickTo(dossierCard, "rotateY", { duration: 0.45, ease: "power3.out" });

      const onDossierMove = (e: MouseEvent) => {
        const rect = dossierCard.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        rotXTo(-ny * 4.5);
        rotYTo(nx * 4.5);
      };

      const onDossierLeave = () => {
        rotXTo(0);
        rotYTo(0);
      };

      dossierCard.addEventListener("mousemove", onDossierMove, { passive: true });
      dossierCard.addEventListener("mouseleave", onDossierLeave);
      cleanupCallbacks.push(() => {
        dossierCard.removeEventListener("mousemove", onDossierMove);
        dossierCard.removeEventListener("mouseleave", onDossierLeave);
      });
    }

    // D. Metric Counters
    initMetricCounters(false);

    // E. Section Eyebrow Telemetry Scramble Decode on Scroll
    document
      .querySelectorAll<HTMLElement>(".section-heading .eyebrow, .section-label .eyebrow")
      .forEach((eyebrow) => {
        const targetText = eyebrow.textContent || "";
        gsap.fromTo(
          eyebrow,
          { opacity: 0.35 },
          {
            opacity: 1,
            duration: 0.65,
            scrambleText: { text: targetText, chars: SCRAMBLE_CHARS, speed: 0.65 },
            scrollTrigger: {
              trigger: eyebrow,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

    // F. Staggered Bento Wave Reveals (instead of flat block fades)
    const bentoGroups = [
      ".metrics-list .metric",
      ".values-grid .value-item",
      ".capability-list .capability",
      ".archive-grid .archive-card",
      ".post-list .post-row",
      ".community-channels .channel-card",
    ];

    bentoGroups.forEach((selector) => {
      const items = gsap.utils.toArray<HTMLElement>(selector);
      if (items.length === 0) return;

      gsap.set(items, { opacity: 0, y: 26, scale: 0.98 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.085,
            ease: "power3.out",
            clearProps: "transform",
          });
        },
      });
    });

    // G. Section Headings & Standalone Cards
    document.querySelectorAll<HTMLElement>(".section-heading, .belief-card, .mentor-panel, .edu-panel, .contact-card, .telemetry-bar").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    // H. Project Cards + Sequential Architecture Topology Trace (N01 -> N02 -> N03 -> ...)
    document.querySelectorAll<HTMLElement>(".project-card").forEach((card) => {
      const info = card.querySelector<HTMLElement>(".project-card-info");
      const blueprint = card.querySelector<HTMLElement>(".project-blueprint");
      const nodes = card.querySelectorAll<HTMLElement>(".bp-node, .bp-connector");
      const bpMetrics = card.querySelectorAll<HTMLElement>(".bp-metric-box");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 84%",
          once: true,
        },
      });

      tl.fromTo(
        card,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", clearProps: "transform" },
        0
      );

      if (info) {
        tl.from(
          info.children,
          { y: 14, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" },
          0.1
        );
      }

      if (blueprint) {
        tl.from(
          blueprint,
          { opacity: 0, scale: 0.98, duration: 0.55, ease: "power2.out" },
          0.14
        );
      }

      if (nodes.length > 0) {
        tl.from(
          nodes,
          { x: -12, opacity: 0, duration: 0.4, stagger: 0.055, ease: "power2.out", clearProps: "transform" },
          0.22
        );
      }

      if (bpMetrics.length > 0) {
        tl.from(
          bpMetrics,
          { y: 10, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" },
          0.38
        );
      }
    });

    // I. Experience Timeline Spine Scrub + Item Activation
    const timeline = document.querySelector<HTMLElement>(".timeline");
    const timelineItems = document.querySelectorAll<HTMLElement>(".timeline-item");
    if (timeline && timelineItems.length > 0) {
      gsap.to(timeline, {
        "--timeline-progress": 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 72%",
          end: "bottom 72%",
          scrub: 0.3,
        },
      });

      timelineItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          }
        );

        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          end: "bottom 65%",
          onEnter: () => item.classList.add("timeline-active"),
          onLeaveBack: () => item.classList.remove("timeline-active"),
        });
      });
    }

    // J. 60fps Magnetic Buttons via gsap.quickTo()
    const magneticButtons = document.querySelectorAll<HTMLElement>(".button-magnetic");
    magneticButtons.forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        xTo(x * 0.28);
        yTo(y * 0.28);
      };

      const onLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "elastic.out(1, 0.42)",
          overwrite: "auto",
        });
      };

      btn.addEventListener("mousemove", onMove, { passive: true });
      btn.addEventListener("mouseleave", onLeave);
      cleanupCallbacks.push(() => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      });
    });

    // K. Re-animate Hero Title subtly when language switches (UZ <-> EN)
    const onLangChange = () => {
      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { opacity: 0.4, y: 8 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", clearProps: "transform" }
        );
      }
      ScrollTrigger.refresh();
    };
    window.addEventListener("languagechange", onLangChange);
    cleanupCallbacks.push(() => window.removeEventListener("languagechange", onLangChange));

    // Refresh ScrollTrigger positions once web fonts finish loading
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  });

  return () => {
    cleanupCallbacks.forEach((fn) => fn());
    if (lenisTicker) gsap.ticker.remove(lenisTicker);
    lenis?.destroy();
    mm.revert();
  };
}
