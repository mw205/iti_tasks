from django.shortcuts import render, get_object_or_404, reverse, redirect
from django.views import View

from books.forms import BooksForm
from books.models import Book
from authors.models import Author


def index(request):
    books = Book.objects.all()
    return render(request, "books/index.html", context={"books": books})


def show(request, id):
    book = get_object_or_404(Book, pk=id)
    authors = book.author.all()
    return render(request, "books/show.html", {"book": book, "authors": authors})


def delete(request, id):
    book = get_object_or_404(Book, pk=id)
    book.delete()
    return redirect(reverse("books:index"))


class CreateBookView(View):
    def get(self, request):
        form = BooksForm()
        return render(request, 'books/create.html', context={"form": form})

    def post(self, request):
        form = BooksForm(request.POST, request.FILES)
        if form.is_valid():
            book = form.save()
            return redirect(book.show_url)
        return render(request, 'books/create.html', context={"form": form})


class UpdateBookView(View):
    def get(self, request, id):
        book = get_object_or_404(Book, pk=id)
        return render(request, 'books/edit.html', context={"form": BooksForm(instance=book), "book": book})

    def post(self, request, id):
        book = get_object_or_404(Book, pk=id)
        form = BooksForm(request.POST, request.FILES, instance=book)
        if form.is_valid():
            form.save()
            return redirect(reverse("books:show", args=[book.id]))
        return render(request, 'books/edit.html', context={"form": form, "book": book})
