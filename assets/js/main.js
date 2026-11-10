const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Header state on scroll
const header = document.querySelector('[data-header]');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Mobile navigation
const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
if (toggle && nav) {
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('nav-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 54.01rem)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}

// Reveal on scroll
const revealables = document.querySelectorAll('[data-reveal]');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-visible'));
}

// Home stage: the name is lit by the ghost light, and a follow spot tracks the pointer
const stage = document.querySelector('[data-stage]');
const title = stage && stage.querySelector('[data-lit]');
const bulb = stage && stage.querySelector('.servante__bulb');
if (stage && title && bulb) {
  const placeLight = () => {
    const t = title.getBoundingClientRect();
    const b = bulb.getBoundingClientRect();
    title.style.setProperty('--lx', `${b.left + b.width / 2 - t.left}px`);
    title.style.setProperty('--ly', `${b.top + b.height / 2 - t.top}px`);
  };
  placeLight();
  window.addEventListener('resize', placeLight, { passive: true });
  if (document.fonts) document.fonts.ready.then(placeLight);
  setTimeout(placeLight, 2200); // after the load sequence settles

  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const target = { x: 0, y: 0 };
    const spot = { x: 0, y: 0 };
    let raf = 0;
    let started = false;
    const render = () => {
      spot.x += (target.x - spot.x) * 0.14;
      spot.y += (target.y - spot.y) * 0.14;
      const s = stage.getBoundingClientRect();
      const t = title.getBoundingClientRect();
      stage.style.setProperty('--px', `${spot.x - s.left}px`);
      stage.style.setProperty('--py', `${spot.y - s.top}px`);
      title.style.setProperty('--sx', `${spot.x - t.left}px`);
      title.style.setProperty('--sy', `${spot.y - t.top}px`);
      raf = Math.hypot(target.x - spot.x, target.y - spot.y) > 0.5 ? requestAnimationFrame(render) : 0;
    };
    stage.addEventListener('pointermove', (e) => {
      target.x = e.clientX; target.y = e.clientY;
      if (!started) { started = true; spot.x = target.x; spot.y = target.y; stage.classList.add('is-spot'); }
      if (!raf) raf = requestAnimationFrame(render);
    }, { passive: true });
    stage.addEventListener('pointerleave', () => {
      stage.classList.remove('is-spot');
      title.style.setProperty('--sx', '-100rem');
      started = false;
    });
  }
}

// Category filters (progressive enhancement: everything is visible without JS)
const filters = document.querySelector('[data-filters]');
if (filters) {
  filters.hidden = false;
  const items = document.querySelectorAll('[data-filter-grid] [data-filter-item]');
  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    const value = btn.dataset.filter;
    filters.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    items.forEach((item) => { item.hidden = value !== '*' && item.dataset.filterItem !== value; });
  });
}

// Click-to-load videos (no third-party request before consent)
document.querySelectorAll('[data-video]').forEach((wrap) => {
  const btn = wrap.querySelector('button');
  btn?.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = wrap.dataset.src;
    iframe.title = wrap.dataset.title;
    iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    btn.replaceWith(iframe);
    iframe.focus();
  });
});

// Looping clips: respect reduced motion, pause when off-screen
document.querySelectorAll('[data-clip]').forEach((video) => {
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  video.controls = false;
  {
    new IntersectionObserver(([entry]) => { entry.isIntersecting ? video.play().catch(() => {}) : video.pause(); }).observe(video);
  }
});

// Obfuscated e-mail
const rev = (s) => s.split('').reverse().join('');
document.querySelectorAll('[data-email-user]').forEach((a) => {
  const address = `${rev(a.dataset.emailUser)}@${rev(a.dataset.emailDomain)}`;
  a.href = `mailto:${address}`;
  const text = a.querySelector('[data-email-text]');
  if (text) text.textContent = address;
});
