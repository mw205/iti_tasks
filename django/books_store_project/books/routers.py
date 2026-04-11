from rest_framework.routers import DefaultRouter

from books.api.views import BooksViewSet

router = DefaultRouter()
router.register('books_view', BooksViewSet, basename='books')
