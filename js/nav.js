/* ================================================================
   nav.js — Navigation: sticky scroll + mobile hamburger menu
   ================================================================ */

(function () {
  const nav    = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  if (!nav) return;

  // ── Scroll: make nav solid when scrolled ─────────────────────
  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── Mobile hamburger toggle ───────────────────────────────────
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.innerHTML = isOpen ? '&times;' : '&#9776;';
      // prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.innerHTML = '&#9776;';
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        links.classList.remove('open');
        toggle.innerHTML = '&#9776;';
        document.body.style.overflow = '';
      }
    });
  }
})();
