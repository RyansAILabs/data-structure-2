import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

/**
 * Suíte de testes do guia.
 *
 * Aqui convivem dois tipos de classe:
 *   1. As do professor, copiadas SEM ALTERAÇÃO de ed20261/ed20262
 *      (BubbleSort, MinMaxSort, SelectionSort, InsertionSort,
 *       LinkedLinearList, Node, Descriptor, Stack, Queue, OperationFailed).
 *   2. As do guia: SequentialLinearList (o exercício em branco preenchido),
 *      as versões instrumentadas (*Metrics, só para contar) e os complementos
 *      didáticos (SimpleLinkedList, SequentialStack, CircularQueue,
 *      PostfixEvaluator, BalancedParentheses).
 *
 * A suíte confirma que o código do repositório funciona (e documenta o bug do
 * sortO1 e o estouro do sortO2 com vetor vazio).
 */
public class Demo {

    private static int passed = 0;
    private static int failed = 0;

    public static void main(String[] args) throws Exception {
        testSequentialList();
        testLinkedLinearList();
        testStack();
        testQueue();
        testBubbleRepo();
        testSelectionRepo();
        testInsertionRepo();
        testMetrics();
        testExtras();

        System.out.println();
        System.out.println("========================================");
        System.out.println("Testes: " + passed + " passaram, " + failed + " falharam.");
        System.out.println("========================================");
        if (failed > 0) {
            System.exit(1);
        }
    }

    /* ---------------------------------------------------------------- */
    /* Lista sequencial (exercício preenchido pelo guia)                 */
    /* ---------------------------------------------------------------- */
    private static void testSequentialList() throws Exception {
        SequentialLinearList list = new SequentialLinearList(6);
        check("Sequencial começa vazia", true, list.isEmpty());
        check("Sequencial tamanho 0", 0, list.size());
        check("add 10", true, list.add(10));
        check("add 20", true, list.add(20));
        check("add 30", true, list.add(30));
        check("conteúdo [10, 20, 30]", "[10, 20, 30]", list.toString());
        check("get(2) = 30", 30, list.get(2));
        check("search(20) = 1", 1, list.search(20));
        check("search(99) = -1", -1, list.search(99));
        check("insert(1, 15)", true, list.insert(1, 15));
        check("conteúdo [10, 15, 20, 30]", "[10, 15, 20, 30]", list.toString());
        check("insertAtBeginning(5)", true, list.insertAtBeginning(5));
        check("conteúdo [5, 10, 15, 20, 30]", "[5, 10, 15, 20, 30]", list.toString());
        check("isFull (5 de 6) = false", false, list.isFull());
        check("add 99", true, list.add(99));
        check("isFull (6 de 6)", true, list.isFull());
        check("add em lista cheia = false", false, list.add(100));
        check("set(0, 7)", "[7, 10, 15, 20, 30, 99]", setAndShow(list, 0, 7));
        check("remove(1) = 10", 10, list.remove(1));
        check("pop() = 7 (primeiro)", 7, list.pop());
        check("removeLast() = 99", 99, list.removeLast());
        check("conteúdo final [15, 20, 30]", "[15, 20, 30]", list.toString());

        boolean threw = false;
        try {
            list.remove(5);
        } catch (OperationFailed e) {
            threw = true;
        }
        check("remove fora da faixa lança OperationFailed", true, threw);
    }

    private static String setAndShow(SequentialLinearList list, int pos, int value) {
        list.set(pos, value);
        return list.toString();
    }

    /* ---------------------------------------------------------------- */
    /* Lista dupla com descritor (código do professor)                   */
    /* ---------------------------------------------------------------- */
    private static void testLinkedLinearList() throws Exception {
        LinkedLinearList<Integer> list = new LinkedLinearList<>(10);
        list.add(10);
        list.add(20);
        list.add(30);
        check("Encadeada toString", "[10, 20, 30]", list.toString());
        check("Encadeada size", 3, list.size());
        check("Encadeada get(1)", 20, list.get(1));
        check("Encadeada search(30)", 2, list.search(30));
        list.insertAtBeginning(5);
        check("Encadeada insere no início", "[5, 10, 20, 30]", list.toString());
        check("Encadeada remove(2)", 20, list.remove(2));
        check("Encadeada após remove", "[5, 10, 30]", list.toString());
        check("Encadeada pop (primeiro)", 5, list.pop());
        check("Encadeada removeLast", 30, list.removeLast());
        check("Encadeada sobrou [10]", "[10]", list.toString());
        check("Encadeada sum", 10.0f, list.sum());
        check("Encadeada product", 10.0f, list.product());
        check("Encadeada average", 10.0f, list.average());

        boolean threw = false;
        try {
            new LinkedLinearList<Integer>(2).pop();
        } catch (OperationFailed e) {
            threw = true;
        }
        check("Encadeada pop vazia lança OperationFailed", true, threw);
    }

