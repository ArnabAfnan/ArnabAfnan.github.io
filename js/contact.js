/* ================================================================
   contact.js — Contact form → /api/enquiry.php → DB + Email
   Place in: /js/contact.js
================================================================ */

(function () {

  // Points to your PHP file on the same server — no CORS issues
  const API_URL = '/api/enquiry.php';

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
    if (!valid) alert('Please fill in all required fields.');
    return valid;
  }

  // ── COLLECT FORM DATA ─────────────────────────────────────────
  function getPayload() {
    return {
      name:        val('input[placeholder="Sanjida Rahman"]'),
      partner:     val('input[placeholder="Afnan Rahman"]'),
      email:       val('input[type="email"]'),
      weddingDate: val('input[type="date"]'),
      venue:       val('input[placeholder="City or venue name"]'),
      package:     valSelect('.form-select'),
      message:     val('.form-textarea'),
    };
  }

  function val(selector) {
    const el = form.querySelector(selector);
    return el ? el.value.trim() : '';
  }

  function valSelect(selector) {
    const el = form.querySelector(selector);
    return el && el.selectedIndex >= 0 ? el.options[el.selectedIndex].text : '';
  }

  // ── SUBMIT ────────────────────────────────────────────────────
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!validate()) return;

      btn.textContent = 'Sending…';
      btn.disabled    = true;

      fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(getPayload()),
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.status === 'ok') {
          showSuccess();
        } else {
          throw new Error(data.message || 'Server error');
        }
      })
      .catch(function (err) {
        console.error('Enquiry error:', err);
        btn.textContent = 'Error — please call us directly';
        btn.disabled    = false;
      });
    });
  }

  // ── SUCCESS ───────────────────────────────────────────────────
  function showSuccess() {
    if (success) { success.style.display = 'block'; }
    if (btn)     { btn.style.display = 'none'; }
    form.reset();
  }

})();
