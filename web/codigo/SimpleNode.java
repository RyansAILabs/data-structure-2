/**
 * Nó de uma lista simplesmente encadeada: só aponta para o próximo.
 */
public class SimpleNode<T> {

    private T value;
    private SimpleNode<T> next;

    public SimpleNode(T value) {
        this.value = value;
        this.next = null;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    public SimpleNode<T> getNext() {
        return next;
    }

    public void setNext(SimpleNode<T> next) {
        this.next = next;
    }
}
