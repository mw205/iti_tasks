from django.shortcuts import render

import books

# Create your views here.


BOOKS = [
    {
        "id": 1,
        "title": "Atomic Habits",
        "brief": "Small behavior shifts that compound into consistent personal growth.",
        "image": "pic-1.jpg",
        "no_of_page": 320,
        "price": 18.99,
        "author":"Mohamed Waleed"
    },
    {
        "id": 2,
        "title": "Deep Work",
        "brief": "A practical guide to focused work in a noisy, distracted world.",
        "image": "pic-2.jpg",
        "no_of_page": 304,
        "price": 16.50,
        "author": "Karem Waleed",
    },
    {
        "id": 3,
        "title": "Clean Code",
        "brief": "Principles and examples for writing readable, maintainable software.",
        "image": "pic-3.jpg",
        "no_of_page": 464,
        "price": 27.75,
        "author":"Mostafa"
    },
]

def index(request):
    return render(request, 'books/index.html' ,context={
        "books":BOOKS
    })

def show(request, id):
    book = filter(lambda book: book['id'] == id, BOOKS)
    book = list(book)
    return render(request,'books/show.html' , {'book':book[0]})