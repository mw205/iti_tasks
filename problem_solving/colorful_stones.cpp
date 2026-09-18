#include <iostream>
#include <string>

using namespace std;

void solve()
{
    int n = 1;
    string t;
    string s;
    cin >> s;
    cin >> t;
    for (int i = 0; i < t.length(); i++)
    {
        if (t[i] == s[n - 1])
        {
            n++;
        }
    }

    cout << n << endl;
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
