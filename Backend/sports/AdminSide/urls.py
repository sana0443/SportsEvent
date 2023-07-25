from . import views
from django.urls import path
from .views import  TournamentDeleteView,CreateSlotAPIView,GetBookedSlotsAPIView,ExistingSlotsView,AllSlotListView,SlotDeleteView,SlotDetailView


urlpatterns = [

path('userlist',views.UserListView.as_view()),


path('userBlock/', views.user_block, name='unblock_user'),
path('delete/<int:pk>/',  TournamentDeleteView.as_view(), name='tournament-delete'),
path('slotdelete/<int:pk>',SlotDeleteView.as_view()),
path('createSlot/', CreateSlotAPIView.as_view(), name='create_slot'),
path('allslots/', AllSlotListView.as_view(), name='slots-list'),
path('bookedSlots/',GetBookedSlotsAPIView.as_view()),
path('existingSlots/', ExistingSlotsView.as_view(), name='get_existing_slots'),
path('slot/<int:id>/', SlotDetailView.as_view(), name='slot-detail'),

]