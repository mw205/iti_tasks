#include <iostream>
#include <windows.h>

#define rows 3
#define cols 3
using namespace std;

void textattr(int i)
{
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), i);
}
int main()
{
    int matrix [3][3];
    cout << "Enter the matrix: "<< endl;
    for(int i = 0; i < rows ; i ++ )
    {
        for (int j = 0 ; j < cols ; j++)
        {
            cout << "element : " << i+1 << " × "<< j+1 << " : " ;
            cin >> matrix [i][j];
        }
    }
    // print matrix, and print sum, avg

    // row added for printing avg
    for (int i = 0; i < rows; i ++)
    {
        int sum = 0;
        for (int j = 0; j < cols; j ++)
        {
            sum +=matrix [i][j];
            cout << matrix[i][j] << "\t";
        }
        textattr(0x70);
        cout << sum << endl;
        textattr(0x07);

    }
    // printing average in the last row
    for (int i = 0; i < rows; i ++ )
    {
        int colSum = 0;
        for (int j = 0; j < cols;  j ++)
        {
            colSum +=matrix [j][i];

        }
        textattr(0x73);
        cout << colSum/3 << "\t";
        textattr(0x07);
    }


    cout << endl;
    return 0;
}
