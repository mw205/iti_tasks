from django.db import models

# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=255)
    label = models.CharField(max_length=255)
    bio = models.TextField()
    featured_title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name