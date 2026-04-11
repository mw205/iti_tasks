from django import forms

from authors.models import Author
from books.models import Book
from custom_validators import custom_validators


class AuthorsModelForm(forms.ModelForm):
    class Meta:
        model = Author
        fields = '__all__'

    books = forms.ModelMultipleChoiceField(
        queryset=Book.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=True
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.fields["books"].initial = self.instance.books.all()

    # validation rules
    def clean_name(self):
        name = self.cleaned_data["name"]
        return custom_validators.CustomValidators.name_validator(
            name=name,
            validator_class=forms.ValidationError,
            label="Name",
            validate_format=True,
        )

    def clean_bio(self):
        bio = self.cleaned_data["bio"]
        return custom_validators.CustomValidators.bio_validator(
            bio=bio,
            validator_class=forms.ValidationError,
        )

    def clean_featured_title(self):
        featured_title = self.cleaned_data["featured_title"]
        return custom_validators.CustomValidators.validate_length(
            value=featured_title,
            validator_class=forms.ValidationError,
            label="Featured Title",
        )

    def clean_label(self):
        label = self.cleaned_data["label"]
        return custom_validators.CustomValidators.validate_length(
            value=label,
            validator_class=forms.ValidationError,
            label="Label",
        )
