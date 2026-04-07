from django.contrib import admin
from django.urls import path

from aboutus.views import index

urlpatterns = [
    path('index/', index, name='index'),
]
