/* =============================================
   MOTOR DETAIL — SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── CURSOR ─── */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  (function loop() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(loop);
  })();

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ─── HAMBURGER ─── */
  const ham      = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* ─── INTERSECTION OBSERVER ─── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));

  /* ─── BEFORE / AFTER SLIDERS ─── */
  document.querySelectorAll('.bas-slider').forEach(slider => {
    const after  = slider.querySelector('.bas-after');
    const handle = slider.querySelector('.bas-handle');
    let dragging = false;

    const set = (clientX) => {
      const r = slider.getBoundingClientRect();
      let pct = ((clientX - r.left) / r.width) * 100;
      pct = Math.max(4, Math.min(96, pct));
      after.style.clipPath  = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + '%';
    };

    slider.addEventListener('mousedown',  e => { dragging = true; set(e.clientX); });
    document.addEventListener('mousemove',e => { if (dragging) set(e.clientX); });
    document.addEventListener('mouseup',  () => { dragging = false; });

    slider.addEventListener('touchstart', e => { dragging = true; set(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchmove',e => { if (dragging) set(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchend', () => { dragging = false; });

    // Initial position
    after.style.clipPath = 'inset(0 50% 0 0)';
    handle.style.left = '50%';
  });

  /* ─── FORM SUBMIT ─── */
 const form = document.getElementById('contactoForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nombre      = document.getElementById('f-nombre').value;
    const telefono    = document.getElementById('f-telefono').value;
    const vehiculo    = document.getElementById('f-vehiculo').value;
    const servicio    = document.getElementById('f-servicio').value;
    const descripcion = document.getElementById('f-descripcion').value;

    const mensaje = `
🚗 *NUEVA SOLICITUD - MOTOR DETAIL*

Nombre: ${nombre}
Teléfono: ${telefono}
Vehículo: ${vehiculo}
Servicio: ${servicio}
Descripción: ${descripcion}
    `.trim();

    const numero = '573027491189'; // ← Cambia esto por tu número real
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');

    const btn = form.querySelector('.btn-primary');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>¡REDIRIGIENDO A WHATSAPP!</span>';
    setTimeout(() => { btn.innerHTML = orig; form.reset(); }, 3000);
  });
}

  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

  /* ─── PROC BAR ANIMATION ─── */
  const procBars = document.querySelectorAll('.proc-bar');
  const procObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = '100%';
        e.target.style.transition = 'width 0.8s cubic-bezier(0.4,0,0.2,1) 0.3s';
      }
    });
  }, { threshold: 0.5 });
  procBars.forEach(b => { b.style.width = '0'; procObs.observe(b); });

});
