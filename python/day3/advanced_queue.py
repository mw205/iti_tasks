from queue import Queue
from queue_out_of_range_exception import QueueOutOfRangeException


class AdvancedQueue(Queue):
    _instances: dict[str, 'AdvancedQueue'] = {}

    def __init__(self, name: str, size: int):
        super().__init__()
        self.__name = name
        self.size = size
        AdvancedQueue._instances[name] = self

    @property
    def size(self):
        return self.__size

    @size.setter
    def size(self, size):
        if size < 0:
            raise ValueError("Please Enter a positive value for size")
        if not isinstance(size, int):
            raise TypeError("Please Enter an integer value")
        self.__size = size

    def insert(self, element: object) -> None:
        if len(self._elements) == self.__size:
            raise QueueOutOfRangeException("Cannot insert more in the Queue: queue is full")
        else:
            super().insert(element)

    @classmethod
    def get_queue(cls, name) -> AdvancedQueue | None:
        return cls._instances.get(name)
