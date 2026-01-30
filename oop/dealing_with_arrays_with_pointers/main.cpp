#include <iostream>
#define size 5
using namespace std;

int main()
{
    int arr[size] = {1, 2, 3, 4, 5};
    int *ptr;
    ptr = arr;
    cout << "print elements with pointer : " << endl;
    for (int i = 0; i < size; i++)
    {
        cout << *(ptr + i) << " ";
    }
    cout << "\nprint elements with pointer using indecis : " << endl;
    for (int i = 0; i < size; i++)
    {
        cout << ptr[i] << " ";
    }

    cout << "\nprint elements with normal indecis : " << endl;
    for (int i = 0; i < size; i++)
    {
        cout << arr[i] << " ";
    }
    cout << "\nprint elements with array name as pointer : " << endl;
    for (int i = 0; i < size; i++)
    {
        cout << *(arr+i) << " ";
    }

    return 0;
}
