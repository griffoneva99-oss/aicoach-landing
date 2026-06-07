// HEADER SMART SCROLL
const header = document.getElementById('header');
let lastScroll = 0;
let scrollThreshold = 80;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  if (currentScroll > lastScroll && currentScroll > 200) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  lastScroll = currentScroll;
}, { passive: true });

// MOBILE MENU
const navBurger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');

navBurger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
  const spans = navBurger.querySelectorAll('span');
  if (navMobile.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    const spans = navBurger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// COUNTER ANIMATION
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    if (target >= 10000) {
      el.textContent = Math.floor(current).toLocaleString('fr-FR');
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const counters = document.querySelectorAll('.stat-number[data-target]');
let countersStarted = false;

function checkCounters() {
  if (countersStarted) return;
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    countersStarted = true;
    counters.forEach(counter => animateCounter(counter));
  }
}

window.addEventListener('scroll', checkCounters, { passive: true });
checkCounters();
