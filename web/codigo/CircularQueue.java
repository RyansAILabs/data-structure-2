/**
 * Fila circular implementada com vetor (sem deslocamentos).
 *
 * front = índice do primeiro elemento
 * rear  = índice da próxima posição livre
 * count = quantos elementos existem (resolve a ambiguidade cheia/vazia)
 */
public class CircularQueue<T> {

    private final Object[] data;
    private int front;
    private int rear;
    private int count;

    public CircularQueue(int capacity) {
        if (capacity < 0) {
            throw new IllegalArgumentException("Capacidade não pode ser negativa");
        }
        this.data = new Object[capacity];
        this.front = 0;
        this.rear = 0;
        this.count = 0;
    }

    public boolean isEmpty() {
        return count == 0;
    }

    public boolean isFull() {
        return count == data.length;
    }

    public int size() {
        return count;
    }

    public boolean enqueue(T value) {
        if (isFull()) {
            return false;
        }
        data[rear] = value;
        rear = (rear + 1) % data.length;
        count++;
        return true;
    }

    @SuppressWarnings("unchecked")
    public T dequeue() throws OperationFailed {
        if (isEmpty()) {
            throw new OperationFailed();
        }
        T value = (T) data[front];
        data[front] = null;
        front = (front + 1) % data.length;
        count--;
        return value;
    }

    @SuppressWarnings("unchecked")
    public T peek() throws OperationFailed {
        if (isEmpty()) {
            throw new OperationFailed();
        }
        return (T) data[front];
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < count; i++) {
            sb.append(data[(front + i) % data.length]);
            if (i < count - 1) {
                sb.append(", ");
            }
        }
        return sb.append("]").toString();
    }
}
