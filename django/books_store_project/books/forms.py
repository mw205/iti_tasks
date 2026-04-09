from django import forms

from authors.models import Author


class BooksForm(forms.Form):
    title = forms.CharField(label="Title", max_length=255)
    brief = forms.CharField(label="Brief", widget=forms.Textarea(attrs={'rows': 4}))
    image = forms.ImageField(label="Book Cover", required=False)
    no_of_page = forms.IntegerField(label="Number of pages")
    price = forms.FloatField(label="Price")
    author = forms.ModelChoiceField(
        label="Author",
        queryset=Author.objects.all(),
        empty_label="Select Author"
    )

    def clean_title(self):
        title = self.cleaned_data["title"]
        if len(title) > 255:
            raise forms.ValidationError("Title must be less than 255 characters")
        if len(title) < 3:
            raise forms.ValidationError("Title must be more than 3 characters")
        return title

    def clean_brief(self):
        brief = self.cleaned_data["brief"]
        if len(brief) > 255:
            raise forms.ValidationError("Brief must be less than 255 characters")
        if len(brief) < 3:
            raise forms.ValidationError("Brief must be more than 3 characters")
        return brief

    def clean_image(self):
        image = self.cleaned_data["image"]
        if image:
            if image.size > 2 * 1024 * 1024:
                raise forms.ValidationError("Image file too large ( > 2MB )")
            if not image.content_type.startswith("image"):
                raise forms.ValidationError("File type is not image")
        return image

    def clean_price(self):
        price = self.cleaned_data["price"]
        if price < 0:
            raise forms.ValidationError("Price must be greater than 0")
        return price

    def clean_no_of_page(self):
        no_of_page = self.cleaned_data["no_of_page"]
        if no_of_page < 0:
            raise forms.ValidationError("Number of pages must be greater than 0")
        return no_of_page

    def clean_author(self):
        author = self.cleaned_data["author"]
        if not author:
            raise forms.ValidationError("Author is required")
        if not Author.objects.filter(author).exists():
            raise forms.ValidationError("Author does not exist")
        return author
