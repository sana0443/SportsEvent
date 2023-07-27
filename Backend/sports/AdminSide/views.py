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
from Slots.serializers import SlotSerializer,BookingSerializer,SlotssSerializer
from Slots.models import Booking,Slot
import logging
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404




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
    
@csrf_exempt
@api_view(['POST'])
def user_block(request):


    try :
        email = request.data.get('email')
        user = get_object_or_404(signup, email=email)

        if user.is_active:
            user.is_active = False
            message = 'User blocked successfully'
        else:
            user.is_active = True
            message = 'User unblocked successfully'

        user.save()
        return Response({'message': message})
    except :
        return Response({'error' : 'error happend'})
    

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
    # def post(self, request, format=None):
    #     serializer = SlotSerializer(data=request.data)
    #     print( serializer.data,"here or nottttttt")
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

     def post(self, request, format=None):
        print(request.data,"what issue")
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
    print(queryset,"reah--------------------------")
    serializer_class = SlotssSerializer

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
    

class TotalUsersView(APIView):
    def get(self, request):
        total_users = signup.objects.count()
        return Response({'totalUsers': total_users})

class TotalTournamentsView(APIView):
    def get(self, request):
        total_tournaments = Tournament_ancmt.objects.count()
        return Response({'totalTournaments': total_tournaments})