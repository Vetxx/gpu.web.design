# GPU.LT — WordPress Setup Guide

## Stack
- WordPress (latest)
- [Hello Elementor](https://wordpress.org/themes/hello-elementor/) theme
- [Elementor](https://wordpress.org/plugins/elementor/) page builder (free)
- [Contact Form 7](https://wordpress.org/plugins/contact-form-7/)
- [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/)
- GPU.LT Child theme (`wordpress/child-theme/`)

---

## 1. Install WordPress
Set up WordPress on your hosting (PHP 8.x, MySQL 8.x).  
Most hosts (Hostinger, SiteGround, etc.) have a 1-click WordPress installer.

---

## 2. Install plugins & theme

1. **Themes → Add New** → search "Hello Elementor" → Install & Activate
2. **Plugins → Add New** → install and activate:
   - Elementor
   - Contact Form 7
   - WP Mail SMTP
3. Upload the child theme:
   - Zip the `child-theme/` folder as `gpu-lt-child.zip`
   - **Themes → Add New → Upload Theme** → upload the zip → Activate

---

## 3. Copy logo
Upload `logo-light.png` (from `html-archive/`) via **Media → Add New**.  
Set it as the site logo under **Appearance → Customize → Site Identity**.

---

## 4. Build the page in Elementor

Open **Pages → Add New**, title it "Home", set template to "Elementor Full Width", then **Edit with Elementor**.

Build sections in order:

| Section | Widgets to use |
|---|---|
| **Nav** | Use Elementor's built-in nav bar or a sticky HTML widget with the logo + Prekės button + theme toggle button |
| **Hero** | 2-column row: left = Heading + Text + Button; right = HTML widget (paste GPU SVG from `html-archive/index.html`) |
| **Services** | 3-column row, each column = Icon Box widget |
| **Trust strip** | 3-column row, each column = Icon + Text widget. Items: "3 mėn. garantija" / "Ilgametė patirtis" / "1–2 darbo dienos" |
| **How it works** | 3-column row: step 1, arrow (HTML), step 2, arrow (HTML), step 3 |
| **Work examples** | 3-column row, each = Video widget (paste YouTube URL) |
| **FAQ** | Accordion widget — add 5 questions |
| **Contact** | 2-column row: left = Heading + Text + contact details (HTML); right = Shortcode widget `[contact-form-7 id="..." title="Contact"]` |
| **Footer** | Footer section: Text (© 2026 GPU.LT) + Icon widget (YouTube link) + Text (address) |

---

## 5. Contact Form 7

1. Go to **Contact → Add New**
2. Add fields: Name (text), Email (email), Message (textarea)
3. Set "To:" to `info@gpu.lt`
4. Copy the shortcode and paste it into the Elementor Shortcode widget in the Contact section

---

## 6. WP Mail SMTP

1. Go to **WP Mail SMTP → Settings**
2. Choose your mailer (Gmail / Outlook / SMTP)
3. Enter SMTP credentials for the `info@gpu.lt` mailbox
4. Send a test email to confirm delivery

---

## 7. Dark mode toggle

Add an HTML widget in the nav area with this button:

```html
<button class="theme-btn" id="themeToggle" aria-label="Toggle dark mode">
  <svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
</button>
```

The child theme's `dark-mode.js` wires it up automatically.

---

## 8. Set as homepage

**Settings → Reading** → "A static page" → Homepage: select your new page.

---

## Files in this folder

```
wordpress/
├── child-theme/
│   ├── style.css        ← Design tokens, component styles, dark mode
│   ├── functions.php    ← Enqueue styles + scripts, flash-prevention inline script
│   └── dark-mode.js     ← Dark mode toggle logic
└── README.md            ← This file

html-archive/            ← Original static site (preserved, do not delete)
```
