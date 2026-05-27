// ── Nav scroll shadow ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 4px 30px rgba(0,0,0,0.5)'
    : 'none';
}, { passive: true });

// ── Active nav link on scroll ──────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-60px 0px -35% 0px' });

sections.forEach(sec => sectionObserver.observe(sec));

// ── Hamburger toggle ───────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links-list');

hamburger.addEventListener('click', () => {
  const isOpen = navLinksList.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on nav link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ── Scroll reveal for cards ────────────────────────────────────────
// Uses a local counter per IntersectionObserver batch so stagger
// delay only applies to cards visible at the same time — not all
// cards on the page.
const revealEls = document.querySelectorAll(
  '.project-card, .cert-card, .skill-group'
);

revealEls.forEach(el => { el.style.opacity = '0'; });

const revealObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting);
  visible.forEach((entry, i) => {
    const delay = i * 0.07;
    entry.target.style.animation = `fadeSlideUp 0.5s ease ${delay}s both`;
    entry.target.style.opacity   = '1';
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObserver.observe(el));
