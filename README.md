# Retro Canvas — Wedding Photography Website
## Complete Customization Guide

---

## 📁 Project Structure

```
retro-canvas/
├── index.html              ← HOME page
├── pages/
│   ├── portfolio.html      ← PORTFOLIO page
│   ├── pricing.html        ← PRICING & PACKAGES page
│   ├── about.html          ← ABOUT US page
│   └── contact.html        ← CONTACT & BOOKING page
├── css/
│   ├── global.css          ← Colors, fonts, nav, footer (shared)
│   ├── home.css            ← Hero slider + home sections
│   └── pages.css           ← Portfolio, Pricing, About, Contact styles
├── js/
│   ├── nav.js              ← Sticky nav + mobile hamburger
│   ├── slider.js           ← Hero slideshow (autoplay, arrows, dots)
│   ├── gallery.js          ← Portfolio gallery + filter logic
│   └── contact.js          ← Form handling (+ Formspree instructions)
└── images/                 ← DROP YOUR PHOTOS HERE
    └── portfolio/          ← Portfolio images go here
```

---

## 🚀 How to Run Locally

### Option A — Double-click (no setup)
Just double-click `index.html` to open in any browser. Done.

### Option B — VS Code + Live Server (recommended)
1. Open VS Code
2. Install the **Live Server** extension (`Ctrl+Shift+X` → search "Live Server")
3. Open the `retro-canvas/` folder in VS Code (`File → Open Folder`)
4. Right-click `index.html` → **"Open with Live Server"**
5. Site opens at `http://127.0.0.1:5500` and auto-reloads on save ✓

---

## 🎨 How to Customize

### 1. CHANGE COLORS & FONTS — `css/global.css` (top of file)
```css
:root {
  --ivory:    #F7F4EF;   /* page background */
  --accent:   #B8956A;   /* gold — change to YOUR brand color */
  --charcoal: #2A2826;   /* dark text & hero */
  --mist:     #8A847C;   /* muted/secondary text */
  ...
}
```
Change `--accent` to your brand color and it updates everywhere instantly.

---

### 2. CHANGE BUSINESS NAME
Search & replace `Retro Canvas` across all HTML files with your business name.
Also update the `<title>` tag in each page.

---

### 3. ADD YOUR HERO PHOTOS (Home slideshow)
Open `css/home.css` and find `.slide-1`, `.slide-2`, `.slide-3`, `.slide-4`:

```css
/* BEFORE (gradient placeholder) */
.slide-1 {
  background-image: linear-gradient(135deg, #3a2e28 0%, ...);
}

/* AFTER (your real photo) */
.slide-1 {
  background-image: url('../images/hero1.jpg');
  background-size: cover;
  background-position: center;
}
```

Drop your JPGs into the `/images/` folder and point to them.

---

### 4. ADD PORTFOLIO PHOTOS
Open `js/gallery.js` and edit the `galleryItems` array:

```js
{ cat: 'portraits', label: 'Golden hour · Amalfi', img: '../images/portfolio/img1.jpg', bg: '#D6CCC0' },
```

- `cat`: must be `'portraits'`, `'film'`, or `'ceremony'`
- `label`: hover caption text
- `img`: path to your photo (drop files in `/images/portfolio/`)
- `bg`: fallback color if no photo

---

### 5. UPDATE CONTACT DETAILS
Search for `hello@retrocanvas.com` and `+1 (415) 000-0000` across all files
and replace with your real email and phone number.

---

### 6. UPDATE PRICING
In `pages/pricing.html` — find the three `.pricing-card` blocks and edit:
- Package name, price, features list
- In `index.html` → `.pricing-teaser-grid` → `.pt-price` (homepage teaser)
- In `js/contact.js` → The select dropdown options

---

### 7. CHANGE SLIDER SPEED
Open `js/slider.js` and edit the CONFIG:

```js
const CONFIG = {
  autoplay:  true,
  interval:  5000,   // ← milliseconds (5000 = 5 seconds)
  pauseOnHover: true,
};
```

---

### 8. HOOK UP REAL EMAIL (Contact Form)
Open `js/contact.js`:

1. Sign up free at **https://formspree.io**
2. Create a form and copy your form ID
3. Set `USE_FORMSPREE = true`
4. Replace `YOUR_ID` in `FORMSPREE_URL`

```js
const USE_FORMSPREE = true;
const FORMSPREE_URL = 'https://formspree.io/f/xabcdefg';
```

---

### 9. ADD ABOUT PHOTO
In `pages/about.html` and `index.html`, find the SVG placeholder comment and replace:

```html
<!-- Replace this: -->
<svg>...</svg>

<!-- With your photo: -->
<img src="../images/photographer.jpg" alt="Your Name" />
```

---

## 📱 Mobile
The site is fully responsive. The hamburger menu activates on screens below 960px.

---

## ✏️ Quick Reference — What to Edit Where

| What                  | Where                              |
|-----------------------|------------------------------------|
| Colors / fonts        | `css/global.css` → `:root`         |
| Hero slideshow images | `css/home.css` → `.slide-1` etc.   |
| Slider speed          | `js/slider.js` → `CONFIG`          |
| Portfolio photos      | `js/gallery.js` → `galleryItems`   |
| Gallery filters       | `pages/portfolio.html` + `gallery.js` |
| Pricing packages      | `pages/pricing.html`               |
| About bio / photo     | `pages/about.html`                 |
| Contact form email    | `js/contact.js` → Formspree setup  |
| Business name         | All HTML files → search & replace  |
| Social media links    | All HTML files → footer `.footer-social` |
| Footer copyright      | All HTML files → `.footer-bottom`  |

---

Built with pure HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no Node.js required.
