#include <iostream>

using namespace std;

int main()
{
    // Student will enter the degree and get the degree.
    cout << "Enter your degree: ";
    int degree;
    cin >> degree;

    if (degree <= 100 && degree >= 90)
    {
        cout << "Excellent";
    }
    else if (degree <= 89 && degree >= 75)
    {
        cout << "Very good";
    }
    else if (degree <= 74 && degree >= 65)
    {
        cout << "Good";
    }
    else if (degree <= 64 && degree >= 60)
    {
        cout << "Pass";
    }
    else if (degree > 100 || degree < 0){
        cout << "Invalid degree";
    }
    else
    {
        cout << "Fail";
    }
    return 0;
}
