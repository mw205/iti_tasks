#include <iostream>
using namespace std;
int main(int argc, char const *argv[])
{
    char s;
    int n;

    cin >> s;
    cin >> n;

    for (int i = 0; i < n; i++)
    {
        int x;
        cin >> x;
        for (int i = 0; i < x; i++)
        {
            cout << s;
        }
        cout << endl;
    }

    return 0;
}
