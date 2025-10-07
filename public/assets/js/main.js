/* main.js — optimized floating icons + visibility + cursor */
document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementById('page-body') || document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const floatingRoot = document.getElementById('floating-root');
  const logoSources = Array.from(document.querySelectorAll('#floating-root .logo-src'));
  const animatedGradient = document.getElementById('animated-gradient');
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // theme init
  const saved = localStorage.getItem('site-theme') || 'dark';
  applyTheme(saved);
  function applyTheme(mode){
    body.classList.remove('theme-dark','theme-light');
    body.classList.add(mode === 'light' ? 'theme-light' : 'theme-dark');
    localStorage.setItem('site-theme', mode);
    if (themeToggle) themeToggle.textContent = mode === 'light' ? '☀️' : '🌙';
    if (animatedGradient) animatedGradient.style.opacity = mode === 'light' ? 0.9 : 0.95;
  }
  if (themeToggle) themeToggle.addEventListener('click', () => applyTheme(body.classList.contains('theme-light') ? 'dark' : 'light'));

  // nav toggle mobile
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 980) navLinks.classList.remove('active');
      });
    });
  }

  // ensure content visible immediately (remove accidental hidden states)
  document.querySelectorAll('.card, .project-card, .service-card, .about-card, .promise-item').forEach(el => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
  });

  // build clones (uniform size)
  const clones = [];
  logoSources.forEach(src => {
    const repeat = 1; // keep one clone per base icon for performance
    for (let i = 0; i < repeat; i++) {
      const node = document.createElement('div');
      node.className = 'logo-clone';
      const img = document.createElement('img');
      img.src = src.src;
      img.alt = src.getAttribute('data-name') || 'logo';
      img.style.width = '64px';
      img.style.height = '64px';
      img.style.objectFit = 'contain';
      node.appendChild(img);
      node.style.opacity = '0.95';
      node.style.transform = 'translate3d(0,0,0)';
      node.style.willChange = 'transform, left, top';
      floatingRoot.appendChild(node);
      clones.push({ el: node });
    }
  });
  // remove base images
  logoSources.forEach(s => s.remove());

  // wait small tick for paint, then start GSAP to avoid blocking first paint
  requestAnimationFrame(() => {
    setTimeout(initAnimations, 40);
  });

  function initAnimations() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    clones.forEach((item, idx) => {
      const el = item.el;
      // starting position
      const startX = Math.random() * vw;
      const startY = Math.random() * vh;
      el.style.left = `${startX}px`;
      el.style.top = `${startY}px`;

      // main wandering animation
      gsap.to(el, {
        x: `+=${(Math.random() * 400 - 200).toFixed(0)}`,
        y: `+=${(Math.random() * 300 - 150).toFixed(0)}`,
        rotation: (Math.random() * 40 - 20).toFixed(2),
        duration: 10 + Math.random() * 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      });

      // subtle 3D tilt
      gsap.to(el, {
        rotationX: gsap.utils.random(-18, 18),
        rotationY: gsap.utils.random(-18, 18),
        duration: 6 + Math.random() * 6,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      });

      // soft glow (cheap; uses boxShadow tween)
      gsap.to(el, {
        boxShadow: "0 28px 60px rgba(124,58,237,0.12)",
        duration: 2.5 + Math.random()*2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // ScrollTrigger reveals (non-blocking; do not set initial opacity:0 in CSS)
    try {
      if (gsap && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('section').forEach(s => {
          ScrollTrigger.create({
            trigger: s,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(s.querySelectorAll('.card, .project-card, .service-card, .about-card, .promise-item'),
                { y: 18, opacity: 0 }, { y:0, opacity:1, duration: 0.7, stagger: 0.08, ease: "power3.out" });
            },
            once: true
          });
        });
      }
    } catch (err) {
      console.warn('ScrollTrigger init failed', err);
    }
  }

  // cursor movement (lightweight)
  let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
  let outlinePos = { x: mouse.x, y: mouse.y };
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    if (cursorDot) gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.02, ease: 'power1.out' });
    gsap.to(outlinePos, { x: e.clientX, y: e.clientY, duration: 0.22, ease: 'power3.out', onUpdate: () => {
      if (cursorOutline) cursorOutline.style.transform = `translate(${outlinePos.x}px, ${outlinePos.y}px) translate(-50%,-50%)`;
    }});
  });

  // disable fancy cursor on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorOutline) cursorOutline.style.display = 'none';
  } else {
    gsap.set(cursorDot, { x: mouse.x, y: mouse.y });
    gsap.set(cursorOutline, { x: mouse.x, y: mouse.y });
  }

  // logo repel (lightweight)
  const repelRadius = 120;
  function handleRepel(e) {
    clones.forEach(item => {
      const rect = item.el.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < repelRadius && dist > 0) {
        const strength = (repelRadius - dist) / repelRadius;
        const pushX = (dx / dist) * (20 + 120 * strength);
        const pushY = (dy / dist) * (10 + 80 * strength);
        gsap.to(item.el, { x: `+=${pushX}`, y: `+=${pushY}`, duration: 0.45, ease: 'power2.out' });
        item.el.classList.add('logo-glow');
      } else {
        item.el.classList.remove('logo-glow');
      }
    });
  }
  window.addEventListener('mousemove', handleRepel);

  // debounced resize reposition
  let resizeTO;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => {
      clones.forEach(item => {
        const nx = Math.random() * window.innerWidth;
        const ny = Math.random() * window.innerHeight;
        gsap.to(item.el, { left: nx, top: ny, duration: 1.2, ease: 'power2.inOut' });
      });
    }, 220);
  });
});
