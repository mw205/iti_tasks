#include <iostream>

using namespace std;
int getStrlen(const char *str)
{
    if (str == nullptr)
    {
        return 0;
    }
    int i = 0;
    while (str[i] != '\0')
    {
        i++;
    }

    return i;
}

void myStrCopy(char *dest, const char *src)
{
    int len = getStrlen(src);
    for (int i = 0; i <= len; i++) // <= to copy the null terminator
    {
        dest[i] = src[i];
    }
}

class MyString
{
private:
    int size;
    char *str;

public:
    MyString() : size(0), str(new char[1])
    {
        str[0] = '\0';
    }
    MyString(const char *input_str)
    {
        if (input_str)
        {
            size = getStrlen(input_str);
            str = new char[size + 1]; // +1 for null character '\0'
            myStrCopy(str, input_str);
        }
        else
        {
            size = 0;
            str = new char[1];
            str[0] = '\0';
        }
    }
    // Copy constructor
    MyString(const MyString &other)
    {
        size = other.size;
        str = new char[size + 1];
        myStrCopy(str, other.str);
    }

    ~MyString()
    {
        delete[] str;
    }

    char &operator[](int index)
    {
        return str[index];
    }

    MyString &operator=(const MyString &other)
    {
        // if it is being checked with itself
        if (this == &other)
        {
            return *this;
        }
        delete[] str;
        // Allocate new resource and copy data
        size = other.size;
        str = new char[size + 1];
        myStrCopy(str, other.str);
        return *this;
    }

    // Assignment operator from character array
    MyString &operator=(const char *input_str)
    {
        delete[] str;
        if (input_str)
        {
            size = getStrlen(input_str);
            str = new char[size + 1];
            myStrCopy(str, input_str);
        }
        else
        {
            size = 0;
            str = new char[1];
            str[0] = '\0';
        }
        return *this;
    }

    // Concatenation overloading
    MyString operator+(const MyString &other) const
    {
        int newSize = size + other.size;
        char *temp = new char[newSize + 1];

        // Copy current object's string
        for (int i = 0; i < size; i++)
        {
            temp[i] = str[i];
        }
        // Copy other object's string
        for (int i = 0; i < other.size; i++)
        {
            temp[i + size] = other.str[i];
        }
        temp[newSize] = '\0';

        MyString result(temp);
        delete[] temp;

        return result;
    }

    // overlaod > operator of between two strings to sort them alphabitically
    bool operator>(MyString &other)
    {
        return str[0] > other.str[0];
    }
    bool operator<(MyString &other)
    {
        return str[0] < other.str[0];
    }
    bool operator<=(MyString &other)
    {

        return str[0] <= other.str[0];
    }
    bool operator>=(MyString &other)
    {

        return str[0] >= other.str[0];
    }

    bool operator==(MyString &other)
    {
        bool equal = true;
        if (size != other.size)
        {
            return false;
        }

        for (int i = 0; i < size; i++)
        {
            if (str[i] != other.str[i])
            {
                equal = false;
                break;
            }
        }

        return equal;
    }

    bool operator!=(MyString &other)
    {
        return !(*this == other);
    }

    MyString toUpper()
    {
        MyString result(*this);
        for (int i = 0; i < size; i++)
        {
            if (result.str[i] >= 'a' && result.str[i] <= 'z')
            {
                result.str[i] = result.str[i] - 32;
            }
        }
        return result;
    }
    MyString toLower()
    {
        MyString result(*this);
        for (int i = 0; i < size; i++)
        {
            if (str[i] >= 'A' && str[i] <= 'Z')
            {
                result[i] = result.str[i] + 32;
            }
        }

        return result;
    }
    friend ostream &
    operator<<(ostream &os, const MyString &s);
};

ostream &operator<<(ostream &os, const MyString &s)
{
    os << s.str;
    return os;
}

int main()
{
    MyString s1("Hello");
    MyString s2 = ", World!";
    MyString s3;

    s3 = s1 + s2;

    cout << "s1: " << s1 << endl;
    cout << "s2: " << s2 << endl;
    cout << "s3 (concatenated): " << s3 << endl;
    cout << "s3[4] is: " << s3[4] << endl; // 'o'

    MyString str1("apple");
    MyString str2("banana");
    MyString str3("mangoo");
    cout << (str1 < str2) << endl;  // 1 (true)
    cout << (str1 > str2) << endl;  // 0 (false)
    cout << (str1 <= str2) << endl; // 1 (true)
    cout << (str1 >= str2) << endl; // 0 (false)
    cout << (str1 == str2) << endl; // 0 (false)
    cout << (str1 != str2) << endl; // 1 (true)

    // to upper and to lower
    str1 = str1.toUpper();
    cout << str1 << endl;
    cout << str1.toLower();
    return 0;
}
