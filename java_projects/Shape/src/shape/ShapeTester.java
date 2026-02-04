package shape;

import java.util.ArrayList;

public class ShapeTester {

    public static void drawShapes(ArrayList<? extends Shape> shapes) {
        for (Shape shape : shapes) {
            shape.draw();
        }
    }
}
