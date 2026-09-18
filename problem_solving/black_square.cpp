#include <iostream>
#include <string>

using namespace std;

void solve()
{
    int a1, a2, a3, a4, sum = 0;
    cin >> a1 >> a2 >> a3 >> a4;
    string s;
    cin >> s;
    for (char c : s)
    {
        switch (c)
        {
        case '1':
            sum += a1;
            break;
        case '2':
            sum += a2;
            break;
        case '3':
            sum += a3;
            break;
        case '4':
            sum += a4;
            break;
        default:
            break;
        }
    }
    cout << sum << endl;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

#ifdef LOCAL
    freopen("input.txt", "r", stdin);
#endif

    int t = 2;
    // cin >> t; // Uncomment if multiple test cases
    while (t--)
    {
        solve();
    }

    return 0;
}
