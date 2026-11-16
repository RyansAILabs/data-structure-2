# Guia de Prova — Estruturas de Dados 2026/2

Site de estudo offline para a 2ª Prova (16/11/2026, 15h10, sala 11).

## Como abrir

**Opção 1 — direto no navegador (mais simples):**

```bash
xdg-open web/index.html
```

Basta abrir `web/index.html`. O site não usa CDN, fontes externas nem servidor:
todo o CSS e JavaScript estão em `web/css` e `web/js`.

**Opção 2 — servidor local (recomendado se quiser testar tudo):**

```bash
cd web
python3 -m http.server 8765
```

Depois acesse <http://127.0.0.1:8765/>.

## O que tem no site

| Página | Conteúdo |
| --- | --- |
| `index.html` | Visão geral, contagem regressiva, plano de estudo e checklist de progresso |
| `pages/ordenacao.html` | Bubble, Insertion e Selection (teoria, visualizador, traço completo, código, exercícios) |
| `pages/listas-sequenciais.html` | Lista linear sequencial: operações, custos e implementação completa |
| `pages/listas-encadeadas.html` | Lista simplesmente e duplamente encadeada, descritor, receitas de ponteiros e demo |
| `pages/pilhas.html` | LIFO, parênteses balanceados, pós-fixa e conversão infixa → pós-fixa |
| `pages/filas.html` | FIFO, fila encadeada e fila circular (`front`, `rear`, `count`) |
| `pages/resumo.html` | Resumo de véspera para imprimir, 16 pegadinhas, esqueletos de código e checklist final |
| `pages/simulado.html` | Simulado cronometrado de 29 questões (90 min) e treino por tópico |

Recursos interativos:

- Visualizador de ordenação com comparações, trocas, movimentações e controle de velocidade.
- Pilha, fila, fila circular e lista encadeada interativas.
- Simulado com correção comentada, desempenho por tópico e banco de 50 questões.
- Tema claro/escuro, progresso salvo no `localStorage` e versão para impressão (`Ctrl+P`).

## Código Java

`web/codigo/` tem duas camadas, de propósito:

1. **Código do professor, copiado sem alteração** (mesmos nomes de método, mesmas
   impressões, mesmos bugs):
   - `ed20262`: `LinkedLinearList`, `Node`, `Descriptor`, `Stack`, `Queue`,
     `OperationFailed`.
   - `ed20261`: `BubbleSort` (com `sort`, `sortO` e `sortO2`), `MinMaxSort`,
     `SelectionSort` (com `sort`, `sortO1` e `sortO2`) e `InsertionSort`.
   - `SequentialLinearList` é a exceção: a classe está **em branco** no repo, então
     o guia preencheu os corpos mantendo exatamente as assinaturas.
2. **Cópias instrumentadas, só para contar** (`*Metrics`) e complementos didáticos:
   - `BubbleSortMetrics`, `SelectionSortMetrics`, `InsertionSortMetrics`: mesma
     lógica, com contadores de comparações/trocas/deslocamentos.
   - `SimpleLinkedList`, `SimpleNode`, `SequentialStack`, `CircularQueue`,
     `PostfixEvaluator`, `BalancedParentheses`: não estão no repositório; cobrem
     lista simples, fila circular e as aplicações de pilha.

Os métodos do repo que a prova pode cobrar, sem enfeite:

- `BubbleSort.sort()` — escopo fixo (25 comparações no vetor de exemplo).
- `BubbleSort.sortO()` — escopo reduzido (15/8).
- `BubbleSort.sortO2()` — bolha + mínimo (9/10); é a mesma lógica da
  `MinMaxSort` e estoura com vetor vazio.
- `SelectionSort.sort()` — troca a cada valor menor; correto.
- `SelectionSort.sortO1()` — **não ordena** (compara `array[y]`, não
  `array[minIndx]`); `[9,1,4]` termina em `[4,1,9]`.
- `SelectionSort.sortO2()` — seleção bidirecional; correta.

`sortClassic()` é a correção do `sortO1()` feita pelo guia e **não existe no
repositório**. O antigo nome `sortOptimized()` também não existe: aquela versão é
o `sortO()`.

Compilar e rodar a suíte de testes:

```bash
cd web/codigo
javac -Xlint:all -d /tmp/edbuild *.java
java -cp /tmp/edbuild Demo
```

Saída esperada: `Testes: 108 passaram, 0 falharam.`

## Observações de prova

- Lista sequencial: `pop()` remove o **primeiro** elemento (`remove(0)`), por
  convenção da lista encadeada; o método está em branco no repo.
- Lista sequencial: existe também a versão em português do `ed20261`
  (`adicionar`, `obter`, `inserir`, `remover`, sem exceções). Não misture as APIs.
- Pilha: `pop()` remove o **topo**.
- Fila: entra no `fim`, sai pela `frente`.
- Fila circular: cheia quando `count == capacity`; vazia quando `count == 0`.
- Lista encadeada: a classe do professor tem `capacity` e `isFull()` — ela enche.
- Ordenação: Bubble, Insertion e Selection são in-place, O(n²) no pior caso e
  estáveis apenas Bubble e Insertion.
- `SelectionSort.sortO1()` do repo não ordena; `sortO2()`/`MinMaxSort` estouram
  com vetor vazio.
