from advanced_queue import AdvancedQueue
from queue_out_of_range_exception import QueueOutOfRangeException

if __name__ == "__main__":
    # q = Queue()
    # q.insert("Ali")
    # q.insert("Noor")
    # q.insert("Mostafa")
    #
    # print(q.pop())
    # print(q.pop())
    # print(q.pop())
    #
    # print(f"queue is empty? : {q.is_empty()}")
    q = AdvancedQueue("names", 3)
    q.insert("Ali")
    q.insert("Noor")
    q.insert("Mostafa")
    try:
        q.insert("Mohamed")
    except QueueOutOfRangeException as e:
        print(e)

    print(q.pop())
    print(q.pop())
    print(q.pop())
    print(f"queue is empty? : {q.is_empty()}")
    q2 = AdvancedQueue.get_queue("names")
    if q2:
        q2.insert("Mohamed")
        print(q2.pop())
    else:
        print("queue not found")
