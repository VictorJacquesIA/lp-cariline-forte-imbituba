/* ═══════════════════════════════════════
   TRACKING — GA4 + Meta Pixel + GTM
   ═══════════════════════════════════════ */

const GA_ID    = 'G-XXXXXXXXXX';   /* [SUBSTITUIR: ID do Google Analytics 4] */
const PIXEL_ID = 'PIXEL_ID';       /* [SUBSTITUIR: ID do Meta Pixel]          */
const GTM_ID   = 'GTM-XXXXXXX';   /* [SUBSTITUIR: ID do Google Tag Manager]  */

/* ── Google Tag Manager ── */
function loadGTM(id) {
  if (!id || id.includes('XXXXXXX')) return;
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s);
    const dl = l !== 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', id);
}

/* ── Google Analytics 4 ── */
function loadGA4(id) {
  if (!id || id.includes('XXXXXXXXXX')) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id);
}

/* ── Meta Pixel ── */
function loadMetaPixel(id) {
  if (!id || id === 'PIXEL_ID') return;
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('init', id);
  window.fbq('track', 'PageView');
}

/* ── Rastreia cliques nos botões de CTA (WhatsApp) ── */
function trackCtaClicks() {
  document.querySelectorAll('[data-cta]').forEach((el) => {
    el.addEventListener('click', () => {
      const label = el.getAttribute('data-cta') || 'unknown';

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'cta_click', {
          event_category: 'whatsapp',
          event_label: label,
        });
      }

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact');
      }
    });
  });
}

export function initTracking() {
  loadGTM(GTM_ID);
  loadGA4(GA_ID);
  loadMetaPixel(PIXEL_ID);
  trackCtaClicks();
}
