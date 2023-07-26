from django.db import models
from account.models import signup

# Create your models here.

class Tournament_ancmt(models.Model):
    event_name=models.CharField(max_length=450)
    title=models.CharField(max_length=450)
    image=models.ImageField(upload_to='tournaments')
    date=models.DateTimeField()
    total_no_of_teams=models.IntegerField()
    description=models.CharField(max_length=450)
    registration_open = models.BooleanField(default=False)
    registration_deadline = models.DateField(null=True, blank=True)
    available_slots = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title
    

class Team(models.Model):
    user = models.ForeignKey(signup, on_delete=models.CASCADE) 
    team_name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='team_logos')
  


class Player(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    position = models.CharField(max_length=100)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')


# class TournamentRegistration(models.Model):
#     user = models.ForeignKey(signup, on_delete=models.CASCADE, related_name='tournament_registrations')
#     tournament = models.ForeignKey(Tournament_ancmt, on_delete=models.CASCADE, related_name='registrations')
