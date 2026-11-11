/* Renders content from data.js and wires up interactions. */
(function () {
  "use strict";

  const LANGS = ["es", "en"];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Current language: set early by the inline script in <head> (see index.html).
  let lang = LANGS.includes(document.documentElement.lang) ? document.documentElement.lang : "es";
  let data; // merged view of PORTFOLIO.common + PORTFOLIO[lang]
  let ui;   // shortcut to data.ui

  /* ---------- Helpers ---------- */

  // Escape text coming from data.js before injecting it as HTML.
  const esc = (value) =>
    String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Fill "{key}" placeholders in a UI string.
  const fmt = (template, values) => template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? "");

  const $ = (selector, root = document) => root.querySelector(selector);

  const render = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  // Build the content for one language (projects merge shared data + translations).
  function buildData(code) {
    const common = PORTFOLIO.common; // defined in js/data.js
    const local = PORTFOLIO[code];
    return {
      ...local,
      name: common.name,
      status: common.status,
      photo: common.photo,
      cv: common.cv,
      contact: { ...common.contact, ...local.contact },
      projects: common.projects.map((p) => ({ ...p, ...local.projects[p.id] })),
    };
  }

  // Section header in the "01 / sobre mí" style.
  const sectionHead = (index, key, id) => {
    const s = ui.sections[key];
    return `
    <header class="section-head reveal">
      <p class="section-index"><span>${index}</span> / ${esc(s.label)}</p>
      <h2 class="section-title" id="${id}">${esc(s.title)}</h2>
    </header>`;
  };

  const chips = (items) =>
    items.length ? `<ul class="chip-list">${items.map((i) => `<li class="chip">${esc(i)}</li>`).join("")}</ul>` : "";

  // Small inline SVG icon set (stroke icons, inherit currentColor).
  const ICONS = {
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
    whatsapp: '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  };
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

  /* ---------- Static shell (texts that live in index.html) ---------- */

  function renderShell() {
    const root = document.documentElement;
    root.lang = lang;
    document.title = data.meta.title;
    $('meta[name="description"]').setAttribute("content", data.meta.description);

    $(".skip-link").textContent = ui.skipLink;
    $(".nav").setAttribute("aria-label", ui.navLabel);
    $(".nav__brand").setAttribute("aria-label", ui.brandLabel);

    // Nav links: keys of ui.nav are the section ids.
    $(".nav__links").innerHTML = Object.entries(ui.nav)
      .map(([id, label], i) => `<li><a href="#${id}"><span>${String(i + 1).padStart(2, "0")}</span> ${esc(label)}</a></li>`)
      .join("");

    $(".theme-toggle__text").textContent = ui.themeText;

    const langBtn = $(".lang-toggle");
    langBtn.setAttribute("aria-label", ui.langLabel);
    langBtn.querySelectorAll("[data-lang]").forEach((el) => el.classList.toggle("is-active", el.dataset.lang === lang));
  }

  /* ---------- Sections ---------- */

  function renderHero() {
    const p = data.profile;
    const modes = data.about.modes.map(esc).join(", ");
    const [first, ...rest] = data.name.split(" ");
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
            <a class="btn btn--primary" href="${esc(data.cv)}" download>${esc(ui.downloadCv)} ${icon("download")}</a>
            <a class="btn" href="#contacto">${esc(ui.contactCta)} ${icon("arrow")}</a>
          </div>
        </div>

        <aside class="terminal" data-hero aria-label="${esc(ui.terminalLabel)}">
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
                <span class="visually-hidden">${esc(data.status)}</span>
                <span class="terminal__typed" data-type="${esc(data.status)}" aria-hidden="true"></span><span class="caret" aria-hidden="true"></span>
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
        ${sectionHead("01", "about", "sobre-mi-title")}
        <div class="about__grid">
          <div class="about__text reveal">
            <p class="about__lead">${esc(a.text)}</p>
            <p class="about__availability mono"><span aria-hidden="true">●</span> ${esc(a.availability)}</p>
          </div>
          <figure class="about__photo reveal">
            <img src="${esc(data.photo)}" alt="${esc(p.photoAlt)}" width="400" height="500" loading="lazy">
            <figcaption class="mono">fig.01 — ${esc(p.location.toLowerCase())}</figcaption>
          </figure>
        </div>
      </div>`);
  }

  function renderSkills() {
    const cards = data.skills
      .map((s, i) => `
        <li class="skill-card reveal">
          <p class="skill-card__index mono">02.${i + 1}</p>
          <h3 class="skill-card__title">${esc(s.group)}</h3>
          <ul class="skill-card__list">${s.items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
        </li>`)
      .join("");
    render("skills", `
      <div class="container">
        ${sectionHead("02", "skills", "skills-title")}
        <ul class="skills__grid">${cards}</ul>
      </div>`);
  }

  function renderProjects() {
    const cards = data.projects
      .map((pr, i) => {
        const num = String(i + 1).padStart(2, "0");
        const badgeText = pr.type && ui.badges[pr.type];
        const badge = badgeText
          ? `<span class="badge${pr.type === "wip" ? " badge--live" : ""}">${esc(badgeText)}</span>`
          : "";
        return `
        <li class="project reveal">
          <article class="project__inner" aria-labelledby="project-${num}">
            <div class="project__meta mono">
              <span>P-${num}</span>
              ${badge}
            </div>
            <h3 class="project__title" id="project-${num}">${esc(pr.title)}</h3>
            <p class="project__desc">${esc(pr.description)}</p>
            ${chips(pr.stack)}
            <div class="project__links">
              <a class="btn" href="${esc(pr.github)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(fmt(ui.projectCode, pr))}">${icon("github")} GitHub</a>
              <a class="btn" href="${esc(pr.demo)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(fmt(ui.projectDemo, pr))}">Demo ${icon("arrow")}</a>
            </div>
          </article>
        </li>`;
      })
      .join("");
    render("proyectos", `
      <div class="container">
        ${sectionHead("03", "projects", "proyectos-title")}
        <ul class="projects__grid">${cards}</ul>
      </div>`);
  }

  function renderEducation() {
    const items = data.education
      .map((ed) => `
        <li class="timeline__item reveal">
          <p class="timeline__period mono">${esc(ed.period)}</p>
          <h3 class="timeline__title">${esc(ed.title)}</h3>
          <p class="timeline__place">${esc(ed.institution)}</p>
        </li>`)
      .join("");
    render("educacion", `
      <div class="container">
        ${sectionHead("05", "education", "educacion-title")}
        <ol class="timeline">${items}</ol>
      </div>`);
  }

  function renderExperience() {
    const rows = data.experience
      .map((ex) => `
        <li class="job reveal">
          <p class="job__period mono">${esc(ex.period)}</p>
          <div>
            <h3 class="job__role">${esc(ex.role)} <span class="job__company">@ ${esc(ex.company)}</span></h3>
            ${chips(ex.stack)}
          </div>
        </li>`)
      .join("");
    render("experiencia", `
      <div class="container">
        ${sectionHead("04", "experience", "experiencia-title")}
        <ol class="jobs">${rows}</ol>
      </div>`);
  }

  function renderContact() {
    const c = data.contact;
    const whatsappUrl = `https://wa.me/${encodeURIComponent(c.whatsappPhone)}?text=${encodeURIComponent(ui.whatsappMessage)}`;
    const links = [
      { label: "GitHub", handle: c.github.replace(/^https?:\/\//, ""), href: c.github, icon: "github" },
      { label: "LinkedIn", handle: c.linkedinHandle, href: c.linkedin, icon: "linkedin" },
      { label: "WhatsApp", handle: ui.whatsappHandle, href: whatsappUrl, icon: "whatsapp" },
    ];
    const emailItem = `
        <li class="contact-item--email">
          <a class="contact-link" href="mailto:${esc(c.email)}">
            <span class="contact-link__icon">${icon("mail")}</span>
            <span class="contact-link__label">${esc(ui.email)}</span>
            <span class="contact-link__handle mono">${esc(c.email)}</span>
          </a>
          <button class="btn copy-btn" type="button" data-copy="${esc(c.email)}">
            ${icon("copy")} <span class="copy-btn__text">${esc(ui.copyEmail)}</span>
          </button>
          <span class="visually-hidden" role="status" aria-live="polite" data-copy-status></span>
        </li>`;
    const items = links
      .map((l) => `
        <li>
          <a class="contact-link" href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">
            <span class="contact-link__icon">${icon(l.icon)}</span>
            <span class="contact-link__label">${esc(l.label)}</span>
            <span class="contact-link__handle mono">${esc(l.handle)}</span>
            <span class="contact-link__arrow">${icon("arrow")}</span>
            <span class="visually-hidden">${esc(ui.newTab)}</span>
          </a>
        </li>`)
      .join("") + emailItem;
    render("contacto", `
      <div class="container">
        ${sectionHead("06", "contact", "contacto-title")}
        <div class="contact__grid">
          <p class="contact__intro reveal">${esc(c.intro)}</p>
          <ul class="contact__links reveal">${items}</ul>
        </div>
      </div>`);
  }

  function renderFooter() {
    const footer = $(".site-footer");
    if (!footer) return;
    footer.innerHTML = `
      <div class="container site-footer__inner mono">
        <p>© ${new Date().getFullYear()} ${esc(data.name)}</p>
        <p>${esc(ui.footerTech)}</p>
        <a href="#inicio">${esc(ui.backToTop)}</a>
      </div>`;
  }

  function renderAll() {
    data = buildData(lang);
    ui = data.ui;
    renderShell();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderEducation();
    renderContact();
    renderFooter();
  }

  /* ---------- Interactions ---------- */

  // Typewriter effect for the terminal status line (runs once, on first load).
  let typeTimer;
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
      if (i < text.length) typeTimer = setTimeout(tick, 70 + Math.random() * 60);
    };
    typeTimer = setTimeout(tick, 900);
  }

  // Staggered entrance for hero elements (CSS reads --i).
  function staggerHero() {
    document.querySelectorAll("[data-hero]").forEach((el, i) => el.style.setProperty("--i", i));
  }

  // Fade + slide in sections as they enter the viewport.
  let revealObserver;
  function revealOnScroll() {
    const items = document.querySelectorAll(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    items.forEach((el) => revealObserver.observe(el));
  }

  // Mobile menu: toggle, close on link click, Escape or resize to desktop.
  const nav = { toggle: null, setOpen: null };
  function setupNav() {
    const toggle = $(".nav__toggle");
    const menu = $("#nav-menu");
    const header = $(".site-header");
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      $(".visually-hidden", toggle).textContent = open ? ui.menuClose : ui.menuOpen;
      document.body.classList.toggle("menu-open", open);
    };
    nav.toggle = toggle;
    nav.setOpen = setOpen;

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 60em)").addEventListener("change", () => setOpen(false));
    setOpen(false);

    // Add a border to the header once the page is scrolled.
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Light/dark theme toggle, persisted in localStorage.
  let syncTheme = () => {};
  function setupTheme() {
    const btn = $(".theme-toggle");
    if (!btn) return;
    const root = document.documentElement;
    syncTheme = () => {
      const light = root.dataset.theme === "light";
      btn.setAttribute("aria-label", light ? ui.themeToDark : ui.themeToLight);
      $('meta[name="theme-color"]').setAttribute("content", light ? "#f3f0e8" : "#0e0e10");
    };
    btn.addEventListener("click", () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      if (next === "light") root.dataset.theme = "light";
      else delete root.dataset.theme;
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
      syncTheme();
    });
    syncTheme();
  }

  // ES/EN toggle: re-render everything in the new language, persisted in localStorage.
  function setupLang() {
    const btn = $(".lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      lang = lang === "es" ? "en" : "es";
      try { localStorage.setItem("lang", lang); } catch (e) { /* storage unavailable */ }

      clearTimeout(typeTimer); // stop a typewriter still running from the first load
      if (revealObserver) revealObserver.disconnect();

      renderAll();

      // Fresh nodes: show them as-is (no re-entrance, no re-hidden reveals).
      // Classes are set before the next style calc, so no transition plays.
      $("#inicio").classList.add("is-static");
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      const typed = $("[data-type]");
      if (typed) typed.textContent = typed.dataset.type;

      syncTheme();
      if (nav.setOpen) {
        // Keep the menu state, just refresh its label.
        nav.setOpen(nav.toggle.getAttribute("aria-expanded") === "true");
      }
    });
  }

  // Copy-to-clipboard for the email button. Delegated so it survives re-renders.
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
    }
    return legacyCopy(text);
  }

  // Fallback for browsers/contexts without the async Clipboard API.
  function legacyCopy(text) {
    return new Promise((resolve, reject) => {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      area.remove();
      ok ? resolve() : reject(new Error("copy failed"));
    });
  }

  function setupCopy() {
    let timer;
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-copy]");
      if (!btn) return;
      const done = (key, cls) => {
        const label = $(".copy-btn__text", btn);
        const status = $("[data-copy-status]", btn.parentElement);
        label.textContent = ui[key];
        btn.classList.add(cls);
        if (status) status.textContent = ui[key];
        clearTimeout(timer);
        timer = setTimeout(() => {
          // Re-query: the section may have been re-rendered in another language.
          const current = $(".copy-btn__text");
          if (current) current.textContent = ui.copyEmail;
          document.querySelectorAll("[data-copy]").forEach((b) => b.classList.remove("is-copied", "is-error"));
          const s = $("[data-copy-status]");
          if (s) s.textContent = "";
        }, 2000);
      };
      copyText(btn.dataset.copy).then(
        () => done("copied", "is-copied"),
        () => done("copyFailed", "is-error")
      );
    });
  }

  /* ---------- Init ---------- */
  renderAll();
  staggerHero();
  typeStatus();
  revealOnScroll();
  setupNav();
  setupTheme();
  setupLang();
  setupCopy();
})();
