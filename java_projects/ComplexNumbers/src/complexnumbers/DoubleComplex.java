package complexnumbers;

public class DoubleComplex implements ComplexNumbers<Double> {

    private Double real;
    private Double imaginary;

    public DoubleComplex(double real, double imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    public DoubleComplex() {
        this(0, 0);
    }

    @Override
    public Double getReal() {
        return real;
    }

    @Override
    public Double getImaginary() {
        return imaginary;
    }

    @Override
    public ComplexNumbers<Double> add(ComplexNumbers<Double> x) {
        return new DoubleComplex(
                this.real + x.getReal(),
                this.imaginary + x.getImaginary()
        );
    }

    @Override
    public ComplexNumbers<Double> subtract(ComplexNumbers<Double> x) {
        return new DoubleComplex(
                this.real - x.getReal(),
                this.imaginary - x.getImaginary()
        );
    }

    @Override
    public ComplexNumbers<Double> product(ComplexNumbers<Double> x) {
        // Formula: (a + bi)(c + di) = (ac - bd) + (ad + bc)i
        double a = this.real;
        double b = this.imaginary;
        double c = x.getReal();
        double d = x.getImaginary();

        return new DoubleComplex((a * c) - (b * d), (a * d) + (b * c));
    }

    @Override
    public ComplexNumbers<Double> div(ComplexNumbers<Double> x) {
        // Formula: ((ac + bd) / (c^2 + d^2)) + ((bc - ad) / (c^2 + d^2))i
        double a = this.real;
        double b = this.imaginary;
        double c = x.getReal();
        double d = x.getImaginary();

        double divisor = Math.pow(c, 2) + Math.pow(d, 2);

        if (divisor == 0) {
            throw new ArithmeticException("Division by zero in complex numbers.");
        }

        return new DoubleComplex(
                ((a * c) + (b * d)) / divisor,
                ((b * c) - (a * d)) / divisor
        );
    }

    @Override
    public String toString() {
        return String.format("%.2f + %.2fi", real, imaginary);
    }

}
// search point : check uncheck in exception handling