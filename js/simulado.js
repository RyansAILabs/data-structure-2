/* ==========================================================================
   simulado.js — simulado cronometrado (29 questões) e treino por tópico.
   Depende de quiz-data.js.
   ========================================================================== */
(function () {
  "use strict";

  if (!window.QUIZ || !window.QUIZ_META) return;

  var QUIZ = window.QUIZ;
  var TOPICS = window.QUIZ_META.topics;
  var LETTERS = ["A", "B", "C", "D"];
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Abas ---------- */
  var tabs = document.querySelectorAll(".tab[data-tab]");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
      ["simulado", "treino"].forEach(function (name) {
        var sec = $("tab-" + name);
        if (sec) sec.classList.toggle("hidden", name !== tab.getAttribute("data-tab"));
      });
    });
  });

  /* ================= SIMULADO ================= */
  var exam = QUIZ.filter(function (q) { return q.prova; });
  var answers = new Array(exam.length).fill(null);
  var started = false;
  var finished = false;
  var timeLeft = 90 * 60;
  var timerId = null;

  var intro = $("simIntro");
  var area = $("simArea");
  var form = $("simForm");
  var resultEl = $("simResult");
  var timerEl = $("simTimer");
  var answeredEl = $("simAnswered");
  var fillEl = $("simFill");
  var submitBtn = $("simSubmit");

  function mmss(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function updateTimer() {
    if (timerEl) {
      timerEl.textContent = mmss(timeLeft);
      timerEl.classList.toggle("low", timeLeft <= 300);
    }
    if (timeLeft <= 0) {
      finish("O tempo acabou! A prova foi corrigida automaticamente.");
    }
  }

  function startTimer() {
    timerId = setInterval(function () {
      if (finished) return;
      timeLeft--;
      updateTimer();
    }, 1000);
  }

  function optionHtml(q, i, selected, review) {
    var cls = "option";
    if (review) {
      cls += " disabled";
      if (i === q.answer) cls += " correct";
      if (selected !== null && selected !== q.answer && i === selected) cls += " wrong";
    }
    var checked = selected === i ? " checked" : "";
    var disabled = review ? " disabled" : "";
    return '<label class="' + cls + '">' +
      '<input type="radio" name="q_' + q.id + '" value="' + i + '"' + checked + disabled + '>' +
      '<span class="letter">' + LETTERS[i] + "</span>" +
      "<span>" + q.options[i] + "</span></label>";
  }

  function questionHtml(q, number, selected, review) {
    var html = '<div class="qcard" id="card-' + q.id + '">' +
      '<div class="qmeta"><span class="qnum">Questão ' + (number < 10 ? "0" : "") + number + "</span>" +
      '<span class="pill accent">' + TOPICS[q.topic] + "</span></div>" +
      '<div class="qtext">' + q.q + "</div>" +
      '<div class="options">';
    for (var i = 0; i < q.options.length; i++) {
      html += optionHtml(q, i, selected, review);
    }
    html += "</div>";
    if (review) {
      html += '<div class="qexplain">' +
        "<strong>Resposta correta: " + LETTERS[q.answer] + ".</strong> " + q.explain +
        (selected === null ? " <em>(Você deixou em branco.)</em>" : "") +
        "</div>";
    }
    html += "</div>";
    return html;
  }

  function updateAnswered() {
    var n = answers.filter(function (a) { return a !== null; }).length;
    if (answeredEl) answeredEl.textContent = n + " de " + exam.length + " respondidas";
    if (fillEl) fillEl.style.width = Math.round((n / exam.length) * 100) + "%";
  }

  function startExam() {
    if (started) return;
    started = true;
    intro.classList.add("hidden");
    area.classList.remove("hidden");
    form.innerHTML = exam.map(function (q, i) {
      return questionHtml(q, i + 1, null, false);
    }).join("");
    updateAnswered();
    updateTimer();
    startTimer();

    form.addEventListener("change", function (e) {
      var input = e.target;
      if (!input || input.type !== "radio") return;
      var name = input.name.replace("q_", "");
      var idx = exam.findIndex(function (q) { return String(q.id) === name; });
      if (idx >= 0) {
        answers[idx] = parseInt(input.value, 10);
        updateAnswered();
      }
    });
  }

  function finish(reason) {
    if (finished) return;
    finished = true;
    if (timerId) clearInterval(timerId);
    area.classList.add("hidden");
    resultEl.classList.remove("hidden");

    var correct = 0;
    var byTopic = {};
    exam.forEach(function (q, i) {
      if (!byTopic[q.topic]) byTopic[q.topic] = { correct: 0, total: 0 };
      byTopic[q.topic].total++;
      if (answers[i] === q.answer) {
        correct++;
        byTopic[q.topic].correct++;
      }
    });

    var pct = Math.round((correct / exam.length) * 100);
    var msg;
    if (pct >= 90) msg = "Excelente! Você domina a matéria. Mantenha a calma e revise só os detalhes.";
    else if (pct >= 70) msg = "Bom resultado! Você tem base para ir bem. Revise os tópicos com mais erros.";
    else if (pct >= 50) msg = "Você está no caminho, mas ainda há lacunas. Volte ao resumo e refaça as questões erradas.";
    else msg = "Atenção: ainda há bastante conteúdo a revisar. Use o plano de emergência e foque no essencial.";

    var breakdown = Object.keys(byTopic).map(function (key) {
      var t = byTopic[key];
      var p = Math.round((t.correct / t.total) * 100);
      return '<div class="bd-row"><span>' + TOPICS[key] + "</span>" +
        '<span class="bd-bar"><i style="width:' + p + '%"></i></span>' +
        "<span>" + t.correct + "/" + t.total + "</span></div>";
    }).join("");

    resultEl.innerHTML =
      '<div class="result">' +
      '<p class="eyebrow">Resultado do simulado</p>' +
      '<div class="result-top">' +
      '<div class="score-ring" style="--pct:' + pct + '"><span>' + correct + "/" + exam.length + "</span></div>" +
      "<div><h2 style=\"margin:0 0 6px;padding:0;border:0\">" + pct + "% de acerto</h2>" +
      '<p style="margin:0;color:var(--muted)">' + (reason || "Prova corrigida.") + "</p>" +
      "<p style=\"margin:8px 0 0\">" + msg + "</p></div></div>" +
      '<div class="breakdown">' + breakdown + "</div>" +
      '<div class="quiz-nav">' +
      '<button class="btn" id="simAgain">Refazer simulado</button>' +
      '<button class="btn ghost" id="simReview">Revisar questões abaixo</button>' +
      "</div></div>" +
      '<h2 style="margin-top:34px">Gabarito comentado</h2>' +
      '<p class="muted small">Confira cada questão: a alternativa correta está em verde e sua escolha (se errada) em vermelho.</p>' +
      exam.map(function (q, i) {
        return questionHtml(q, i + 1, answers[i], true);
      }).join("");

    var again = $("simAgain");
    if (again) again.addEventListener("click", function () { window.location.reload(); });
    var review = $("simReview");
    if (review) review.addEventListener("click", function () {
      var first = resultEl.querySelector(".qcard");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    if (resultEl.scrollIntoView) resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if ($("simStart")) $("simStart").addEventListener("click", startExam);
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      var missing = answers.filter(function (a) { return a === null; }).length;
      if (missing > 0) {
        var ok = window.confirm("Você deixou " + missing + " questão(ões) em branco. Corrigir mesmo assim?");
        if (!ok) return;
      }
      finish("Prova corrigida por você.");
    });
  }

  /* ================= TREINO POR TÓPICO ================= */
  var trainTopic = $("trainTopic");
  var trainArea = $("trainArea");
  var trainIntro = $("trainIntro");
  var trainStart = $("trainStart");

  if (trainStart && trainTopic) {
    // Conta questões por tópico no select
    Array.prototype.forEach.call(trainTopic.options, function (opt) {
      var t = opt.value;
      var n = t === "todas" ? QUIZ.length : QUIZ.filter(function (q) { return q.topic === t; }).length;
      opt.textContent = opt.textContent.replace(/\s*\(\d+\)$/, "") + " (" + n + ")";
    });

    var queue = [];
    var qIndex = 0;
    var right = 0;
    var answered = false;

    function renderTrain() {
      if (qIndex >= queue.length) {
        var pct = queue.length ? Math.round((right / queue.length) * 100) : 0;
        trainArea.innerHTML =
          '<div class="result"><div class="result-top">' +
          '<div class="score-ring" style="--pct:' + pct + '"><span>' + right + "/" + queue.length + "</span></div>" +
          '<div><h3 style="margin:0 0 6px">Treino concluído</h3>' +
          "<p style=\"margin:0;color:var(--muted)\">" + pct + "% de acerto neste tópico.</p></div></div>" +
          '<div class="quiz-nav"><button class="btn" id="trainAgain">Treinar novamente</button></div></div>';
        var again = $("trainAgain");
        if (again) again.addEventListener("click", function () {
          qIndex = 0; right = 0;
          startTrain();
        });
        return;
      }

      var q = queue[qIndex];
      trainArea.innerHTML = questionHtml(q, qIndex + 1, null, false) +
        '<div class="quiz-nav">' +
        '<span class="muted small" id="trainStats">' + right + " acerto(s) até agora · questão " + (qIndex + 1) + " de " + queue.length + "</span>" +
        '<span style="flex:1"></span>' +
        '<button class="btn" id="trainNext" disabled>Próxima →</button>' +
        "</div>";
      answered = false;

      var card = trainArea.querySelector(".qcard");
      card.querySelectorAll("input[type=radio]").forEach(function (input) {
        input.addEventListener("change", function () {
          if (answered) return;
          answered = true;
          var chosen = parseInt(input.value, 10);
          var ok = chosen === q.answer;
          if (ok) right++;
          card.querySelectorAll(".option").forEach(function (label) {
            var inp = label.querySelector("input");
            label.classList.add("disabled");
            inp.disabled = true;
            var v = parseInt(inp.value, 10);
            if (v === q.answer) label.classList.add("correct");
            if (v === chosen && !ok) label.classList.add("wrong");
          });
          var exp = document.createElement("div");
          exp.className = "qexplain";
          exp.innerHTML = "<strong>" + (ok ? "Correto!" : "Não foi dessa vez.") +
            "</strong> Resposta: <strong>" + LETTERS[q.answer] + "</strong>. " + q.explain;
          card.appendChild(exp);
          var stats = $("trainStats");
          if (stats) stats.textContent = right + " acerto(s) até agora · questão " + (qIndex + 1) + " de " + queue.length;
          var next = $("trainNext");
          if (next) next.disabled = false;
        });
      });

      var nextBtn = $("trainNext");
      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          qIndex++;
          renderTrain();
          if (trainArea.scrollIntoView) trainArea.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }

    function startTrain() {
      var t = trainTopic.value;
      queue = t === "todas" ? QUIZ.slice() : QUIZ.filter(function (q) { return q.topic === t; });
      qIndex = 0;
      right = 0;
      trainIntro.classList.add("hidden");
      trainArea.classList.remove("hidden");
      renderTrain();
    }

    trainStart.addEventListener("click", startTrain);
  }
})();
