/* main.js — GSAP-driven interactions, floating logos, cursor, ripple, theme, scroll animations */

document.addEventListener('DOMContentLoaded', () => {
  // ---- basic DOM refs ----
  const body = document.getElementById('page-body') || document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle;
  const floatingRoot = document.getElementById('floating-root');
  const logoSources = Array.from(document.querySelectorAll('#floating-root .logo-src'));
  const animatedGradient = document.getElementById('animated-gradient');
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // ---- set year in footer ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- THEME: read/save ----
  const saved = localStorage.getItem('site-theme') || 'dark';
  applyTheme(saved);

  function applyTheme(mode){
    body.classList.remove('theme-dark','theme-light');
    body.classList.add(mode === 'light' ? 'theme-light' : 'theme-dark');
    localStorage.setItem('site-theme', mode);
    themeToggle.textContent = mode === 'light' ? '☀️' : '🌙';
    // subtle gradient tint depending on theme
    if (mode === 'light') {
      animatedGradient.style.opacity = 0.9;
      animatedGradient.style.filter = 'blur(36px) saturate(1.05)';
    } else {
      animatedGradient.style.opacity = 0.95;
      animatedGradient.style.filter = 'blur(40px) saturate(1.05)';
    }
  }

  themeToggle.addEventListener('click', () => {
    const current = body.classList.contains('theme-light') ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });

  // ---- mobile navigation toggle ----
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // animate hamburger icon
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(9px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          const spans = navToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
  }

  // ---- smooth anchor scrolling for nav links ----
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      // Only prevent default if it's an anchor link (starts with #)
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const rect = target.getBoundingClientRect();
          const top = window.scrollY + rect.top - 80; // offset for nav
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // ---- create multiple floating logo clones (2-3 times each) ----
  const clones = [];
  logoSources.forEach(src => {
    const repeat = 1; // how many copies total for each base logo
    for (let i = 0; i < repeat; i++) {
      const node = document.createElement('div');
      node.className = 'logo-clone';
      const img = document.createElement('img');
      img.src = src.src;
      img.alt = src.getAttribute('data-name') || 'logo';
      node.appendChild(img);
      // small random scale & opacity for depth
      node.style.transform = `scale(${(0.85 + Math.random() * 0.4).toFixed(2)})`;
      node.style.opacity = (0.65 + Math.random() * 0.35).toFixed(2);
      floatingRoot.appendChild(node);
      clones.push({ el: node, name: src.getAttribute('data-name') });
    }
  });

  // remove base sources from DOM (we only need clones)
  logoSources.forEach(s => s.remove());

  // ---- randomly place and animate clones (GTA-like leaf/newspaper movement) ----
  clones.forEach((item, idx) => {
    const el = item.el;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // random start positions
    const startX = Math.random() * vw;
    const startY = Math.random() * vh;

    el.style.left = `${startX}px`;
    el.style.top = `${startY}px`;

    // random rotation seed
    const r = (Math.random() * 360).toFixed(2);

    // GSAP random wandering like paper/leaves (gentle wind)
    const t = gsap.to(el, {
      x: `+=${(Math.random() * 600 - 300).toFixed(0)}`,
      y: `+=${(Math.random() * 400 - 200).toFixed(0)}`,
      rotation: `+=${(Math.random() * 720 - 360).toFixed(0)}`,
      duration: 12 + Math.random() * 12,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 4,
      onStart: () => { el.style.willChange = "transform, left, top"; } // perf hint
    });

    // gentle periodic tilt/flip to emulate paper flipping
    gsap.to(el, {
      rotationX: gsap.utils.random(-30, 30),
      rotationY: gsap.utils.random(-30, 30),
      duration: 6 + Math.random()*8,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: Math.random()*3
    });

    // small glow pulse
    gsap.to(el, {
      boxShadow: "0 32px 80px rgba(139,92,246,0.24)",
      duration: 2 + Math.random()*2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });

  // ---- cursor movement + trailing outline ----
  let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
  let outlinePos = { x: mouse.x, y: mouse.y };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    // dot follows directly
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.02, ease: "power1.out" });
    // outline has lag
    gsap.to(outlinePos, { x: e.clientX, y: e.clientY, duration: 0.22, ease: "power3.out", onUpdate: () => {
      cursorOutline.style.transform = `translate(${outlinePos.x}px, ${outlinePos.y}px) translate(-50%,-50%)`;
    }});
  });

  // hide cursor elements on small screens
  if (window.matchMedia("(pointer: coarse)").matches) {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
    body.style.cursor = 'auto';
  } else {
    // init cursor element positions
    gsap.set(cursorDot, { x: mouse.x, y: mouse.y, translate: "-50% -50%" });
    gsap.set(cursorOutline, { x: mouse.x, y: mouse.y, translate: "-50% -50%" });
  }

  // ---- logo repel interaction: logos move away when cursor is near ----
  const repelRadius = 140;
  function handleRepel(e) {
    clones.forEach(item => {
      const rect = item.el.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < repelRadius) {
        const strength = (repelRadius - dist) / repelRadius;
        // compute a push vector away from cursor
        const pushX = (dx / dist) * (40 + 200 * strength);
        const pushY = (dy / dist) * (20 + 120 * strength);
        gsap.to(item.el, { x: `+=${pushX}`, y: `+=${pushY}`, duration: 0.45, ease: "power2.out" });
        item.el.classList.add('logo-glow');
      } else {
        // gently let them return (small nudge)
        item.el.classList.remove('logo-glow');
      }
    });
  }
  window.addEventListener('mousemove', handleRepel);

  // ---- ripple effect for buttons ----
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      circle.className = 'ripple-effect';
      const size = Math.max(rect.width, rect.height) * 1.2;
      circle.style.width = circle.style.height = `${size}px`;
      const x = ev.clientX - rect.left - size/2;
      const y = ev.clientY - rect.top - size/2;
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';
      circle.style.background = 'rgba(255,255,255,0.12)';
      circle.style.pointerEvents = 'none';
      circle.style.transform = 'scale(0)';
      circle.style.transition = 'transform 600ms cubic-bezier(.2,.8,.2,1), opacity 600ms';
      btn.appendChild(circle);
      requestAnimationFrame(()=> circle.style.transform = 'scale(1)');
      setTimeout(()=> {
        circle.style.opacity = '0';
        setTimeout(()=> circle.remove(), 700);
      }, 450);
    });
  });
  // ---- FIX: Make all sections visible immediately (no opacity 0) ----
