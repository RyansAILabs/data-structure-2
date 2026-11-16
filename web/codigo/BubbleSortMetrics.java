/**
 * Cópia INSTRUMENTADA do BubbleSort do professor (ed20261), usada só para
 * contar comparações e trocas nos traços do site.
 *
 * A lógica de cada método é a mesma de BubbleSort.java (que está aqui no
 * diretório, copiado sem nenhuma alteração). A única diferença é que os
 * contadores são incrementados; os System.out.println do original foram
 * removidos para não poluir a saída dos testes.
 *
 * Métodos (mesmos nomes do repositório):
 *   sort()   — escopo FIXO: currentSize nunca diminui.
 *   sortO()  — escopo REDUZIDO: currentSize-- a cada passada (começa em 0).
 *   sortO2() — mistura bolha + seleção do mínimo: começa em minLimit, procura
 *              o menor do trecho e o coloca em minLimit no fim da passada.
 */
public class BubbleSortMetrics {

    private final int[] array;
    private final int size;
    private long comparisons;
    private long swaps;

    public BubbleSortMetrics(int[] array) {
        this.array = array;
        this.size = array.length;
    }

    private void swap(int a, int b) {
        int aux = array[a];
        array[a] = array[b];
        array[b] = aux;
        swaps++;
    }

    /** Igual a BubbleSort.sort() do repositório. */
    public void sort() {
        boolean changed = true;
        int currentSize = size;

        while (changed) {
            changed = false;
            for (int i = 0; i < currentSize - 1; i++) {
                comparisons++;
                if (array[i] > array[i + 1]) {
                    swap(i, i + 1);
                    changed = true;
                }
            }
        }
    }

    /** Igual a BubbleSort.sortO() do repositório. */
    public void sortO() {
        boolean changed = true;
        int currentSize = size;

        while (changed) {
            changed = false;
            for (int i = 0; i < currentSize - 1; i++) {
                comparisons++;
                if (array[i] > array[i + 1]) {
                    swap(i, i + 1);
                    changed = true;
                }
            }
            currentSize = currentSize - 1;
        }
    }

    /**
     * Igual a BubbleSort.sortO2() (e a MinMaxSort.sort()) do repositório.
     * Atenção: assim como o original, estoura com vetor vazio (swap(0, 0)).
     */
    public void sortO2() {
        boolean changed = true;
        int currentSize = size;
        int i = 0;
        int minLimit = 0;
        int minValueIndex = 0;

        while (changed) {
            changed = false;
            minValueIndex = minLimit;
            i = minLimit;
            for (int times = 0; i < currentSize - 1; i++, times++) {
                comparisons++;
                if (array[i] > array[i + 1]) {
                    swap(i, i + 1);
                    changed = true;
                }
                if (array[i] < array[minValueIndex]) {
                    minValueIndex = i;
                }
            }
            swap(minValueIndex, minLimit);
            currentSize = currentSize - 1;
            minLimit = minLimit + 1;
        }
    }

    public int[] toArray() {
        return array.clone();
    }

    public long getComparisons() {
        return comparisons;
    }

    public long getSwaps() {
        return swaps;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < size; i++) {
            sb.append(array[i]);
            if (i < size - 1) {
                sb.append(' ');
            }
        }
        return sb.toString();
    }
}
