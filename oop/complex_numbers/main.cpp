#include <iostream>

using namespace std;

class ComplexNumber
{

    int real = 0;
    int img = 0;

public:
    static int no;
    // constructors

    ComplexNumber(int _real, int _img)
    {
        real = _real;
        img = _img;

        no++;
    }
    ComplexNumber() : ComplexNumber(0, 0)
    {
    }
    ComplexNumber(int _real) : ComplexNumber(_real, 0)
    {
    }
    void setReal(int real)
    {
        this->real = real;
    }
    void setImg(int img)
    {
        this->img = img;
    }
    int getReal()
    {
        return real;
    }
    int getImg()
    {
        return img;
    }
    void print()
    {
        if (img > 0)
            cout << real << "+" << img << "i" << endl;
        else if (img < 0)
            cout << real << img << "i" << endl;
        else
        {
            cout << real;
        }
    }

    void add(ComplexNumber c)
    {
        real += c.real;
        img += c.img;
    }
    ~ComplexNumber()
    {
        no--;
    }
    // copy constructor
    ComplexNumber(ComplexNumber &cn)
    {
        img = cn.img;
        real = cn.real;
        no++;
    }

    // operators overloading

    ComplexNumber operator+(ComplexNumber c)
    {
        ComplexNumber res(real + c.real, img + c.img);
        return res;
    }
    ComplexNumber operator+(int x)
    {

        ComplexNumber res(real + x, img);
        return res;
    }
    // for printing objects using cout <<
    friend ostream &operator<<(ostream &os, const ComplexNumber &c);
    // equality operator
    bool operator==(ComplexNumber c)
    {
        return (real == c.real && img == c.img);
    }
    // not equal operaotr
    bool operator!=(ComplexNumber c)
    {
        return !(c == *this);
    }
    // prefix operator

    ComplexNumber &operator++()
    {
        real++;
        img++;
        return *this;
    }
    // postfix operator
    ComplexNumber operator++(int)
    {
        ComplexNumber temp;
        temp.real = real;
        temp.img = img;
        real++;
        img++;
        return temp;
    }
    // explicit cast
    explicit operator int()
    {
        return real;
    }
    // operator for using cout <<
    friend ostream &operator<<(ostream &os, const ComplexNumber &c);
    // operator to add int to complex
    friend ComplexNumber operator+(int x, ComplexNumber c);
};
ostream &operator<<(ostream &os, const ComplexNumber &c)
{
    if (c.img > 0)
        os << c.real << "+" << c.img << "i" << endl;
    else if (c.img < 0)
        os << c.real << c.img << "i" << endl;
    else
    {
        os << c.real;
    }
    return os;
}
ComplexNumber operator+(int x, ComplexNumber c)
{

    ComplexNumber res(c.getReal() + x, c.getImg());
    return res;
}
// standalone function for subtraction
ComplexNumber subtractComplex(ComplexNumber c1, ComplexNumber c2);
// standalone function for printing complex number
void printComplexNumber(ComplexNumber c1);
int ComplexNumber ::no = 0;
int main()
{
    ComplexNumber c1(3, 2), c2(4), c3(0, 0);
    c2.setImg(3);
    cout << "c1: ";
    c1.print();
    cout << "c2: ";
    c2.print();
    cout << "c3 (c1-c2): ";
    c3 = subtractComplex(c1, c2);
    cout << "using standalone print c3 : " << endl;
    printComplexNumber(c3);
    c3.print();
    cout << "c1 += c2 : ";
    c1.add(c2);
    c1.print();
    cout << endl
         << "c3 = c1+c2 = ";
    c3 = c1 + c2;
    // try to use <<
    cout << c3 << endl;
    c2++;
    ++c1;
    cout << "cout after using prefix addition " << c1 << endl;
    cout << "cout after using postfix addition " << c2 << endl;
    int x = (int)c3;
    cout << "x = " << x << endl;
    c2 = c1;
    if (c1 == c2)
    {
        cout << "c1 == c2" << endl;
    }
    if (c1 != c3)
    {
        cout << "c1 != c3" << endl;
    }

    cout
        << endl
        << "no complex number :" << ComplexNumber::no;

    return 0;
}

ComplexNumber subtractComplex(ComplexNumber c1, ComplexNumber c2)
{
    ComplexNumber res;
    res.setReal(c1.getReal() - c2.getReal());
    res.setImg(c1.getImg() - c2.getImg());

    return res;
}

void printComplexNumber(ComplexNumber c1)
{
    if (c1.getImg() > 0)
        cout << c1.getReal() << "+" << c1.getImg() << "i" << endl;
    else
        cout << c1.getReal() << c1.getImg() << "i" << endl;
}
