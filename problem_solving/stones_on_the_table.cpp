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
    int n, result = 0;
    cin >> n;
    string s;
    cin >> s;
    for (int i = 0; i < n - 1; i++)
    {
        if (s[i] == s[i + 1])
        {
            result++;
        }
    }
    cout << result;
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
