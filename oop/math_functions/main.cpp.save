#include <iostream>
int factorial (int number);
int pow(int number, int power);
int reverse(int number);
using namespace std;

int main()
{
    int number, power;
    cout << "enter a number : ";
    cin>> number;
    cout << "factorial = " << factorial(number) << endl;
    cout << "enter a number : ";
    cin >> number;
    cout << "enter the power : ";
    cin >> power;
    cout << "result = " << pow(number, power) << endl;
    cout << "enter a number to reverse : ";
    cin >> number;
    cout << "result = " << reverse(number);
    return 0;
}
int factorial (int number)
{
    // stop if number is 0 or 1
    if(number == 0 || number == 1)
        return number;
    int result = number;
    for (int i = number-1; i>= 1; i--)
        result *= i;

    return result;
}

int pow(int number, int power)
{
    int result = 1;
    for (int i = 0; i <power; i++)
        result *= number ;
    return result;
}

int reverse(int number)
{
    int result = 0;
    while(number != 0)
    {
        int digit = number%10;
        result = result*10 + digit;
        number /= 10;
    }
    return result;
}
