from django.urls import path

from authors.views import index, delete, show, CreateAuthorView, UpdateAuthorView

app_name = "authors"

urlpatterns = [
    path("index/", index, name="index"),
    path("create/", CreateAuthorView.as_view(), name="create"),
    path("delete/<int:id>", delete, name="delete"),
    path("edit/<int:id>", UpdateAuthorView.as_view(), name="edit"),
    path("show/<int:id>", show, name="show")
]
