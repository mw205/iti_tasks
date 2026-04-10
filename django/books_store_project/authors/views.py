from django.shortcuts import render, redirect, reverse
from django.views import View

from authors.forms import AuthorsModelForm
from authors.models import Author


# Create your views here.
def index(request):
    authors = Author.objects.all()
    return render(request, "authors/index.html", context={"authors": authors})


def delete(request, id):
    Author.get_author_by_id(id).delete()

    return redirect(reverse("authors:index"))


def show(request, id):
    author = Author.get_author_by_id(id)
    return render(request, "authors/show.html", context={"author": author})


class CreateAuthorView(View):
    def get(self, request):
        form = AuthorsModelForm()
        return render(request, 'authors/create.html', {"form": form})

    def post(self, request):
        form = AuthorsModelForm(request.POST, request.FILES)
        if form.is_valid():
            author = form.save()
            return redirect(author.show_url)
        return render(request, 'authors/create.html', {"form": form})


class UpdateAuthorView(View):
    def get(self, request, id):
        author = Author.get_author_by_id(id)
        form = AuthorsModelForm(instance=author)
        return render(request, 'authors/edit.html', context={"form": form, "author": author})

    def post(self, request, id):
        author = Author.get_author_by_id(id)
        form = AuthorsModelForm(request.POST, request.FILES, instance=author)
        if form.is_valid():
            form.save()
            return redirect(author.show_url)
        return render(request, 'authors/edit.html', context={"form": form, "author": author})
