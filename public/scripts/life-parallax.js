(function () {
  const section = document.querySelector('.life_at_levein');
  if (!section) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const imgs = Array.from(section.querySelectorAll('img.life-image'));
  if (!imgs.length) return;

  let raf = 0;

  const handleMove = (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width; // -0.5..0.5+
      const dy = (e.clientY - cy) / rect.height;

      imgs.forEach((img, i) => {
        if (!(img instanceof HTMLImageElement)) return;
        const depth = 1 + (i % 4) * 0.25; // staggered intensity
        const tx = dx * 18 * depth; // px
        const ty = dy * 14 * depth; // px
        const rot = dx * 4 * depth; // deg
        img.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`;
      });
    });
  };

  const handleLeave = () => {
    cancelAnimationFrame(raf);
    imgs.forEach((img) => {
      if (!(img instanceof HTMLImageElement)) return;
      img.style.transition = 'transform 600ms cubic-bezier(0.2,0.8,0.2,1)';
      img.style.transform = '';
      setTimeout(() => { img.style.transition = ''; }, 610);
    });
  };

  section.addEventListener('mousemove', handleMove);
  section.addEventListener('mouseleave', handleLeave);
})();