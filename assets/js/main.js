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
  window.matchMedia('(min-width: 52.01rem)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
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

// Card glow follows the pointer
document.querySelectorAll('[data-card-glow]').forEach((card) => {
  const media = card.querySelector('.card__media');
  if (!media) return;
  card.addEventListener('pointermove', (e) => {
    const r = media.getBoundingClientRect();
    media.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    media.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  });
});

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
