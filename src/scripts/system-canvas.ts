interface TopologyNode {
  id: string;
  name: string;
  sub: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
}

interface DataPacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  size: number;
}

export function initSystemCanvas(containerSelector = ".system-map-container") {
  const container = document.querySelector<HTMLElement>(containerSelector);
  if (!container) return;

  const canvas = container.querySelector<HTMLCanvasElement>("canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const targetContainer = container;
  const targetCanvas = canvas;
  const targetCtx = ctx;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId: number | null = null;
  let isVisible = true;

  // Nodes definition (percentage of width/height)
  const nodeDefs = [
    { id: "core", name: "XH/SYSTEMS", sub: "CORE ENGINE", px: 0.5, py: 0.5, radius: 46 },
    { id: "backend", name: "BACKEND", sub: "NestJS · Go · Deno", px: 0.22, py: 0.24, radius: 34 },
    { id: "product", name: "PRODUCT", sub: "Next.js · Arch", px: 0.78, py: 0.24, radius: 34 },
    { id: "infra", name: "INFRA", sub: "Docker · AWS · CI", px: 0.22, py: 0.76, radius: 34 },
    { id: "data", name: "DATA", sub: "Postgres · Oracle", px: 0.78, py: 0.76, radius: 34 },
  ];

  const palette = { signal: "", signalDim: "", signalRgb: "", ink: "", inkFaint: "", inkRgb: "", surface: "" };

  function readPalette() {
    const css = getComputedStyle(document.documentElement);
    const read = (name: string) => css.getPropertyValue(name).trim();
    palette.signal = read("--signal");
    palette.signalDim = read("--signal-dim");
    palette.signalRgb = read("--signal-rgb").split(" ").join(", ");
    palette.ink = read("--ink");
    palette.inkFaint = read("--ink-faint");
    palette.inkRgb = read("--ink-rgb").split(" ").join(", ");
    palette.surface = read("--surface");
  }

  readPalette();

  let nodes: TopologyNode[] = [];
  const packets: DataPacket[] = [];

  // Mouse interaction
  const mouse = { x: -9999, y: -9999, active: false };

  function resize() {
    const rect = targetContainer.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    targetCanvas.width = width * dpr;
    targetCanvas.height = height * dpr;
    targetCanvas.style.width = `${width}px`;
    targetCanvas.style.height = `${height}px`;

    targetCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Reposition nodes based on container dimensions
    nodes = nodeDefs.map((def) => {
      const x = width * def.px;
      const y = height * def.py;
      const radius = width < 480 ? def.radius * 0.78 : def.radius;
      return {
        id: def.id,
        name: def.name,
        sub: def.sub,
        x,
        y,
        baseX: x,
        baseY: y,
        radius,
      };
    });

    // Initialize packets traveling along connections (0 is core, 1..4 are satellites)
    if (packets.length === 0) {
      for (let i = 1; i <= 4; i++) {
        // Core to satellite
        packets.push({
          fromIndex: 0,
          toIndex: i,
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.004,
          size: 3,
        });
        // Satellite to core
        packets.push({
          fromIndex: i,
          toIndex: 0,
          progress: Math.random(),
          speed: 0.004 + Math.random() * 0.004,
          size: 2.5,
        });
      }
    }
  }

  function onMouseMove(e: MouseEvent) {
    const rect = targetCanvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }

  function onMouseLeave() {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  }

  targetContainer.addEventListener("mousemove", onMouseMove);
  targetContainer.addEventListener("mouseleave", onMouseLeave);

  let angle = 0;

  function render() {
    if (!isVisible) return;

    targetCtx.clearRect(0, 0, width, height);
    angle += 0.015;

    // Harmonic floating of nodes
    const core = nodes[0];
    if (core && !reduceMotion) {
      core.x = core.baseX + Math.sin(angle * 0.8) * 4;
      core.y = core.baseY + Math.cos(angle * 0.8) * 4;
    }

    for (let i = 1; i < nodes.length; i++) {
      const node = nodes[i];
      if (!reduceMotion) {
        node.x = node.baseX + Math.sin(angle + i * 1.5) * 5;
        node.y = node.baseY + Math.cos(angle * 0.9 + i) * 5;
      }

      // Mouse repulsion / gentle spring
      if (mouse.active) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100;
          node.x -= (dx / dist) * force * 12;
          node.y -= (dy / dist) * force * 12;
        }
      }
    }

    // Draw connection lines
    if (core) {
      for (let i = 1; i < nodes.length; i++) {
        const node = nodes[i];
        const gradient = targetCtx.createLinearGradient(core.x, core.y, node.x, node.y);
        gradient.addColorStop(0, `rgba(${palette.signalRgb}, 0.6)`);
        gradient.addColorStop(1, `rgba(${palette.signalRgb}, 0.2)`);

        targetCtx.strokeStyle = gradient;
        targetCtx.lineWidth = 1.5;
        targetCtx.beginPath();
        targetCtx.moveTo(core.x, core.y);
        targetCtx.lineTo(node.x, node.y);
        targetCtx.stroke();

        // Cross connection between satellites for rich mesh
        const next = nodes[i === 4 ? 1 : i + 1];
        if (next) {
          targetCtx.strokeStyle = `rgba(${palette.inkRgb}, 0.1)`;
          targetCtx.lineWidth = 1;
          targetCtx.beginPath();
          targetCtx.moveTo(node.x, node.y);
          targetCtx.lineTo(next.x, next.y);
          targetCtx.stroke();
        }
      }
    }

    // Draw data packets moving along connections
    if (!reduceMotion) {
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const from = nodes[p.fromIndex];
        const to = nodes[p.toIndex];
        if (!from || !to) return;

        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;

        targetCtx.fillStyle = p.fromIndex === 0 ? palette.signal : palette.signalDim;
        targetCtx.beginPath();
        targetCtx.arc(px, py, p.size, 0, Math.PI * 2);
        targetCtx.fill();
      });
    }

    // Draw Nodes
    nodes.forEach((node, index) => {
      const isCore = index === 0;

      // Outer halo
      targetCtx.beginPath();
      targetCtx.arc(node.x, node.y, node.radius + (isCore ? 6 : 4), 0, Math.PI * 2);
      targetCtx.fillStyle = isCore ? `rgba(${palette.signalRgb}, 0.1)` : `rgba(${palette.inkRgb}, 0.04)`;
      targetCtx.fill();

      // Circle boundary
      targetCtx.beginPath();
      targetCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      targetCtx.fillStyle = palette.surface;
      targetCtx.fill();
      targetCtx.lineWidth = isCore ? 2 : 1;
      targetCtx.strokeStyle = isCore ? palette.signal : `rgba(${palette.inkRgb}, 0.35)`;
      targetCtx.stroke();

      // Node label
      targetCtx.textAlign = "center";
      targetCtx.textBaseline = "middle";
      targetCtx.fillStyle = isCore ? palette.signal : palette.ink;
      targetCtx.font = isCore ? "bold 13px SFMono-Regular, Consolas, monospace" : "bold 11px SFMono-Regular, Consolas, monospace";
      targetCtx.fillText(node.name, node.x, isCore ? node.y - 7 : node.y - 6);

      // Node subtext
      targetCtx.fillStyle = isCore ? palette.signalDim : palette.inkFaint;
      targetCtx.font = "10px SFMono-Regular, Consolas, monospace";
      targetCtx.fillText(node.sub, node.x, isCore ? node.y + 11 : node.y + 8);
    });

    if (!reduceMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  // IntersectionObserver to pause render when offscreen
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId && !reduceMotion) {
          animationFrameId = requestAnimationFrame(render);
        } else if (!isVisible && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(targetContainer);

  const onResize = () => {
    resize();
    render();
  };

  const onThemeChange = () => {
    readPalette();
    render();
  };

  window.addEventListener("resize", onResize);
  window.addEventListener("themechange", onThemeChange);

  resize();
  render();

  return () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    observer.disconnect();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("themechange", onThemeChange);
    targetContainer.removeEventListener("mousemove", onMouseMove);
    targetContainer.removeEventListener("mouseleave", onMouseLeave);
  };
}