    /* ---------------------------------------------------------------- */
    /* Pilha (código do professor)                                       */
    /* ---------------------------------------------------------------- */
    private static void testStack() throws Exception {
        Stack<Integer> stack = new Stack<>(3);
        check("push 10", true, stack.push(10));
        check("push 20", true, stack.push(20));
        check("push 30", true, stack.push(30));
        check("pilha cheia", true, stack.isFull());
        check("push em pilha cheia = false", false, stack.push(40));
        check("peek = 30", 30, stack.peek());
        check("pop = 30", 30, stack.pop());
        check("pop = 20", 20, stack.pop());
        check("pop = 10", 10, stack.pop());
        check("pilha vazia", true, stack.isEmpty());

        boolean threw = false;
        try {
            stack.pop();
        } catch (OperationFailed e) {
            threw = true;
        }
        check("pop em pilha vazia lança OperationFailed", true, threw);
    }

    /* ---------------------------------------------------------------- */
    /* Fila (código do professor)                                        */
    /* ---------------------------------------------------------------- */
    private static void testQueue() throws Exception {
        Queue<String> queue = new Queue<>(3);
        check("enqueue A", true, queue.enqueue("A"));
        check("enqueue B", true, queue.enqueue("B"));
        check("enqueue C", true, queue.enqueue("C"));
        check("fila cheia", true, queue.isFull());
        check("enqueue em fila cheia = false", false, queue.enqueue("D"));
        check("peek = A", "A", queue.peek());
        check("dequeue = A", "A", queue.dequeue());
        check("dequeue = B", "B", queue.dequeue());
        check("dequeue = C", "C", queue.dequeue());
        check("fila vazia", true, queue.isEmpty());

        boolean threw = false;
        try {
            queue.dequeue();
        } catch (OperationFailed e) {
            threw = true;
        }
        check("dequeue em fila vazia lança OperationFailed", true, threw);
    }

    /* ---------------------------------------------------------------- */
    /* BubbleSort do professor (3 variantes) + MinMaxSort                */
    /* ---------------------------------------------------------------- */
    private static void testBubbleRepo() throws Exception {
        int[] input = {5, 3, 8, 1, 9, 2};

        BubbleSort bubble = new BubbleSort(input.clone());
        bubble.sort();
        check("BubbleSort.sort (repo) ordena", "1 2 3 5 8 9", normalize(capture(bubble::show)));

        BubbleSort bubbleO = new BubbleSort(new int[]{5, 3, 8, 1, 9, 2});
        bubbleO.sortO();
        check("BubbleSort.sortO (repo) ordena", "1 2 3 5 8 9", normalize(capture(bubbleO::show)));

        BubbleSort bubbleO2 = new BubbleSort(new int[]{5, 3, 8, 1, 9, 2});
        bubbleO2.sortO2();
        check("BubbleSort.sortO2 (repo) ordena", "1 2 3 5 8 9", normalize(capture(bubbleO2::show)));

        MinMaxSort minMax = new MinMaxSort(new int[]{5, 3, 8, 1, 9, 2});
        minMax.sort();
        check("MinMaxSort.sort (repo) == BubbleSort.sortO2", "1 2 3 5 8 9", normalize(capture(minMax::show)));

        int[] already = {1, 2, 3, 4, 5};
        BubbleSort best = new BubbleSort(already);
        best.sort();
        check("BubbleSort.sort já ordenado continua correto", "1 2 3 4 5", normalize(capture(best::show)));

        check("BubbleSort.sortO2 estoura com vetor vazio (como no repo)",
                true, throwsAIOOBE(() -> new BubbleSort(new int[0]).sortO2()));
        check("MinMaxSort.sort estoura com vetor vazio (como no repo)",
                true, throwsAIOOBE(() -> new MinMaxSort(new int[0]).sort()));
    }

