#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
#include <set>
#include <queue>
#include <stack>
#include <cmath>
#include <iomanip>

using namespace std;

void solve()
{
    int n;
    cin >> n;
    int availableOfficers = 0;
    int untreatedCrimes = 0;
    for (int i = 0; i < n; i++)
    {
        int event;
        cin >> event;
        if (event > 0)
        {
            availableOfficers += event;
        }
        else
        {
            if (availableOfficers > 0)
            {
                availableOfficers--;
            }
            else
            {
                untreatedCrimes++;
            }
        }
    }
    cout << untreatedCrimes << endl;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

#ifdef LOCAL
    freopen("input.txt", "r", stdin);
#endif

    int t = 1;
    // cin >> t; // Uncomment if multiple test cases
    while (t--)
    {
        solve();
    }

    return 0;
}
