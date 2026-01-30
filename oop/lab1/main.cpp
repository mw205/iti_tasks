#include <iostream>

using namespace std;

int main()
{
    char c, capitalC, smallC;
    cout << "Enter a character: ";
    cin >> c ;

    cout  <<"ASCII Value : "<< (int) c <<endl;
    if(c >=65 && c <=90)
    {
        smallC = c + 32;
        cout <<"small case :"<< smallC;
    }
    else if (c >=97 && c <=122)
    {
        capitalC = c -32;
        cout << "capital case : "<< capitalC << endl;
    }
    else
    {
        cout << "this is not a character" << endl;
    }
         return 0;
}
// octal , decimal , int to character
