#include <iostream>
#include <string>
using namespace std;
int main(int argc, char const *argv[])
{
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        int x;
        cin >> x;
        string xs = to_string(x);
        for (int i = xs.length() - 1; i >= 0; i--)
        {
            cout << xs[i];
            if (i > 0)
            {
                cout << " ";
            }
        }
    }

    return 0;
}
