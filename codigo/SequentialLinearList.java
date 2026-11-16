/**
 * Lista linear sequencial (implementada com vetor).
 *
 * O vetor guarda os elementos nas posições 0..count-1, sempre sem "buracos".
 * A posição count é a primeira posição livre.
 */
public class SequentialLinearList {

    private int[] elements;
    private int count;

    public SequentialLinearList(int capacity) {
        if (capacity < 0) {
            throw new IllegalArgumentException("Capacity cannot be negative");
        }
        this.elements = new int[capacity];
        this.count = 0;
    }

    public boolean isEmpty() {
        return count == 0;
    }

    public boolean isFull() {
        return count == elements.length;
    }

    public int size() {
        return count;
    }

    /**
     * Adiciona no final. Retorna false se a lista estiver cheia.
     */
    public boolean add(int value) {
        if (isFull()) {
            return false;
        }
        elements[count] = value;
        count++;
        return true;
    }

    public void display() {
        System.out.println(toString());
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < count; i++) {
            sb.append(elements[i]);
            if (i < count - 1) {
                sb.append(", ");
            }
        }
        return sb.append("]").toString();
    }

    /**
     * Acesso direto: O(1).
     */
    public int get(int position) {
        validatePosition(position);
        return elements[position];
    }

    public void set(int position, int newValue) {
        validatePosition(position);
        elements[position] = newValue;
    }

    /**
     * Busca linear. Retorna o índice ou -1.
     */
    public int search(int value) {
        for (int i = 0; i < count; i++) {
            if (elements[i] == value) {
                return i;
            }
        }
        return -1;
    }

    public boolean insertAtBeginning(int value) {
        return insert(0, value);
    }

    /**
     * Insere na posição position (0 <= position <= count).
     * Desloca para a direita, do fim para o começo.
     */
    public boolean insert(int position, int value) {
        if (isFull() || position < 0 || position > count) {
            return false;
        }
        for (int i = count; i > position; i--) {
            elements[i] = elements[i - 1];
        }
        elements[position] = value;
        count++;
        return true;
    }

    /**
     * Remove e retorna o primeiro elemento (convenção usada na disciplina).
     */
    public int pop() throws OperationFailed {
        return remove(0);
    }

    public int removeLast() throws OperationFailed {
        return remove(count - 1);
    }

    /**
     * Remove e retorna o elemento da posição.
     * Desloca para a esquerda, do começo para o fim.
     */
    public int remove(int position) throws OperationFailed {
        if (position < 0 || position >= count) {
            throw new OperationFailed();
        }
        int removed = elements[position];
        for (int i = position; i < count - 1; i++) {
            elements[i] = elements[i + 1];
        }
        count--;
        return removed;
    }

    /**
     * Posição válida para leitura/remoção: 0 <= position < count.
     */
    private void validatePosition(int position) {
        if (position < 0 || position >= count) {
            throw new IndexOutOfBoundsException("Posição inválida: " + position);
        }
    }
}
