from django.urls import path

from books.views import index, show

urlpatterns = [
    path('index/', index, name='index'),
    path('show/<int:id>', show, name='show'),
]
