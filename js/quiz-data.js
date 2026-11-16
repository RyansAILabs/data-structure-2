/* ==========================================================================
   quiz-data.js — banco de questões.
   topic: ordenacao | sequencial | encadeada | pilhas | filas | geral
   prova: true  -> entra no simulado (29 questões)
   answer: índice da alternativa correta (0..3)
   ========================================================================== */
window.QUIZ_META = {
  topics: {
    ordenacao: "Ordenação simples",
    sequencial: "Listas sequenciais",
    encadeada: "Listas encadeadas",
    pilhas: "Pilhas",
    filas: "Filas",
    geral: "Conceitos gerais"
  }
};

window.QUIZ = [
  /* ---------------- ORDENAÇÃO ---------------- */
  {
    id: "o1", topic: "ordenacao", prova: false,
    q: "Qual é a complexidade de tempo no <strong>pior caso</strong> do Bubble Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
    answer: 2,
    explain: "No pior caso (vetor em ordem inversa), cada passada faz várias comparações e o número total é da ordem de n². A flag de otimização só melhora o melhor caso."
  },
  {
    id: "o2", topic: "ordenacao", prova: true,
    q: "Aplique <strong>uma passada completa</strong> do Bubble Sort (comparando vizinhos da esquerda para a direita) em <code>[5, 1, 4, 2, 8]</code>. Qual é o vetor ao final dessa passada?",
    options: ["[1, 2, 4, 5, 8]", "[1, 4, 2, 5, 8]", "[1, 4, 2, 8, 5]", "[5, 1, 4, 2, 8]"],
    answer: 1,
    explain: "5↔1 → [1,5,4,2,8]; 5↔4 → [1,4,5,2,8]; 5↔2 → [1,4,2,5,8]; 5 e 8 não trocam. O maior (8) já está no fim, mas o restante ainda não está ordenado."
  },
  {
    id: "o3", topic: "ordenacao", prova: true,
    q: "Um vetor de 10.000 elementos já está <strong>quase ordenado</strong> (poucas inversões). Qual algoritmo simples tende a ser o mais rápido?",
    options: ["Selection Sort", "Insertion Sort", "Bubble Sort sem otimização", "Todos têm sempre o mesmo custo"],
    answer: 1,
    explain: "O Insertion Sort só desloca enquanto o vizinho é maior. Com poucas inversões, faz aproximadamente O(n) comparações e deslocamentos. O Selection continua fazendo n(n−1)/2 comparações."
  },
  {
    id: "o4", topic: "ordenacao", prova: true,
    q: "Quantas comparações o <strong>Selection Sort</strong> faz para ordenar um vetor de 5 elementos, independentemente dos valores?",
    options: ["4", "5", "10", "25"],
    answer: 2,
    explain: "O Selection sempre compara: 4 + 3 + 2 + 1 = 10 = n(n−1)/2. Ele não tem parada antecipada; o número de comparações é sempre o mesmo. O número de trocas é que varia (no máximo n−1 na versão clássica; o <code>sort()</code> do repositório troca a cada valor menor)."
  },
  {
    id: "o5", topic: "ordenacao", prova: true,
    q: "Sobre <strong>estabilidade</strong> (manter a ordem relativa de elementos iguais), qual afirmação é correta?",
    options: ["Bubble e Insertion são estáveis; Selection não é necessariamente estável.", "Os três são estáveis.", "Apenas o Selection é estável.", "Nenhum dos três é estável."],
    answer: 0,
    explain: "Bubble e Insertion só trocam/deslocam quando o elemento é estritamente maior, preservando iguais. O Selection pode trocar um elemento distante com a posição atual e inverter a ordem de dois iguais — exemplo: [3a, 3b, 1] → [1, 3b, 3a]."
  },
  {
    id: "o6", topic: "ordenacao", prova: false,
    q: "Em um cenário em que <strong>trocar elementos</strong> é muito caro (mas comparar é barato), qual algoritmo simples é a melhor escolha?",
    options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Todos fazem o mesmo número de trocas"],
    answer: 1,
    explain: "Na versão clássica, o Selection faz no máximo n−1 trocas, pois escolhe o mínimo e o coloca direto na posição. O Bubble pode fazer O(n²) trocas. O Insertion usa deslocamentos, que também podem ser O(n²)."
  },
  {
    id: "o7", topic: "ordenacao", prova: true,
    q: "Qual é o <strong>invariante</strong> mantido pelo Insertion Sort ao iniciar cada iteração do laço externo?",
    options: [
      "O prefixo <code>0..i−1</code> está ordenado.",
      "O sufixo <code>i..n−1</code> está ordenado.",
      "O menor elemento global já está na posição 0.",
      "Todos os elementos já estão ordenados."
    ],
    answer: 0,
    explain: "O Insertion cresce um prefixo ordenado: no início da iteração i, os elementos 0..i−1 estão ordenados (mas não necessariamente nas posições finais). Ele encaixa o elemento i nesse prefixo."
  },
  {
    id: "o8", topic: "ordenacao", prova: true,
    q: "No Bubble Sort <strong>com flag de parada antecipada</strong>, qual é o comportamento no melhor caso (vetor já ordenado)?",
    options: [
      "Continua O(n²), pois sempre faz todas as passadas.",
      "Faz uma passada com n−1 comparações e para: O(n).",
      "Faz log n passadas: O(n log n).",
      "Não faz nenhuma comparação: O(1)."
    ],
    answer: 1,
    explain: "A primeira passada compara n−1 pares e não encontra trocas; a flag fica falsa e o laço termina. Por isso o melhor caso é O(n). Sem a flag, seriam n−1 passadas mesmo assim."
  },
  {
    id: "o9", topic: "ordenacao", prova: false,
    q: "Qual é o número máximo de <strong>trocas</strong> realizadas pelo Selection Sort em um vetor de n elementos?",
    options: ["n²", "n − 1", "n", "n/2"],
    answer: 1,
    explain: "Na versão clássica, o Selection escolhe o mínimo e faz uma troca por posição, no máximo. A última posição se ordena sozinha, então são no máximo n−1 trocas — mesmo que haja O(n²) comparações. O <code>sort()</code> do repositório troca a cada valor menor e pode fazer mais trocas."
  },
  {
    id: "o10", topic: "ordenacao", prova: false,
    q: "Por que o Bubble Sort com a otimização de reduzir o fim do vetor a cada passada funciona?",
    options: [
      "Porque a cada passada o maior elemento do trecho não ordenado vai para a última posição.",
      "Porque o menor elemento vai para a primeira posição.",
      "Porque o vetor fica automaticamente ordenado após duas passadas.",
      "Porque o algoritmo passa a usar divisão e conquista."
    ],
    answer: 0,
    explain: "Comparando vizinhos da esquerda para a direita, o maior elemento 'borbulha' até o fim do trecho. Assim, a posição final de cada passada já está correta e não precisa ser comparada de novo."
  },

  /* ---------------- LISTAS SEQUENCIAIS ---------------- */
  {
    id: "s1", topic: "sequencial", prova: true,
    q: "Em uma lista linear sequencial implementada com vetor, qual é a complexidade de <code>get(posicao)</code>?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 0,
    explain: "O vetor permite acesso direto por índice: elements[posicao]. Não é preciso percorrer os elementos anteriores. Já uma lista encadeada precisaria caminhar nó a nó: O(n)."
  },
  {
    id: "s2", topic: "sequencial", prova: true,
    q: "Por que inserir no <strong>início</strong> de uma lista sequencial é O(n)?",
    options: [
      "Porque é preciso criar um novo nó.",
      "Porque todos os elementos existentes precisam ser deslocados uma posição para a direita.",
      "Porque a busca pelo valor é linear.",
      "Porque o vetor precisa ser ordenado antes."
    ],
    answer: 1,
    explain: "Para abrir espaço na posição 0, o algoritmo desloca count elementos uma casa para a direita (do fim para o começo). No pior caso, n deslocamentos: O(n). Em uma lista encadeada, a mesma operação é O(1)."
  },
  {
    id: "s3", topic: "sequencial", prova: true,
    q: "Considere a lista <code>[10, 20, 30, 40]</code> (count = 4). Após <code>insert(2, 15)</code>, qual é o conteúdo?",
    options: ["[10, 15, 20, 30, 40]", "[10, 20, 15, 30, 40]", "[10, 20, 30, 15, 40]", "[15, 10, 20, 30, 40]"],
    answer: 1,
    explain: "A posição 2 é onde estava o 30. Os elementos das posições 2 e 3 (30 e 40) deslocam para 3 e 4; o 15 entra na posição 2: [10, 20, 15, 30, 40]."
  },
  {
    id: "s4", topic: "sequencial", prova: false,
    q: "Na lista <code>[10, 20, 30, 40]</code>, após <code>remove(1)</code>, qual é o conteúdo?",
    options: ["[10, 30, 40]", "[10, 20, 40]", "[20, 30, 40]", "[10, 20, 30]"],
    answer: 0,
    explain: "remove(1) retira o 20 e desloca 30 e 40 uma posição para a esquerda: [10, 30, 40]. O deslocamento começa na posição removida e vai até count−2."
  },
  {
    id: "s5", topic: "sequencial", prova: true,
    q: "Uma lista sequencial tem <strong>5 elementos</strong>. Quais posições são válidas para <code>insert(posicao, valor)</code>?",
    options: ["0 a 4", "1 a 5", "0 a 5", "0 a 6"],
    answer: 2,
    explain: "Para inserir, a posição pode ser 0 até count (inclusive), pois count é a primeira posição livre (inserir no fim). Já get/remove/set exigem 0 até count−1. Cuidado com essa diferença."
  },
  {
    id: "s6", topic: "sequencial", prova: false,
    q: "Qual é a principal desvantagem de uma lista linear sequencial?",
    options: [
      "Não permite acesso por índice.",
      "Capacidade fixa e custo O(n) para inserir/remover no início ou no meio.",
      "Não permite percorrer os elementos em ordem.",
      "Não consegue armazenar números inteiros."
    ],
    answer: 1,
    explain: "O vetor tem tamanho definido na criação (pode encher) e precisa deslocar elementos para abrir/fechar espaço. Em troca, oferece acesso direto O(1) e boa localidade de memória."
  },
  {
    id: "s7", topic: "sequencial", prova: false,
    q: "Em uma lista sequencial <strong>não ordenada</strong>, qual é o custo de <code>search(valor)</code> no pior caso?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 2,
    explain: "Sem ordem, só resta a busca linear: no pior caso, o valor não existe ou está na última posição, exigindo n comparações. Se estivesse ordenada, seria possível usar busca binária O(log n)."
  },
  {
    id: "s8", topic: "sequencial", prova: false,
    q: "Na implementação da disciplina, o que <code>add(valor)</code> retorna quando a lista está cheia?",
    options: ["Lança uma exceção.", "Retorna false e não altera a lista.", "Sobrescreve o último elemento.", "Aumenta a capacidade automaticamente."],
    answer: 1,
    explain: "O método verifica isFull() e retorna false. Quem chama deve tratar esse retorno. A lista não redimensiona sozinha, pois a capacidade é fixa."
  },

  /* ---------------- LISTAS ENCADEADAS ---------------- */
  {
    id: "e1", topic: "encadeada", prova: true,
    q: "Qual é a complexidade de inserir um elemento no <strong>início</strong> de uma lista simplesmente encadeada (sem descritor)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 0,
    explain: "Basta criar o nó, apontar seu next para o antigo início e atualizar o início. Não é preciso percorrer nada — por isso O(1). Na lista sequencial, a mesma operação é O(n) por causa dos deslocamentos."
  },
  {
    id: "e2", topic: "encadeada", prova: true,
    q: "Para inserir um <code>novo</code> nó <strong>depois</strong> do nó <code>p</code> em uma lista simples, qual ordem de comandos está correta?",
    options: [
      "<code>novo.next = p.next; p.next = novo;</code>",
      "<code>p.next = novo; novo.next = p.next;</code>",
      "<code>novo.next = p; p.next = novo;</code>",
      "<code>p.next = novo.next; novo.next = p;</code>"
    ],
    answer: 0,
    explain: "Primeiro o novo nó guarda o restante da lista (p.next); só depois p passa a apontar para o novo. Se você fizer p.next = novo antes, perde a referência para o restante da lista."
  },
  {
    id: "e3", topic: "encadeada", prova: true,
    q: "Em uma lista simples com descritor, qual sequência remove corretamente o <strong>primeiro</strong> nó?",
    options: [
      "<code>inicio = inicio.next; if (inicio == null) fim = null; size--;</code>",
      "<code>inicio.next = inicio; size--;</code>",
      "<code>fim = inicio.next; size--;</code>",
      "<code>inicio = null; size--;</code>"
    ],
    answer: 0,
    explain: "O início passa a ser o segundo nó. Se a lista ficou vazia, o fim também deve virar null. A opção 4 perde a lista inteira sem liberar/atualizar o descritor corretamente."
  },
  {
    id: "e4", topic: "encadeada", prova: true,
    q: "Qual é a complexidade para acessar o elemento da <strong>posição 7</strong> de uma lista simplesmente encadeada?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 2,
    explain: "Não há acesso direto: é preciso sair do início e seguir next sete vezes (no caso geral, n passos). A lista dupla com descritor melhora isso para O(n/2), mas continua O(n)."
  },
  {
    id: "e5", topic: "encadeada", prova: true,
    q: "Qual é a principal vantagem do <strong>descritor</strong> (size, início, fim) em uma lista encadeada?",
    options: [
      "Permite acesso direto a qualquer posição em O(1).",
      "Torna O(1) as operações de consultar o tamanho e inserir/remover nas extremidades.",
      "Elimina a necessidade de ponteiros next.",
      "Mantém a lista automaticamente ordenada."
    ],
    answer: 1,
    explain: "Sem descritor, descobrir o tamanho ou chegar ao fim exige percorrer a lista: O(n). Com size e fim guardados, size() e inserir no fim são O(1); remover no fim é O(1) na dupla (fim.prev). O acesso no meio continua O(n)."
  },
  {
    id: "e6", topic: "encadeada", prova: true,
    q: "Em uma lista <strong>duplamente</strong> encadeada, qual é a sequência correta para remover um nó <code>x</code> que está no meio (nem primeiro, nem último)?",
    options: [
      "<code>x.prev.next = x.next; x.next.prev = x.prev;</code>",
      "<code>x.next.next = x.prev; x.prev.prev = x.next;</code>",
      "<code>x.prev = x.next; x.next = x.prev;</code>",
      "<code>x.prev.next = x; x.next.prev = x;</code>"
    ],
    answer: 0,
    explain: "O anterior de x deve pular para o próximo de x; o próximo de x deve voltar para o anterior. Nos casos de extremidade, é preciso atualizar início/fim e checar null antes de acessar prev/next."
  },
  {
    id: "e7", topic: "encadeada", prova: false,
    q: "Comparando listas simplesmente e duplamente encadeadas, qual afirmação é correta?",
    options: [
      "A dupla usa mais memória (ponteiro prev) e permite percorrer nos dois sentidos.",
      "A simples permite remover um nó dado apenas a referência a ele em O(1).",
      "A dupla não precisa de ponteiro para o próximo.",
      "As duas permitem acesso por índice em O(1)."
    ],
    answer: 0,
    explain: "Cada nó da dupla guarda next e prev, gastando mais memória, mas permite andar para trás e remover um nó conhecido em O(1). Na simples, para remover um nó do meio é preciso ter o anterior."
  },
  {
    id: "e8", topic: "encadeada", prova: false,
    q: "Em uma lista duplamente encadeada <strong>com descritor</strong>, qual é a complexidade de remover o último elemento?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 0,
    explain: "O descritor guarda fim. O último nó é fim, e o novo último é fim.prev — ambos acessíveis em O(1). Na lista simples, seria preciso percorrer até o penúltimo: O(n)."
  },
  {
    id: "e9", topic: "encadeada", prova: false,
    q: "O trecho abaixo, em uma lista simples, faz o quê?<br><code>novo.next = atual.next; atual.next = novo;</code>",
    options: [
      "Insere o nó novo imediatamente depois de atual.",
      "Insere o nó novo antes de atual.",
      "Remove o nó atual.",
      "Inverte a lista inteira."
    ],
    answer: 0,
    explain: "O novo assume o antigo next de atual, e atual passa a apontar para o novo. É a inserção clássica 'depois de um nó'. A ordem importa: se atual.next fosse alterado antes, o restante seria perdido."
  },

  /* ---------------- PILHAS ---------------- */
  {
    id: "p1", topic: "pilhas", prova: false,
    q: "Uma pilha segue qual política de acesso?",
    options: ["FIFO — primeiro que entra, primeiro que sai.", "LIFO — último que entra, primeiro que sai.", "Acesso aleatório por índice.", "Ordem crescente obrigatória."],
    answer: 1,
    explain: "Pilha é LIFO (Last In, First Out): push coloca no topo e pop retira do topo. O último elemento inserido é o primeiro a sair."
  },
  {
    id: "p2", topic: "pilhas", prova: true,
    q: "Executam-se <code>push(1)</code>, <code>push(2)</code>, <code>push(3)</code> e depois <code>pop()</code>. Qual valor é retornado?",
    options: ["1", "2", "3", "A pilha fica vazia sem retornar nada."],
    answer: 2,
    explain: "O topo é o 3, último a entrar. pop() remove e retorna 3. Depois disso, o topo passa a ser 2."
  },
  {
    id: "p3", topic: "pilhas", prova: true,
    q: "Qual é o resultado da expressão pós-fixa <code>6 2 3 * -</code>?",
    options: ["0", "12", "4", "18"],
    answer: 0,
    explain: "Lê 6, 2, 3 e empilha. No '*', desempilha 3 e 2 → 2*3=6. No '-', desempilha 6 e 6 → 6−6=0. O resultado é 0."
  },
  {
    id: "p4", topic: "pilhas", prova: true,
    q: "Qual é a forma pós-fixa da expressão infixa <code>A + B * C</code>?",
    options: ["A B + C *", "A B C * +", "A B C + *", "* + A B C"],
    answer: 1,
    explain: "A multiplicação tem precedência: B*C é resolvido antes. Em pós-fixa: A B C * +. A pilha de operadores é usada para adiar o '+' até o '*' ser colocado na saída."
  },
  {
    id: "p5", topic: "pilhas", prova: true,
    q: "Qual estrutura é a mais adequada para verificar se os parênteses, colchetes e chaves de uma expressão estão balanceados?",
    options: ["Fila", "Pilha", "Lista sequencial ordenada", "Árvore binária de busca"],
    answer: 1,
    explain: "Cada fechamento deve casar com o último símbolo aberto — exatamente o comportamento LIFO. Ao encontrar ')', comparamos com o topo da pilha. No fim, a pilha deve estar vazia."
  },
  {
    id: "p6", topic: "pilhas", prova: false,
    q: "O que <code>peek()</code> faz em uma pilha?",
    options: ["Remove o topo e retorna o valor.", "Consulta o topo sem remover.", "Esvazia a pilha.", "Insere no topo."],
    answer: 1,
    explain: "peek() (ou top()) apenas consulta o elemento do topo. A quantidade de elementos não muda. pop() é quem remove."
  },
  {
    id: "p7", topic: "pilhas", prova: true,
    q: "Ao avaliar a expressão pós-fixa <code>8 3 -</code>, por que o resultado é 5 e não −5?",
    options: [
      "Porque o segundo valor desempilhado (8) é o operando esquerdo e o primeiro (3) é o direito.",
      "Porque o primeiro valor desempilhado (8) é o operando esquerdo e o segundo (3) é o direito.",
      "Porque a pilha sempre soma os operandos.",
      "Porque o operador '-' é ignorado na pós-fixa."
    ],
    answer: 0,
    explain: "Na pós-fixa, ao encontrar o operador, o primeiro pop é o operando da direita (3) e o segundo é o da esquerda (8). Logo, 8−3=5. Em '8 3 /' seria 8/3, não 3/8."
  },
  {
    id: "p8", topic: "pilhas", prova: false,
    q: "O que acontece ao executar <code>pop()</code> em uma pilha vazia, na implementação da disciplina?",
    options: ["Retorna 0.", "Retorna null.", "Lança OperationFailed (underflow).", "Cria um novo elemento."],
    answer: 2,
    explain: "A operação é inválida e a implementação lança a exceção checked OperationFailed. O programa que chama precisa tratar com try/catch ou declarar throws."
  },
  {
    id: "p9", topic: "pilhas", prova: false,
    q: "Qual é o resultado de <code>5 3 + 8 2 - *</code>?",
    options: ["48", "24", "16", "64"],
    answer: 0,
    explain: "5+3=8; 8−2=6; depois 8*6=48. A pilha guarda os resultados intermediários: [8] e depois [8, 6], e o '*' combina os dois."
  },

  /* ---------------- FILAS ---------------- */
  {
    id: "f1", topic: "filas", prova: false,
    q: "Uma fila segue qual política de acesso?",
    options: ["LIFO — último que entra, primeiro que sai.", "FIFO — primeiro que entra, primeiro que sai.", "Acesso aleatório por índice.", "Sempre remove o maior elemento."],
    answer: 1,
    explain: "Fila é FIFO (First In, First Out): enqueue entra no fim e dequeue retira da frente. É a estrutura de filas de impressão, atendimento e escalonamento."
  },
  {
    id: "f2", topic: "filas", prova: true,
    q: "Executam-se <code>enqueue(A)</code>, <code>enqueue(B)</code>, <code>enqueue(C)</code> e depois <code>dequeue()</code>. Qual valor é retornado?",
    options: ["A", "B", "C", "Depende da capacidade."],
    answer: 0,
    explain: "A é o primeiro da fila (frente). dequeue() remove a frente, então retorna A. Depois, a frente passa a ser B."
  },
  {
    id: "f3", topic: "filas", prova: true,
    q: "Em uma fila circular implementada com vetor e um campo <code>count</code>, qual condição indica que a fila está <strong>cheia</strong>?",
    options: ["<code>front == rear</code>", "<code>count == 0</code>", "<code>count == capacidade</code>", "<code>rear == capacidade</code>"],
    answer: 2,
    explain: "Com count, cheia é count == capacidade e vazia é count == 0. Sem count, costuma-se usar (rear+1) % capacidade == front, mas isso desperdiça uma posição. front == rear sozinho é ambíguo (pode ser vazia ou cheia)."
  },
  {
    id: "f4", topic: "filas", prova: true,
    q: "Após gravar um elemento na posição <code>rear</code> de uma fila circular, como o índice rear deve avançar?",
    options: ["<code>rear = rear + 1</code>", "<code>rear = (rear + 1) % capacidade</code>", "<code>rear = front</code>", "<code>rear = capacidade - 1</code>"],
    answer: 1,
    explain: "O operador módulo faz o índice voltar ao início ao chegar ao fim do vetor. Sem ele, rear sairia do vetor. O mesmo vale para front: front = (front + 1) % capacidade."
  },
  {
    id: "f5", topic: "filas", prova: false,
    q: "Qual aplicação combina melhor com uma fila?",
    options: ["Desfazer/undo de um editor.", "Avaliar expressões pós-fixas.", "Fila de impressão e escalonamento de processos.", "Verificar parênteses balanceados."],
    answer: 2,
    explain: "Fila preserva a ordem de chegada, ideal para impressão, atendimento e escalonamento. Undo, pós-fixa e parênteses usam pilha (LIFO)."
  },
  {
    id: "f6", topic: "filas", prova: true,
    q: "Em uma fila implementada sobre uma lista duplamente encadeada com descritor, quais são os custos de enqueue e dequeue?",
    options: [
      "enqueue O(1) no fim; dequeue O(1) no início.",
      "enqueue O(n); dequeue O(1).",
      "enqueue O(1); dequeue O(n).",
      "Os dois são O(n)."
    ],
    answer: 0,
    explain: "Com fim e início guardados, inserir no fim e remover do início são O(1). Se a lista fosse simples sem descritor, inserir no fim seria O(n), pois seria preciso percorrer até o último nó."
  },
  {
    id: "f7", topic: "filas", prova: false,
    q: "Após um <code>dequeue()</code> em uma fila circular, o que acontece com o índice <code>front</code>?",
    options: ["Permanece igual.", "Vira <code>(front + 1) % capacidade</code>.", "Vira <code>rear</code>.", "Diminui em 1 sempre."],
    answer: 1,
    explain: "A frente avança para o próximo elemento, voltando ao índice 0 se necessário: front = (front + 1) % capacidade. O count diminui em 1."
  },

  /* ---------------- GERAIS ---------------- */
  {
    id: "g1", topic: "geral", prova: false,
    q: "Qual estrutura é mais adequada para implementar o \"desfazer\" (undo) de um editor de texto?",
    options: ["Fila", "Pilha", "Lista sequencial ordenada", "Fila circular"],
    answer: 1,
    explain: "O último comando executado deve ser o primeiro a ser desfeito — LIFO. Cada ação é empilhada; o undo desempilha a mais recente."
  },
  {
    id: "g2", topic: "geral", prova: false,
    q: "Qual é a diferença central entre lista sequencial e lista encadeada?",
    options: [
      "A sequencial usa memória contígua e acesso O(1); a encadeada usa nós com ponteiros (na disciplina, com capacidade fixa).",
      "A encadeada permite acesso por índice em O(1); a sequencial não.",
      "As duas têm exatamente o mesmo custo para inserir no início.",
      "A sequencial não permite remover elementos."
    ],
    answer: 0,
    explain: "O vetor é contíguo, com acesso direto e deslocamentos. A lista encadeada é formada por nós espalhados, ligados por referências: inserir/remover nas extremidades é barato, mas acessar uma posição exige percorrer. Cuidado: a <code>LinkedLinearList</code> do professor tem <code>capacity</code> e <code>isFull()</code>, então ela também pode encher."
  },
  {
    id: "g3", topic: "geral", prova: false,
    q: "Percorrer todos os n elementos de uma lista (sequencial ou encadeada) para calcular a soma custa:",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 2,
    explain: "É necessário visitar cada elemento uma vez. Tanto faz o vetor quanto os ponteiros: o custo é linear, O(n). O(n²) apareceria, por exemplo, em laços aninhados como os dos algoritmos simples de ordenação."
  },
  {
    id: "o11", topic: "ordenacao", prova: true,
    q: "No <code>BubbleSort.java</code> do repositório, qual método <strong>reduz o escopo</strong> a cada passada?",
    options: ["<code>sort()</code>", "<code>sortO()</code>", "<code>sortO2()</code>", "<code>sortOptimized()</code>"],
    answer: 1,
    explain: "O <code>sortO()</code> faz <code>currentSize = currentSize - 1</code> no fim de cada passada. O <code>sort()</code> mantém o escopo fixo (25 comparações no vetor de exemplo) e o <code>sortO2()</code> mistura bolha com seleção do mínimo. <code>sortOptimized()</code> não existe no repositório."
  },
  {
    id: "o12", topic: "ordenacao", prova: true,
    q: "O que acontece ao executar o <code>SelectionSort.sortO1()</code> do repositório com <code>[9, 1, 4]</code>?",
    options: [
      "Ordena para [1, 4, 9].",
      "Termina em [4, 1, 9], pois compara <code>array[y]</code> em vez de <code>array[minIndx]</code>.",
      "Lança <code>OperationFailed</code>.",
      "Faz zero comparações."
    ],
    answer: 1,
    explain: "O laço interno testa <code>array[y] &gt; array[x]</code>, mas <code>array[y]</code> não muda dentro do laço; <code>minIndx</code> acaba sendo o último elemento menor que <code>array[y]</code>, não o mínimo do trecho. Em [9,1,4]: y=0 acha 1 e depois 4, troca 9↔4 e para em [4,1,9]. A correção é comparar <code>array[x] &lt; array[minIndx]</code>."
  },
  {
    id: "o13", topic: "ordenacao", prova: false,
    q: "Qual relação entre <code>BubbleSort.sortO2()</code> e <code>MinMaxSort</code> é verdadeira?",
    options: [
      "São algoritmos diferentes: um é bolha e o outro é seleção pura.",
      "Têm a mesma lógica (bolha + seleção do mínimo) e o mesmo resultado.",
      "<code>MinMaxSort</code> é a versão otimizada do <code>sortO()</code>.",
      "<code>sortO2()</code> não ordena."
    ],
    answer: 1,
    explain: "O <code>sortO2()</code> é a variante embutida no <code>BubbleSort</code>; a <code>MinMaxSort</code> é a mesma ideia em uma classe separada. As duas procuram o menor do trecho (<code>minLimit</code>) e o colocam no início no fim da passada. Ambas estouram com vetor vazio."
  },
  {
    id: "e10", topic: "encadeada", prova: true,
    q: "A <code>LinkedLinearList</code> do professor pode ficar <strong>cheia</strong>?",
    options: [
      "Não: lista encadeada sempre cresce sob demanda.",
      "Sim: ela recebe <code>capacity</code> e tem <code>isFull()</code>; <code>add</code> retorna <code>false</code> quando <code>size == capacity</code>.",
      "Só se o descritor for removido.",
      "Só depois de remover um nó."
    ],
    answer: 1,
    explain: "A classe do ed20262 tem <code>capacity</code>, <code>isFull()</code> e <code>if (isFull()) return false</code> no insert. Na teoria a lista encadeada cresce sob demanda, mas a implementação da disciplina tem limite explícito."
  }
];
