from django.urls import path

from books.views import index, show, create, delete, edit

app_name = "books"

urlpatterns = [

    path('index/', index, name='index'),
    path('show/<int:id>', show, name='show'),
    path('create/', create, name='create'),
    path('delete/<int:id>', delete, name='delete'),
    path('edit/<int:id>', edit, name='edit'),
]
