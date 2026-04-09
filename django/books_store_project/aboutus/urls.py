from django.contrib import admin
from django.urls import path

from aboutus.views import index

app_name = "aboutus"

urlpatterns = [
    path('index/', index, name='index'),
]
