from django.db import models
from django.shortcuts import get_object_or_404, reverse


# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=255)
    brief = models.TextField()
    image = models.ImageField(upload_to='books/covers', blank=True, null=True)
    no_of_page = models.IntegerField()
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"

    @classmethod
    def get_book_by_id(cls, book_id):
        return get_object_or_404(cls, pk=book_id)

    @property
    def show_url(self):
        return reverse("books:show", args=[self.id])
