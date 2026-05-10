/* =====================================================
   SAAD CODER PORTFOLIO — main.js
   ===================================================== */

/* ── Theme Toggle ── */
(function () {
  const saved = localStorage.getItem('sc-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeBtn(saved);

  window.toggleTheme = function () {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('sc-theme', next);
    updateThemeBtn(next);
  };

  function updateThemeBtn(theme) {
    const btns = document.querySelectorAll('.theme-btn');
    btns.forEach(b => { b.innerHTML = theme === 'dark' ? '☀️ Light' : '🌙 Dark'; });
  }
})();

/* ── Mobile Nav ── */
window.toggleMenu = function () {
  const nav = document.getElementById('mobileMenu');
  if (nav) nav.classList.toggle('open');
};

/* ── Scroll Reveal ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('visible'), delay * 1000);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* ── Skill Bars ── */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.pct + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

/* ── Animated Counters ── */
function initCounters() {
  const els = document.querySelectorAll('.counter');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = +e.target.dataset.to;
        const suffix = e.target.dataset.suffix || '';
        let start = 0;
        const step = target / 70;
        const id = setInterval(() => {
          start += step;
          if (start >= target) { e.target.textContent = target + suffix; clearInterval(id); }
          else e.target.textContent = Math.floor(start) + suffix;
        }, 18);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  els.forEach(el => obs.observe(el));
}

/* ── Active Nav Link ── */
function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === current) a.classList.add('active');
    else a.classList.remove('active');
  });
}

/* ── Navbar scroll effect ── */
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.18)';
    else nav.style.boxShadow = 'none';
  });
}

/* ── Marquee duplicate ── */
function initMarquee() {
  const inner = document.querySelector('.marquee-inner');
  if (!inner) return;
  inner.innerHTML += inner.innerHTML;
}

/* ── Contact Form ── */
window.submitForm = function (e) {
  e.preventDefault();
  const btn = document.getElementById('sendBtn');
  const thanks = document.getElementById('thankMsg');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  setTimeout(() => {
    document.getElementById('contactForm').style.display = 'none';
    thanks.style.display = 'block';
  }, 1000);
};

/* ── Init all ── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initSkillBars();
  initCounters();
  setActiveNav();
  initNavScroll();
  initMarquee();
});
