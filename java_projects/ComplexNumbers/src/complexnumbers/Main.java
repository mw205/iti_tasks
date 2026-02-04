package complexnumbers;

public class Main {

    public static void main(String[] args) {
        DoubleComplex x = new DoubleComplex(3.0, 4.0);
        DoubleComplex y = new DoubleComplex(1.0, 2.0);
        System.out.println("x = " + x);
        System.out.println("y = " + y);
        System.out.println("Addition (x+y) : " + x.add(y));
        System.out.println("subtraction (x-y) : " + x.subtract(y));
        System.out.println("Multiplication (x*y) : " + x.product(y));
        System.out.println("Division (x/y) : " + x.div(y));

    }

}
