/**
 * Cópia INSTRUMENTADA do InsertionSort do professor (ed20261).
 *
 * A lógica é a mesma de InsertionSort.java (copiado aqui sem alteração);
 * os contadores e a ausência dos println são a única diferença.
 *
 *   sort() — prefixo ordenado cresce de 1 até n; cada chave é deslocada para
 *            a esquerda enquanto o vizinho for estritamente maior.
 */
public class InsertionSortMetrics {

    private final int[] array;
    private final int size;
    private long comparisons;
    private long shifts;

    public InsertionSortMetrics(int[] array) {
        this.array = array;
        this.size = array.length;
    }

    /** Igual a InsertionSort.sort() do repositório. */
    public void sort() {
        for (int i = 1; i < size; i++) {
            int aux = array[i];
            int j = i;

            while (j > 0) {
                comparisons++;
                if (array[j - 1] <= aux) {
                    break;
                }
                array[j] = array[j - 1];
                shifts++;
                j -= 1;
            }
            array[j] = aux;
        }
    }

    public int[] toArray() {
        return array.clone();
    }

    public long getComparisons() {
        return comparisons;
    }

    public long getShifts() {
        return shifts;
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
