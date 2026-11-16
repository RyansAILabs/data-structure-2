/**
 * Pilha implementada com vetor. top aponta para o último elemento (-1 = vazia).
 */
public class SequentialStack<T> {

    private final Object[] data;
    private int top;

    public SequentialStack(int capacity) {
        if (capacity < 0) {
            throw new IllegalArgumentException("Capacidade não pode ser negativa");
        }
        this.data = new Object[capacity];
        this.top = -1;
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public boolean isFull() {
        return top == data.length - 1;
    }

    public int size() {
        return top + 1;
    }

    public boolean push(T value) {
        if (isFull()) {
            return false;
        }
        data[++top] = value;
        return true;
    }

    @SuppressWarnings("unchecked")
    public T pop() throws OperationFailed {
        if (isEmpty()) {
            throw new OperationFailed();
        }
        T value = (T) data[top];
        data[top] = null;
        top--;
        return value;
    }

    @SuppressWarnings("unchecked")
    public T peek() throws OperationFailed {
        if (isEmpty()) {
            throw new OperationFailed();
        }
        return (T) data[top];
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i <= top; i++) {
            sb.append(data[i]);
            if (i < top) {
                sb.append(", ");
            }
        }
        return sb.append("]").toString();
    }
}
