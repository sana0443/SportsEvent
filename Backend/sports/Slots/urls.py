from django.urls import path
from .views import SlotListView, SlotDetailView, UserInfoView,TurfListAPIView,Start_payment,Handle_payment_success,BookingAPIView,TurfDetailAPIView,TurfBookedSlotsAPIView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('turfs/',TurfListAPIView.as_view()),
    path('turf_details/<int:pk>/',TurfDetailAPIView.as_view()),
    path('slots/<int:id>/', SlotListView.as_view(), name='slot-list'),
    path('slots/<int:pk>/', SlotDetailView.as_view(), name='slot-detail'),
    path('userinfo/', UserInfoView.as_view(), name='user-info'),
    path('booking/',BookingAPIView.as_view()),
    path('booked_slots/<int:turf_id>/', TurfBookedSlotsAPIView.as_view(), name='turf-booked-slots'),
    path('start_payment/<int:turf_id>/', Start_payment, name='start_payment'),
    path('handle_payment_success/', Handle_payment_success, name='handle_payment_success'),
    # path('slots/<int:pk>/book/', SlotBookingView.as_view(), name='slot-booking'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
