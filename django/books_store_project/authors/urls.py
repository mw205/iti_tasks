from django.urls import path

from authors.views import index

app_name = "authors"

urlpatterns = [
    path("index/", index, name="index"),
]
