from django.db import models
from django.shortcuts import reverse, get_object_or_404


# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(null=True, blank=True, unique=True)
    bio = models.TextField()
    gender = models.CharField(choices=[("m", "Male"), ("f", "Female")], max_length=1, default='m')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='authors/avatars', blank=True, null=True)
    books = models.ManyToManyField('books.Book', related_name="author")

    def __str__(self):
        return self.name

    @property
    def show_url(self):
        return reverse('authors:show', args=[self.id])

    @classmethod
    def get_author_by_id(cls, author_id):
        return get_object_or_404(Author, pk=author_id)
