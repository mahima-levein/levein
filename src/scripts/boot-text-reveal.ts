import { initTextReveal } from "./text-reveal";

const boot = () => {
  initTextReveal(document);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

document.addEventListener("astro:page-load", boot);

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach((node) => {
      if (!(node instanceof Element)) {
        return;
      }

      initTextReveal(node);
    });
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
