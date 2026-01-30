#include <iostream>
#include <conio.h>
using namespace std;

int main()
{
    char ch;
    // make a menu
    do

    {
        system("cls");
        cout << "\nNew\nDisplay\nExit \n";
        cout << "Enter a character (n/d/e) : ";
        ch = getche();
        cout <<endl;
        switch (ch)
        {
        case 'e':
        case 'E':
            cout << "Exit Selected";
            break;
        case 'd':
        case 'D':
            cout << "Display selected";
   getch();
        continue;
        case 'n':
        case 'N':
            cout << "new selected";
        }
        getch();
    }
    while (ch!= 'e' );

    return 0;
}
