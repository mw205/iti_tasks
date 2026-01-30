#include <iostream>

using namespace std;

int main()
{
    //Enter a number and check if the number is even or odd
    int number;
    cout << "Enter a number : ";
    cin >> number;
    if (number % 2 == 1)
    {
        cout << "odd number";
    }
    else
    {
        cout << "even number";
    }

    return 0;
}
