#include <iostream>
#include <string>
using namespace std;
int main(int argc, char const *argv[])
{
    int x, y;
    cin >> x >> y;
    bool lucky_found = false;
    for (int i = x; i <= y; i++)
    {
        string i_string = to_string(i);
        bool isLucky = true;
        for (int j = 0; j < i_string.length(); j++)
        {
            if (!(i_string[j] == '4' || i_string[j] == '7'))
            {
                isLucky = false;
                break;
            }
        }
        if (isLucky)
        {
            lucky_found = true;
            cout << i_string << " ";
        }
    }
    if (lucky_found == false)
    {
        cout << -1;
    }

    return 0;
}
