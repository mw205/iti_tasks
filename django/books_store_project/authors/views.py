from django.shortcuts import render, get_object_or_404, redirect, reverse

from authors.forms import AuthorsForm
from authors.models import Author


# Create your views here.
def index(request):
    authors = Author.objects.all()
    return render(request, "authors/index.html", context={"authors": authors})


def delete(request, id):
    author = get_object_or_404(Author, pk=id)
    author.delete()
    return redirect(reverse("authors:index"))


def create(request):
    form = AuthorsForm()
    if request.method == "POST":
        form = AuthorsForm(request.POST)
        if form.is_valid():
            author = Author()
            author.name = form.cleaned_data["name"]
            author.bio = form.cleaned_data["bio"]
            author.featured_title = form.cleaned_data["featured_title"]
            author.label = form.cleaned_data["label"]
            author.save()
            return redirect("authors:index")
    return render(request, 'authors/create.html', {"form": form})


def edit(request, id):
    author = get_object_or_404(Author, pk=id)
    if request.method == "POST":
        form = AuthorsForm(request.POST)
        if form.is_valid():
            author.name = form.cleaned_data["name"]
            author.bio = form.cleaned_data["bio"]
            author.featured_title = form.cleaned_data["featured_title"]
            author.label = form.cleaned_data["label"]
            author.save()
            return redirect(reverse("authors:index"))
    else:
        form = AuthorsForm(
            initial={
                "name": author.name,
                "bio": author.bio,
                "featured_title": author.featured_title,
                "label": author.label
            }
        )
    return render(request, 'authors/edit.html', context={"form": form, "author": author})
