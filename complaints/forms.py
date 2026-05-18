from django import forms
from django.contrib.auth.models import User
from .models import Complaint

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    password_confirm = forms.CharField(widget=forms.PasswordInput, label="Confirm Password")

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_confirm = cleaned_data.get("password_confirm")

        if password and password_confirm and password != password_confirm:
            self.add_error('password_confirm', "Passwords do not match")
        
        return cleaned_data

class ComplaintForm(forms.ModelForm):
    class Meta:
        model = Complaint
        fields = ['title', 'category', 'description', 'location', 'latitude', 'longitude', 'photo']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 5}),
            'latitude': forms.HiddenInput(),
            'longitude': forms.HiddenInput(),
        }
