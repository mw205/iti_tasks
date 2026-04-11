from rest_framework import serializers

from authors.models import Author
from custom_validators import custom_validators


class AuthorModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"

    def validate_name(self, value):
        return custom_validators.CustomValidators.name_validator(
            name=value,
            validator_class=serializers.ValidationError,
            label="Name",
            validate_format=True,
        )

    def validate_bio(self, value):
        return custom_validators.CustomValidators.bio_validator(
            bio=value,
            validator_class=serializers.ValidationError,
        )
