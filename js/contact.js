/* ================================================================
   contact.js — Contact form → Google Sheets
   ================================================================

   SETUP:
   1. Open your Google Spreadsheet
   2. Go to Extensions → Apps Script
   3. Make sure your doPost function is deployed as a Web App
   4. Paste your Web App URL below as SHEETS_URL
   ================================================================ */

(function () {

  const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbysmUyONeFTRu6ivbddONRqOLVWarSproDoUmajMMXHrkAhJ-oUbaFQ5NXSpPtjEc0q/exec'; // ← paste your URL here

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

  // ── COLLECT FORM DATA ─────────────────────────────────────────
  function getRow() {
    // matches the Enquiries sheet headers:
    // Date | Name | Partner Name | Email | Wedding Date | Venue | Package Interest | Message
    return [
      new Date().toLocaleDateString('en-GB'),
      val('input[placeholder="Sanjida Rahman"]'),   // your name
      val('input[placeholder="Afnan Rahman"]'),      // partner name
      val('input[type="email"]'),
      val('input[type="date"]'),
      val('input[placeholder="City or venue name"]'),
      valSelect('.form-select'),
      val('.form-textarea'),
    ];
  }

  function val(selector) {
    const el = form.querySelector(selector);
    return el ? el.value.trim() : '';
  }

  function valSelect(selector) {
    const el = form.querySelector(selector);
    return el ? el.options[el.selectedIndex].text : '';
  }

  // ── SUBMIT ────────────────────────────────────────────────────
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!validate()) return;

      btn.textContent = 'Sending…';
      btn.disabled = true;

      fetch(SHEETS_URL, {
        method:  'POST',
        mode:    'no-cors',   // required for Apps Script
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          sheet: 'Enquiries',
          row:   getRow(),
        }),
      })
      .then(function () {
        // no-cors means we can't read the response — assume OK
        showSuccess();
      })
      .catch(function () {
        btn.textContent = 'Error — please call us directly';
        btn.disabled = false;
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
