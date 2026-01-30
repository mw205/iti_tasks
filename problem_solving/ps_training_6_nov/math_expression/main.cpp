#include <iostream>

using namespace std;

int main()
{
    int x, y, result ;
    char s, q;
    cin >> x>> s >> y>> q >> result;
    switch(s)
    {
    case '+':
        if(x+y == result)
        {
            cout <<"Yes";
        }
        else
        {
            cout << x+y;
        }
        break;
    case '-':
        if(x-y == result)
        {
            cout <<"Yes";
        }
        else
        {
            cout << x-y;
        }
        break;
        break;
    default:
        if(x*y == result)
        {
            cout <<"Yes";
        }
        else
        {
            cout << x*y;
        }
        break;
        break;

    }
    return 0;
}
