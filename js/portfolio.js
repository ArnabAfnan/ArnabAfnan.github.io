/* ================================================================
   portfolio.js — Three-section portfolio: Portraits, Film, Ceremony
   ================================================================

   HOW TO CUSTOMIZE YOUR DATA
   ──────────────────────────
   1. PORTRAIT_ALBUMS   — 6–7 album objects. Each album has:
        couple   : "Name & Name"
        location : "City, Bangladesh"
        cover    : path to cover image
        photos   : array of image paths (10–20 photos)

   2. FILMS             — 4–6 film objects. Each has:
        couple   : "Name & Name"
        location : "City, Bangladesh"
        thumb    : YouTube thumbnail URL (or your own image path)
        youtubeId: the 11-char YouTube video ID from the URL
        desc     : one-line description

   3. CEREMONY_PHOTOS   — 10–20 photo objects. Each has:
        img      : path to photo
        caption  : short caption (couple or event name + location)
        aspect   : 'portrait' | 'landscape' | 'square' (for masonry sizing)

   IMAGE PATHS
   ───────────
   Use paths relative to the HTML file, e.g.:
     ../source/Portfolio/Portrait/album-name/cover.jpg
     ../source/Portfolio/Film/thumb-01.jpg
     ../source/Portfolio/Ceremony/ceremony-01.jpg

   YOUTUBE IDs
   ───────────
   From  https://www.youtube.com/watch?v=XXXXXXXXXXX
   The ID is the 11 characters after  v=
   ================================================================ */

