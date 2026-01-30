#include <iostream>
#include<bits/stdc++.h>
using namespace std;
int partition(vector<int>& arr, int iBegin, int jEnd)
{
    int i = iBegin ;
    int j = jEnd;
    int pivot = i;
    while (true)
    {
        while(arr[pivot]<=arr[j] && pivot !=j)
        {
            j--;
        }
        if(pivot ==j)
        {
            break;
        }
        else if(arr[pivot]> arr[j])
        {
            swap(arr[j], arr[pivot]);
            pivot =j;
        }
        while(arr[pivot]>= arr[i] && pivot != i)
        {
            i++;
        }
        if(pivot == i)
        {
            break;
        }
        else if(arr[pivot] < arr[i])
        {
            swap(arr[pivot], arr[i]);
            pivot = i;
        }


    }
    return pivot;
}

void quickSort(vector<int>& arr, int low, int high)
{
    if (low < high)
    {
        int piv = partition(arr, low, high);
        quickSort(arr, low, piv - 1);
        quickSort(arr, piv + 1, high);
    }
}

void printArr(vector<int>arr)
{
    for(int i = 0; i < arr.size(); i++)
    {
        cout << arr[i]<< " ";
    }
}
int main()
{
    vector<int> arr = {6,4,3,2,1};
    quickSort(arr, 0, arr.size()-1);
    printArr(arr);
    return 0;
}
