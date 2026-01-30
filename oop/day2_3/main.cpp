#include <iostream>

using namespace std;

int main()
{
    //user will enter 5 numbers print the summation of those numbers
    int n,sum =0;
    for(int i = 0; i<5; i++){
        cin>> n;
        sum +=n;
    }
    cout << "result = " << sum ;
    return 0;
}
