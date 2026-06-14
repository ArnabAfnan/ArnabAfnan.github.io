/* ================================================================
   gallery.js — Portfolio page: filter + build gallery
   ================================================================

   CUSTOMIZE: Edit the galleryItems array below.
   Each item needs:
     cat:   'portraits' | 'film' | 'ceremony'  (matches filter buttons)
     label: Caption shown on hover
     img:   Path to your image, e.g. '../images/portfolio/img1.jpg'
            Leave blank ('') to use the placeholder gradient.
     bg:    Fallback background color (used if no img)

   HOW TO ADD YOUR OWN PHOTOS:
   1. Drop your JPGs into the /images/portfolio/ folder
   2. Update the 'img' field below to '../images/portfolio/yourfile.jpg'
   ================================================================ */

(function () {

  // ── GALLERY DATA ──────────────────────────────────────────────
  // CUSTOMIZE: Replace with your own photos and captions
  const galleryItems = [
    { cat: 'portraits', label: 'Golden hour · Amalfi Coast',         img: '', bg: '#D6CCC0' },
    { cat: 'film',      label: '35mm film · Ceremony aisle, Tuscany', img: '', bg: '#D4CECC' },
    { cat: 'ceremony',  label: 'Chapel ceremony · Cotswolds',         img: '', bg: '#DDD6C8' },
    { cat: 'portraits', label: 'Couples walk · Venetian canals',      img: '', bg: '#D0CAC0' },
    { cat: 'film',      label: 'Kodak Portra 400 · First look, Provence', img: '', bg: '#DEDAD8' },
    { cat: 'ceremony',  label: 'Outdoor vows · Edinburgh gardens',    img: '', bg: '#DEDAD2' },
    { cat: 'portraits', label: 'Bridal portraits · Santorini cliffs', img: '', bg: '#E2DAD0' },
    { cat: 'film',      label: 'Ilford HP5 · Candids, Loire',         img: '', bg: '#D8D0C6' },
    { cat: 'ceremony',  label: 'Cathedral aisle · Florence',          img: '', bg: '#D4CEC6' },
    { cat: 'portraits', label: 'Sunset couple · Malibu',              img: '', bg: '#DAD2C8' },
    { cat: 'film',      label: 'Fuji 400H · Garden portraits, Bath',  img: '', bg: '#E0D8CE' },
    { cat: 'ceremony',  label: 'Intimate ceremony · Umbria farmhouse',img: '', bg: '#D6D0C8' },
  ];

  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  let activeFilter = 'all';

  // ── RENDER GALLERY ────────────────────────────────────────────
  function buildGallery() {
    const items = activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter(function (i) { return i.cat === activeFilter; });

    grid.innerHTML = items.map(function (item) {
      const bgStyle = item.img
        ? 'background-image: url("' + item.img + '"); background-size:cover; background-position:center;'
        : 'background-color:' + item.bg + ';';

      return '<div class="gallery-item" data-cat="' + item.cat + '">' +
               '<div class="gi-img" style="' + bgStyle + '"></div>' +
               '<div class="gallery-overlay">' +
                 '<div class="gallery-caption">' + item.label + '</div>' +
               '</div>' +
             '</div>';
    }).join('');
  }

  // ── FILTER BUTTONS ────────────────────────────────────────────
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      buildGallery();
    });
  });

  // Initial render
  buildGallery();

})();
