from django.urls import path

from authors.views import index

urlpatterns = [
    path('index/', index, name='index'),

]
