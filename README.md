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

All content lives in `js/data.js` as a single `PORTFOLIO` object. To add a project, change a link or update a text, edit that file. You don't need to touch the HTML.

```js
projects: [
  {
    title: "My new project",
    description: "What it does and why.",
    stack: ["ASP.NET Core", "PostgreSQL"],
    badge: "En desarrollo", // optional
    github: "https://github.com/...",
    demo: "https://...",
  },
],
```

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
- Mobile-first, responsive layout with a fixed navbar that collapses into a menu
- Staggered hero entrance, scroll reveal (IntersectionObserver) and a typewriter status line
- All animations are disabled when `prefers-reduced-motion` is set
- Semantic, accessible HTML: skip link, ARIA labels, keyboard navigation, visible focus styles
- SEO and Open Graph meta tags

## Commit convention

This repo follows [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `style:`, `docs:`, `chore:`, `refactor:`).
