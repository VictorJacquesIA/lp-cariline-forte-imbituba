/* ═══════════════════════════════════════
   FORMS — FAQ Accordion
   ═══════════════════════════════════════ */

/**
 * Accordion acessível para o FAQ.
 * Usa aria-expanded e max-height para animação suave.
 */
export function initFaq() {
  const questions = document.querySelectorAll('.faq__question');
  if (!questions.length) return;

  questions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);
      if (!answer) return;

      /* Fecha todos os outros */
      questions.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherId = otherBtn.getAttribute('aria-controls');
          const otherAnswer = document.getElementById(otherId);
          if (otherAnswer) otherAnswer.classList.remove('is-open');
        }
      });

      /* Abre/fecha o atual */
      const newState = !isExpanded;
      btn.setAttribute('aria-expanded', String(newState));
      answer.classList.toggle('is-open', newState);
    });
  });
}
