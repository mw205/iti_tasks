from django.db import models


# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=255)
    brief = models.TextField()
    image = models.ImageField(upload_to='books/covers', blank=True, null=True)
    no_of_page = models.IntegerField()
    price = models.FloatField()
    author = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"
