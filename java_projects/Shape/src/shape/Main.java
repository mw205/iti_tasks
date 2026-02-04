package shape;

import java.util.ArrayList;

public class Main {

    public static void main(String[] args) {
        // list of shapes
        ArrayList<Shape> shapes = new ArrayList<Shape>();
        shapes.add(new Circle());
        shapes.add(new Rectangle());
        // list of rectangles
        ArrayList<Rectangle> rectangles = new ArrayList<Rectangle>();
        rectangles.add(new Rectangle());
        rectangles.add(new Rectangle());
        ShapeTester.drawShapes(shapes);
        ShapeTester.drawShapes(rectangles);

    }
}
