#include <iostream>

using namespace std;

int main()
{
    int x;
    cout << "Enter a number : ";
    cin >> x;
    printf("Dec: %d\n", x);
    printf("Hex: %X\n", x);
    printf("OCT: %o\n", x);
    if((x >= 'A' && x <='Z') || (x >= 'a' && x <='z'))
    {
        printf("Char: %c \n",x);

    }
    return 0;
}
