/* Margine.ai — interactivity (vanilla, no deps) */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
   * 1) Reveal-on-scroll
   * --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------
   * 2) FAQ accordion
   * --------------------------------------------------------- */
  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
    });
  });

  /* ---------------------------------------------------------
   * 3) ROI counters
   * --------------------------------------------------------- */
  function easeOutQuad(t) { return t * (2 - t); }

  function formatNumber(value, format) {
    if (format === 'thousands') {
      return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return String(value);
  }

  function animateCounter(el) {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const target = parseInt(el.dataset.counter, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const format = el.dataset.format || '';

    if (prefersReducedMotion || isNaN(target)) {
      el.textContent = `${prefix}${formatNumber(target || 0, format)}${suffix}`;
      return;
    }

    const duration = 900;
    const start = performance.now();

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      const current = Math.round(target * eased);
      el.textContent = `${prefix}${formatNumber(current, format)}${suffix}`;
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  const roiSection = document.getElementById('roi');
  if (roiSection && 'IntersectionObserver' in window) {
    const roiObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-counter]').forEach(animateCounter);
            roiObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    roiObs.observe(roiSection);
  } else {
    roiSection?.querySelectorAll('[data-counter]').forEach(animateCounter);
  }

  /* ---------------------------------------------------------
   * 4) WhatsApp mock — cascade reveal
   * --------------------------------------------------------- */
  function cascadeMock(mockEl) {
    if (mockEl.dataset.cascaded === 'true') return;
    mockEl.dataset.cascaded = 'true';

    if (prefersReducedMotion) {
      mockEl.classList.add('is-cascading');
      return;
    }

    const lines = mockEl.querySelectorAll('.msg-line');
    lines.forEach((line, idx) => {
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, 300 + idx * 380);
    });
  }

  document.querySelectorAll('[data-cascade]').forEach((mock) => {
    if ('IntersectionObserver' in window) {
      const mockObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              cascadeMock(entry.target);
              mockObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      mockObs.observe(mock);
    } else {
      cascadeMock(mock);
    }
  });
})();
