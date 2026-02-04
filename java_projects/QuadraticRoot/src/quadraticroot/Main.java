package quadraticroot;

public class Main {

    public static void main(String[] args) {
        double[] equation = {1, -5, 6};
        QuadraticSolver solver = new QuadraticSolver();
        System.out.println(solver.apply(equation));
    }
}
