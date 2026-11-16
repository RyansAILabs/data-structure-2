/* ==========================================================================
   estruturas.js — demonstrações interativas de pilha, fila, fila circular
   e lista simplesmente encadeada.
   ========================================================================== */
(function () {
  "use strict";

  function rand() { return Math.floor(Math.random() * 90) + 10; }
  function readValue(input) {
    var raw = (input && input.value || "").trim();
    if (!raw) return String(rand());
    return raw;
  }
  function $(id) { return document.getElementById(id); }

  /* ---------------- Pilha ---------------- */
  function initStack() {
    var root = $("stackDemo");
    if (!root) return;

    var CAP = 8;
    var values = [];
    var viz = $("stackViz");
    var msg = $("stackMsg");
    var count = $("stackCount");
    var input = $("stackValue");

    function say(text, error) {
      msg.textContent = text;
      msg.style.color = error ? "var(--rose)" : "";
    }
    function render() {
      if (!values.length) {
        viz.innerHTML = '<div class="stack-empty">pilha vazia<br><small>topo = −1</small></div>';
      } else {
        viz.innerHTML = values.map(function (v, i) {
          return '<div class="slot' + (i === values.length - 1 ? " top" : "") + '">' + v + "</div>";
        }).join("");
      }
      count.textContent = values.length + " / " + CAP;
    }

    $("stackPush").addEventListener("click", function () {
      if (values.length >= CAP) { say("Overflow: a pilha já está cheia (capacidade " + CAP + ").", true); return; }
      var v = readValue(input);
      values.push(v);
      input.value = "";
      render();
      say("push(" + v + "): entrou no topo.");
    });
    $("stackPop").addEventListener("click", function () {
      if (!values.length) { say("Underflow: não há o que remover — pilha vazia.", true); return; }
      var v = values.pop();
      render();
      say("pop() devolveu " + v + ", o último que entrou (LIFO).");
    });
    $("stackPeek").addEventListener("click", function () {
      if (!values.length) { say("peek() em pilha vazia: operação inválida.", true); return; }
      say("peek() = " + values[values.length - 1] + " (só consulta, não remove).");
    });
    $("stackClear").addEventListener("click", function () {
      values = [];
      render();
      say("Pilha esvaziada.");
    });

    render();
  }

  /* ---------------- Fila simples ---------------- */
  function initQueue() {
    var root = $("queueDemo");
    if (!root) return;

    var CAP = 8;
    var values = [];
    var viz = $("queueViz");
    var msg = $("queueMsg");
    var meta = $("queueMeta");
    var input = $("queueValue");

    function say(text, error) {
      msg.textContent = text;
      msg.style.color = error ? "var(--rose)" : "";
    }
    function render() {
      if (!values.length) {
        viz.innerHTML = '<span class="qempty">fila vazia (frente = fim)</span>';
      } else {
        viz.innerHTML = values.map(function (v, i) {
          var cls = "qitem";
          if (i === 0) cls += " front";
          if (i === values.length - 1 && values.length > 1) cls += " back";
          return '<div class="' + cls + '">' + v + "</div>";
        }).join("");
      }
      meta.textContent = "tamanho " + values.length + "/" + CAP +
        " · frente " + (values.length ? values[0] : "—") +
        " · fim " + (values.length ? values[values.length - 1] : "—");
    }

    $("queueEnqueue").addEventListener("click", function () {
      if (values.length >= CAP) { say("Fila cheia: enqueue falhou.", true); return; }
      var v = readValue(input);
      values.push(v);
      input.value = "";
      render();
      say("enqueue(" + v + "): entrou no fim da fila.");
    });
    $("queueDequeue").addEventListener("click", function () {
      if (!values.length) { say("Fila vazia: dequeue falhou (underflow).", true); return; }
      var v = values.shift();
      render();
      say("dequeue() devolveu " + v + ", o primeiro que entrou (FIFO).");
    });
    $("queuePeek").addEventListener("click", function () {
      if (!values.length) { say("peek() em fila vazia: operação inválida.", true); return; }
      say("peek() = " + values[0] + " (só consulta, não remove).");
    });
    $("queueClear").addEventListener("click", function () {
      values = [];
      render();
      say("Fila esvaziada.");
    });

    render();
  }

  /* ---------------- Fila circular ---------------- */
  function initCircular() {
    var root = $("circularDemo");
    if (!root) return;

    var CAP = 6;
    var slots, front, rear, count;
    var slotsEl = $("circularSlots");
    var msg = $("circularMsg");
    var meta = $("circularMeta");
    var input = $("circularValue");

    function reset() {
      slots = new Array(CAP).fill(null);
      front = 0;
      rear = 0;
      count = 0;
    }
    function say(text, error) {
      msg.textContent = text;
      msg.style.color = error ? "var(--rose)" : "";
    }
    function render() {
      var html = "";
      for (var i = 0; i < CAP; i++) {
        var filled = slots[i] !== null;
        var cls = "cslot" + (filled ? " filled" : "");
        html += '<div class="' + cls + '">' +
          '<span class="ci">[' + i + "]</span>" +
          '<span class="cv">' + (filled ? slots[i] : "—") + "</span>" +
          '<span class="tags">' +
          (count > 0 && i === front ? '<span class="tagf">F</span>' : "") +
          (i === rear ? '<span class="tagr">R</span>' : "") +
          "</span></div>";
      }
      slotsEl.innerHTML = html;
      meta.textContent = "count " + count + "/" + CAP + " · frente " + front + " · rear(próx. livre) " + rear +
        (count === CAP ? " · CHEIA" : count === 0 ? " · VAZIA" : "");
    }

    $("circularEnqueue").addEventListener("click", function () {
      if (count === CAP) { say("isFull() = true: não dá para enfileirar.", true); return; }
      var v = readValue(input);
      slots[rear] = v;
      rear = (rear + 1) % CAP;
      count++;
      input.value = "";
      render();
      say("enqueue(" + v + "): gravou em rear e avançou rear = (rear + 1) % " + CAP + ".");
    });
    $("circularDequeue").addEventListener("click", function () {
      if (count === 0) { say("isEmpty() = true: underflow.", true); return; }
      var v = slots[front];
      slots[front] = null;
      front = (front + 1) % CAP;
      count--;
      render();
      say("dequeue() devolveu " + v + " e avançou front = (front + 1) % " + CAP + ".");
    });
    $("circularReset").addEventListener("click", function () {
      reset();
      render();
      say("Fila circular reiniciada: front = rear = 0, count = 0.");
    });

    reset();
    render();
  }

  /* ---------------- Lista simplesmente encadeada ---------------- */
  function initList() {
    var root = $("listDemo");
    if (!root) return;

    var values = [10, 20, 30];
    var viz = $("listViz");
    var msg = $("listMsg");
    var input = $("listValue");
    var posInput = $("listPos");

    function say(text, error) {
      msg.textContent = text;
      msg.className = "node-msg" + (error ? " err" : "");
    }
    function render() {
      if (!values.length) {
        viz.innerHTML = '<span class="null-node">início = null · size = 0</span>';
      } else {
        var html = "";
        values.forEach(function (v, i) {
          html += '<div class="node' + (i === 0 ? " head" : "") + '">' +
            '<span class="val">' + v + '</span><span class="ptr">next</span></div>';
          html += '<span class="arrow">→</span>';
        });
        html += '<span class="null-node">null</span>';
        viz.innerHTML = html;
      }
      posInput.max = String(values.length);
      if (parseInt(posInput.value, 10) > values.length) posInput.value = String(values.length);
    }
    function value() {
      var v = readValue(input);
      input.value = "";
      return v;
    }

    $("listAddEnd").addEventListener("click", function () {
      var v = value();
      values.push(v);
      render();
      say("add(" + v + "): percorre até o fim e liga fim.next ao novo nó. Com descritor, é O(1).");
    });
    $("listAddStart").addEventListener("click", function () {
      var v = value();
      values.unshift(v);
      render();
      say("insertAtBeginning(" + v + "): novo.next = início; início = novo. É O(1).");
    });
    $("listInsert").addEventListener("click", function () {
      var pos = parseInt(posInput.value, 10);
      if (isNaN(pos) || pos < 0 || pos > values.length) {
        say("Posição inválida: use de 0 até " + values.length + " (inclusive no fim).", true);
        return;
      }
      var v = value();
      values.splice(pos, 0, v);
      render();
      say("insert(" + pos + ", " + v + "): salve o next do anterior, ligue o novo e só então atualize o anterior.");
    });
    $("listRemove").addEventListener("click", function () {
      var pos = parseInt(posInput.value, 10);
      if (isNaN(pos) || pos < 0 || pos >= values.length) {
        say("Posição inválida: a lista tem " + values.length + " elemento(s).", true);
        return;
      }
      var removed = values.splice(pos, 1)[0];
      render();
      say("remove(" + pos + ") devolveu " + removed + ". Se era o fim, atualize o descritor.");
    });
    $("listClear").addEventListener("click", function () {
      values = [];
      render();
      say("Lista vazia: início = fim = null e size = 0.");
    });

    render();
  }

  function boot() {
    initStack();
    initQueue();
    initCircular();
    initList();
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
  }
})();
