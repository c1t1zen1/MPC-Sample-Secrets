/* MPC SAMPLE // SECRET GUIDEBOOK BIBLE — shared behaviour.
   Keycaps, source links, Ctrl+K search, codex + FX tables, copy buttons, decrypt reveal, TOC spy. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- keycaps ---------- */
  function kcls(t) {
    const u = t.toUpperCase().trim();
    if (u === "SHIFT") return "shift";
    if (u === "PAD FX" || u === "KNOB FX") return "fx";
    if (/^PADS?\b/.test(u) && !/^PAD BANK/.test(u)) return "pad";
    if (["CHOP", "MUTE", "LOOP", "16 LEVELS"].includes(u)) return "play";
    if (/RECORD$/.test(u)) return "rec";
    if (u === "PLAY") return "go";
    if (/^B[1-3]/.test(u)) return "fn";
    if (/^K[1-3]/.test(u) || u === "MAIN VOLUME") return "knob";
    if (/^ENCODER/.test(u)) return "enc";
    return "";
  }
  function cap(token) {
    let hold = false;
    let t = token.trim();
    if (t.startsWith("hold:")) { hold = true; t = t.slice(5); }
    let tail = "";
    const arrow = t.indexOf(" → ");
    if (arrow > -1) { tail = ' <span class="faint">→ ' + esc(t.slice(arrow + 3)) + "</span>"; t = t.slice(0, arrow); }
    const m = t.match(/^(.*?)\s*(\([^)]*\))$/);
    let ctx = "";
    if (m) { t = m[1]; ctx = ' <span class="faint small">' + esc(m[2]) + "</span>"; }
    return '<kbd class="k ' + kcls(t) + (hold ? " hold" : "") + '">' + esc(t) + "</kbd>" + ctx + tail;
  }
  function keys(str) {
    return '<span class="combo">' + str.split(" + ").map(cap).join('<span class="plus">+</span>') + "</span>";
  }
  MPC.keys = keys;

  function hydrateKeys(root = document) {
    $$("[data-keys]", root).forEach((el) => { el.innerHTML = keys(el.getAttribute("data-keys")); });
    $$("kbd.k:not([data-done])", root).forEach((el) => {
      const c = kcls(el.textContent);
      if (c) el.classList.add(c);
      el.setAttribute("data-done", "");
    });
  }

  /* ---------- source links ---------- */
  function srcLink(key, label) {
    const s = MPC.SRC[key];
    if (!s) return "";
    return '<a class="src" href="' + esc(s.u) + '" target="_blank" rel="noopener" title="' + esc(s.t) + '">' + esc(label || key.toUpperCase()) + "</a>";
  }
  MPC.srcLink = srcLink;
  function hydrateSrc(root = document) {
    $$("a.src[data-s]", root).forEach((a) => {
      const s = MPC.SRC[a.dataset.s];
      if (!s) return;
      a.href = s.u; a.target = "_blank"; a.rel = "noopener"; a.title = s.t;
      if (!a.textContent.trim()) a.textContent = a.dataset.s.toUpperCase();
    });
    $$("a[data-href]", root).forEach((a) => {
      const s = MPC.SRC[a.dataset.href];
      if (!s) return;
      a.href = s.u; a.target = "_blank"; a.rel = "noopener";
      if (!a.textContent.trim()) a.textContent = s.t;
    });
  }

  /* ---------- codex ---------- */
  function renderCodex() {
    const host = $("#codex-table");
    if (!host) return;
    const ctxs = ["All", "Hidden gems"].concat(Array.from(new Set(MPC.SHORTCUTS.map((s) => s.ctx))));
    const filters = $("#codex-filters");
    const input = $("#codex-q");
    let active = "All";
    filters.innerHTML = ctxs.map((c) => '<button type="button" aria-pressed="' + (c === "All") + '" data-c="' + esc(c) + '">' + esc(c) + "</button>").join("");
    function draw() {
      const q = (input.value || "").toLowerCase().split(/\s+/).filter(Boolean);
      const rows = MPC.SHORTCUTS.filter((s) => {
        if (active === "Hidden gems" && !s.hot) return false;
        if (active !== "All" && active !== "Hidden gems" && s.ctx !== active) return false;
        const hay = (s.keys + " " + s.what + " " + s.ctx).toLowerCase();
        return q.every((w) => hay.includes(w));
      });
      host.innerHTML =
        "<table class=\"data\"><thead><tr><th>Combo</th><th>What it does</th><th>Context</th><th>Src</th></tr></thead><tbody>" +
        rows.map((s) => "<tr><td>" + keys(s.keys) + "</td><td>" + esc(s.what) + (s.hot ? ' <span class="badge b-new">hidden gem</span>' : "") +
          '</td><td class="n">' + esc(s.ctx) + "</td><td>" + srcLink(s.src) + "</td></tr>").join("") +
        "</tbody></table>";
      $("#codex-count").textContent = rows.length + " / " + MPC.SHORTCUTS.length + " combos";
    }
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      active = b.dataset.c;
      $$("button", filters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      draw();
    });
    input.addEventListener("input", draw);
    draw();
  }

  /* ---------- FX tables ---------- */
  function renderFx() {
    const p = $("#padfx-table");
    if (p) {
      p.innerHTML = "<table class=\"data\"><thead><tr><th>Pad</th><th>Effect</th><th>K1 · K2 · K3</th><th>Use it for</th></tr></thead><tbody>" +
        MPC.PADFX.map((f, i) => '<tr><td class="n">' + (i + 1) + "</td><td><b>" + esc(f[0]) + "</b></td><td>" + esc(f[1]) + '</td><td class="muted">' + esc(f[2]) + "</td></tr>").join("") +
        "</tbody></table>";
    }
    const k = $("#knobfx-table");
    if (k) {
      k.innerHTML = "<table class=\"data\"><thead><tr><th>#</th><th>Effect</th><th>Family</th><th>K1 · K2 · K3</th><th>SHIFT + K1 · K2 · K3</th></tr></thead><tbody>" +
        MPC.KNOBFX.map((f, i) => '<tr><td class="n">' + String(i + 1).padStart(2, "0") + "</td><td><b>" + esc(f[0]) + '</b></td><td class="n">' + esc(f[3]) + "</td><td>" + esc(f[1]) + '</td><td class="muted">' + esc(f[2]) + "</td></tr>").join("") +
        "</tbody></table>";
    }
  }

  /* ---------- search ---------- */
  function pageFile() {
    const f = location.pathname.split("/").pop();
    return f || "index.html";
  }
  function buildIndex() {
    const idx = [];
    MPC.PAGES.forEach(([file, title, secs]) => {
      idx.push({ t: title, c: "Page", href: file, p: title, hay: title.toLowerCase() });
      secs.forEach(([hash, name]) => idx.push({ t: name, c: "Section", href: file + hash, p: title, hay: (name + " " + title).toLowerCase() }));
    });
    MPC.SHORTCUTS.forEach((s, i) => idx.push({
      t: s.what, c: s.keys, href: "deep.html#codex", p: "Codex · " + s.ctx, keys: s.keys,
      hay: (s.keys + " " + s.what + " " + s.ctx + (s.hot ? " hidden gem secret" : "")).toLowerCase()
    }));
    $$("[data-search]").forEach((el) => {
      if (!el.id) return;
      idx.push({ t: el.getAttribute("data-search"), c: "On this page", href: pageFile() + "#" + el.id, p: "Here", hay: el.getAttribute("data-search").toLowerCase() });
    });
    return idx;
  }
  function initSearch() {
    const ov = document.createElement("div");
    ov.className = "search-ov";
    ov.innerHTML = '<div class="search-box" role="dialog" aria-label="Search the guidebook"><input type="text" placeholder="search combos, modes, hacks…  e.g. recall, zoom, sysex" aria-label="Search" autocomplete="off" spellcheck="false"><div class="search-res" role="listbox"></div><div class="search-foot">↑↓ move · ENTER open · ESC close · ' + MPC.SHORTCUTS.length + " combos indexed</div></div>";
    document.body.appendChild(ov);
    const input = $("input", ov), res = $(".search-res", ov);
    let index = null, sel = 0, items = [];
    function draw() {
      const q = input.value.toLowerCase().split(/\s+/).filter(Boolean);
      items = (q.length ? index.filter((x) => q.every((w) => x.hay.includes(w))) : index.filter((x) => x.c === "Section" || x.c === "Page")).slice(0, 50);
      sel = 0;
      res.innerHTML = items.length ? items.map((x, i) =>
        '<a href="' + esc(x.href) + '" class="' + (i === 0 ? "sel" : "") + '"><span class="sr-t">' + esc(x.t) + '</span><span class="sr-p">' + esc(x.p) + "</span>" +
        (x.keys ? '<span class="sr-c">' + keys(x.keys) + "</span>" : '<span class="sr-c">' + esc(x.c) + "</span>") + "</a>").join("")
        : '<p class="muted small" style="padding:12px">No signal. Try fewer words.</p>';
    }
    function open() { index = index || buildIndex(); ov.classList.add("open"); input.value = ""; draw(); setTimeout(() => input.focus(), 10); }
    function close() { ov.classList.remove("open"); }
    MPC.openSearch = open;
    input.addEventListener("input", draw);
    ov.addEventListener("click", (e) => { if (e.target === ov) close(); if (e.target.closest("a")) close(); });
    input.addEventListener("keydown", (e) => {
      const links = $$("a", res);
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!links.length) return;
        sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
        links.forEach((a, i) => a.classList.toggle("sel", i === sel));
        links[sel].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter" && links[sel]) { location.href = links[sel].getAttribute("href"); close(); }
      else if (e.key === "Escape") close();
    });
    document.addEventListener("keydown", (e) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); ov.classList.contains("open") ? close() : open(); }
      else if (e.key === "/" && !typing) { e.preventDefault(); open(); }
      else if (e.key === "Escape") close();
    });
    $$("[data-open-search]").forEach((b) => b.addEventListener("click", open));
  }

  /* ---------- copy buttons ---------- */
  function initCopy() {
    $$("pre:not(.nocopy)").forEach((pre) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "copy"; b.textContent = "COPY";
      b.addEventListener("click", () => {
        const text = Array.from(pre.childNodes).filter((n) => n !== b).map((n) => n.textContent).join("")
          .split("\n").map((l) => l.replace(/^\$ /, "")).join("\n").trim();
        const done = () => { b.textContent = "COPIED"; b.classList.add("ok"); setTimeout(() => { b.textContent = "COPY"; b.classList.remove("ok"); }, 1400); };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => {});
        else { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); done(); } catch (_) {} t.remove(); }
      });
      pre.appendChild(b);
    });
  }

  /* ---------- decrypt + reveal ---------- */
  const GLYPHS = "!<>-_\\/[]{}=+*^?#░▒▓█01ABCDEF";
  function decrypt(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const final = el.textContent;
    let frame = 0;
    const total = 18;
    const tick = () => {
      frame++;
      const p = frame / total;
      el.textContent = final.split("").map((ch, i) => (ch === " " || i / final.length < p ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
      if (frame < total) requestAnimationFrame(tick); else el.textContent = final;
    };
    tick();
  }
  function initReveal() {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = $$(".rv, [data-decrypt]");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      if (en.target.hasAttribute("data-decrypt")) decrypt(en.target);
      io.unobserve(en.target);
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
    window.addEventListener("beforeprint", () => els.forEach((e) => e.classList.add("in")));
  }

  /* ---------- toc spy ---------- */
  function initToc() {
    const links = $$(".toc a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) { links.forEach((a) => a.classList.remove("on")); const a = map.get(en.target.id); if (a) a.classList.add("on"); }
    }), { rootMargin: "-20% 0px -70% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- nav ---------- */
  function initNav() {
    const f = pageFile();
    $$(".nav a").forEach((a) => { if (a.getAttribute("href") === f) a.setAttribute("aria-current", "page"); });
    const mb = $(".menu-btn"), nav = $(".nav");
    if (mb && nav) mb.addEventListener("click", () => { nav.classList.toggle("open"); mb.setAttribute("aria-expanded", nav.classList.contains("open")); });
    $$("[data-sync]").forEach((el) => {
      const k = el.getAttribute("data-sync");
      el.textContent = MPC.SYNC[k] || "";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    hydrateSrc();
    renderCodex();
    renderFx();
    hydrateKeys();
    initNav();
    initSearch();
    initCopy();
    initReveal();
    initToc();
  });
  MPC.hydrate = (root) => { hydrateSrc(root); hydrateKeys(root); };
})();
