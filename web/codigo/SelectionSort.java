
public class SelectionSort {
    private int[] array = null;
    private int size = 0;

    public SelectionSort(int[] array) {
        this.array = array;
        this.size = array.length;
    }

    private void swap(int a, int b) {
        int aux = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = aux;
    }

    public void sort() {
        System.out.println(this.toString());
        for (int y = 0; y < size - 1; y++) {
            for (int x = y + 1; x < size; x++) {
                if (this.array[y] > this.array[x]) {
                    swap(x, y);
                    System.out.println(this.toString());
                }
            }
        }
    }

    public void sortO1() {
        int minIndx = 0;
        for (int y = 0; y < size - 1; y++) {
            minIndx = y;
            for (int x = y + 1; x < size; x++) {
                if (this.array[y] > this.array[x]) {
                    minIndx = x;
                }
            }
            swap(y, minIndx);
        }
    }

    public void sortO2() {
        int lowLimit = 0;
        int highLimit = size - 1;

        while (lowLimit < highLimit) {
            int minIndx = lowLimit;
            int maxIndx = lowLimit;

            for (int x = lowLimit + 1; x <= highLimit; x++) {
                if (this.array[x] < this.array[minIndx]) {
                    minIndx = x;
                }
                if (this.array[x] > this.array[maxIndx]) {
                    maxIndx = x;
                }
            }
            this.swap(maxIndx, highLimit);
            if (minIndx == highLimit) {
                minIndx = maxIndx;
            }
            this.swap(minIndx, lowLimit);
            lowLimit++;
            highLimit--;
        }
    }

    public String toString() {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < this.size; i++) {
            sb.append("\t" + this.array[i]);
        }

        return sb.toString();
    }
}
