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

class Solution
{
public:
    vector<int> plusOne(vector<int> &digits)
    {

        digits[digits.size() - 1] += 1;
        for (int i = digits.size() - 1; i > 0; i--)
        {
            if (digits[i] == 10)
            {
                cout << digits[i] << " ";
                digits[i] = 0;
                digits[i - 1] += 1;
            }
        }
        if (digits[0] == 10)
        {
            digits = vector<int>(digits.size() + 1);
            digits[0] = 1;
            digits[1] = 0;
        }
        return digits;
    }
};

/**
 * Problem Solving Template
 *
 * Fast I/O: ios_base::sync_with_stdio(false); cin.tie(NULL);
 */

void solve()
{
    Solution s = Solution();
    vector<int> v = vector<int>({9});
    v = s.plusOne(v);
    for (int i = 0; i < v.size(); i++)
    {
        cout << v[i] << " ";
    }
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
