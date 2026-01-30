#include <iostream>

using namespace std;


void printArrRecursively(int* arr, int n, int size)
{
    if(n==size)
    {
        return ;
    }

    printArrRecursively(arr,n+1, size);
    cout <<arr[n] << " ";
}
int main()
{
    int size = 5;
    int* arr = new int [size] {1,2,3,4,5};
    printArrRecursively(arr, 0, size );
    return 0;
}
