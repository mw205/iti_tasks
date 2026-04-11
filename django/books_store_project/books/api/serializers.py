from rest_framework import serializers

from authors.api.serializers import AuthorModelSerializer
from authors.models import Author
from books.models import Book
from custom_validators import custom_validators


class BookModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"

    author = AuthorModelSerializer(many=True, read_only=True)

    authors = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Author.objects.all(),
        write_only=True,
        source='author'
    )

    def validate_title(self, value):
        return custom_validators.CustomValidators.name_validator(
            name=value,
            validator_class=serializers.ValidationError,
            label="Title",
        )
