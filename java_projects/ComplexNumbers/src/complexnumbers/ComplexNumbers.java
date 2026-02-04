package complexnumbers;

public interface ComplexNumbers<T> {

    T getReal();

    T getImaginary();

    ComplexNumbers<T> add(ComplexNumbers<T> x);

    ComplexNumbers<T> subtract(ComplexNumbers<T> x);

    ComplexNumbers<T> product(ComplexNumbers<T> x);

    ComplexNumbers<T> div(ComplexNumbers<T> x);

}
