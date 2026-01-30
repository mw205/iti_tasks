#include <iostream>

using namespace std;
template <class T>
class Stack
{

    int tos;
    int size;
    T *arr;

public:
    Stack(int _size = 0)
    {
        tos = -1;
        size = _size;
        arr = new T[size];
    }

    void push(T x)
    {
        if (tos < size - 1)
        {
            tos++;
            arr[tos] = x;
        }
        else
        {
            cout << "Stack is full!!";
        }
    }

    int pop(int &x)
    {
        if (tos >= 0)
        {
            x = arr[tos];
            tos--;
            return 1;
        }
        else
        {
            cout << "Stack is Empty";
            return 0;
        }
    }
    void peek()
    {
        if (tos != -1)
        {
            cout << "top element : " << arr[tos] << endl;
        }
        else
        {
            cout << "\nStack is Empty\n";
        }
    }
    // copy constructor

    Stack(Stack &s)
    {
        tos = s.tos;
        size = s.size;
        arr = new T[size];
        for (int i = 0; i <= tos; i++)
        {
            arr[i] = s.arr[i];
        }

        cout << endl;
    }

    // destructor
    ~Stack()
    {
        delete[] arr;
    }

    Stack &operator=(const Stack &s)
    {
        if (this == &s)
        {
            return *this;
        }

        size = s.size;
        tos = s.tos;
        delete[] arr;
        arr = new T[size];
        for (int i = 0; i <= tos; i++)
        {
            arr[i] = s.arr[i];
        }

        return *this;
    }
    Stack operator+(const Stack &s)
    {
        Stack res(size + s.size);
        res.tos = tos + s.tos + 1;

        // copy the elements from the first stack
        for (int i = 0; i <= tos; i++)
        {
            res.arr[i] = arr[i];
        }
        // copy the elements from the second stack
        for (int i = 0; i <= s.tos; i++)
        {
            res.arr[i + tos + 1] = s.arr[i];
        }
        return res;
    }

    int getSize()
    {
        return size;
    }
};
int main()
{
    Stack<int> s1(5);
    int popped = 0;
    s1.push(10);
    s1.push(20);
    s1.push(30);
    cout << endl;
    cout << "s1 top: ";
    s1.peek();

    Stack<int> s2(3);
    s2.push(40);
    s2.push(50);
    cout << "s2 top: ";
    s2.peek();

    Stack<int> s3(s1.getSize() + s2.getSize());
    s3 = s1 + s2;
    cout << "\ns3 (s1 + s2) top: ";
    s3.peek(); // Should be 50

    cout << "\nPopping from s3:" << endl;
    s3.pop(popped);
    cout << "Popped: " << popped << endl; // 50
    s3.pop(popped);
    cout << "Popped: " << popped << endl; // 40
    s3.pop(popped);
    cout << "Popped: " << popped << endl; // 30
    return 0;
}