(function () {

  /* ══════════════════════════════════════════════════════════════
     1.  DATA — EDIT THIS SECTION
     ══════════════════════════════════════════════════════════════ */

  // ── PORTRAIT ALBUMS ──────────────────────────────────────────
  const PORTRAIT_ALBUMS = [
    {
      couple:   'Rahim & Nadia',
      location: 'Dhaka, Bangladesh',
      cover:    '../source/Portfolio/Portrait/rahim-nadia/cover.jpg',
      photos: [
        '../source/Portfolio/Portrait/rahim-nadia/01.jpg',
        '../source/Portfolio/Portrait/rahim-nadia/02.jpg',
        '../source/Portfolio/Portrait/rahim-nadia/03.jpg',
        '../source/Portfolio/Portrait/rahim-nadia/04.jpg',
        '../source/Portfolio/Portrait/rahim-nadia/05.jpg',
        '../source/Portfolio/Portrait/rahim-nadia/06.jpg',
        '../source/Portfolio/Portrait/rahim-nadia/07.jpg',
        '../source/Portfolio/Portrait/rahim-nadia/08.jpg',
        '../source/Portfolio/Portrait/rahim-nadia/09.jpg',
        '../source/Portfolio/Portrait/rahim-nadia/10.jpg',
      ]
    },
    {
      couple:   'Karim & Sadia',
      location: 'Chittagong, Bangladesh',
      cover:    '../source/Portfolio/Portrait/karim-sadia/cover.jpg',
      photos: [
        '../source/Portfolio/Portrait/karim-sadia/01.jpg',
        '../source/Portfolio/Portrait/karim-sadia/02.jpg',
        '../source/Portfolio/Portrait/karim-sadia/03.jpg',
        '../source/Portfolio/Portrait/karim-sadia/04.jpg',
        '../source/Portfolio/Portrait/karim-sadia/05.jpg',
        '../source/Portfolio/Portrait/karim-sadia/06.jpg',
        '../source/Portfolio/Portrait/karim-sadia/07.jpg',
        '../source/Portfolio/Portrait/karim-sadia/08.jpg',
        '../source/Portfolio/Portrait/karim-sadia/09.jpg',
        '../source/Portfolio/Portrait/karim-sadia/10.jpg',
        '../source/Portfolio/Portrait/karim-sadia/11.jpg',
        '../source/Portfolio/Portrait/karim-sadia/12.jpg',
      ]
    },
    {
      couple:   'Hasan & Mitu',
      location: 'Sylhet, Bangladesh',
      cover:    '../source/Portfolio/Portrait/hasan-mitu/cover.jpg',
      photos: [
        '../source/Portfolio/Portrait/hasan-mitu/01.jpg',
        '../source/Portfolio/Portrait/hasan-mitu/02.jpg',
        '../source/Portfolio/Portrait/hasan-mitu/03.jpg',
        '../source/Portfolio/Portrait/hasan-mitu/04.jpg',
        '../source/Portfolio/Portrait/hasan-mitu/05.jpg',
        '../source/Portfolio/Portrait/hasan-mitu/06.jpg',
        '../source/Portfolio/Portrait/hasan-mitu/07.jpg',
        '../source/Portfolio/Portrait/hasan-mitu/08.jpg',
        '../source/Portfolio/Portrait/hasan-mitu/09.jpg',
        '../source/Portfolio/Portrait/hasan-mitu/10.jpg',
      ]
    },
    {
      couple:   'Farhan & Riya',
      location: 'Dhaka, Bangladesh',
      cover:    '../source/Portfolio/Portrait/farhan-riya/cover.jpg',
      photos: [
        '../source/Portfolio/Portrait/farhan-riya/01.jpg',
        '../source/Portfolio/Portrait/farhan-riya/02.jpg',
        '../source/Portfolio/Portrait/farhan-riya/03.jpg',
        '../source/Portfolio/Portrait/farhan-riya/04.jpg',
        '../source/Portfolio/Portrait/farhan-riya/05.jpg',
        '../source/Portfolio/Portrait/farhan-riya/06.jpg',
        '../source/Portfolio/Portrait/farhan-riya/07.jpg',
        '../source/Portfolio/Portrait/farhan-riya/08.jpg',
        '../source/Portfolio/Portrait/farhan-riya/09.jpg',
        '../source/Portfolio/Portrait/farhan-riya/10.jpg',
        '../source/Portfolio/Portrait/farhan-riya/11.jpg',
      ]
    },
    {
      couple:   'Sabbir & Tania',
      location: 'Rangpur, Bangladesh',
      cover:    '../source/Portfolio/Portrait/sabbir-tania/cover.jpg',
      photos: [
        '../source/Portfolio/Portrait/sabbir-tania/01.jpg',
        '../source/Portfolio/Portrait/sabbir-tania/02.jpg',
        '../source/Portfolio/Portrait/sabbir-tania/03.jpg',
        '../source/Portfolio/Portrait/sabbir-tania/04.jpg',
        '../source/Portfolio/Portrait/sabbir-tania/05.jpg',
        '../source/Portfolio/Portrait/sabbir-tania/06.jpg',
        '../source/Portfolio/Portrait/sabbir-tania/07.jpg',
        '../source/Portfolio/Portrait/sabbir-tania/08.jpg',
        '../source/Portfolio/Portrait/sabbir-tania/09.jpg',
        '../source/Portfolio/Portrait/sabbir-tania/10.jpg',
      ]
    },
    {
      couple:   'Arif & Shirin',
      location: 'Jessore, Bangladesh',
      cover:    '../source/Portfolio/Portrait/arif-shirin/cover.jpg',
      photos: [
        '../source/Portfolio/Portrait/arif-shirin/01.jpg',
        '../source/Portfolio/Portrait/arif-shirin/02.jpg',
        '../source/Portfolio/Portrait/arif-shirin/03.jpg',
        '../source/Portfolio/Portrait/arif-shirin/04.jpg',
        '../source/Portfolio/Portrait/arif-shirin/05.jpg',
        '../source/Portfolio/Portrait/arif-shirin/06.jpg',
        '../source/Portfolio/Portrait/arif-shirin/07.jpg',
        '../source/Portfolio/Portrait/arif-shirin/08.jpg',
        '../source/Portfolio/Portrait/arif-shirin/09.jpg',
        '../source/Portfolio/Portrait/arif-shirin/10.jpg',
        '../source/Portfolio/Portrait/arif-shirin/11.jpg',
        '../source/Portfolio/Portrait/arif-shirin/12.jpg',
      ]
    },
    {
      couple:   'Nabil & Lamia',
      location: 'Dhaka, Bangladesh',
      cover:    '../source/Portfolio/Portrait/nabil-lamia/cover.jpg',
      photos: [
        '../source/Portfolio/Portrait/nabil-lamia/01.jpg',
        '../source/Portfolio/Portrait/nabil-lamia/02.jpg',
        '../source/Portfolio/Portrait/nabil-lamia/03.jpg',
        '../source/Portfolio/Portrait/nabil-lamia/04.jpg',
        '../source/Portfolio/Portrait/nabil-lamia/05.jpg',
        '../source/Portfolio/Portrait/nabil-lamia/06.jpg',
        '../source/Portfolio/Portrait/nabil-lamia/07.jpg',
        '../source/Portfolio/Portrait/nabil-lamia/08.jpg',
        '../source/Portfolio/Portrait/nabil-lamia/09.jpg',
        '../source/Portfolio/Portrait/nabil-lamia/10.jpg',
      ]
    },
  ];

  // ── FILMS ────────────────────────────────────────────────────
  // Replace youtubeId with the real 11-char ID from your YouTube URLs
  const FILMS = [
    {
      couple:    'Rahim & Nadia',
      location:  'Dhaka, Bangladesh',
      youtubeId: 'dQw4w9WgXcQ',   // ← replace with your real YouTube ID
      desc:      'A golden afternoon Holud and Biye across Old Dhaka's rooftops.'
    },
    {
      couple:    'Karim & Sadia',
      location:  'Chittagong, Bangladesh',
      youtubeId: 'dQw4w9WgXcQ',   // ← replace
      desc:      'Sunset ceremony at Patenga Beach — salt air, garlands, and tears.'
    },
    {
      couple:    'Hasan & Mitu',
      location:  'Sylhet, Bangladesh',
      youtubeId: 'dQw4w9WgXcQ',   // ← replace
      desc:      'Tea-garden vows in the green hills of Srimangal.'
    },
    {
      couple:    'Farhan & Riya',
      location:  'Dhaka, Bangladesh',
      youtubeId: 'dQw4w9WgXcQ',   // ← replace
      desc:      'An intimate Akd and reception in Gulshan — quiet and luminous.'
    },
    {
      couple:    'Sabbir & Tania',
      location:  'Rangpur, Bangladesh',
      youtubeId: 'dQw4w9WgXcQ',   // ← replace
      desc:      'Village wedding at dusk — fire, music, and the whole community.'
    },
  ];

  // ── CEREMONY PHOTOS ──────────────────────────────────────────
  const CEREMONY_PHOTOS = [
    { img: '../source/Portfolio/Ceremony/ceremony-01.jpg', caption: 'Holud · Rahim & Nadia, Dhaka',       aspect: 'landscape' },
    { img: '../source/Portfolio/Ceremony/ceremony-02.jpg', caption: 'Biye · Karim & Sadia, Chittagong',   aspect: 'portrait'  },
    { img: '../source/Portfolio/Ceremony/ceremony-03.jpg', caption: 'Akd ceremony · Hasan & Mitu, Sylhet', aspect: 'portrait'  },
    { img: '../source/Portfolio/Ceremony/ceremony-04.jpg', caption: 'Garland exchange · Dhaka',            aspect: 'landscape' },
    { img: '../source/Portfolio/Ceremony/ceremony-05.jpg', caption: 'Mehendi night · Farhan & Riya',       aspect: 'square'    },
    { img: '../source/Portfolio/Ceremony/ceremony-06.jpg', caption: 'Reception hall · Gulshan, Dhaka',     aspect: 'landscape' },
    { img: '../source/Portfolio/Ceremony/ceremony-07.jpg', caption: 'Family moment · Sabbir & Tania',      aspect: 'portrait'  },
    { img: '../source/Portfolio/Ceremony/ceremony-08.jpg', caption: 'First look · Arif & Shirin, Jessore', aspect: 'portrait'  },
    { img: '../source/Portfolio/Ceremony/ceremony-09.jpg', caption: 'Bou Bhat feast · Dhaka',              aspect: 'landscape' },
    { img: '../source/Portfolio/Ceremony/ceremony-10.jpg', caption: 'Candid joy · Chittagong',             aspect: 'square'    },
    { img: '../source/Portfolio/Ceremony/ceremony-11.jpg', caption: 'Holud · Nabil & Lamia, Dhaka',        aspect: 'portrait'  },
    { img: '../source/Portfolio/Ceremony/ceremony-12.jpg', caption: 'Stage portraits · Rangpur',           aspect: 'landscape' },
    { img: '../source/Portfolio/Ceremony/ceremony-13.jpg', caption: 'Emotional vows · Sylhet',             aspect: 'portrait'  },
    { img: '../source/Portfolio/Ceremony/ceremony-14.jpg', caption: 'Fire ritual · Jessore',               aspect: 'square'    },
    { img: '../source/Portfolio/Ceremony/ceremony-15.jpg', caption: 'Night reception · Dhaka',             aspect: 'landscape' },
  ];


  /* ══════════════════════════════════════════════════════════════
     2.  SECTION TABS
     ══════════════════════════════════════════════════════════════ */

  const tabs     = document.querySelectorAll('.pf-tab');
  const sections = document.querySelectorAll('.pf-section');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      sections.forEach(function (s) { s.classList.remove('active'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const target = document.getElementById('section-' + tab.dataset.section);
      if (target) target.classList.add('active');
    });
  });


  /* ══════════════════════════════════════════════════════════════
     3.  PORTRAIT ALBUMS
     ══════════════════════════════════════════════════════════════ */

  const albumsGrid = document.getElementById('albums-grid');

  if (albumsGrid) {
    albumsGrid.innerHTML = PORTRAIT_ALBUMS.map(function (album, idx) {
      return (
        '<div class="album-card" data-idx="' + idx + '">' +
          '<div class="album-cover" style="background-image:url(\'' + album.cover + '\')">' +
            '<div class="album-cover-overlay">' +
              '<span class="album-count">' + album.photos.length + ' photos</span>' +
              '<span class="album-open-hint">View Album &#8594;</span>' +
            '</div>' +
          '</div>' +
          '<div class="album-info">' +
            '<h3 class="album-couple">' + album.couple + '</h3>' +
            '<span class="album-location">' +
              '<svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0C2.79 0 1 1.79 1 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 5 2.5a1.5 1.5 0 0 1 0 3z" fill="currentColor"/></svg>' +
              album.location +
            '</span>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    albumsGrid.querySelectorAll('.album-card').forEach(function (card) {
      card.addEventListener('click', function () {
        openAlbum(parseInt(card.dataset.idx));
      });
    });
  }

  // ── Album lightbox ────────────────────────────────────────────
  const albumLb     = document.getElementById('album-lightbox');
  const albPhotoGrid = document.getElementById('alb-photo-grid');
  const albCoupleName = document.getElementById('alb-couple-name');
  const albLocationName = document.getElementById('alb-location-name');

  let currentAlbum  = null;
  let photoViewIdx  = 0;

  function openAlbum(idx) {
    currentAlbum = PORTRAIT_ALBUMS[idx];
    albCoupleName.textContent   = currentAlbum.couple;
    albLocationName.textContent = currentAlbum.location;

    albPhotoGrid.innerHTML = currentAlbum.photos.map(function (src, i) {
      return (
        '<div class="alb-photo-cell" data-photo-idx="' + i + '">' +
          '<img src="' + src + '" alt="' + currentAlbum.couple + ' — photo ' + (i + 1) + '" loading="lazy" />' +
        '</div>'
      );
    }).join('');

    albPhotoGrid.querySelectorAll('.alb-photo-cell').forEach(function (cell) {
      cell.addEventListener('click', function () {
        openPhotoViewer(parseInt(cell.dataset.photoIdx));
      });
    });

    albumLb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeAlbum() {
    albumLb.classList.remove('open');
    document.body.style.overflow = '';
    closePhotoViewer();
  }

  albumLb.querySelector('.alb-backdrop').addEventListener('click', closeAlbum);
  albumLb.querySelector('.alb-close').addEventListener('click', closeAlbum);

  // ── Photo viewer (inside album) ───────────────────────────────
  const photoViewer = document.getElementById('alb-photo-viewer');
  const apvImg      = document.getElementById('apv-img');
  const apvCounter  = document.getElementById('apv-counter');

  function openPhotoViewer(idx) {
    photoViewIdx = idx;
    renderPhotoViewer();
    photoViewer.classList.add('open');
  }

  function closePhotoViewer() {
    photoViewer.classList.remove('open');
  }

  function renderPhotoViewer() {
    if (!currentAlbum) return;
    apvImg.src = currentAlbum.photos[photoViewIdx];
    apvImg.alt = currentAlbum.couple + ' — photo ' + (photoViewIdx + 1);
    apvCounter.textContent = (photoViewIdx + 1) + ' / ' + currentAlbum.photos.length;
  }

  photoViewer.querySelector('.apv-backdrop').addEventListener('click', closePhotoViewer);
  photoViewer.querySelector('.apv-close').addEventListener('click', closePhotoViewer);
  photoViewer.querySelector('.apv-prev').addEventListener('click', function () {
    photoViewIdx = (photoViewIdx - 1 + currentAlbum.photos.length) % currentAlbum.photos.length;
    renderPhotoViewer();
  });
  photoViewer.querySelector('.apv-next').addEventListener('click', function () {
    photoViewIdx = (photoViewIdx + 1) % currentAlbum.photos.length;
    renderPhotoViewer();
  });


  /* ══════════════════════════════════════════════════════════════
     4.  FILMS (YouTube)
     ══════════════════════════════════════════════════════════════ */

  const filmsGrid = document.getElementById('films-grid');

  if (filmsGrid) {
    filmsGrid.innerHTML = FILMS.map(function (film, idx) {
      // Use YouTube's auto-generated thumbnail (maxresdefault or hqdefault)
      const thumb = 'https://img.youtube.com/vi/' + film.youtubeId + '/maxresdefault.jpg';
      return (
        '<div class="film-card" data-idx="' + idx + '">' +
          '<div class="film-thumb-wrap">' +
            '<img class="film-thumb" src="' + thumb + '" alt="' + film.couple + ' wedding film" loading="lazy" />' +
            '<div class="film-play-btn" aria-label="Play film">' +
              '<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<circle cx="30" cy="30" r="29" stroke="white" stroke-width="1.5"/>' +
                '<polygon points="24,18 44,30 24,42" fill="white"/>' +
              '</svg>' +
            '</div>' +
          '</div>' +
          '<div class="film-info">' +
            '<h3 class="film-couple">' + film.couple + '</h3>' +
            '<span class="film-location">' +
              '<svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0C2.79 0 1 1.79 1 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 5 2.5a1.5 1.5 0 0 1 0 3z" fill="currentColor"/></svg>' +
              film.location +
            '</span>' +
            '<p class="film-desc">' + film.desc + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    filmsGrid.querySelectorAll('.film-card').forEach(function (card) {
      card.addEventListener('click', function () {
        openYT(parseInt(card.dataset.idx));
      });
    });
  }

  // ── YouTube modal ─────────────────────────────────────────────
  const ytModal      = document.getElementById('yt-modal');
  const ytIframe     = document.getElementById('yt-iframe');
  const ytModalCouple = document.getElementById('yt-modal-couple');
  const ytModalLoc   = document.getElementById('yt-modal-loc');

  function openYT(idx) {
    const film = FILMS[idx];
    ytIframe.src = 'https://www.youtube.com/embed/' + film.youtubeId + '?autoplay=1&rel=0';
    ytModalCouple.textContent = film.couple;
    ytModalLoc.textContent    = film.location;
    ytModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeYT() {
    ytIframe.src = '';  // stops playback
    ytModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  ytModal.querySelector('.yt-backdrop').addEventListener('click', closeYT);
  ytModal.querySelector('.yt-close').addEventListener('click', closeYT);


  /* ══════════════════════════════════════════════════════════════
     5.  CEREMONY GRID
     ══════════════════════════════════════════════════════════════ */

  const ceremonyGrid = document.getElementById('ceremony-grid');

  if (ceremonyGrid) {
    ceremonyGrid.innerHTML = CEREMONY_PHOTOS.map(function (photo, idx) {
      return (
        '<div class="ceremony-item ' + photo.aspect + '" data-idx="' + idx + '">' +
          '<div class="ceremony-img-wrap">' +
            '<img src="' + photo.img + '" alt="' + photo.caption + '" loading="lazy" />' +
          '</div>' +
          '<div class="ceremony-overlay">' +
            '<span class="ceremony-caption">' + photo.caption + '</span>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    ceremonyGrid.querySelectorAll('.ceremony-item').forEach(function (item) {
      item.addEventListener('click', function () {
        openCeremonyLb(parseInt(item.dataset.idx));
      });
    });
  }

  // ── Ceremony lightbox ─────────────────────────────────────────
  const ceremonyLb  = document.getElementById('ceremony-lightbox');
  const clImg       = document.getElementById('cl-img');
  const clCaption   = document.getElementById('cl-caption');
  const clCounter   = document.getElementById('cl-counter');
  let   clIdx       = 0;

  function openCeremonyLb(idx) {
    clIdx = idx;
    renderCeremonyLb();
    ceremonyLb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCeremonyLb() {
    ceremonyLb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderCeremonyLb() {
    const photo   = CEREMONY_PHOTOS[clIdx];
    clImg.src     = photo.img;
    clImg.alt     = photo.caption;
    clCaption.textContent = photo.caption;
    clCounter.textContent = (clIdx + 1) + ' / ' + CEREMONY_PHOTOS.length;
  }

  ceremonyLb.querySelector('.cl-backdrop').addEventListener('click', closeCeremonyLb);
  ceremonyLb.querySelector('.cl-close').addEventListener('click', closeCeremonyLb);
  ceremonyLb.querySelector('.cl-prev').addEventListener('click', function () {
    clIdx = (clIdx - 1 + CEREMONY_PHOTOS.length) % CEREMONY_PHOTOS.length;
    renderCeremonyLb();
  });
  ceremonyLb.querySelector('.cl-next').addEventListener('click', function () {
    clIdx = (clIdx + 1) % CEREMONY_PHOTOS.length;
    renderCeremonyLb();
  });


  /* ══════════════════════════════════════════════════════════════
     6.  GLOBAL KEYBOARD HANDLER
     ══════════════════════════════════════════════════════════════ */

  document.addEventListener('keydown', function (e) {
    // Album photo viewer
    if (photoViewer.classList.contains('open')) {
      if (e.key === 'Escape')     closePhotoViewer();
      if (e.key === 'ArrowLeft')  { photoViewIdx = (photoViewIdx - 1 + currentAlbum.photos.length) % currentAlbum.photos.length; renderPhotoViewer(); }
      if (e.key === 'ArrowRight') { photoViewIdx = (photoViewIdx + 1) % currentAlbum.photos.length; renderPhotoViewer(); }
      return;
    }
    // Album panel
    if (albumLb.classList.contains('open')) {
      if (e.key === 'Escape') closeAlbum();
      return;
    }
    // YouTube
    if (ytModal.classList.contains('open')) {
      if (e.key === 'Escape') closeYT();
      return;
    }
    // Ceremony lightbox
    if (ceremonyLb.classList.contains('open')) {
      if (e.key === 'Escape')     closeCeremonyLb();
      if (e.key === 'ArrowLeft')  { clIdx = (clIdx - 1 + CEREMONY_PHOTOS.length) % CEREMONY_PHOTOS.length; renderCeremonyLb(); }
      if (e.key === 'ArrowRight') { clIdx = (clIdx + 1) % CEREMONY_PHOTOS.length; renderCeremonyLb(); }
    }
  });

})();