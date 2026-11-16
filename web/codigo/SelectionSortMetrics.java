/**
 * Cópia INSTRUMENTADA do SelectionSort do professor (ed20261).
 *
 * A lógica é a mesma de SelectionSort.java (copiado aqui sem alteração).
 * Os contadores existem só para comparar as variantes nos traços do site.
 *
 * Métodos (mesmos nomes do repositório):
 *   sort()       — troca na hora, a cada valor menor que array[y]. CORRETO.
 *   sortO1()     — tenta guardar o índice do mínimo, mas compara SEMPRE
 *                  array[y] em vez de array[minIndx]. NÃO ORDENA em geral
 *                  (exemplo: [9, 1, 4] termina em [4, 1, 9]).
 *   sortO2()     — seleção bidirecional (mínimo e máximo por passada). CORRETO.
 *
 * sortClassic() NÃO está no repositório: é a correção do sortO1() feita pelo
 * guia (compara array[minIndx]), incluída só para comparar o número de trocas.
 */
public class SelectionSortMetrics {

    private final int[] array;
    private final int size;
    private long comparisons;
    private long swaps;

    public SelectionSortMetrics(int[] array) {
        this.array = array;
        this.size = array.length;
    }

    private void swap(int a, int b) {
        int aux = array[a];
        array[a] = array[b];
        array[b] = aux;
        swaps++;
    }

    /** Igual a SelectionSort.sort() do repositório. */
    public void sort() {
        for (int y = 0; y < size - 1; y++) {
            for (int x = y + 1; x < size; x++) {
                comparisons++;
                if (array[y] > array[x]) {
                    swap(x, y);
                }
            }
        }
    }

    /**
     * Igual a SelectionSort.sortO1() do repositório — inclusive o bug:
     * a comparação usa array[y] (que não muda dentro do laço) e não
     * array[minIndx]. Por isso o índice guardado é só "o último menor",
     * não o menor do trecho.
     */
    public void sortO1() {
        int minIndx = 0;
        for (int y = 0; y < size - 1; y++) {
            minIndx = y;
            for (int x = y + 1; x < size; x++) {
                comparisons++;
                if (array[y] > array[x]) {
                    minIndx = x;
                }
            }
            swap(y, minIndx);
        }
    }

    /** Igual a SelectionSort.sortO2() do repositório (bidirecional). */
    public void sortO2() {
        int lowLimit = 0;
        int highLimit = size - 1;

        while (lowLimit < highLimit) {
            int minIndx = lowLimit;
            int maxIndx = lowLimit;

            for (int x = lowLimit + 1; x <= highLimit; x++) {
                comparisons++;
                if (array[x] < array[minIndx]) {
                    minIndx = x;
                }
                if (array[x] > array[maxIndx]) {
                    maxIndx = x;
                }
            }
            swap(maxIndx, highLimit);
            if (minIndx == highLimit) {
                minIndx = maxIndx;
            }
            swap(minIndx, lowLimit);
            lowLimit++;
            highLimit--;
        }
    }

    /**
     * Correção do sortO1() (versão clássica com minIndex). Não está no repo.
     */
    public void sortClassic() {
        for (int y = 0; y < size - 1; y++) {
            int minIndex = y;
            for (int x = y + 1; x < size; x++) {
                comparisons++;
                if (array[x] < array[minIndex]) {
                    minIndex = x;
                }
            }
            if (minIndex != y) {
                swap(y, minIndex);
            }
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
