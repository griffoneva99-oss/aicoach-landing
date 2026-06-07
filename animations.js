// INTERSECTION OBSERVER — REVEAL ON SCROLL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// PARALLAX HERO SHAPES
const shape1 = document.querySelector('.hero-shape-1');
const shape2 = document.querySelector('.hero-shape-2');
const heroImg = document.querySelector('.phone-img');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  if (scrollY < window.innerHeight) {
    if (shape1) shape1.style.transform = `translateY(${scrollY * 0.15}px)`;
    if (shape2) shape2.style.transform = `translateY(${scrollY * -0.1}px)`;
    if (heroImg) heroImg.style.transform = `translateY(${scrollY * 0.08}px)`;
  }
}, { passive: true });

// PARALLAX MOMENT SECTION
const momentImg = document.querySelector('.moment-img img');
const ctaBg = document.querySelector('.cta-bg img');

const parallaxObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const rect = entry.target.getBoundingClientRect();
      const scrolled = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = (scrolled - 0.5) * 80;
      if (entry.target.classList.contains('moment')) {
        if (momentImg) momentImg.style.transform = `translateY(${offset}px) scale(1.1)`;
      }
      if (entry.target.classList.contains('cta-section')) {
        if (ctaBg) ctaBg.style.transform = `translateY(${offset}px) scale(1.1)`;
      }
    }
  });
}, { threshold: Array.from({ length: 20 }, (_, i) => i / 20) });

const momentSection = document.querySelector('.moment');
const ctaSection = document.querySelector('.cta-section');
if (momentSection) parallaxObserver.observe(momentSection);
if (ctaSection) parallaxObserver.observe(ctaSection);

// SCROLL PARALLAX FOR MOMENT AND CTA
window.addEventListener('scroll', () => {
  [
    { section: '.moment', img: momentImg },
    { section: '.cta-section', img: ctaBg }
  ].forEach(({ section, img }) => {
    const el = document.querySelector(section);
    if (!el || !img) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = (progress - 0.5) * 80;
      img.style.transform = `translateY(${offset}px) scale(1.12)`;
    }
  });
}, { passive: true });

// FEATURE CARDS MAGNETIC HOVER
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    card.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// HERO TITLE STAGGER ON LOAD
window.addEventListener('load', () => {
  const heroEls = document.querySelectorAll('.hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 150 + 200);
  });
});

// CURSOR TRAIL ON HERO
const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 900) {
  let trails = [];
  hero.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: #C1603A;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${e.clientX - 3}px;
      top: ${e.clientY - 3}px;
      opacity: 0.6;
      transition: opacity 0.8s ease, transform 0.8s ease;
    `;
    document.body.appendChild(dot);
    trails.push(dot);
    setTimeout(() => {
      dot.style.opacity = '0';
      dot.style.transform = 'scale(0)';
    }, 50);
    setTimeout(() => {
      dot.remove();
      trails = trails.filter(t => t !== dot);
    }, 850);
  });
}

// SMOOTH NUMBER TICKER ON PRICING HOVER
document.querySelectorAll('.pricing-price').forEach(el => {
  const originalText = el.innerHTML;
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'scale(1.05)';
    el.style.transition = 'transform 0.3s ease';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});
