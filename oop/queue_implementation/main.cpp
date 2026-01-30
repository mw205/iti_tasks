#include <iostream>

using namespace std;

class Queue
{
    int low, high, size, count;
    int* arr;

public:
    Queue(int _size)
    {
        low = 0;
        high = -1;
        size = _size;
        arr= new int [size];
    }

    bool isFull()
    {
        return count == size;
    }
    bool isEmpty()
    {
        return count==0;
    }

    void enqueue(int x)
    {
        if (isFull())
        {
            cout << "Queue is full!!" << endl;
            return;
        }

        high = (high + 1) % size;
        arr[high] = x;

    }

    int dequeue(int& x)
    {
        if (isEmpty())
        {
            cout << "Queue is Empty" << endl;
            return 0;
        }

        x = arr[low];
        low = (low + 1) % size;

        return 1;
    }

    int getFirstElement()
    {
        return arr[low];
    } int getLastElement()
    {
        return arr[high];
    }
    ~Queue()
    {
        delete[]arr;
    }
};
int main()
{
    Queue q(5);

    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    q.enqueue(4);
    q.enqueue(5);
    cout<< "first element : "<<   q.getFirstElement() << endl;
    cout<< "last element : "<<   q.getLastElement() << endl;

    int dequeued = 0;
    q.dequeue(dequeued);
    q.dequeue(dequeued);
    q.dequeue(dequeued);
    q.dequeue(dequeued);
    cout<< "first element : "<<   q.getFirstElement() << endl;
    cout<< "last element : "<<   q.getLastElement() << endl;
    return 0;
}
