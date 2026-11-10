/* Renders content from data.js and wires up interactions. */
(function () {
  "use strict";

  const data = PORTFOLIO; // defined in js/data.js
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Helpers ---------- */

  // Escape text coming from data.js before injecting it as HTML.
  const esc = (value) =>
    String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const $ = (selector, root = document) => root.querySelector(selector);

  const render = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  // Section header in the "01 / sobre mí" style.
  const sectionHead = (index, label, title, id) => `
    <header class="section-head reveal">
      <p class="section-index"><span>${index}</span> / ${esc(label)}</p>
      <h2 class="section-title" id="${id}">${esc(title)}</h2>
    </header>`;

  const chips = (items) =>
    items.length ? `<ul class="chip-list">${items.map((i) => `<li class="chip">${esc(i)}</li>`).join("")}</ul>` : "";

  // Small inline SVG icon set (stroke icons, inherit currentColor).
  const ICONS = {
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  };
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

  /* ---------- Sections ---------- */

  function renderHero() {
    const p = data.profile;
    const modes = data.about.modes.map(esc).join(", ");
    const [first, ...rest] = p.name.split(" ");
    render("inicio", `
      <div class="container hero__grid">
        <p class="hero__coords mono" aria-hidden="true">04.711° N — 74.072° W</p>
        <div class="hero__main">
          <p class="hero__kicker mono" data-hero>${icon("pin")} ${esc(p.location)}</p>
          <h1 class="hero__name" id="hero-title" data-hero>
            <span>${esc(first)}</span> <span class="hero__name-last">${esc(rest.join(" "))}</span>
          </h1>
          <p class="hero__role" data-hero>${esc(p.role)}</p>
          <p class="hero__tagline" data-hero>${esc(p.tagline)}</p>
          <div class="hero__actions" data-hero>
            <a class="btn btn--primary" href="${esc(p.cv)}" download>Descargar CV ${icon("download")}</a>
            <a class="btn" href="#contacto">Contacto ${icon("arrow")}</a>
          </div>
        </div>

        <aside class="terminal" data-hero aria-label="Estado actual">
          <div class="terminal__bar" aria-hidden="true">
            <span></span><span></span><span></span>
            <p class="terminal__title">samuel@bogota:~</p>
          </div>
          <dl class="terminal__body mono">
            <div><dt>&gt; role</dt><dd>backend_dotnet</dd></div>
            <div><dt>&gt; stack</dt><dd>[c#, asp.net_core, ef_core, sql]</dd></div>
            <div><dt>&gt; modes</dt><dd>[${modes}]</dd></div>
            <div class="terminal__status">
              <dt>&gt; status:</dt>
              <dd>
                <span class="visually-hidden">${esc(p.status)}</span>
                <span class="terminal__typed" data-type="${esc(p.status)}" aria-hidden="true"></span><span class="caret" aria-hidden="true"></span>
              </dd>
            </div>
          </dl>
        </aside>
      </div>`);
  }

  function renderAbout() {
    const p = data.profile;
    const a = data.about;
    render("sobre-mi", `
      <div class="container">
        ${sectionHead("01", "sobre mí", "Backend con los pies en la operación.", "sobre-mi-title")}
        <div class="about__grid">
          <div class="about__text reveal">
            <p class="about__lead">${esc(a.text)}</p>
            <p class="about__availability mono"><span aria-hidden="true">●</span> ${esc(a.availability)}</p>
          </div>
          <figure class="about__photo reveal">
            <img src="${esc(p.photo)}" alt="${esc(p.photoAlt)}" width="400" height="500" loading="lazy">
            <figcaption class="mono">fig.01 — ${esc(p.location.toLowerCase())}</figcaption>
          </figure>
        </div>
      </div>`);
  }

  /* ---------- Interactions ---------- */

  // Typewriter effect for the terminal status line.
  function typeStatus() {
    const el = $("[data-type]");
    if (!el) return;
    const text = el.dataset.type;
    if (reducedMotion) {
      el.textContent = text;
      return;
    }
    let i = 0;
    const tick = () => {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, 70 + Math.random() * 60);
    };
    setTimeout(tick, 900);
  }

  // Staggered entrance for hero elements (CSS reads --i).
  function staggerHero() {
    document.querySelectorAll("[data-hero]").forEach((el, i) => el.style.setProperty("--i", i));
  }

  /* ---------- Init ---------- */
  renderHero();
  renderAbout();
  staggerHero();
  typeStatus();
})();
