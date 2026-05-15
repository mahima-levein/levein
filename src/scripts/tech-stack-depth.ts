import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const initializedScenes = new WeakSet<HTMLElement>();

function setupScene(scene: HTMLElement) {
  if (initializedScenes.has(scene)) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    initializedScenes.add(scene);
    return;
  }

  const frame = scene.querySelector<HTMLElement>("[data-tech-stack-frame]");
  const image = scene.querySelector<HTMLElement>("[data-tech-stack-image]");
  const glow = scene.querySelector<HTMLElement>("[data-tech-stack-glow]");
  const sheen = scene.querySelector<HTMLElement>("[data-tech-stack-sheen]");

  if (!frame || !image) {
    return;
  }

  const state = {
    raf: 0,
    bounds: null as DOMRect | null,
  };

  gsap.set(frame, {
    perspective: 1400,
    transformStyle: "preserve-3d",
  });

  gsap.set([glow, sheen, image], {
    transformStyle: "preserve-3d",
    willChange: "transform, opacity",
  });

  gsap.fromTo(
    frame,
    {
      y: 28,
      scale: 0.96,
      opacity: 0,
    },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: scene,
        start: "top 78%",
      },
    },
  );

  const reset = () => {
    gsap.to([image, glow, sheen], {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const applyDepth = (clientX: number, clientY: number) => {
    state.bounds = state.bounds || scene.getBoundingClientRect();
    const bounds = state.bounds;
    const px = (clientX - bounds.left) / bounds.width;
    const py = (clientY - bounds.top) / bounds.height;
    const tiltX = (0.5 - py) * 16;
    const tiltY = (px - 0.5) * 18;
    const liftX = (px - 0.5) * 18;
    const liftY = (py - 0.5) * 14;

    gsap.to(image, {
      rotateX: tiltX,
      rotateY: tiltY,
      x: liftX,
      y: liftY,
      scale: 1.03,
      duration: 0.55,
      ease: "power3.out",
      overwrite: true,
    });

    if (glow) {
      gsap.to(glow, {
        x: liftX * 0.55,
        y: liftY * 0.55,
        scale: 1.08,
        opacity: 0.95,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      });
    }

    if (sheen) {
      gsap.to(sheen, {
        x: liftX * 0.35,
        y: liftY * 0.35,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      });
    }
  };

  const handleMove = (event: PointerEvent) => {
    cancelAnimationFrame(state.raf);
    state.raf = requestAnimationFrame(() => {
      applyDepth(event.clientX, event.clientY);
    });
  };

  const handleEnter = (event: PointerEvent) => {
    state.bounds = scene.getBoundingClientRect();
    applyDepth(event.clientX, event.clientY);
  };

  const handleLeave = () => {
    state.bounds = null;
    cancelAnimationFrame(state.raf);
    reset();
  };

  scene.addEventListener("pointerenter", handleEnter);
  scene.addEventListener("pointermove", handleMove);
  scene.addEventListener("pointerleave", handleLeave);

  initializedScenes.add(scene);
}

export function initTechStackDepth(root: ParentNode = document) {
  const scenes = root.querySelectorAll<HTMLElement>("[data-tech-stack-scene]");
  scenes.forEach((scene) => setupScene(scene));
}
