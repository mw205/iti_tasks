from django import forms

from authors.models import Author
from books.models import Book
from custom_validators import custom_validators


class BooksForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = "__all__"

    title = forms.CharField(label="Title", max_length=255)
    brief = forms.CharField(label="Brief", widget=forms.Textarea(attrs={'rows': 4}))
    image = forms.ImageField(label="Book Cover", required=False)
    no_of_page = forms.IntegerField(label="Number of pages")
    price = forms.FloatField(label="Price")

    author = forms.ModelMultipleChoiceField(
        queryset=Author.objects.all(),
        widget=forms.CheckboxSelectMultiple(),
        required=True
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.fields["author"].initial = self.instance.author.all()
            self.fields["image"].required = False

    def clean_title(self):
        title = self.cleaned_data["title"]
        return custom_validators.CustomValidators.name_validator(
            name=title,
            validator_class=forms.ValidationError,
            label="Title",
        )

    def clean_brief(self):
        brief = self.cleaned_data["brief"]
        return custom_validators.CustomValidators.validate_length(
            value=brief,
            validator_class=forms.ValidationError,
            label="Brief",
        )

    def clean_image(self):
        image = self.cleaned_data["image"]
        return custom_validators.CustomValidators.image_size_validator(
            image=image,
            validator_class=forms.ValidationError,
        )

    def clean_price(self):
        price = self.cleaned_data["price"]
        return custom_validators.CustomValidators.non_negative_validator(
            value=price,
            validator_class=forms.ValidationError,
            label="Price",
        )

    def clean_no_of_page(self):
        no_of_page = self.cleaned_data["no_of_page"]
        return custom_validators.CustomValidators.non_negative_validator(
            value=no_of_page,
            validator_class=forms.ValidationError,
            label="Number of pages",
        )

    def save(self, commit=True):
        book = super().save(commit=commit)
        if commit:
            book.author.clear()
            authors = self.cleaned_data['author']
            for author in authors:
                author.books.add(book)
        return book
