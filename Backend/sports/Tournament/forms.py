from django import forms
from .models import Tournament_ancmt

class TournamentForm(forms.ModelForm):
    class Meta:
        model = Tournament_ancmt
        fields = '__all__'
