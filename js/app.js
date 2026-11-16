/* ==========================================================================
   app.js — navegação, tema, contagem regressiva, progresso, código e TOC.
   Sem dependências. Funciona abrindo o index.html direto (file://).
   ========================================================================== */
(function () {
  "use strict";

  var root = document.body.getAttribute("data-root") || "";
  var page = document.body.getAttribute("data-page") || "";
  var PROGRESS_KEY = "ed-progress-v1";
  var THEME_KEY = "ed-theme";

  /* ---------- Navegação ---------- */
  var NAV = [
    {
      title: "Comece aqui",
      items: [
        { id: "inicio", label: "Visão geral", href: "index.html", ico: "🏠" }
      ]
    },
    {
      title: "Conteúdo da prova",
      items: [
        { id: "ordenacao", label: "Ordenação simples", href: "pages/ordenacao.html", ico: "🔢" },
        { id: "sequencial", label: "Listas sequenciais", href: "pages/listas-sequenciais.html", ico: "▦" },
        { id: "encadeada", label: "Listas encadeadas", href: "pages/listas-encadeadas.html", ico: "🔗" },
        { id: "pilhas", label: "Pilhas", href: "pages/pilhas.html", ico: "🥞" },
        { id: "filas", label: "Filas", href: "pages/filas.html", ico: "🚶" }
      ]
    },
    {
      title: "Treino",
      items: [
        { id: "resumo", label: "Resumo de véspera", href: "pages/resumo.html", ico: "📌" },
        { id: "simulado", label: "Simulado", href: "pages/simulado.html", ico: "📝", badge: "25" }
      ]
    }
  ];

  var navEl = document.getElementById("nav");
  if (navEl) {
    var html = "";
    NAV.forEach(function (group) {
      html += '<div class="nav-group"><p class="nav-title">' + group.title + "</p>";
      group.items.forEach(function (item) {
        var active = item.id === page ? " active" : "";
        var href = root + item.href;
        html += '<a class="' + active.trim() + '" href="' + href + '"' +
          (active ? ' aria-current="page"' : "") + ">" +
          '<span class="nav-ico" aria-hidden="true">' + item.ico + "</span>" +
          "<span>" + item.label + "</span>" +
          (item.badge ? '<span class="nav-badge">' + item.badge + "</span>" : "") +
          "</a>";
      });
      html += "</div>";
    });
    navEl.innerHTML = html;
  }

  /* ---------- Menu mobile ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var sidebar = document.getElementById("sidebar");
  function closeNav() {
    if (!sidebar) return;
    sidebar.classList.remove("open");
    document.body.classList.remove("nav-open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", function () {
      var open = sidebar.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("click", function (e) {
      if (!sidebar.classList.contains("open")) return;
      if (sidebar.contains(e.target) || menuBtn.contains(e.target)) return;
      closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Tema ---------- */
  var themeBtn = document.getElementById("themeBtn");
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    if (themeBtn) {
      themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
      themeBtn.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
      themeBtn.setAttribute("title", theme === "dark" ? "Tema claro" : "Tema escuro");
    }
  }
  var currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(currentTheme);
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------- Contagem regressiva ---------- */
  var EXAM = new Date("2026-11-16T15:10:00-03:00").getTime();
  var EXAM_END = EXAM + 3 * 60 * 60 * 1000; // margem para "prova em andamento"
  var DAY_FMT = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit"
  });
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function dayKey(ms) { return DAY_FMT.format(new Date(ms)); }
  function setCell(cell, value, label) {
    var b = cell.querySelector("b");
    var s = cell.querySelector("span");
    if (b) b.textContent = value;
    if (s) s.textContent = label;
  }

  function updateCountdown() {
    var now = Date.now();
    var diff = EXAM - now;
    var boxes = document.querySelectorAll("[data-countdown]");
    var minis = document.querySelectorAll("[data-countdown-mini]");
    var tags = document.querySelectorAll("[data-prazo]");

    if (diff <= 0) {
      var running = now < EXAM_END;
      boxes.forEach(function (box) {
        box.innerHTML = '<div style="grid-column:1/-1"><b>' +
          (running ? "Prova em andamento" : "Prova encerrada") +
          '</b><span>' + (running ? "Boa sorte! 🍀" : "Agora é descansar.") + '</span></div>';
      });
      minis.forEach(function (m) {
        m.innerHTML = running
          ? "<strong>Prova em andamento</strong> · 15h10"
          : "<strong>Prova encerrada</strong>";
      });
      tags.forEach(function (t) { t.textContent = running ? "A prova é agora." : "A prova já passou."; });
      return;
    }

    var totalSec = Math.floor(diff / 1000);
    var days = Math.floor(totalSec / 86400);
    var hours = Math.floor((totalSec % 86400) / 3600);
    var mins = Math.floor((totalSec % 3600) / 60);
    var secs = totalSec % 60;
    var hoje = dayKey(now) === dayKey(EXAM);
    var amanha = dayKey(now + 86400000) === dayKey(EXAM);

    boxes.forEach(function (box) {
      var cells = box.querySelectorAll("div");
      if (!cells.length) return;
      if (days > 0) {
        setCell(cells[0], pad(days), days === 1 ? "dia" : "dias");
        setCell(cells[1], pad(hours), "horas");
        setCell(cells[2], pad(mins), "min");
        setCell(cells[3], pad(secs), "seg");
      } else if (hours > 0) {
        setCell(cells[0], pad(hours), "horas");
        setCell(cells[1], pad(mins), "min");
        setCell(cells[2], pad(secs), "seg");
        setCell(cells[3], "16/11", "prova");
      } else {
        setCell(cells[0], pad(mins), "min");
        setCell(cells[1], pad(secs), "seg");
        setCell(cells[2], "16/11", "prova");
        setCell(cells[3], "sala 11", "local");
      }
    });

    var faltaTempo = days > 0
      ? days + "d " + pad(hours) + "h " + pad(mins) + "min"
      : hours + "h " + pad(mins) + "min";
    var falta;
    if (hoje) {
      falta = "<strong>Prova hoje</strong> · faltam " + faltaTempo;
    } else if (amanha) {
      falta = "<strong>Prova amanhã</strong> · faltam " + faltaTempo;
    } else {
      falta = "Faltam <strong>" + faltaTempo + "</strong>";
    }
    if (totalSec < 3600) {
      falta = "Faltam <strong>" + mins + "min " + pad(secs) + "s</strong> · sala 11";
    }
    if (totalSec < 600) {
      falta = "<strong>Últimos " + Math.max(1, Math.ceil(totalSec / 60)) + "min!</strong> · sala 11";
    }
    minis.forEach(function (m) { m.innerHTML = falta; });

    var prazo;
    if (hoje) prazo = "É hoje: a prova é às 15h10.";
    else if (amanha) prazo = "A prova é amanhã às 15h10.";
    else if (days > 0) prazo = "Faltam " + days + (days === 1 ? " dia" : " dias") + " para a prova.";
    else prazo = "Falta menos de um dia para a prova.";
    if (totalSec < 3600) prazo = "Falta menos de 1 hora para a prova.";
    tags.forEach(function (t) { t.textContent = prazo; });
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- Progresso ---------- */
  function readProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}") || {}; }
    catch (e) { return {}; }
  }
  function writeProgress(obj) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(obj)); } catch (e) {}
  }
  var progress = readProgress();

  document.querySelectorAll('input[type="checkbox"][data-progress]').forEach(function (box) {
    var key = box.getAttribute("data-progress");
    box.checked = !!progress[key];
    box.addEventListener("change", function () {
      progress = readProgress();
      if (box.checked) progress[key] = true;
      else delete progress[key];
      writeProgress(progress);
      refreshProgressUI();
    });
  });

  function refreshProgressUI() {
    progress = readProgress();
    // Status nos cards da home
    document.querySelectorAll("[data-page-status]").forEach(function (el) {
      var key = el.getAttribute("data-page-status");
      var done = !!progress[key];
      el.textContent = done ? "✓ estudado" : "pendente";
      el.classList.toggle("done", done);
    });
    // Barra de progresso
    var pages = ["ordenacao", "sequencial", "encadeada", "pilhas", "filas", "resumo"];
    var doneCount = pages.filter(function (k) { return !!progress[k]; }).length;
    var pct = Math.round((doneCount / pages.length) * 100);
    document.querySelectorAll("[data-progress-fill]").forEach(function (el) {
      el.style.width = pct + "%";
    });
    document.querySelectorAll("[data-progress-label]").forEach(function (el) {
      el.textContent = doneCount + " de " + pages.length + " páginas (" + pct + "%)";
    });
  }
  refreshProgressUI();

  /* ---------- Realce de código Java ---------- */
  var JAVA_KW = new Set(("abstract assert break case catch class continue default do else enum extends final finally " +
    "for if implements import instanceof interface native new package private protected public return static " +
    "strictfp super switch synchronized this throw throws transient try void volatile while var record sealed permits yield").split(" "));
  var JAVA_TYPES = new Set(("boolean byte char double float int long short String Object Integer Long Character Boolean " +
    "Double Float Number Exception RuntimeException IllegalArgumentException IndexOutOfBoundsException " +
    "IllegalStateException StringBuilder StringBuffer System Math Objects Scanner Arrays List ArrayList").split(" "));

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function highlightJava(src) {
    var out = "", i = 0;
    while (i < src.length) {
      var c = src[i], n = src[i + 1];
      if (c === "/" && n === "/") {
        var j = src.indexOf("\n", i);
        if (j < 0) j = src.length;
        out += '<span class="com">' + esc(src.slice(i, j)) + "</span>";
        i = j;
      } else if (c === "/" && n === "*") {
        var k = src.indexOf("*/", i + 2);
        k = k < 0 ? src.length : k + 2;
        out += '<span class="com">' + esc(src.slice(i, k)) + "</span>";
        i = k;
      } else if (c === '"' || c === "'") {
        var q = i + 1;
        while (q < src.length && src[q] !== c) {
          if (src[q] === "\\") q++;
          q++;
        }
        q = Math.min(q + 1, src.length);
        out += '<span class="str">' + esc(src.slice(i, q)) + "</span>";
        i = q;
      } else if (c === "@" && /[A-Za-z]/.test(n || "")) {
        var a = i + 1;
        while (a < src.length && /[A-Za-z0-9_]/.test(src[a])) a++;
        out += '<span class="ann">' + esc(src.slice(i, a)) + "</span>";
        i = a;
      } else if (/[A-Za-z_$]/.test(c)) {
        var w = i + 1;
        while (w < src.length && /[A-Za-z0-9_$]/.test(src[w])) w++;
        var word = src.slice(i, w);
        var cls = JAVA_KW.has(word) ? "kw" : (JAVA_TYPES.has(word) ? "type" : null);
        if (!cls && src[w] === "(") cls = "fn";
        out += cls ? '<span class="' + cls + '">' + esc(word) + "</span>" : esc(word);
        i = w;
      } else if (/[0-9]/.test(c)) {
        var d = i + 1;
        while (d < src.length && /[0-9a-fA-FxX._]/.test(src[d])) d++;
        out += '<span class="num">' + esc(src.slice(i, d)) + "</span>";
        i = d;
      } else {
        out += esc(c);
        i++;
      }
    }
    return out;
  }

  document.querySelectorAll(".codeblock pre code").forEach(function (code) {
    if (code.dataset.highlighted) return;
    var src = code.textContent;
    code.innerHTML = highlightJava(src);
    code.dataset.highlighted = "1";
  });

  /* ---------- Copiar código ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var block = btn.closest(".codeblock");
      var code = block ? block.querySelector("pre code") : null;
      if (!code) return;
      var text = code.textContent;
      function done() {
        var old = btn.textContent;
        btn.textContent = "Copiado!";
        setTimeout(function () { btn.textContent = old; }, 1400);
      }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
    });
  });

  /* ---------- Sumário automático da página ---------- */
  document.querySelectorAll("[data-toc]").forEach(function (box) {
    var headings = document.querySelectorAll(".content h2[id]");
    if (headings.length < 2) { box.classList.add("hidden"); return; }
    var list = document.createElement("ol");
    headings.forEach(function (h) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      var clone = h.cloneNode(true);
      clone.querySelectorAll(".num, .anchor-link").forEach(function (x) { x.remove(); });
      a.textContent = clone.textContent.trim();
      li.appendChild(a);
      list.appendChild(li);
    });
    box.innerHTML = '<p class="toc-title">Nesta página</p>';
    box.appendChild(list);
  });

  /* ---------- Scroll spy do sumário ---------- */
  var tocLinks = document.querySelectorAll(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove("active"); });
        var link = map[entry.target.id];
        if (link) link.classList.add("active");
      });
    }, { rootMargin: "-90px 0px -70% 0px", threshold: 0 });
    document.querySelectorAll(".content h2[id]").forEach(function (h) { obs.observe(h); });
  }

  /* ---------- Voltar ao topo ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 650);
    }, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Marcar links externos ---------- */
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });
})();
