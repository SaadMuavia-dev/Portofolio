/* ===================================================
   DevSphere Studio — Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(() => preloader && preloader.classList.add('loaded'), 300);
  });
  // fallback in case 'load' already fired
  if (document.readyState === 'complete') {
    setTimeout(() => preloader && preloader.classList.add('loaded'), 300);
  }

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('mainNavbar');
  function handleNavScroll() {
    if (!navbar) return;
    window.scrollY > 40 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  /* Close mobile menu on link click */
  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.querySelector('.navbar-collapse.show');
      if (collapse && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });

  /* ---------- Scroll-to-top button ---------- */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      window.scrollY > 400 ? scrollTopBtn.classList.add('show') : scrollTopBtn.classList.remove('show');
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }


  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('active'));
  }

  /* ---------- Animated Counters ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterIO.observe(c));
  }
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Animated Skill Bars ---------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    const skillIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.getAttribute('data-percent') + '%';
          skillIO.unobserve(fill);
        }
      });
    }, { threshold: 0.4 });
    skillBars.forEach(b => skillIO.observe(b));
  }

  /* ---------- Typing Animation (hero) ---------- */
  const typedEl = document.getElementById('heroTyped');
  if (typedEl) {
    const words = JSON.parse(typedEl.getAttribute('data-words') || '[]');
    let wordIndex = 0, charIndex = 0, deleting = false;
    function typeLoop() {
      const current = words[wordIndex % words.length];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1500);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex++;
        }
      }
      setTimeout(typeLoop, deleting ? 45 : 90);
    }
    if (words.length) typeLoop();
  }

  /* ---------- Particle Background (Canvas) ---------- */
  const canvas = document.getElementById('particle-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    function initParticles() {
      const count = Math.min(70, Math.floor(window.innerWidth / 18));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        o: Math.random() * 0.5 + 0.2
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94,234,212,${p.o})`;
        ctx.fill();
      });
      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56,189,248,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      if (!prefersReduced) requestAnimationFrame(draw);
    }
    resize();
    initParticles();
    draw();
    window.addEventListener('resize', () => { resize(); initParticles(); });
  }

  /* ---------- Testimonial Auto-Slide (Bootstrap Carousel) ---------- */
  const testimonialCarouselEl = document.getElementById('testimonialCarousel');
  if (testimonialCarouselEl && window.bootstrap) {
    new bootstrap.Carousel(testimonialCarouselEl, {
      interval: 2000,
      pause: 'hover',
      ride: 'carousel',
      wrap: true
    });
  }

  /* ---------- Contact Form (static-site friendly demo handler) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-2"></i>Sending...';
      btn.disabled = true;
      setTimeout(() => {
        const successBox = document.getElementById('formSuccess');
        if (successBox) successBox.classList.remove('d-none');
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
        setTimeout(() => successBox && successBox.classList.add('d-none'), 5000);
      }, 1200);
    });
  }

  /* ---------- Set active nav link based on current page ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-premium .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  /* ---------- Lazy-load images already handled via loading="lazy" attribute ---------- */

});
/* ---------- Hero Carousel Auto-Slide (2s) ---------- */
const heroCarouselEl = document.getElementById('heroCarousel');
if (heroCarouselEl && window.bootstrap) {
  new bootstrap.Carousel(heroCarouselEl, {
    interval: 4000,
    pause: 'hover',
    ride: 'carousel',
    wrap: true
  });
}
