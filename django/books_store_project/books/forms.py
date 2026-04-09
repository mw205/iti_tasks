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
