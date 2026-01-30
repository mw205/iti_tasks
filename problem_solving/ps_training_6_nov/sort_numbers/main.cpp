#include <bits/stdc++.h>

using namespace std;

void swap(int&x,int&y)
{
    int temp = x;
    x = y;
    y = temp;
}
int main()
{
    int x, y, z, low, mid, high;
    cin>> x >> y >> z;
    low = x;
    mid =y;
    high = z;
    if (x>y)
    {
        swap(x, y);
    }
    if (y>z)
    {
        swap(y,z);
    }
    if (x > y)
    {
        swap(x, y);
    }
    cout << x << endl<< y<<endl<<z<<endl;
    cout <<  endl<< low << endl << mid<<  endl<<  high;
}
