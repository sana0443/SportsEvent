from django.urls import path
# from .views import create_tournament
from . import views
from .views import TournamentListCreateAPIView, TournamentRetrieveUpdateDestroyAPIView,PlayerCreateView,TeamCreateView,CreatedTournamentDatesView,TeamListView,TeamDataView,PlayerDataView
urlpatterns = [
    # Other URL patterns
  
    path('create/', views.TournamentCreateView.as_view()),
    path('dates/', CreatedTournamentDatesView.as_view()),
    path('list/', TournamentListCreateAPIView.as_view(), name='tournament-list'),
    path('Tournament/detail/<int:pk>/', TournamentRetrieveUpdateDestroyAPIView.as_view(), name='tournament-detail'),
    path('teams/create/', TeamCreateView.as_view(), name='team-create'),
    path('players/create/', PlayerCreateView.as_view(), name='player-create'),
    path('team-data/<int:user_id>/', TeamDataView.as_view(), name='team-data'),
    path('player-data/<int:user_id>/', PlayerDataView.as_view(), name='player-data'),
 
    path('team/', TeamListView.as_view()),
    path('team/<int:pk>/', TeamListView.as_view())

    
]
