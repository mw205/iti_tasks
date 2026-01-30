#include <bits/stdc++.h>
using namespace std;

int main()
{
    int n;
    float years, months;
    cin >> n;
    years = (float)(n/365);
    n-=years*365;
    months= float(n/30);
    n-=months*30;
    cout << years  <<" years\n";
    cout << months <<" months\n";
    cout << n << " days";
    return 0;
}
