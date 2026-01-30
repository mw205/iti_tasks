#include <iostream>
#include<bits/stdc++.h>
using namespace std;

void bubbleSort(vector<int>& arr)
{
    int n = arr.size();
    bool swapped =false;
    for (int i = 0; i < n - 1; i++)
    {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped)
            break;
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
    vector<int> arr = {5,4,3,2,1};
    bubbleSort(arr);
    printArr(arr);
    return 0;
}
