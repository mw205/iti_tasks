from django.core.management.base import BaseCommand
from django.db import transaction

from authors.models import Author
from books.models import Book


class Command(BaseCommand):
    help = "Seed demo data for books and authors."

    def handle(self, *args, **options):
        authors_data = [
            {
                "name": "George Orwell",
                "email": "george.orwell@example.com",
                "bio": "English novelist and essayist known for sharp political fiction and social commentary.",
                "gender": "m",
            },
            {
                "name": "Jane Austen",
                "email": "jane.austen@example.com",
                "bio": "English novelist known for wit, irony, and realistic portraits of 19th-century society.",
                "gender": "f",
            },
            {
                "name": "Chinua Achebe",
                "email": "chinua.achebe@example.com",
                "bio": "Nigerian novelist and poet whose work helped define modern African literature.",
                "gender": "m",
            },
        ]

        books_data = [
            {
                "title": "1984",
                "brief": "A dystopian novel about surveillance, propaganda, and the loss of freedom.",
                "no_of_page": 328,
                "price": 14.99,
                "authors": ["George Orwell"],
            },
            {
                "title": "Animal Farm",
                "brief": "A political allegory that uses a farmyard rebellion to explore power and corruption.",
                "no_of_page": 112,
                "price": 11.5,
                "authors": ["George Orwell"],
            },
            {
                "title": "Pride and Prejudice",
                "brief": "A romantic novel focused on manners, marriage, and social status.",
                "no_of_page": 432,
                "price": 13.25,
                "authors": ["Jane Austen"],
            },
            {
                "title": "Things Fall Apart",
                "brief": "A landmark novel about colonialism and cultural change in Nigeria.",
                "no_of_page": 224,
                "price": 12.75,
                "authors": ["Chinua Achebe"],
            },
        ]

        with transaction.atomic():
            author_objects = {}
            for data in authors_data:
                author, created = Author.objects.update_or_create(
                    email=data["email"],
                    defaults={
                        "name": data["name"],
                        "bio": data["bio"],
                        "gender": data["gender"],
                    },
                )
                author_objects[author.name] = author
                action = "Created" if created else "Updated"
                self.stdout.write(self.style.SUCCESS(f"{action} author: {author.name}"))

            for data in books_data:
                book, created = Book.objects.update_or_create(
                    title=data["title"],
                    defaults={
                        "brief": data["brief"],
                        "no_of_page": data["no_of_page"],
                        "price": data["price"],
                    },
                )
                book_authors = [author_objects[name] for name in data["authors"]]
                book.author.set(book_authors)
                action = "Created" if created else "Updated"
                self.stdout.write(self.style.SUCCESS(f"{action} book: {book.title}"))

        self.stdout.write(self.style.SUCCESS("Seed data completed successfully."))
