#include <iostream>
void swapByPointer(int *x, int *y);
using namespace std;

template <typename T>
void mySwap(T &x, T &y)
{
    T temp = x;
    x = y;
    y = temp;
}
int main()
{
    int x, y;

    cout << "enter elements to swap " << endl;
    cout << "the first element : ";
    cin >> x;
    cout << "the second element : ";
    cin >> y;
    swapByPointer(&x, &y);
    cout << "After Swap By Pointer: \n";
    cout << "first one becomes : " << x << endl;
    cout << "second one becomes : " << y << endl;

    mySwap<int>(x, y);
    cout << "After Swap By Template: \n";
    cout << "first one becomes : " << x << endl;
    cout << "second one becomes : " << y << endl;
    return 0;
}

void swapByPointer(int *x, int *y)
{
    int temp = *x;
    *x = *y;
    *y = temp;
}
