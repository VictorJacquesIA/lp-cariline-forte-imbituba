/* ═══════════════════════════════════════
   ANIMATIONS — Intersection Observer
   ═══════════════════════════════════════ */

import { prefersReducedMotion } from './utils.js';

/**
 * Ativa animações fade-in para elementos com .js-fade e .js-fade-left.
 */
function initFadeObserver() {
  const targets = document.querySelectorAll('.js-fade, .js-fade-left');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

/**
 * Ativa animações stagger em grupos de filhos com .js-stagger-item.
 * Cada filho recebe um delay incremental de 80ms via CSS custom property.
 */
function initStaggerObserver() {
  const groups = document.querySelectorAll('.js-stagger');
  if (!groups.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.js-stagger-item');
          items.forEach((item, i) => {
            item.style.setProperty('--stagger-delay', `${i * 80}ms`);
            item.classList.add('is-visible');
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  groups.forEach((group) => observer.observe(group));
}

/**
 * Anima a linha conectora do processo (desktop).
 */
function initProcessConnector() {
  const connector = document.querySelector('.processo__connector');
  if (!connector) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          connector.classList.add('processo__connector--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(document.querySelector('#processo-steps') || connector);
}

export function initAnimations() {
  if (prefersReducedMotion()) return;

  initFadeObserver();
  initStaggerObserver();
  initProcessConnector();
}
