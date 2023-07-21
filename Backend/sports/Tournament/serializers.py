from rest_framework import serializers
from .models import Tournament_ancmt,Player,Team

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament_ancmt
        fields = ['id','event_name','title','date','total_no_of_teams','description','registration_open','registration_deadline','available_slots']



class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'age', 'position', 'team']

class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id','team_name' ,'logo', 'players','user']