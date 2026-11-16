/* ==========================================================================
   sort-demo.js — visualizador passo a passo de Bubble, Insertion e Selection.
   Também pode ser carregado no Node para testes (module.exports).
   ========================================================================== */
(function () {
  "use strict";

  function range(a, b) {
    var r = [];
    for (var i = a; i <= b; i++) r.push(i);
    return r;
  }

  function bubbleFrames(input) {
    var a = input.slice(), frames = [], comps = 0, swaps = 0, sorted = [];
    var n = a.length, end = n - 1, changed = true, pass = 0;

    frames.push({ arr: a.slice(), hl: [], sorted: [], note: "Vetor inicial. Vamos comparar vizinhos.", comps: 0, swaps: 0, pass: 0 });

    while (changed && end > 0) {
      changed = false;
      pass++;
      for (var i = 0; i < end; i++) {
        comps++;
        frames.push({
          arr: a.slice(), hl: [i, i + 1], sorted: sorted.slice(),
          note: "Passada " + pass + ": comparando " + a[i] + " e " + a[i + 1] + ".",
          comps: comps, swaps: swaps, pass: pass
        });
        if (a[i] > a[i + 1]) {
          var t = a[i]; a[i] = a[i + 1]; a[i + 1] = t;
          swaps++;
          changed = true;
          frames.push({
            arr: a.slice(), hl: [i, i + 1], sorted: sorted.slice(), swap: true,
            note: "Trocou: " + a[i + 1] + " > " + a[i] + ". O maior vai para a direita.",
            comps: comps, swaps: swaps, pass: pass
          });
        }
      }
      sorted.push(end);
      frames.push({
        arr: a.slice(), hl: [], sorted: sorted.slice(),
        note: "Fim da passada " + pass + ": posição " + end + " está definitivamente ordenada.",
        comps: comps, swaps: swaps, pass: pass
      });
      end--;
    }

    frames.push({
      arr: a.slice(), hl: [], sorted: range(0, n - 1),
      note: changed ? "Fim: vetor ordenado." : "Nenhuma troca na última passada → já estava ordenado (parada antecipada).",
      comps: comps, swaps: swaps, pass: pass
    });
    return { frames: frames, comps: comps, swaps: swaps };
  }

  function insertionFrames(input) {
    var a = input.slice(), frames = [], comps = 0, shifts = 0;
    var n = a.length;

    frames.push({ arr: a.slice(), hl: [], sorted: [], note: "Vetor inicial. O primeiro elemento já é um prefixo ordenado.", comps: 0, swaps: 0 });

    for (var i = 1; i < n; i++) {
      var key = a[i], j = i - 1;
      frames.push({
        arr: a.slice(), hl: [i], sorted: range(0, i - 1),
        note: "Passo " + i + ": key = " + key + ". O prefixo 0.." + (i - 1) + " está ordenado; vamos encaixar key.",
        comps: comps, swaps: shifts
      });
      while (j >= 0) {
        comps++;
        frames.push({
          arr: a.slice(), hl: [j, i], sorted: range(0, i - 1),
          note: "Comparando a[" + j + "]=" + a[j] + " com key=" + key + ".",
          comps: comps, swaps: shifts
        });
        if (a[j] <= key) break;
        a[j + 1] = a[j];
        shifts++;
        frames.push({
          arr: a.slice(), hl: [j, j + 1], sorted: range(0, i - 1),
          note: a[j] + " > " + key + " → desloca " + a[j] + " uma casa para a direita.",
          comps: comps, swaps: shifts
        });
        j--;
      }
      a[j + 1] = key;
      frames.push({
        arr: a.slice(), hl: [j + 1], sorted: range(0, i),
        note: "Insere key=" + key + " na posição " + (j + 1) + ". Prefixo 0.." + i + " agora está ordenado.",
        comps: comps, swaps: shifts
      });
    }

    frames.push({
      arr: a.slice(), hl: [], sorted: range(0, n - 1),
      note: "Fim: vetor ordenado. Note que o prefixo cresceu da esquerda para a direita.",
      comps: comps, swaps: shifts
    });
    return { frames: frames, comps: comps, swaps: shifts };
  }

  function selectionFrames(input) {
    var a = input.slice(), frames = [], comps = 0, swaps = 0;
    var n = a.length;

    frames.push({ arr: a.slice(), hl: [], sorted: [], note: "Vetor inicial. A cada passada escolhemos o menor do trecho restante.", comps: 0, swaps: 0 });

    for (var i = 0; i < n - 1; i++) {
      var min = i;
      frames.push({
        arr: a.slice(), hl: [i], sorted: range(0, i - 1),
        note: "Passada " + (i + 1) + ": mínimo provisório = " + a[i] + " (índice " + i + ").",
        comps: comps, swaps: swaps
      });
      for (var j = i + 1; j < n; j++) {
        comps++;
        frames.push({
          arr: a.slice(), hl: [j, min], sorted: range(0, i - 1),
          note: "Comparando " + a[j] + " com o mínimo atual " + a[min] + ".",
          comps: comps, swaps: swaps
        });
        if (a[j] < a[min]) {
          min = j;
          frames.push({
            arr: a.slice(), hl: [j], sorted: range(0, i - 1),
            note: "Novo mínimo: " + a[min] + " (índice " + min + ").",
            comps: comps, swaps: swaps
          });
        }
      }
      if (min !== i) {
        var t = a[i]; a[i] = a[min]; a[min] = t;
        swaps++;
        frames.push({
          arr: a.slice(), hl: [i, min], sorted: range(0, i - 1), swap: true,
          note: "Troca a[" + i + "] com a[" + min + "]: " + a[min] + " vai para a posição " + i + ".",
          comps: comps, swaps: swaps
        });
      }
      frames.push({
        arr: a.slice(), hl: [], sorted: range(0, i),
        note: "Posição " + i + " finalizada com " + a[i] + ".",
        comps: comps, swaps: swaps
      });
    }

    frames.push({ arr: a.slice(), hl: [], sorted: range(0, n - 1), note: "Fim: vetor ordenado. Na versão clássica, foram feitas no máximo n−1 trocas.", comps: comps, swaps: swaps });
    return { frames: frames, comps: comps, swaps: swaps };
  }

  function framesFor(algo, arr) {
    if (algo === "insertion") return insertionFrames(arr);
    if (algo === "selection") return selectionFrames(arr);
    return bubbleFrames(arr);
  }

  /* ---------- Interface (só roda no navegador) ---------- */
  function init() {
    var root = document.getElementById("sortDemo");
    if (!root) return;

    var barsEl = document.getElementById("sortBars");
    var algoEl = document.getElementById("sortAlgo");
    var playBtn = document.getElementById("sortPlay");
    var stepBtn = document.getElementById("sortStep");
    var backBtn = document.getElementById("sortBack");
    var resetBtn = document.getElementById("sortReset");
    var randomBtn = document.getElementById("sortRandom");
    var sizeEl = document.getElementById("sortSize");
    var speedEl = document.getElementById("sortSpeed");
    var statsEl = document.getElementById("sortStats");
    var noteEl = document.getElementById("sortNote");
    var legendNote = document.getElementById("sortLegendNote");

    var values = [];
    var data = { frames: [], comps: 0, swaps: 0 };
    var index = 0;
    var timer = null;

    function randomArray(n) {
      var arr = [];
      var pool = [];
      for (var i = 5; i <= 99; i++) pool.push(i);
      for (var k = 0; k < n; k++) {
        var p = Math.floor(Math.random() * pool.length);
        arr.push(pool.splice(p, 1)[0]);
      }
      return arr;
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      playBtn.textContent = "▶ Tocar";
      playBtn.classList.remove("soft");
    }

    function build(keepValues) {
      stop();
      if (!keepValues || !values.length) {
        values = randomArray(parseInt(sizeEl.value, 10) || 10);
      }
      data = framesFor(algoEl.value, values);
      index = 0;
      legendNote.textContent = algoEl.value === "insertion" ? "deslocamentos" : "trocas";
      render();
    }

    function render() {
      var frame = data.frames[index];
      var max = Math.max.apply(null, frame.arr);
      var html = "";
      for (var i = 0; i < frame.arr.length; i++) {
        var h = Math.max(6, (frame.arr[i] / max) * 100);
        var cls = "bar";
        if (frame.hl && frame.hl.indexOf(i) !== -1) cls += " compare";
        if (frame.swap && frame.hl && frame.hl.indexOf(i) !== -1) cls += " swap";
        if (frame.sorted && frame.sorted.indexOf(i) !== -1) cls += " sorted";
        html += '<div class="' + cls + '" style="height:' + h + '%"><span class="v">' + frame.arr[i] + "</span></div>";
      }
      barsEl.innerHTML = html;
      noteEl.textContent = frame.note;
      statsEl.innerHTML =
        "passo <b>" + (index + 1) + "</b>/" + data.frames.length +
        " · comparações <b>" + frame.comps + "</b>" +
        " · " + legendNote.textContent + " <b>" + frame.swaps + "</b>" +
        (frame.pass ? " · passada <b>" + frame.pass + "</b>" : "");

      stepBtn.disabled = index >= data.frames.length - 1;
      backBtn.disabled = index <= 0;
      resetBtn.disabled = index === 0;
      if (index >= data.frames.length - 1) stop();
    }

    function next() {
      if (index < data.frames.length - 1) {
        index++;
        render();
      } else {
        stop();
      }
    }

    playBtn.addEventListener("click", function () {
      if (timer) { stop(); return; }
      if (index >= data.frames.length - 1) index = 0;
      playBtn.textContent = "⏸ Pausar";
      playBtn.classList.add("soft");
      var delay = Math.max(90, 620 - (parseInt(speedEl.value, 10) || 5) * 100);
      timer = setInterval(next, delay);
      render();
    });

    stepBtn.addEventListener("click", function () { stop(); next(); });
    backBtn.addEventListener("click", function () { stop(); if (index > 0) { index--; render(); } });
    resetBtn.addEventListener("click", function () { stop(); index = 0; render(); });
    randomBtn.addEventListener("click", function () { values = randomArray(parseInt(sizeEl.value, 10) || 10); build(true); });
    algoEl.addEventListener("change", function () { build(true); });
    sizeEl.addEventListener("input", function () { values = randomArray(parseInt(sizeEl.value, 10) || 10); build(true); });

    build(false);
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { framesFor: framesFor };
  }
})();
