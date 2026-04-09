from django.shortcuts import render, get_object_or_404, reverse, redirect

from authors.models import Author
from books.forms import BooksForm
from books.models import Book


def index(request):
    books = Book.objects.all()
    return render(request, "books/index.html", context={"books": books})


def show(request, id):
    book = get_object_or_404(Book, pk=id)
    return render(request, "books/show.html", {"book": book})


def create(request):
    if request.method == "POST":
        form = BooksForm(request.POST, request.FILES)
        if form.is_valid():
            book = Book()
            book.title = form.cleaned_data["title"]
            book.brief = form.cleaned_data["brief"]
            book.image = form.cleaned_data["image"]
            book.no_of_page = form.cleaned_data["no_of_page"]
            book.price = form.cleaned_data["price"]
            # Save the string representation (name) of the author
            book.author = str(form.cleaned_data["author"])
            book.save()
            return redirect(reverse("books:show", args=[book.id]))
    else:
        form = BooksForm()
    return render(request, 'books/create.html', context={"form": form})


def delete(request, id):
    book = get_object_or_404(Book, pk=id)
    book.delete()
    return redirect(reverse("books:index"))


def edit(request, id):
    book = get_object_or_404(Book, pk=id)
    if request.method == "POST":
        form = BooksForm(request.POST, request.FILES)
        if form.is_valid():
            book.title = form.cleaned_data["title"]
            book.brief = form.cleaned_data["brief"]
            if form.cleaned_data["image"]:
                book.image = form.cleaned_data["image"]
            book.no_of_page = form.cleaned_data["no_of_page"]
            book.price = form.cleaned_data["price"]
            book.author = str(form.cleaned_data["author"])
            book.save()
            return redirect(reverse("books:show", args=[book.id]))
    else:
        author_obj = Author.objects.filter(name=book.author).first()
        form = BooksForm(initial={
            "title": book.title,
            "brief": book.brief,
            "no_of_page": book.no_of_page,
            "price": book.price,
            "author": author_obj.id if author_obj else None,
        })
    return render(request, 'books/edit.html', context={"form": form, "book": book})
