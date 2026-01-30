#include <iostream>
#include<bits/stdc++.h>
using namespace std;

void insertionSort(vector<int >& arr)
{
    int n = arr.size();
    for(int i = 1; i < n; i++)
    {
        int j = i-1;
        int element = arr[i];
        while(j>=0 && arr[j]> element)
        {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = element;
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
    vector<int> arr = {1,4,2,3,6};
    insertionSort(arr);
    printArr(arr);
    return 0;
}