    /* ---------------------------------------------------------------- */
    /* SelectionSort do professor (sort, sortO1 com bug, sortO2)         */
    /* ---------------------------------------------------------------- */
    private static void testSelectionRepo() throws Exception {
        SelectionSort selection = new SelectionSort(new int[]{10, 9, 101, 7, 44, 28});
        selection.sort();
        check("SelectionSort.sort (repo) ordena", "7 9 10 28 44 101", normalize(selection.toString()));
        check("SelectionSort.sort ordena [3, 1, 2]", "1 2 3", sortedByRepoSort(new int[]{3, 1, 2}));

        // O sortO1() do repositório compara array[y] em vez de array[minIndx].
        SelectionSort buggy = new SelectionSort(new int[]{9, 1, 4});
        buggy.sortO1();
        check("SelectionSort.sortO1 (repo) NÃO ordena [9, 1, 4]", "4 1 9", normalize(buggy.toString()));

        SelectionSort bidirectional = new SelectionSort(new int[]{10, 9, 101, 7, 44, 28});
        bidirectional.sortO2();
        check("SelectionSort.sortO2 (repo) ordena", "7 9 10 28 44 101", normalize(bidirectional.toString()));
        check("SelectionSort.sortO2 ordena [3, 1, 2]", "1 2 3", sortedByRepoSortO2(new int[]{3, 1, 2}));
    }

    private static String sortedByRepoSort(int[] values) {
        SelectionSort s = new SelectionSort(values);
        s.sort();
        return normalize(s.toString());
    }

    private static String sortedByRepoSortO2(int[] values) {
        SelectionSort s = new SelectionSort(values);
        s.sortO2();
        return normalize(s.toString());
    }

    /* ---------------------------------------------------------------- */
    /* InsertionSort do professor                                        */
    /* ---------------------------------------------------------------- */
    private static void testInsertionRepo() throws Exception {
        InsertionSort insertion = new InsertionSort(new int[]{10, 9, 101, 7, 44, 28});
        insertion.sort();
        check("InsertionSort.sort (repo) ordena", "7 9 10 28 44 101", normalize(insertion.toString()));

        InsertionSort already = new InsertionSort(new int[]{1, 2, 3, 4});
        already.sort();
        check("InsertionSort.sort já ordenado", "1 2 3 4", normalize(already.toString()));
    }

    /* ---------------------------------------------------------------- */
    /* Versões instrumentadas (contadores)                               */
    /* ---------------------------------------------------------------- */
    private static void testMetrics() {
        int[] input = {5, 3, 8, 1, 9, 2};

        BubbleSortMetrics m1 = new BubbleSortMetrics(input.clone());
        m1.sort();
        check("métricas BubbleSort.sort compara 25", 25L, m1.getComparisons());
        check("métricas BubbleSort.sort troca 8", 8L, m1.getSwaps());
        check("métricas BubbleSort.sort ordena", "1 2 3 5 8 9", m1.toString());

        BubbleSortMetrics m2 = new BubbleSortMetrics(input.clone());
        m2.sortO();
        check("métricas BubbleSort.sortO compara 15", 15L, m2.getComparisons());
        check("métricas BubbleSort.sortO troca 8", 8L, m2.getSwaps());
        check("métricas BubbleSort.sortO ordena", "1 2 3 5 8 9", m2.toString());

        BubbleSortMetrics m3 = new BubbleSortMetrics(input.clone());
        m3.sortO2();
        check("métricas BubbleSort.sortO2 compara 9", 9L, m3.getComparisons());
        check("métricas BubbleSort.sortO2 troca 10", 10L, m3.getSwaps());
        check("métricas BubbleSort.sortO2 ordena", "1 2 3 5 8 9", m3.toString());

        SelectionSortMetrics s1 = new SelectionSortMetrics(new int[]{5, 3, 8, 1, 9});
        s1.sort();
        check("métricas Selection.sort compara n(n-1)/2 = 10", 10L, s1.getComparisons());
        check("métricas Selection.sort ordena", "1 3 5 8 9", s1.toString());

        SelectionSortMetrics s2 = new SelectionSortMetrics(new int[]{9, 1, 4});
        s2.sortO1();
        check("métricas Selection.sortO1 reproduz o bug", "4 1 9", s2.toString());

        SelectionSortMetrics s3 = new SelectionSortMetrics(new int[]{9, 1, 4});
        s3.sortClassic();
        check("métricas Selection.sortClassic corrige o bug", "1 4 9", s3.toString());

        SelectionSortMetrics s4 = new SelectionSortMetrics(new int[]{5, 3, 8, 1, 9, 2});
        s4.sortClassic();
        check("métricas Selection.sortClassic ordena", "1 2 3 5 8 9", s4.toString());

        InsertionSortMetrics i1 = new InsertionSortMetrics(new int[]{1, 2, 3, 4, 5});
        i1.sort();
        check("métricas Insertion melhor caso: 4 comparações", 4L, i1.getComparisons());
        check("métricas Insertion melhor caso: 0 deslocamentos", 0L, i1.getShifts());

        InsertionSortMetrics i2 = new InsertionSortMetrics(new int[]{5, 3, 8, 1, 9, 2});
        i2.sort();
        check("métricas Insertion ordena", "1 2 3 5 8 9", i2.toString());
        check("métricas Insertion nesse vetor: 11 comparações", 11L, i2.getComparisons());
        check("métricas Insertion nesse vetor: 8 deslocamentos", 8L, i2.getShifts());
    }

