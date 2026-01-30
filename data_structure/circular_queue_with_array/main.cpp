#include <iostream>

using namespace std;

class CircularQueue
{

    int rear;
    int front;
    int *arr;
    int size;

public:
    CircularQueue(int queueSize)
    {
        rear = front = -1;
        size = queueSize;
        arr = new int[size];
    }
    int isEmpty()
    {
        return front == -1;
    }
    int isFull()
    {
        return (rear == size - 1 && front == 0) || (front == rear + 1);
    }
    int enqueqe(int x)
    {
        if (isFull() ==1)
        {
            return 0;
        }

        // handle the first entered number
        if (rear == -1)
        {
            rear = front = 0;
        }
        // add circular behaviour
        else if (rear == size - 1)
        {
            rear = 0;
        }

        else
        {
            rear++;
        }
        arr[rear] = x;
        return 1;
    }

    int dequeque(int &x)
    {
        // handle empty queue case
        if (isEmpty()==1)
        {
            cout <<"\nQueue is Empty";
            return 0;
        }
        else
        {
            x = arr[front];

            if (front == rear)
            {
                front = rear = -1;
            }
            // add circular behaviour

            else if (front == size - 1)
            {
                front =0;
            }
            else
            {
                front++;
            }
        }
        return 1;
    }

    void display()
    {
        if (isEmpty())
        {
            cout << "Queue is Empty!!" << endl;
            return;
        }
        if (front <= rear)
        {
            for (int i = front; i <= rear; i++)
            {
                cout << arr[i] << " ";
            }
        }
        else
        {
            for (int i = front; i < size; i++)
            {
                cout << arr[i] << " ";
            }
            for (int i = 0; i <= rear; i++)
            {
                cout << arr[i];
            }
        }
    }
};
int main()
{
    CircularQueue q = CircularQueue(5);
    /* q.enqueqe(1);
     q.enqueqe(2);
     q.enqueqe(3);
     q.enqueqe(4);
     q.enqueqe(5);
     q.enqueqe(6);
     q.display();
     */
  /*  int x = 0;
    q.enqueqe(1);
    q.enqueqe(2);
    q.enqueqe(3);
    q.dequeque(x);
    q.dequeque(x);
    q.enqueqe(4);
    q.enqueqe(5);
    q.enqueqe(1);
    q.enqueqe(2);
    q.display();
*/
    return 0;
}
