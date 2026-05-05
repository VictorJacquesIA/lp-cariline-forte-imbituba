/* ═══════════════════════════════════════
   THEME SWITCHER — Caroline Forte Advocacia
   ═══════════════════════════════════════ */

const THEMES = {
  dark: {
    '--color-bg':         '#111827',
    '--color-surface':    '#1A2540',
    '--color-surface-2':  '#223050',
    '--color-gold':       '#B8943F',
    '--color-gold-light': '#D4AF6A',
    '--color-blue':       '#2A7EC8',
    '--color-blue-muted': '#1A5A96',
    '--color-text':       '#F0EDE6',
    '--color-text-muted': '#8B96A8',
    '--color-border':     'rgba(184,148,63,0.14)',
    '--color-cta-bg':     '#B8943F',
    '--color-cta-text':   '#111827',
  },
  light: {
    '--color-bg':         '#F5F2EC',
    '--color-surface':    '#EDEAE2',
    '--color-surface-2':  '#E4E0D6',
    '--color-gold':       '#B8943F',
    '--color-gold-light': '#D4AF6A',
    '--color-blue':       '#2A7EC8',
    '--color-blue-muted': '#1A5A96',
    '--color-text':       '#1A1714',
    '--color-text-muted': '#6B6258',
    '--color-border':     'rgba(184,148,63,0.20)',
    '--color-cta-bg':     '#B8943F',
    '--color-cta-text':   '#FFFFFF',
  },
};

const STORAGE_KEY   = 'cf-theme';
const TRANSITION_MS = 400;

/* Injeta um <style> temporário que habilita transição de cores por TRANSITION_MS ms.
   Remove-se sozinho após a transição, sem interferir nos hover/animations normais. */
function flashColorTransition() {
  let el = document.getElementById('theme-color-transition');
  if (!el) {
    el = document.createElement('style');
    el.id = 'theme-color-transition';
    document.head.appendChild(el);
  }
  el.textContent = `*, *::before, *::after {
    transition:
      background-color ${TRANSITION_MS}ms ease,
      color ${TRANSITION_MS}ms ease,
      border-color ${TRANSITION_MS}ms ease,
      box-shadow ${TRANSITION_MS}ms ease !important;
  }`;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.remove(), TRANSITION_MS + 60);
}

function applyTheme(name, animate = true) {
  const vars = THEMES[name];
  if (!vars) return;
  if (animate) flashColorTransition();
  const root = document.documentElement;
  Object.entries(vars).forEach(([prop, val]) => root.style.setProperty(prop, val));
  root.setAttribute('data-theme', name);
  localStorage.setItem(STORAGE_KEY, name);
}

function buildUI() {
  const wrapper = document.createElement('div');
  wrapper.className = 'theme-switcher';

  wrapper.innerHTML = `
    <button
      class="theme-toggle"
      id="theme-toggle-btn"
      aria-label="Abrir seletor de tema"
      aria-expanded="false"
      aria-haspopup="listbox"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41
                 M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
      <span>Tema</span>
    </button>

    <div
      class="theme-panel"
      id="theme-panel"
      role="listbox"
      aria-label="Selecione o tema"
      hidden
    >
      <button class="theme-option" role="option" data-theme="dark" aria-selected="false">
        <span class="theme-option__dot theme-option__dot--dark"></span>
        <span class="theme-option__name">Tema Escuro</span>
        <span class="theme-option__check" aria-hidden="true">✓</span>
      </button>
      <button class="theme-option" role="option" data-theme="light" aria-selected="false">
        <span class="theme-option__dot theme-option__dot--light"></span>
        <span class="theme-option__name">Tema Claro</span>
        <span class="theme-option__check" aria-hidden="true">✓</span>
      </button>
    </div>
  `;

  return wrapper;
}

function syncActive(panel, theme) {
  panel.querySelectorAll('.theme-option').forEach(opt => {
    const active = opt.dataset.theme === theme;
    opt.classList.toggle('is-active', active);
    opt.setAttribute('aria-selected', String(active));
  });
}

export function initThemeSwitcher() {
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  applyTheme(saved, false);

  const wrapper = buildUI();
  document.body.appendChild(wrapper);

  const btn   = wrapper.querySelector('#theme-toggle-btn');
  const panel = wrapper.querySelector('#theme-panel');

  syncActive(panel, saved);

  let open = false;

  function openPanel() {
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add('is-open'));
    btn.setAttribute('aria-expanded', 'true');
    open = true;
  }

  function closePanel() {
    panel.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    open = false;
    panel.addEventListener('transitionend', () => {
      if (!open) panel.hidden = true;
    }, { once: true });
  }

  btn.addEventListener('click', e => {
    e.stopPropagation();
    open ? closePanel() : openPanel();
  });

  panel.querySelectorAll('.theme-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const name = opt.dataset.theme;
      applyTheme(name, true);
      syncActive(panel, name);
      closePanel();
    });
  });

  document.addEventListener('click', e => {
    if (open && !wrapper.contains(e.target)) closePanel();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && open) {
      closePanel();
      btn.focus();
    }
  });
}
