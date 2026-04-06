class Queue:
    def __init__(self):
        self._elements = []

    def insert(self, element):
        self._elements.append(element)

    def pop(self):
        if self.is_empty():
            print("queue is empty")
            return None
        return self._elements.pop(0)

    def is_empty(self) -> bool:
        return len(self._elements) == 0
