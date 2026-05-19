import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const initializedGroups = new WeakSet<HTMLElement>();
const splitInstancesByGroup = new WeakMap<HTMLElement, SplitType[]>();
const initializedDmGroups = new WeakSet<HTMLElement>();
const splitInstancesByDmGroup = new WeakMap<HTMLElement, SplitType[]>();

function setupRevealGroup(group: HTMLElement) {
  if (initializedGroups.has(group)) {
    return;
  }

  const heading = group.querySelector<HTMLElement>("[data-reveal-heading]");
  const body = group.querySelector<HTMLElement>("[data-reveal-body]");

  if (!heading) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    initializedGroups.add(group);
    return;
  }

  const headingSplit = new SplitType(heading, { types: "words" });
  const bodySplit = body ? new SplitType(body, { types: "lines" }) : null;
  const startPosition = group.dataset.revealStart || "top 80%";
  const ease = group.dataset.revealEase || "power2.out";

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: group,
      start: startPosition,
    },
  });

  timeline.from(headingSplit.words, {
    x: -30,
    opacity: 0,
    duration: 0.35,
    stagger: 0.08,
    ease,
  });

  if (bodySplit) {
    timeline.from(
      bodySplit.lines,
      {
        x: -30,
        opacity: 0,
        duration: 0.35,
        stagger: 0.08,
        ease,
      },
      "-=0.2",
    );
  }

  splitInstancesByGroup.set(
    group,
    bodySplit ? [headingSplit, bodySplit] : [headingSplit],
  );
  initializedGroups.add(group);
}

export function initTextReveal(root: ParentNode = document) {
  const groups = root.querySelectorAll<HTMLElement>("[data-reveal-group]");
  groups.forEach((group) => {
    if (group.closest("[data-reveal-local]") && root === document) {
      return;
    }

    setupRevealGroup(group);
  });
}

function setupDmRevealGroup(group: HTMLElement) {
  if (initializedDmGroups.has(group)) {
    return;
  }

  const heading = group.querySelector<HTMLElement>(
    ".dm-heading5 h2, .dm-heading5 h1, .dm-heading5 h3",
  );
  const paragraph = group.querySelector<HTMLElement>(".dm-paragraph5 p");

  if (!heading) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    initializedDmGroups.add(group);
    return;
  }

  const headingSplit = new SplitType(heading, { types: "lines,words" });
  const paragraphSplit = paragraph
    ? new SplitType(paragraph, { types: "lines" })
    : null;
  const startPosition = group.dataset.revealStart || "top 80%";
  const ease = group.dataset.revealEase || "power2.out";

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: group,
      start: startPosition,
    },
  });

  const headingLines = headingSplit.lines ?? [];
  const paragraphLines = paragraphSplit?.lines ?? [];

  headingLines.forEach((line) => {
    timeline.to(line, {
      onStart: () => {
        line.classList.add("animate", "dmRevealAnim1hp");
      },
      duration: 0.1,
      ease,
    });
  });

  if (paragraphSplit) {
    paragraphLines.forEach((line) => {
      timeline.to(
        line,
        {
          onStart: () => {
            line.classList.add("animate", "dmRevealAnim1hp");
          },
          duration: 0.1,
          ease,
        },
        "+=0.06",
      );
    });
  }

  splitInstancesByDmGroup.set(
    group,
    paragraphSplit ? [headingSplit, paragraphSplit] : [headingSplit],
  );
  initializedDmGroups.add(group);
}

export function initDmReveal(root: ParentNode = document) {
  const groups = root.querySelectorAll<HTMLElement>(".dm-reveal-group");
  groups.forEach((group) => setupDmRevealGroup(group));
}

export function destroyTextReveal(root: ParentNode = document) {
  const groups = root.querySelectorAll<HTMLElement>("[data-reveal-group]");

  groups.forEach((group) => {
    const splits = splitInstancesByGroup.get(group);
    if (splits) {
      splits.forEach((split) => split.revert());
      splitInstancesByGroup.delete(group);
    }

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === group) {
        trigger.kill();
      }
    });
  });
}

export function destroyDmReveal(root: ParentNode = document) {
  const groups = root.querySelectorAll<HTMLElement>(".dm-reveal-group");

  groups.forEach((group) => {
    const splits = splitInstancesByDmGroup.get(group);
    if (splits) {
      splits.forEach((split) => split.revert());
      splitInstancesByDmGroup.delete(group);
    }

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === group) {
        trigger.kill();
      }
    });
  });
}
