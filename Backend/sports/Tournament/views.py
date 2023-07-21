from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from .serializers import TournamentSerializer,TeamSerializer,PlayerSerializer
from .models import Tournament_ancmt,Team,Player
from rest_framework import generics
from django.shortcuts import get_object_or_404

class TournamentCreateView(APIView):
    def post(self, request):
        serializer = TournamentSerializer(data=request.data)
        if serializer.is_valid():
            print("valid")
            tournament = serializer.save()
            return Response({'id': tournament.id}, status=status.HTTP_201_CREATED)
        print(serializer.errors)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class CreatedTournamentDatesView(APIView):
    def get(self, request):
        created_dates = Tournament_ancmt.objects.values_list('date', flat=True)
        return Response(list(created_dates), status=status.HTTP_200_OK)



class TournamentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Tournament_ancmt.objects.all()
    serializer_class = TournamentSerializer

class TournamentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tournament_ancmt.objects.all()
   
    serializer_class = TournamentSerializer


# class TournamentListView(APIView):
#     def get(self, request):
#         tournaments = Tournament.objects.all()
#         data = [{'id': t.id, 'title': t.title, 'description': t.description} for t in tournaments]
#         return JsonResponse(data, safe=False)
class TeamCreateView(APIView):
    def post(self, request):
        team_data = request.data
        team_data['logo'] = request.FILES.get('team_logo')
        user = request.user  # Get the authenticated user
        team_data['user_id'] = user.id

        serializer = TeamSerializer(data=team_data)
        if serializer.is_valid():
            team = serializer.save()

            response_data = serializer.data
            response_data['players'] = []

            player_data_list = request.data.get('players', [])
            for player_data in player_data_list:
                player_data['team'] = team.id

                player_serializer = PlayerSerializer(data=player_data)
                if player_serializer.is_valid():
                    player = player_serializer.save()
                    player_data['id'] = player.id
                    response_data['players'].append(player_data)
                else:
                    return Response(player_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PlayerCreateView(APIView):
    def post(self, request):
        player_data = request.data.copy()  # Create a mutable copy of the request data

        # Assign the team ID to the player
        player_data['team'] = request.data.get('team')

        serializer = PlayerSerializer(data=player_data)
        if serializer.is_valid():
            player = serializer.save()
            print(player, "----------------------------")
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    



class TeamListView(APIView):
    def get(self, request, pk=None):
        if pk is not None:
            # Retrieve a specific team
            team = Team.objects.get(pk=pk)
            serializer = TeamSerializer(team)
            return Response(serializer.data)
        else:
            # Retrieve all teams
            teams = Team.objects.all()
            serializer = TeamSerializer(teams, many=True)
            return Response(serializer.data)
        

class TeamDataView(APIView):
    def get_teams_for_user(self, user_id):
        # Get all teams and then filter the ones with players belonging to the user's teams
        teams = Team.objects.filter(user_id=user_id)
        return teams

    def get(self, request, user_id):
        teams = self.get_teams_for_user(user_id)
        
        if not teams:
            return Response({"message": "No teams found for this user."}, status=404)

        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)
    
    
class PlayerDataView(APIView):
    def get_players_for_user(self, user_id):
        # Get all players and then filter the ones belonging to the user's teams
        players = Player.objects.filter(team__user_id=user_id)
        return players

    def get(self, request, user_id):
        players = self.get_players_for_user(user_id)

        if not players:
            return Response({"message": "No players found for this user."}, status=404)

        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)