    /* ---------------------------------------------------------------- */
    /* Complementos didáticos do guia                                    */
    /* ---------------------------------------------------------------- */
    private static void testExtras() throws Exception {
        SimpleLinkedList<Integer> simple = new SimpleLinkedList<>(5);
        simple.add(10);
        simple.add(20);
        simple.insertAtBeginning(5);
        check("Lista simples toString", "[5, 10, 20]", simple.toString());
        check("Lista simples removeLast", 20, simple.removeLast());
        check("Lista simples pop", 5, simple.pop());
        check("Lista simples sobrou [10]", "[10]", simple.toString());

        SequentialStack<Integer> seqStack = new SequentialStack<>(3);
        seqStack.push(1);
        seqStack.push(2);
        seqStack.push(3);
        check("Pilha sequencial cheia", true, seqStack.isFull());
        check("Pilha sequencial pop", 3, seqStack.pop());
        check("Pilha sequencial peek", 2, seqStack.peek());

        CircularQueue<Integer> circular = new CircularQueue<>(3);
        circular.enqueue(1);
        circular.enqueue(2);
        circular.enqueue(3);
        check("Fila circular cheia", true, circular.isFull());
        check("Fila circular dequeue", 1, circular.dequeue());
        check("Fila circular reusa posição", true, circular.enqueue(4));
        check("Fila circular conteúdo", "[2, 3, 4]", circular.toString());

        check("Pós-fixa 6 2 3 * - 4 + = 4", 4L, PostfixEvaluator.evaluate("6 2 3 * - 4 +"));
        check("Pós-fixa 8 3 - = 5", 5L, PostfixEvaluator.evaluate("8 3 -"));
        check("Pós-fixa 5 3 + 8 2 - * = 48", 48L, PostfixEvaluator.evaluate("5 3 + 8 2 - *"));

        check("Parênteses balanceados", true, BalancedParentheses.isBalanced("({[]})"));
        check("Parênteses desbalanceados", false, BalancedParentheses.isBalanced("({[}])"));
    }

    /* ---------------------------------------------------------------- */
    /* Helpers                                                           */
    /* ---------------------------------------------------------------- */
    private interface ThrowingRunnable {
        void run() throws Exception;
    }

    private static String capture(ThrowingRunnable action) throws Exception {
        PrintStream original = System.out;
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        System.setOut(new PrintStream(buffer));
        try {
            action.run();
        } finally {
            System.setOut(original);
        }
        return buffer.toString();
    }

    private static boolean throwsAIOOBE(ThrowingRunnable action) {
        try {
            action.run();
            return false;
        } catch (ArrayIndexOutOfBoundsException e) {
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private static String normalize(String text) {
        return text.trim().replaceAll("\\s+", " ");
    }

    private static void check(String label, Object expected, Object actual) {
        boolean ok = expected == null ? actual == null : expected.equals(actual);
        if (ok) {
            passed++;
            System.out.println("[OK]   " + label);
        } else {
            failed++;
            System.out.println("[FAIL] " + label + " -> esperado: " + expected + " | obtido: " + actual);
        }
    }
}
