// Sticky-nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
});
// Close the menu when a link is tapped
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Reveal-on-scroll animations
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ===== Build the animated grand piano (strings, keys, drifting notes) =====
(function buildGrandPiano() {
  const SVGNS = 'http://www.w3.org/2000/svg';
  const make = (tag, attrs) => {
    const el = document.createElementNS(SVGNS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };

  // --- Keyboard: ivory whites with the classic black-key pattern ---
  const keys = document.getElementById('gpKeys');
  if (keys) {
    const startX = 30, endX = 590, top = 101, whiteH = 146, blackH = 90;
    const nWhite = 28;
    const kw = (endX - startX) / nWhite;
    // a soft "wave" plays left-to-right across the keys
    const delay = (idx) => (idx * 0.09).toFixed(2) + 's';

    // white keys
    for (let i = 0; i < nWhite; i++) {
      const rect = make('rect', {
        x: (startX + i * kw + 0.6).toFixed(1), y: top,
        width: (kw - 1.2).toFixed(1), height: whiteH,
        rx: 2.5, class: 'gp-key-white',
      });
      rect.style.setProperty('--d', delay(i));
      keys.appendChild(rect);
    }
    // black keys — present after white indices 0,1,3,4,5 within each octave of 7
    const hasSharp = (i) => [0, 1, 3, 4, 5].includes(i % 7);
    for (let i = 0; i < nWhite - 1; i++) {
      if (!hasSharp(i)) continue;
      const bw = kw * 0.62;
      const cx = startX + (i + 1) * kw - bw / 2;
      const rect = make('rect', {
        x: cx.toFixed(1), y: top, width: bw.toFixed(1), height: blackH,
        rx: 1.8, class: 'gp-key-black',
      });
      rect.style.setProperty('--d', delay(i + 0.5));
      keys.appendChild(rect);
    }
  }

  // --- A few musical notes drifting up from the keyboard ---
  const notes = document.getElementById('gpNotes');
  if (notes) {
    const glyphs = ['♩', '♪', '♫', '♪', '♩'];
    const spots = [
      { x: 150, size: 24, d: 0.0 },
      { x: 250, size: 18, d: 1.6 },
      { x: 340, size: 28, d: 0.8 },
      { x: 440, size: 20, d: 2.4 },
      { x: 300, size: 16, d: 3.3 },
    ];
    spots.forEach((s, i) => {
      const text = make('text', { x: s.x, y: 56, class: 'gp-note' });
      text.setAttribute('font-size', s.size);
      text.style.setProperty('--nd', s.d + 's');
      text.textContent = glyphs[i % glyphs.length];
      notes.appendChild(text);
    });
  }
})();

// Contact form — submit to Web3Forms in the background, no mail app required
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const original = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    formStatus.textContent = '';
    formStatus.className = 'form__status';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm),
      });
      const data = await res.json();
      if (res.ok) {
        formStatus.textContent = "Thanks! Your message has been sent — Erin will be in touch soon.";
        formStatus.classList.add('is-success');
        contactForm.reset();
      } else {
        formStatus.textContent =
          data.message || 'Something went wrong. Please email erintpiano@gmail.com directly.';
        formStatus.classList.add('is-error');
      }
    } catch (err) {
      formStatus.textContent =
        'Network error. Please check your connection or email erintpiano@gmail.com directly.';
      formStatus.classList.add('is-error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });
}

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
