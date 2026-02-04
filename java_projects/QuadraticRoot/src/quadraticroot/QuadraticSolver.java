package quadraticroot;

import java.util.function.Function;

public class QuadraticSolver implements Function<double[], String> {

    @Override
    public String apply(double[] values) {
        double a = values[0];
        double b = values[1];
        double c = values[2];
        String result = "";
        double delta = Math.pow(b, 2) - 4 * a * c;
        if (delta > 0) {
            double x1 = (-b + Math.sqrt(delta)) / (2 * a);
            double x2 = (-b - Math.sqrt(delta)) / (2 * a);
            result = "Root 1 = " + x1 + ", Root2 = " + x2;
        } else if (delta == 0) {
            double x = -b / (2 * a);
            result = "Root = " + x;
        } else {
            result = "No real roots found";
        }
        return result;
    }
}
// functional interfaces
//------------
// bi function 
// function
// supply
