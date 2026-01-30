#include <iostream>

using namespace std;

struct Node

    int value;
    Node *prev;
};
class Stack
{
private:
    Node *tos;

public:
    Stack()
    {
        tos = nullptr;
    }
    void push(int value)
    {
        Node *temp = new Node();
        temp->value = value;
        temp->prev = tos;
        tos = temp;
    }

    int pop(int &x)
    {
        Node *temp;
        if (tos == nullptr)
        {
            return 0;
        }
        else
        {
            temp = tos;
            x = tos->value;
            tos = tos->prev;
            delete temp;
        }
        return 1;
    }
    int isEmpty()
    {
        return tos == nullptr;
    }
    int isFull()
    {
        Node *temp;
        if (temp == nullptr)
        {
            return 0;
        }
        else
        {
            delete temp;
            return 1;
        }
    }
    int peek(int &x)
    {
        if (isEmpty() != 1)
        {
            x = tos->value;
            return 1;
        }
        return 0;
    }
    void display()
    {
        if (isEmpty())
        {
            cout << "Stack is Empty!!";
            return;
        }

        Node *temp = tos;
        while (temp != nullptr)
        {
            cout << temp->value << " ";
            temp = temp->prev;
        }
        cout << endl;
    }
    ~Stack()
    {
        Node *temp;
        while (temp != nullptr)
        {
            temp = tos;
            tos = tos->prev;
            delete temp;
        }
    }
};

int main()
{
    Stack s;
    s.push(1);
    s.push(2);
    s.push(3);
    s.push(4);
    s.push(5);
    s.push(6);
    s.display();
    cout << endl;
    int x;
    s.pop(x);

    cout << "x : " << x << endl;
     s.peek(x);
     cout << "x : " << x << endl;
     s.display();
    return 0;
}
