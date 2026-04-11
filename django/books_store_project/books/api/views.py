from rest_framework import viewsets

from books.api.serializers import BookModelSerializer
from books.models import Book


class BooksViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookModelSerializer
