// Simple global scroll reveal that works across pages/components
// Adds fade/slide-up animation to common containers and any element with
// the class 'reveal-on-scroll' or attribute 'data-reveal'.

(function () {
  if (typeof window === 'undefined') return;

  const SELECTORS = [
    '[data-reveal]',
    '.reveal-on-scroll',
    'section',
    '.bg-card',
    '.card',
    '.rounded-lg',
  ];

  const markRevealTargets = (root = document) => {
    try {
      const nodes = root.querySelectorAll(SELECTORS.join(','));
      nodes.forEach((el) => {
        // Skip if explicitly opted out
        if (el.hasAttribute('data-reveal-off')) return;
        // Avoid header fixed nav for performance/visual reasons
        if (el.closest('header')) return;
        // Add base class if not present
        if (!el.classList.contains('reveal-on-scroll')) {
          el.classList.add('reveal-on-scroll');
        }
      });
    } catch {}
  };

  const observeReveal = () => {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show immediately
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('reveal-in-view');
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in-view');
            io.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15,
      }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => io.observe(el));

    // Watch for future nodes (SPA route changes)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes && m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          // Mark potential targets inside the added subtree
          markRevealTargets(node);
          // Observe any reveal-on-scroll elements
          node.matches && node.matches('.reveal-on-scroll') && io.observe(node);
          node.querySelectorAll && node.querySelectorAll('.reveal-on-scroll').forEach((el) => io.observe(el));
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  };

  const init = () => {
    markRevealTargets(document);
    observeReveal();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
