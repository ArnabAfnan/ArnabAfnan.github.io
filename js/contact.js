/* ================================================================
   contact.js — Contact form handling
   ================================================================

   CUSTOMIZE: To send real emails, replace the submitForm function
   with a fetch() call to your backend or a service like:
   - Formspree:  https://formspree.io  (free, no backend needed)
   - Netlify Forms: add netlify attribute to your <form>
   - EmailJS:    https://www.emailjs.com

   FORMSPREE QUICK SETUP:
   1. Sign up at formspree.io
   2. Create a form and copy your endpoint URL
   3. Replace 'YOUR_FORMSPREE_URL' below with it
   4. Set USE_FORMSPREE = true
   ================================================================ */

(function () {

  const USE_FORMSPREE   = false;                          // set true to enable
  const FORMSPREE_URL   = 'https://formspree.io/f/YOUR_ID'; // CUSTOMIZE

  const form    = document.getElementById('contact-form');
  const btn     = document.querySelector('.form-submit');
  const success = document.getElementById('form-success');

  if (!form) return;

  // ── VALIDATION ────────────────────────────────────────────────
  function validate() {
    let valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      if (!field.value.trim()) {
        field.style.borderColor = '#c0392b';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    return valid;
  }

  // ── SUBMIT ────────────────────────────────────────────────────
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!validate()) return;

      if (USE_FORMSPREE) {
        // Real submission via Formspree
        const data = new FormData(form);
        btn.textContent = 'Sending…';
        btn.disabled = true;

        fetch(FORMSPREE_URL, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        })
        .then(function (res) {
          if (res.ok) {
            showSuccess();
          } else {
            btn.textContent = 'Error — try again';
            btn.disabled = false;
          }
        })
        .catch(function () {
          btn.textContent = 'Error — try again';
          btn.disabled = false;
        });

      } else {
        // Demo mode — just show success message
        showSuccess();
      }
    });
  }

  function showSuccess() {
    if (success) { success.style.display = 'block'; }
    if (btn)     { btn.style.display = 'none'; }
    // Optionally reset form: form.reset();
  }

})();
