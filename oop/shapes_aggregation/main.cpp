#include <iostream>

using namespace std;

class Point
{
    int x, y;

public:
    Point(int _x, int _y)
    {
        x = _x;
        y = _y;
    }
    Point(int _x) : Point(_x, 0) {}
    Point() : Point(0, 0) {}
    // getters

    int getX()
    {
        return x;
    }
    int getY()
    {
        return y;
    }
};

class Rectangle
{
    Point *p1;
    Point *p2;

public:
    Rectangle(Point *_p1, Point *_p2)
    {
        setPoints(_p1, _p2);
    }
    Rectangle() {}
    void setPoints(Point *p1, Point *p2)
    {
        this->p1 = p1;
        this->p2 = p2;
    }
    void print()
    {
        cout << "\ntop left point :"
             << "(" << p1->getX() << "," << p1->getY() << ") \n";
        cout << "bottom right point :"
             << "(" << p2->getX() << "," << p2->getY() << ") \n";
    }
};

class Triangle
{

    Point *p1;
    Point *p2;
    Point *p3;

public:
    Triangle(Point *p1, Point *p2, Point *p3)
    {
        setPoints(p1, p2, p3);
    }

    void setPoints(Point *p1, Point *p2, Point *p3)
    {
        this->p1 = p1;
        this->p2 = p2;
        this->p3 = p3;
    }
    void print()
    {
        cout << "\ntop point :"
             << "(" << p1->getX() << "," << p1->getY() << ") \n";
        cout << "\nbottom left point :"
             << "(" << p2->getX() << "," << p2->getY() << ") \n";
        cout << "bottom right point :"
             << "(" << p3->getX() << "," << p3->getY() << ") \n";
    }
};

class Circle
{
    int radius;
    Point *originPoint;

public:
    Circle(int _radius, Point *_originPoint)
    {

        setRadius(_radius);
        setOriginPoint(_originPoint);
    }
    Circle() {}

    void setRadius(int _radius)
    {
        radius = _radius;
    }
    void setOriginPoint(Point *_originPoint)
    {
        originPoint = _originPoint;
    }
    void print()
    {
        cout << "\norigin point :"
             << "(" << originPoint->getX() << "," << originPoint->getY() << ") \n";
        cout << "radius : " << radius << endl;
    }
};
int main()
{
    Point p1(1, 2);
    Point p2(4, 5);
    Point p3(8, 9);
    Point p4(12, 13);
    Rectangle r1(&p1, &p2);
    cout << "rectangle one : ";
    r1.print();
    Rectangle r2;
    r2.setPoints(&p1, &p2);
    cout << endl
         << "rectangle two : ";
    r2.print();
    cout << endl
         << "triangle one : ";
    Triangle t1 = Triangle(&p1, &p2, &p3);
    t1.print();
    cout << endl
         << "Circle one : ";
    Circle c1 = Circle(12, &p4);
    c1.print();
    return 0;
}
