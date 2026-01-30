#include <iostream>
#include <string>
using namespace std;

template <typename T>
struct Node
{
    T value;
    Node *prev;
};

template<typename T>
class Stack
{
private:
    Node<T> *tos;

public:
    Stack()
    {
        tos = nullptr;
    }
    void push(T value)
    {
        Node<T> *temp = new Node<T>();
        temp->value = value;
        temp->prev = tos;
        tos = temp;
    }

    int pop(T &x)
    {
        Node<T> *temp;
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
        Node<T> *temp;
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
    int peek(T &x)
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

        Node<T> *temp = tos;
        while (temp != nullptr)
        {
            cout << temp->value << " ";
            temp = temp->prev;
        }
        cout << endl;
    }
    ~Stack()
    {
        Node<T> *temp;
        while (temp != nullptr)
        {
            temp = tos;
            tos = tos->prev;
            delete temp;
        }
    }
};

int getPrecedence(char op)
{
    if (op == '+' || op == '-')
    {
        return 1;
    }
    else if (op == '*' || op == '/' || op == '%')
    {
        return 2;
    }
    else
    {
        return 0;
    }
}

float applyOperation(float n1, float n2, char op)
{
    switch (op)
    {
    case '+':
        return n1 + n2;
        break;
    case '-':
        return n1 - n2;
        break;
    case '*':
        return n1 * n2;
        break;
    case '/':
        return n1 / n2;
        break;

    case '%':
        return (int)n1 % (int)n2;
        break;
    default:
        return 0;
    }
}
int main()
{
    string equation;
    cout << "Enter equation: ";
    getline(cin, equation);

    Stack<float> numbers();
    Stack<char> operators();

    float result = 0;

    for (int i = 0; i < equation.size(); i++)
    {

        if (isspace(equation[i]))
        {
            continue;
        }

        // create the numbers stack
        if (equation[i] >= '0' && equation[i] <= '9')
        {
            float number = 0;
            while (i < equation.size() && equation[i] >= '0' && equation[i] <= '9')
            {
                // to handle multi digit number
                number = number * 10 + equation[i] - '0';
                i++;
            }
            numbers.push(number);
            i--;
        }
        // first compute the numbers inside paranthesis
        else if (equation[i] == '(')
        {
            operators.push(equation[i]);
        }
        else if (equation[i] == ')')
        {
            while (!operators.isEmpty() && operators.peek() != '(')
            {
                char op;
                float num1, num2;
                if (operators.pop(op) && numbers.pop(num2) && numbers.pop(num1))
                {
                    numbers.push(applyOperation(num1, num2, op));
                }
            }
            char temp;
            if (!operators.isEmpty())
            {
                operators.pop(temp); // Pop the '('
            }
        }
        else
        {
            // handling operators with higher precendence.
            while (!operators.isEmpty() && getPrecedence(operators.peek()) >= getPrecedence(equation[i]))
            {
                char op;
                float num1, num2;
                if (operators.pop(op) && numbers.pop(num2) && numbers.pop(num1))
                {
                    numbers.push(applyOperation(num1, num2, op));
                }
            }
            // inserting operators.
            operators.push(equation[i]);
        }
    }

    // Final calculation loop is now outside the for loop
    while (!operators.isEmpty())
    {
        char op;
        float num1, num2;
        if (operators.pop(op) && numbers.pop(num2) && numbers.pop(num1))
        {
            numbers.push(applyOperation(num1, num2, op));
        }
        else
        {
            cout << "invalid equation";
            return 1;
        }
    }

    if (numbers.pop(result))
    {
        cout << "result : " << result << endl;
    }
    else
    {
        cout << "invalid equation";
    }

    return 0;
}
