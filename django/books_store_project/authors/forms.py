from django import forms


class AuthorsForm(forms.Form):
    name = forms.CharField(label="Name", max_length=255)
    bio = forms.CharField(label="Bio", widget=forms.Textarea(attrs={'rows': 4}))
    featured_title = forms.CharField(label="Featured Title", max_length=255)
    label = forms.CharField(label="Label", max_length=255)

    # validation rules
    def clean_name(self):
        name = self.cleaned_data["name"]
        if len(name) > 255:
            raise forms.ValidationError("Name must be less than 255 characters")
        if len(name) < 3:
            raise forms.ValidationError("Name must be more than 3 characters")

    def clean_bio(self):
        bio = self.cleaned_data["bio"]
        if len(bio) > 1000:
            raise forms.ValidationError("Bio must be less than 1000 characters")

    def clean_featured_title(self):
        featured_title = self.cleaned_data["featured_title"]
        if len(featured_title) > 255:
            raise forms.ValidationError("Featured Title must be less than 255 characters")
        if len(featured_title) < 3:
            raise forms.ValidationError("Featured Title must be more than 3 characters")

    def clean_label(self):
        label = self.cleaned_data["label"]
        if len(label) > 255:
            raise forms.ValidationError("Label must be less than 255 characters")
        if len(label) < 3:
            raise forms.ValidationError("Label must be more than 3 characters")
