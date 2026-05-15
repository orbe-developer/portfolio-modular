/* ============================================================
   Portfolio — interactions
   Orbehin Sarmiento Barzaga

   - sticky-nav state on scroll
   - mobile menu toggle
   - active section highlighting in nav
   - IntersectionObserver-based reveal-on-scroll
   - bot-resistant email assembly
   ============================================================ */

(function () {
  'use strict';

  // ---- Sticky nav background on scroll ------------------------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu --------------------------------------------
  const menuBtn = document.getElementById('menuBtn');
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('#navLinks a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- Active section highlight in nav ------------------------
  // Each nav link points to an in-page anchor (#about, #experience, …).
  // We track which section is currently dominant in the viewport and
  // tag the matching link with .is-active.
  const navLinks = Array.from(document.querySelectorAll('#navLinks a[href^="#"]'));
  const sectionMap = new Map(); // section element -> nav link
  navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) sectionMap.set(el, link);
  });

  const setActive = (link) => {
    navLinks.forEach(l => l.classList.toggle('is-active', l === link));
  };

  // Use IntersectionObserver with a viewport band centred near the top
  // of the screen, so a section "activates" as it scrolls into the
  // upper portion of the viewport (feels natural while scrolling).
  if (sectionMap.size) {
    const visibility = new Map();
    const sectionIO = new IntersectionObserver((entries) => {
      entries.forEach(e => visibility.set(e.target, e.intersectionRatio));
      // pick the most-visible tracked section
      let best = null, bestRatio = 0;
      visibility.forEach((ratio, el) => {
        if (ratio > bestRatio) { bestRatio = ratio; best = el; }
      });
      if (best && bestRatio > 0) setActive(sectionMap.get(best));
    }, {
      // A band that runs from 18% below the top of the viewport to 40%
      // from the bottom. Means a section needs to occupy that middle
      // strip to count as "active".
      rootMargin: '-18% 0px -40% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    sectionMap.forEach((_, el) => sectionIO.observe(el));
  }

  // ---- Reveal-on-scroll ---------------------------------------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---- Email assembly (bot-resistant) -------------------------
  // The email address is split across data-* attributes in the HTML
  // and assembled here at runtime. Static HTML never contains the
  // full address, which deters naive scrapers.
  document.querySelectorAll('.js-email').forEach(el => {
    const user = el.dataset.user;
    const domain = el.dataset.domain;
    if (!user || !domain) return;
    const addr = user + '\u0040' + domain;
    el.setAttribute('href', 'mailto:' + addr);
    const label = el.querySelector('.js-email-text');
    if (label) label.textContent = addr;
  });

})();
