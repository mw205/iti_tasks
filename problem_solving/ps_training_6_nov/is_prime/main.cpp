#include <iostream>

using namespace std;

int main()
{
    int x ;
    cin >> x;
    bool isPrime = true;
    for(int i =2; i<=x; i++)
    {
        if (x%i == 0 && x!=i)
        {
            isPrime =false;
            break;
        }
    }
    if(isPrime)
    {

        cout <<"YES";
    }
    else
    {
        cout << "NO";
    }
    return 0;
}
