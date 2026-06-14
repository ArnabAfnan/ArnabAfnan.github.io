/* ================================================================
   slider.js — Hero Slideshow
   ================================================================

   CUSTOMIZE OPTIONS (edit the CONFIG object below):
   - autoplay:       true/false — auto-advance slides
   - interval:       milliseconds between slides (default 5000 = 5s)
   - pauseOnHover:   pause when mouse hovers the slider
   - transitionSpeed: how long the slide animation takes (ms)
   ================================================================ */

(function () {

  // ── CONFIGURATION ─────────────────────────────────────────────
  const CONFIG = {
    autoplay:       true,
    interval:       5000,      // ms between slides — CUSTOMIZE
    pauseOnHover:   true,
    transitionSpeed: 900       // ms — keep in sync with CSS transition
  };
  // ─────────────────────────────────────────────────────────────

  const slider  = document.querySelector('.hero-slider');
  if (!slider) return;

  const track   = slider.querySelector('.slides-track');
  const slides  = slider.querySelectorAll('.slide');
  const dotsWrap= document.getElementById('slider-dots');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const curEl   = document.getElementById('slide-current');
  const totEl   = document.getElementById('slide-total');

  const total   = slides.length;
  let current   = 0;
  let timer     = null;
  let isAnimating = false;

  // ── BUILD DOTS ────────────────────────────────────────────────
  if (dotsWrap) {
    slides.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
  }

  // ── TOTAL COUNT ───────────────────────────────────────────────
  if (totEl) totEl.textContent = String(total).padStart(2, '0');

  // ── GOTO SLIDE ────────────────────────────────────────────────
  function goTo(index) {
    if (isAnimating || index === current) return;
    isAnimating = true;

    const prev = current;
    current = (index + total) % total;

    // Move track
    track.style.transform = 'translateX(-' + (current * 25) + '%)';

    // Active classes
    slides[prev].classList.remove('active');
    slides[current].classList.add('active');

    // Update dots
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    // Update counter
    if (curEl) curEl.textContent = String(current + 1).padStart(2, '0');

    setTimeout(function () { isAnimating = false; }, CONFIG.transitionSpeed);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // ── MARK FIRST SLIDE ACTIVE ───────────────────────────────────
  slides[0].classList.add('active');

  // ── ARROW BUTTONS ─────────────────────────────────────────────
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetTimer(); });

  // ── KEYBOARD ──────────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { prev(); resetTimer(); }
    if (e.key === 'ArrowRight') { next(); resetTimer(); }
  });

  // ── TOUCH / SWIPE ─────────────────────────────────────────────
  let touchStartX = 0;
  slider.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  slider.addEventListener('touchend', function (e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      resetTimer();
    }
  }, { passive: true });

  // ── AUTOPLAY ──────────────────────────────────────────────────
  function startTimer() {
    if (!CONFIG.autoplay) return;
    timer = setInterval(next, CONFIG.interval);
  }
  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  if (CONFIG.pauseOnHover) {
    slider.addEventListener('mouseenter', function () { clearInterval(timer); });
    slider.addEventListener('mouseleave', startTimer);
  }

  startTimer();

})();
