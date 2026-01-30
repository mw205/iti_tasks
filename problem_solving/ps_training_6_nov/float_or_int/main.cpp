#include <bits/stdc++.h>

using namespace std;

int main()
{
    float x ;
    int int_x;
    cin >> x;
    int_x = (int) x;
    if(x== int_x )
    {
        cout << "int " << int_x;
    }
    else
    {

        cout << "float " << int_x <<  " " << setprecision(3)<<  x-int_x;
    }
    return 0;
}