if (window.gsap && window.ScrollTrigger) {
  gsap.utils.toArray('section').forEach(s => {
    const elements = s.querySelectorAll('.card, .project-card, .skill-card, .about-card, .cert-card');
    elements.forEach(el => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
    });
  });
}
  // ---- accessibility: keyboard focus for nav links ----
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('focus', () => a.classList.add('focused')));
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('blur', () => a.classList.remove('focused')));

  // ---- optional: subtle parallax on hero mousemove ----
  // ---- NAME GLOW ANIMATION (GSAP-based TextPressure alternative) ----
if (window.gsap) {
  const nameEl = document.querySelector('.name-highlight');
  if (nameEl) {
    // Soft glowing loop animation
    gsap.to(nameEl, {
      textShadow: "0 0 20px rgba(102,126,234,0.8), 0 0 40px rgba(118,75,162,0.5)",
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: "sine.inOut"
    });

    // Optional hover interactivity for nice tactile feel
    nameEl.addEventListener('mouseenter', () => {
      gsap.to(nameEl, {
        scale: 1.05,
        letterSpacing: "2px",
        duration: 0.4,
        ease: "power2.out"
      });
    });

    nameEl.addEventListener('mouseleave', () => {
      gsap.to(nameEl, {
        scale: 1,
        letterSpacing: "0px",
        duration: 0.4,
        ease: "power2.inOut"
      });
    });
  }
}
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const cx = window.innerWidth/2;
      const cy = window.innerHeight/2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      gsap.to('.hero-inner', { x: dx * 12, y: dy * 8, duration: 0.8, ease: "power3.out" });
    });
    hero.addEventListener('mouseleave', () => gsap.to('.hero-inner', { x:0, y:0, duration: 0.6, ease: "power3.out" }));
  }

  // ---- small performance: re-layout clones on resize ----
  let resizeTO;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => {
      // reposition clones within viewport
      clones.forEach(item => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        gsap.to(item.el, { left: x, top: y, duration: 1.2, ease: "power2.inOut" });
      });
    }, 220);
  });

  // ---- Handle URL parameters (for prefilled contact forms) ----
  const urlParams = new URLSearchParams(window.location.search);
  const subject = urlParams.get('subject');
  if (subject) {
    // You can use this to prefill forms or display messages
    console.log('Contact subject:', subject);
  }

});
