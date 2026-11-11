# Portafolio — Samuel Mariño

Personal portfolio of Samuel Mariño, backend .NET developer based in Bogotá, Colombia.

**Live site:** https://samuelmarino2108.github.io/portafolio/

A static site built with plain HTML, CSS and JavaScript. It has no frameworks, no build step, no backend and no database. The only external resource is Google Fonts.

## Project structure

```
index.html                  Page shell, SEO / Open Graph meta tags
css/styles.css              Design tokens (CSS variables), layout and components
js/data.js                  All site content (texts, skills, projects, links)
js/main.js                  Renders data.js into the page + animations
assets/cv-samuel-marino.pdf CV served by the "Descargar CV" button
assets/img/                 Favicon, profile photo and Open Graph image
```

## Editing content

All content lives in `js/data.js` in a single `PORTFOLIO` object. You don't need to touch the HTML.

The site is bilingual (Spanish / English), so the object has three parts:

| Key | What goes there |
| --- | --- |
| `PORTFOLIO.common` | Data that doesn't change with the language: name, photo, CV path, contact links, email, WhatsApp number and each project's stack and links |
| `PORTFOLIO.es` | Spanish content: profile, about, skills, project texts, education, experience, plus `ui` (menu, section titles, buttons, aria-labels, footer, WhatsApp message) and `meta` (page title and description) |
| `PORTFOLIO.en` | The same keys as `es`, in English |

When you change a text, update it in **both** `es` and `en`.

Projects are split so links are only written once. Add the shared part to `common.projects` and the translated text under the same `id` in each language:

```js
// common
projects: [
  { id: "shop", stack: ["ASP.NET Core", "PostgreSQL"], type: "wip", github: "https://github.com/...", demo: "#" },
],

// es
projects: {
  shop: { title: "Mi nuevo proyecto", description: "Qué hace y por qué." },
},

// en
projects: {
  shop: { title: "My new project", description: "What it does and why." },
},
```

`type` is optional and adds a badge: `"wip"` (in development) or `"academic"`. Badge labels come from `ui.badges`.

The language toggle (ES/EN) in the navbar saves the choice in `localStorage`. On a first visit the site uses Spanish when the browser language starts with `es`, and English otherwise.

Use relative paths for assets (e.g. `assets/img/photo.jpg`, without a leading slash). That way the site also works under the `/portafolio/` sub-path on GitHub Pages.

## Running locally

No install is needed. Either open `index.html` directly in a browser, or serve the folder with any static server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then open http://localhost:8000.

## Deploying to GitHub Pages

1. Push the repository to GitHub:
   ```bash
   git remote add origin https://github.com/SamuelMarino2108/portafolio.git
   git push -u origin main
   ```
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, then choose branch `main` and folder `/ (root)`.
4. Save. After a minute or so the site is available at https://samuelmarino2108.github.io/portafolio/.

Every later push to `main` redeploys the site automatically.

## Features

- Dark, editorial design with an optional light theme (saved in `localStorage`)
- Spanish / English versions with a language toggle (saved in `localStorage`)
- Contact section with a mailto link and a "copy email" button
- The navbar highlights the section currently in view
- Mobile-first, responsive layout with a fixed navbar that collapses into a menu
- Staggered hero entrance, scroll reveal (IntersectionObserver) and a typewriter status line
- All animations are disabled when `prefers-reduced-motion` is set
- Semantic, accessible HTML: skip link, ARIA labels, keyboard navigation, visible focus styles
- SEO and Open Graph meta tags

## Commit convention

This repo follows [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `style:`, `docs:`, `chore:`, `refactor:`).
