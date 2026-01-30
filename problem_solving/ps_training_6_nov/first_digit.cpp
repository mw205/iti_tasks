#include <iostream>
using namespace std;
int main(int argc, char const *argv[])
{
    int x, firstDigit;
    cin >> x;
    firstDigit = x / 1000;
    if (firstDigit % 2 == 0)
    {
        cout << "EVEN";
    }
    else
    {
        cout << "ODD";
    }
}