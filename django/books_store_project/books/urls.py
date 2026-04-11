from django.urls import path, include

from books.views import index, show, delete, CreateBookView, UpdateBookView

app_name = "books"

urlpatterns = [
    path('index/', index, name='index'),
    path('show/<int:id>', show, name='show'),
    path('create/', CreateBookView.as_view(), name='create'),
    path('delete/<int:id>', delete, name='delete'),
    path('edit/<int:id>', UpdateBookView.as_view(), name='edit'),
    path('api/', include("books.api.urls")),
]
