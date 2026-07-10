/* ================================================================
   saveBooking — Replace the saveSheet() function in invoice.html
   with this entire function.

   Also change the Save button HTML from:
     Save to Google Sheets
   to:
     Save Booking
================================================================ */

async function saveSheet() {
  const msg = document.getElementById('sheet-msg');
  const btn = document.getElementById('btn-sheet');

  btn.textContent = 'Saving…';
  btn.disabled    = true;
  msg.className   = 'sheet-msg';

  try {
    const res = await fetch('/api/booking.php', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        invoiceNo:   savedData.no,
        date:        savedData.today,
        bkName:      savedData.bkName,
        bkPhone:     savedData.bkPhone,
        bkEmail:     savedData.bkEmail,
        bkRel:       savedData.bkRel,
        bride:       savedData.bride,
        groom:       savedData.groom,
        bridePh:     savedData.bridePh,
        groomPh:     savedData.groomPh,
        events:      savedData.events,
        price:       savedData.price,
        discPercent: savedData.discPercent,
        discAmount:  savedData.discAmount,
        netPrice:    savedData.netPrice,
        advance:     savedData.advance,
        balance:     savedData.balance,
        notes:       savedData.notes,
      }),
    });

    const data = await res.json();

    if (data.status === 'ok') {
      msg.className   = 'sheet-msg ok';
      msg.textContent = '✓ Booking saved — Invoice '
                      + data.invoice_no
                      + ' · Record #' + data.booking_id
                      + ' · Email sent to info@retrocanvasbd.com';
    } else {
      throw new Error(data.message || 'Unknown error');
    }

  } catch (err) {
    console.error('Booking save error:', err);
    msg.className   = 'sheet-msg err';
    msg.textContent = '✗ Could not save: ' + err.message;
  }

  btn.disabled    = false;
  btn.textContent = 'Save Booking';
}
