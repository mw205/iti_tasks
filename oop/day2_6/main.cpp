#include <iostream>

using namespace std;

int main()
{
    // take 2 numbers and print the first number in the power of the second
    int x, y , result = 1;
    cout << "Enter the first number: ";
    cin >> x;
    cout << "Enter the second number: ";
    cin >> y;

    for (int i = 0; i < y; i++)
    {
       result *= x;
    }

    cout << "Result = " << result;
    return 0;
}
