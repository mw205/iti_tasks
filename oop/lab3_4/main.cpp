#include <iostream>
#define size 5
using namespace std;

int main()
{
    int arr [size] ;// assume sorted first.
    bool sorted  = true;
    cout << "Enter the array to be sorted : " << endl ;
    for (int i = 0; i< size; i++)
    {
        cout << "enter the element : " << i+1<< " : ";
        cin >>  arr[i];
    }

    // check if it is sorted firstly
    for (int i = 0 ; i < size-1; i++)
    {
        if (arr[i]> arr[i+1])
        {
            sorted = false ;
            break;
        }


    }
    if (sorted)
    {
        cout << "already sorted";
        return 0;
    }

    // bubble sort
    for (int i = 0; i < size -1 ; i++)
    {

        for (int j = 0; j < size-i-1 ; j++)
        {
            if (arr[j] > arr[j+1])
            {
                swap(arr[j], arr[j+1]);
            }
        }

    }
    // print after sorting
    for (int i = 0; i < size; i++)
    {
        cout << arr[i] << "\t";
    }
    return 0;

}
