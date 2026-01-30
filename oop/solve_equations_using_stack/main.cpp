#include <iostream>
#include <string>
using namespace std;
template <typename T>
class Stack
{

    int tos;
    int size;
    T *arr;

public:
    Stack(int _size)
    {
        tos = -1;
        size = _size;
        arr = new T[size];
    }
    bool isEmpty()
    {
        return tos == -1;
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

    int pop(T &x)
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
    T peek()
    {
        if (tos != -1)
        {
            return arr[tos];
        }
        else
        {
            cout << "\nStack is Empty\n";
        }
    }
    int length()
    {
        return tos + 1;
    }
    // copy constructor

    Stack(Stack &s)
    {
        tos = s.tos;
        size = s.size;
        arr = new T[size];
        cout << "tos: " << tos << endl
             << "size : " << size << endl;
        for (int i = 0; i < tos + 1; i++)
        {
            arr[i] = s.arr[i];
        }
        for (int i = 0; i < tos + 1; i++)
        {
            cout << arr[i] << " ";
        }
        cout << endl;
    }

    // destructor
    ~Stack()
    {
        delete[] arr;
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

    Stack<float> numbers(equation.size());
    Stack<char> operators(equation.size());

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
