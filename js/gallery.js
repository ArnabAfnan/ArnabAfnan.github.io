/* ================================================================
   gallery.js — Portfolio page: filter + build gallery + lightbox
   ================================================================

   HOW TO ADD YOUR PHOTOS & VIDEOS:
   ─────────────────────────────────
   1. Drop your files into the correct folders:
        source/Portfolio/All/        ← images shown in "All" + their category
        source/Portfolio/Portrait/   ← portrait-specific images

   2. Edit the three arrays below:
        PORTRAIT_IMAGES  — filenames inside source/Portfolio/Portrait/
        ALL_IMAGES       — filenames inside source/Portfolio/All/
        VIDEOS           — video filenames (mp4/webm) + poster image path

   3. Each entry can have:
        file   : filename (required)
        label  : hover caption
        cat    : 'portraits' | 'film' | 'ceremony'  (for ALL_IMAGES)

   ================================================================ */

(function () {

  // ── 1. PORTRAIT IMAGES ────────────────────────────────────────
  // Files inside: source/Portfolio/Portrait/
  const PORTRAIT_IMAGES = [
    { file: 'portrait-01.jpg', label: 'Golden hour portraits' },
    { file: 'portrait-02.jpg', label: 'Bridal portraits · Dhaka' },
    { file: 'portrait-03.jpg', label: 'Couples walk · Gulshan' },
    // ↑ Add more portrait filenames here
  ];

  // ── 2. ALL-CATEGORY IMAGES ────────────────────────────────────
  // Files inside: source/Portfolio/All/
  const ALL_IMAGES = [
    { file: 'all-01.jpg', label: '35mm film · Ceremony aisle',      cat: 'film'      },
    { file: 'all-02.jpg', label: 'Chapel ceremony · Chittagong',    cat: 'ceremony'  },
    { file: 'all-03.jpg', label: 'Kodak Portra 400 · First look',   cat: 'film'      },
    { file: 'all-04.jpg', label: 'Outdoor vows · Sylhet gardens',   cat: 'ceremony'  },
    { file: 'all-05.jpg', label: 'Ilford HP5 · Candids, Sylhet',    cat: 'film'      },
    { file: 'all-06.jpg', label: 'Cathedral aisle · Rangpur',       cat: 'ceremony'  },
    // ↑ Add more filenames + categories here
  ];

  // ── 3. VIDEOS ─────────────────────────────────────────────────
  // Drop video files alongside a poster (thumbnail) image
  const VIDEOS = [
    // { file: 'highlight-01.mp4', poster: 'source/Portfolio/All/highlight-01-poster.jpg', label: 'Wedding highlight reel', cat: 'ceremony' },
    // ↑ Uncomment and edit to add videos
  ];

  // ─────────────────────────────────────────────────────────────
  // BUILD MASTER LIST (don't edit below unless you know what you're doing)
  // ─────────────────────────────────────────────────────────────

  const galleryItems = [
    ...PORTRAIT_IMAGES.map(function (p) {
      return {
        cat:   'portraits',
        label: p.label || '',
        img:   'source/Portfolio/Portrait/' + p.file,
        type:  'image'
      };
    }),
    ...ALL_IMAGES.map(function (a) {
      return {
        cat:   a.cat || 'film',
        label: a.label || '',
        img:   'source/Portfolio/All/' + a.file,
        type:  'image'
      };
    }),
    ...VIDEOS.map(function (v) {
      return {
        cat:    v.cat || 'ceremony',
        label:  v.label || '',
        img:    v.poster || '',
        video:  'source/Portfolio/All/' + v.file,
        type:   'video'
      };
    })
  ];

  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  let activeFilter = 'all';

  // ── RENDER GALLERY ────────────────────────────────────────────
  function buildGallery() {
    const items = activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter(function (i) { return i.cat === activeFilter; });

    if (items.length === 0) {
      grid.innerHTML = '<p class="gallery-empty">No images in this category yet.</p>';
      return;
    }

    grid.innerHTML = items.map(function (item, idx) {
      const bgStyle = item.img
        ? 'background-image:url("' + item.img + '");background-size:cover;background-position:center;'
        : 'background-color:#D6CCC0;';

      const videoIcon = item.type === 'video'
        ? '<div class="gi-play-icon"><svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="21" stroke="white" stroke-width="1.5"/><polygon points="17,13 33,22 17,31" fill="white"/></svg></div>'
        : '';

      return '<div class="gallery-item" data-cat="' + item.cat + '" data-idx="' + idx + '">' +
               '<div class="gi-img" style="' + bgStyle + '">' + videoIcon + '</div>' +
               '<div class="gallery-overlay">' +
                 '<div class="gallery-caption">' + item.label + '</div>' +
               '</div>' +
             '</div>';
    }).join('');

    // Attach lightbox click
    grid.querySelectorAll('.gallery-item').forEach(function (el) {
      el.addEventListener('click', function () {
        const idx = parseInt(el.dataset.idx);
        const filtered = activeFilter === 'all'
          ? galleryItems
          : galleryItems.filter(function (i) { return i.cat === activeFilter; });
        openLightbox(filtered, idx);
      });
    });
  }

  // ── FILTER BUTTONS ────────────────────────────────────────────
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      buildGallery();
    });
  });

  // ── LIGHTBOX ──────────────────────────────────────────────────
  let lbItems = [];
  let lbIndex = 0;

  function createLightbox() {
    if (document.getElementById('rc-lightbox')) return;
    const lb = document.createElement('div');
    lb.id = 'rc-lightbox';
    lb.innerHTML =
      '<div class="lb-backdrop"></div>' +
      '<div class="lb-content">' +
        '<button class="lb-close" aria-label="Close">&times;</button>' +
        '<button class="lb-prev" aria-label="Previous">&#8592;</button>' +
        '<button class="lb-next" aria-label="Next">&#8594;</button>' +
        '<div class="lb-media"></div>' +
        '<div class="lb-caption"></div>' +
        '<div class="lb-counter"></div>' +
      '</div>';
    document.body.appendChild(lb);

    lb.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);
    lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lb-prev').addEventListener('click', function () { lbGo(lbIndex - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { lbGo(lbIndex + 1); });

    document.addEventListener('keydown', function (e) {
      if (!document.getElementById('rc-lightbox').classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbGo(lbIndex - 1);
      if (e.key === 'ArrowRight') lbGo(lbIndex + 1);
    });
  }

  function openLightbox(items, idx) {
    createLightbox();
    lbItems = items;
    lbIndex = idx;
    lbRender();
    document.getElementById('rc-lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lb = document.getElementById('rc-lightbox');
    if (lb) {
      lb.classList.remove('open');
      lb.querySelector('.lb-media').innerHTML = ''; // stop video
    }
    document.body.style.overflow = '';
  }

  function lbGo(idx) {
    lbIndex = (idx + lbItems.length) % lbItems.length;
    lbRender();
  }

  function lbRender() {
    const item = lbItems[lbIndex];
    const media = document.querySelector('#rc-lightbox .lb-media');
    const caption = document.querySelector('#rc-lightbox .lb-caption');
    const counter = document.querySelector('#rc-lightbox .lb-counter');

    media.innerHTML = '';

    if (item.type === 'video') {
      const vid = document.createElement('video');
      vid.src = item.video;
      vid.poster = item.img;
      vid.controls = true;
      vid.autoplay = true;
      vid.style.cssText = 'max-width:100%;max-height:80vh;display:block;margin:0 auto;';
      media.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.label;
      img.style.cssText = 'max-width:100%;max-height:80vh;object-fit:contain;display:block;margin:0 auto;';
      media.appendChild(img);
    }

    caption.textContent = item.label;
    counter.textContent = (lbIndex + 1) + ' / ' + lbItems.length;

    // Hide arrows if only 1 item
    document.querySelector('#rc-lightbox .lb-prev').style.display = lbItems.length < 2 ? 'none' : '';
    document.querySelector('#rc-lightbox .lb-next').style.display = lbItems.length < 2 ? 'none' : '';
  }

  // Initial render
  buildGallery();

})();
