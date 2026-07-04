# Kevin Tabatabaei — Piano Lessons Website

A single-page site for your piano teaching services. No build tools or server
needed — just open `index.html` in a browser, or host the folder anywhere.

## Files
- `index.html` — all the page content (text, videos, services, contact form)
- `styles.css` — the look and colours
- `script.js` — menu, scroll effects, animations

## How to customise

### Add your performance videos
In `index.html`, find the **Performances** section. Each video looks like:

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" ...></iframe>
```

Replace `VIDEO_ID` with the ID of your YouTube video. The ID is the part of the
URL after `watch?v=` — e.g. for `youtube.com/watch?v=abc123XYZ`, use `abc123XYZ`.
Also update the caption text below each video.

### Add your photo
In the **About** section, replace the placeholder block with:

```html
<img src="me.jpg" alt="Kevin at the piano" />
```

Put your photo file (e.g. `me.jpg`) in this same folder.

### Edit text and services
All wording — the intro, about paragraphs, service cards, years teaching, etc. —
is plain text in `index.html`. Edit it directly.

### Contact form
The form currently opens the visitor's email app addressed to you. For a form that
sends submissions automatically without that, use a free service like
[Formspree](https://formspree.io) and replace the form's `action` attribute with
the URL they give you.

## Publishing it online (free options)
- **Netlify Drop** — drag this folder onto https://app.netlify.com/drop
- **GitHub Pages** — push the folder to a repo and enable Pages
- **Cloudflare Pages** — connect a repo or upload directly

All three give you a free public web address.
