/**
 * Lista simplesmente encadeada com descritor (tamanho, início e fim).
 * Inserir/remover no início e inserir no fim são O(1);
 * acessar posição intermediária continua O(n).
 */
public class SimpleLinkedList<T> {

    private SimpleNode<T> inicio;
    private SimpleNode<T> fim;
    private int size;
    private final int capacity;

    public SimpleLinkedList(int capacity) {
        if (capacity < 0) {
            throw new IllegalArgumentException("Capacidade não pode ser negativa");
        }
        this.capacity = capacity;
        this.inicio = null;
        this.fim = null;
        this.size = 0;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == capacity;
    }

    public int size() {
        return size;
    }

    public boolean add(T value) {
        return insert(size, value);
    }

    public boolean insertAtBeginning(T value) {
        return insert(0, value);
    }

    public boolean insert(int position, T value) {
        if (isFull() || position < 0 || position > size) {
            return false;
        }

        SimpleNode<T> newNode = new SimpleNode<>(value);

        if (position == 0) {
            newNode.setNext(inicio);
            inicio = newNode;
            if (size == 0) {
                fim = newNode;
            }
        } else {
            SimpleNode<T> previous = nodeAt(position - 1);
            newNode.setNext(previous.getNext());
            previous.setNext(newNode);
            if (newNode.getNext() == null) {
                fim = newNode;
            }
        }

        size++;
        return true;
    }

    public T get(int position) {
        return nodeAt(position).getValue();
    }

    public int search(T value) {
        SimpleNode<T> current = inicio;
        int position = 0;
        while (current != null) {
            if (current.getValue().equals(value)) {
                return position;
            }
            current = current.getNext();
            position++;
        }
        return -1;
    }

    public T pop() throws OperationFailed {
        return remove(0);
    }

    public T removeLast() throws OperationFailed {
        return remove(size - 1);
    }

    public T remove(int position) throws OperationFailed {
        if (position < 0 || position >= size) {
            throw new OperationFailed();
        }

        SimpleNode<T> removed;
        if (position == 0) {
            removed = inicio;
            inicio = inicio.getNext();
            if (inicio == null) {
                fim = null;
            }
        } else {
            SimpleNode<T> previous = nodeAt(position - 1);
            removed = previous.getNext();
            previous.setNext(removed.getNext());
            if (removed == fim) {
                fim = previous;
            }
        }

        removed.setNext(null);
        size--;
        return removed.getValue();
    }

    /**
     * Anda do início até a posição: O(n).
     */
    private SimpleNode<T> nodeAt(int position) {
        if (position < 0 || position >= size) {
            throw new IndexOutOfBoundsException("Posição inválida: " + position);
        }
        SimpleNode<T> current = inicio;
        for (int i = 0; i < position; i++) {
            current = current.getNext();
        }
        return current;
    }

    @Override
    public String toString() {
        StringBuilder result = new StringBuilder("[");
        SimpleNode<T> current = inicio;
        while (current != null) {
            result.append(current.getValue());
            current = current.getNext();
            if (current != null) {
                result.append(", ");
            }
        }
        return result.append("]").toString();
    }
}
