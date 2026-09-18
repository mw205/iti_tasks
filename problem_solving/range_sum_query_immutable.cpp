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

class NumArray
{
public:
    vector<int> nums;
    NumArray(vector<int> &nums)
    {
        this->nums = nums;
    }

    int sumRange(int left, int right)
    {
        int sum = 0;
        for (int i = left; i <= right; i++)
        {
            sum += nums[i];
        }
        return sum;
    }
};

// void solve()
// {
//     NumArray na = new NumArray(new);
// }

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

#ifdef LOCAL
    freopen("input.txt", "r", stdin);
#endif

    // int t = 1;
    // // cin >> t; // Uncomment if multiple test cases
    // while (t--)
    // {
    //     solve();
    // }
    vector<int> v = vector<int>();
    NumArray nr = NumArray(v);
    cout << nr.sumRange(0, 2);
    int i =0;
    to_string(i);
    return 0;
}
