from django.urls import path

from authors.views import index, create, delete, edit

app_name = "authors"

urlpatterns = [
    path("index/", index, name="index"),
    path("create/", create, name="create"),
    path("delete/<int:id>", delete, name="delete"),
    path("edit/<int:id>", edit, name="edit"),
]
