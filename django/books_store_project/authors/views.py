from django.shortcuts import render

from authors.models import Author


# Create your views here.
def index(request):
    authors = Author.objects.all()
    return render(request, "authors/index.html", context={"authors": authors})
