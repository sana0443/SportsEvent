from . import views
from django.urls import path
from .views import  UserBlockView, UserUnblockView, TournamentDeleteView,CreateSlotAPIView,GetBookedSlotsAPIView,ExistingSlotsView,AllSlotListView,SlotDeleteView,SlotDetailView


urlpatterns = [

path('userlist',views.UserListView.as_view()),
path('blockUser/<int:pk>', UserBlockView.as_view(), name='block_user'),

path('unblockUser/<int:pk>', UserUnblockView.as_view(), name='unblock_user'),
path('delete/<int:pk>/',  TournamentDeleteView.as_view(), name='tournament-delete'),
path('slotdelete/<int:pk>',SlotDeleteView.as_view()),
path('createSlot/', CreateSlotAPIView.as_view(), name='create_slot'),
path('allslots/', AllSlotListView.as_view(), name='slots-list'),
path('bookedSlots/',GetBookedSlotsAPIView.as_view()),
path('existingSlots/', ExistingSlotsView.as_view(), name='get_existing_slots'),
path('slot/<int:id>/', SlotDetailView.as_view(), name='slot-detail'),

]