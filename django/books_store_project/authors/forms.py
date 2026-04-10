import re

from django import forms

from authors.models import Author
from books.models import Book


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
        if not bool(re.fullmatch("^[A-Za-z]{2,25}( [A-Za-z]{2,25})?$", name)):
            raise forms.ValidationError("Invalid name")
        if len(name) > 255:
            raise forms.ValidationError("Name must be less than 255 characters")
        if len(name) < 3:
            raise forms.ValidationError("Name must be more than 3 characters")
        return name

    def clean_bio(self):
        bio = self.cleaned_data["bio"]
        if len(bio) > 1000:
            raise forms.ValidationError("Bio must be less than 1000 characters")
        return bio

    def clean_featured_title(self):
        featured_title = self.cleaned_data["featured_title"]
        if len(featured_title) > 255:
            raise forms.ValidationError("Featured Title must be less than 255 characters")
        if len(featured_title) < 3:
            raise forms.ValidationError("Featured Title must be more than 3 characters")
        return featured_title

    def clean_label(self):
        label = self.cleaned_data["label"]
        if len(label) > 255:
            raise forms.ValidationError("Label must be less than 255 characters")
        if len(label) < 3:
            raise forms.ValidationError("Label must be more than 3 characters")
        return label
