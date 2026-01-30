#include <iostream>

using namespace std;

class Fraction
{
private:
    int
        numerator;
    int
        denominator;

public:
    Fraction(int numerator, int denominator)
    {
        setNumerator(numerator);
        setDenominator(denominator);
    }
    Fraction()
    {
        setNumerator(0);
        setDenominator(1);
    }

    void setNumerator(int numerator)
    {
        this->numerator = numerator;
    }
    void setDenominator(int denominator)
    {
        if (denominator != 0)
        {
            this->denominator = denominator;
        }
        else
        {
            this->denominator = 1;
        }
    }

    int getNumerator()
    {
        return numerator;
    }

    int getDenominator()
    {
        return denominator;
    }
    void print()
    {
        cout << getNumerator() << "/" << getDenominator() << endl;
    }

    Fraction add(Fraction f)
    {
        Fraction result;
        result.numerator = (getNumerator() * f.getDenominator()) + (f.getNumerator() * getDenominator());
        result.denominator = getDenominator() * f.getDenominator();
        int gcd = 1;
        for (int i = 1; i <= result.numerator && i <= result.denominator; i++)
        {
            if (result.numerator % i == 0 && result.denominator % i == 0)
            {
                gcd = i;
            }
        }
        result.numerator /= gcd;
        result.denominator /= gcd;
        return result;
    }
    // plus operator
    Fraction operator+(Fraction f)
    {

        Fraction result;
        result.numerator = (getNumerator() * f.getDenominator()) + (f.getNumerator() * getDenominator());
        result.denominator = getDenominator() * f.getDenominator();
        int gcd = 1;
        for (int i = 1; i <= result.numerator && i <= result.denominator; i++)
        {
            if (result.numerator % i == 0 && result.denominator % i == 0)
            {
                gcd = i;
            }
        }
        result.numerator /= gcd;
        result.denominator /= gcd;
        return result;
    }
    // fraction + int

    Fraction operator+(int x)
    {
        Fraction xFraction = Fraction(x * getDenominator(), getDenominator());
        return xFraction + *this;
    }

    bool operator==(Fraction f)
    {
        return (getNumerator() == f.getNumerator() && getDenominator() == f.getDenominator());
    }
    bool operator!=(Fraction f)
    {
        return !(*this == f);
    }
    Fraction operator++()
    {
        numerator++;
        denominator++;
        return *this;
    }
    Fraction operator++(int)
    {
        Fraction temp;
        temp.numerator = numerator;
        temp.denominator = denominator;
        numerator++;
        denominator++;
        return temp;
    }
    // << operator
    friend ostream &operator<<(ostream &os, const Fraction &f);

    friend Fraction operator+(int x, Fraction f);
};
ostream &operator<<(ostream &os, const Fraction &f)
{
    os << f.numerator << "/" << f.denominator;
    return os;
}
Fraction operator+(int x, Fraction f)
{
    Fraction xFraction = Fraction(x * f.getDenominator(), f.getDenominator());
    return xFraction + f;
}
int main()
{
    Fraction f1(3, 2);
    cout << "Fraction 1: ";
    f1.print();
    Fraction f2(5, 4);
    cout << "Fraction 2: ";
    f2.print();
    cout << "Addition: ";
    Fraction f3 = f1.add(f2);
    f3.print();
    cout << "f1 + 2 : " << f1 + 2 << endl;
    cout << "f3 + 1 : " << f1 + 1 << endl;

    f3++;
    ++f1;
    cout << "++f1 : " << f1 << endl;
    cout << "f3++ : " << f3 << endl;
    if (f1 == f2)
    {
        cout << "f1 == f2" << endl;
    }
    if (f1 != f3)
    {
        cout << "f1 != f3" << endl;
    }
    return 0;
}
