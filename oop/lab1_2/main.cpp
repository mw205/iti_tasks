#include <iostream>

using namespace std;

int main()
{
    int x,y ;
    cout << "enter the first number : "<< endl;
    cin>> x ;
    cout << "enter the second number : "<< endl;
    cin>> y;
    cout << "addition : " << x+y << endl;
    cout << "subtraction :" << x-y << endl;
    cout << "multiplication:" << x*y << endl;
    if(y == 0){
        cout<< "Can't divide by 0" << endl;
    }
   else{
     cout << "division: " << x/y << endl;
   }
    cout << "modulus: " <<x%y << endl;
    return 0;
}
