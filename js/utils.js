/* ═══════════════════════════════════════
   UTILS
   ═══════════════════════════════════════ */

/**
 * Throttle — limita a frequência de execução de uma função.
 * @param {Function} fn
 * @param {number} wait ms
 */
export function throttle(fn, wait = 100) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Retorna true se o usuário prefere menos movimento.
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
