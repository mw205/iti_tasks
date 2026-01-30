#include <iostream>
#include<bits/stdc++.h>
using namespace std;

int binarySearch(int* arr, int arraySize, int n)
{
    //first check if the array is sorted
    for(int i = 0; i < arraySize-1; i++)
    {

        if(arr[i+1]<  arr[i])
        {
            cout <<"array is not sorted !!";
            return -1;
        }
    }
    int min, max, mid ;
    min = 0;
    max = arraySize-1;
    while(min<= max)
    {
        mid = min + (max - min) / 2;

        if(n == arr[mid])
        {
            return 1;
        }
        if(arr[mid] < n)
        {
            min = mid + 1;
        }
        else
        {
            max = mid - 1;
        }
    }
    return -1;
}

int main()
{
    int* arr = new int[6] {1, 2, 3, 4, 5, 6};
    if(binarySearch(arr,6,6)==1)
    {
        cout << "element found!!";
    }
    else
    {
        cout << "element not found !!";
    }
    return 0;
}
