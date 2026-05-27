// ── Nav scroll shadow ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 4px 30px rgba(0,0,0,0.5)'
    : 'none';
});

// ── Active nav link on scroll ──────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
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
}, { threshold: 0.35, rootMargin: '-60px 0px -40% 0px' });

sections.forEach(sec => observer.observe(sec));

// ── Hamburger toggle ───────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksList = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});

// Close menu on nav link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => navLinksList.classList.remove('open'));
});

// ── Scroll reveal for cards ────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.project-card, .cert-card, .skill-group'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animation =
        `fadeSlideUp 0.5s ease ${i * 0.06}s both`;
      entry.target.style.opacity = '1';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  revealObserver.observe(el);
});
