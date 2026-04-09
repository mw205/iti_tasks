from django import forms


class AuthorsForm(forms.Form):
    name = forms.CharField(label="Name", max_length=255)
    bio = forms.CharField(label="Bio", widget=forms.Textarea(attrs={'rows': 4}))
    featured_title = forms.CharField(label="Featured Title", max_length=255)
    label = forms.CharField(label="Label", max_length=255)
