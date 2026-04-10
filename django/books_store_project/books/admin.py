from django.contrib import admin

from books.models import Book

# Register your models here.

admin.site.register(Book)


class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'no_of_page', 'price', 'created_at', 'updated_at', 'brief')
    search_fields = ('title')
    list_filter = ('title')
    list_per_page = 20
