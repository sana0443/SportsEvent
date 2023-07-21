from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from account.models import signup
from account.serializers import  Signupserializer
from rest_framework import generics, status
from django.core.cache import cache
from Tournament.models import Tournament_ancmt
from Tournament.serializers import TournamentSerializer
from Slots.serializers import SlotSerializer,BookingSerializer
from Slots.models import Booking,Slot
import logging






class UserListView(APIView):
    def get(self, request):
        users = signup.objects.all()
        serializer = Signupserializer(users, many=True)
        # Extract the user IDs and add them to the response data
        user_data = serializer.data
        user_ids = [user['id'] for user in user_data]
        for i, user in enumerate(user_data):
            user['userId'] = user_ids[i]
        return Response(user_data)
    

class UserBlockView(APIView):
    queryset = signup.objects.all()
    serializer_class = Signupserializer

    def put(self, request, pk, *args, **kwargs):
        instance = signup.objects.get(pk=pk)
        instance.is_blocked = True
        instance.save()
        serializer = self.serializer_class(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)



class UserUnblockView(APIView):
    queryset = signup.objects.all()
    serializer_class = Signupserializer

    def put(self, request,pk, *args, **kwargs):
        instance = signup.objects.get(pk=pk)
        instance.is_blocked = False
        instance.save()
        serializer = self.serializer_class(instance)
        cache_key = f"user_{pk}"
        cache.delete(cache_key)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class TournamentDeleteView(APIView):
    def get(self, request, pk, *args, **kwargs):
        try:
            tournament = Tournament_ancmt.objects.get(id=pk)
            tournament.delete()
            return Response({"message": "Tournament deleted successfully."}, status=204)
        except Tournament_ancmt.DoesNotExist:
            return Response({"error": "Tournament not found."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        


class CreateSlotAPIView(APIView):
    def post(self, request, format=None):
        serializer = SlotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ExistingSlotsView(APIView):
    def get(self, request):
        turf_id = request.GET.get('turf')
        date = request.GET.get('date')
        slots = Slot.objects.filter(turf=turf_id, start_time__date=date)
        data = [{'start_time': slot.start_time.strftime('%H:%M'), 'end_time': slot.end_time.strftime('%H:%M')} for slot in slots]
        return Response(data)
    
class SlotDetailView(APIView):
    allowed_methods = ['GET', 'PUT']
    def get_object(self, id):
        try:
            return Slot.objects.get(id=id)
            print('hi')
        except Slot.DoesNotExist:
            return None

    def get(self, request, id):
        slot = self.get_object(id)
        print(slot,'slottterdddd')
        if not slot:
            return Response({"error": "Slot not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SlotSerializer(slot)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        logger = logging.getLogger(__name__)
        logger.info("PUT request received for Slot ID: %s", id)
        slot = self.get_object(id)
        print(slot,'---------------')
        if not slot:
            return Response({"error": "Slot not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SlotSerializer(slot, data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AllSlotListView(generics.ListAPIView):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer

class SlotDeleteView(APIView):
    def delete(self, request, pk, *args, **kwargs):
        try:
            tournament = Slot.objects.get(id=pk)
            tournament.delete()
            return Response({"message": "Tournament deleted successfully."}, status=204)
        except Tournament_ancmt.DoesNotExist:
            return Response({"error": "Tournament not found."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)



class GetBookedSlotsAPIView(APIView):
    def get(self, request, format=None):
        bookings = Booking.objects.all()
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)