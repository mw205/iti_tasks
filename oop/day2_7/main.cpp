#include <iostream>
#include <string.h>
using namespace std;

int main()
{
    // mirror the number
    int number, mirrored = 0;
    cout << "Enter a number : ";
    cin >> number;
    while(number> 0)
    {
        int digit = number %10;
        mirrored = mirrored *10 + digit;
        number /=10;
    }
    cout <<"Mirrored : " << mirrored ;
    return 0;
}
