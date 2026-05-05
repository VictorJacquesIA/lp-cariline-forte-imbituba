/* ═══════════════════════════════════════
   MAIN — entrypoint
   ═══════════════════════════════════════ */

import { initAnimations }    from './animations.js';
import { initFaq }           from './forms.js';
import { initTracking }      from './tracking.js';
import { throttle }          from './utils.js';
import { initThemeSwitcher } from './theme-switcher.js';

/* ── Navbar scroll ── */
function initNavbar() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = throttle(() => {
    header.classList.toggle('header--scrolled', window.scrollY > 60);
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Menu mobile ── */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open', !isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  });

  /* Fecha ao clicar em um link */
  menu.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  /* Fecha ao pressionar Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
}

/* ── Botão flutuante WhatsApp (aparece após 3s) ── */
function initWhatsappFloat() {
  const float = document.getElementById('whatsapp-float');
  if (!float) return;

  setTimeout(() => {
    float.classList.add('is-visible');
  }, 3000);
}

/* ── No mobile, move a seção Sobre para logo após o hero ── */
function initMobileSobreOrder() {
  if (!window.matchMedia('(max-width: 768px)').matches) return;
  const sobre = document.getElementById('sobre');
  const hero  = document.querySelector('.hero');
  if (sobre && hero) hero.insertAdjacentElement('afterend', sobre);
}

/* ── Smooth scroll para links âncora ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; /* altura do header fixo */
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initMobileSobreOrder();
  initNavbar();
  initMobileMenu();
  initAnimations();
  initFaq();
  initWhatsappFloat();
  initSmoothScroll();
  initTracking();
});
