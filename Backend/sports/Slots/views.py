from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Slot,Turf,Booking
from account.models import signup
from .serializers import SlotSerializer,TurfSerializer,BookingSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
import razorpay
from django.conf import settings
from rest_framework.generics import CreateAPIView
from django.conf import settings
from django.utils import timezone
from datetime import datetime







class TurfListAPIView(APIView):
    def get(self, request):
        queryset = Turf.objects.all()
        serializer = TurfSerializer(queryset, many=True)  # Serialize queryset with many=True
        return Response(serializer.data)
    

class TurfDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Turf.objects.get(pk=pk)
        except Turf.DoesNotExist:
            raise Exception("Turf not found")

    def get(self, request, pk):
        turf = self.get_object(pk)
        serializer = TurfSerializer(turf)
        return Response(serializer.data)






class SlotListView(APIView):
    def get(self, request,id):
        slots = Slot.objects.filter(turf=id)
        serializer = SlotSerializer(slots, many=True)
        return Response(serializer.data)

class SlotDetailView(APIView):
    def get_object(self, pk):
        try:
            return Slot.objects.get(pk=pk)
        except Slot.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        slot = self.get_object(pk)
        serializer = SlotSerializer(slot)
        return Response(serializer.data)

# class SlotBookingView(APIView):
#     def post(self, request, pk):
#         slot = Slot.objects.get(pk=pk)
#         if slot.total_slot > 0:
#             slot.total_slot -= 1
#             slot.save()
#             return Response({'message': 'Slot booked successfully.'})
#         else:
#             return Response({'message': 'No available slots.'}, status=status.HTTP_400_BAD_REQUEST)






class UserInfoView(TokenObtainPairView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            'name': user.full_name,
            'email': user.email,
            'phone': user.phone_number
        }
        return Response(data)
    



class UserBookedSlotsView(APIView):
    def get(self, request, user_id):
        # Assuming signup is the user model, replace it with your actual user model if different
        user = signup.objects.get(id=user_id)
        booked_slots = Slot.objects.filter(booking__user=user)
        serializer = SlotSerializer(booked_slots, many=True)
        return Response(serializer.data)
    



@api_view(['POST'])
def Start_payment(request,turf_id):
    print(request.data)
   

    amount = request.data['price']
    turf_id = request.data['turf_id']
    user=request.data['user_id']
    print(turf_id,'--------0-------------')


    client = razorpay.Client(auth=("rzp_test_k6Ms2BWCn74AHT", "aZeXrea3AybLuVTSGEcemHGv"))

    print('****')

    payment = client.order.create({
        "amount": int(amount) * 100,
        "currency": "INR",
        "payment_capture": "1"
    })
    print(payment)

   
   
    end_time_string = request.data['end_time']
    date_string = request.data['date']
    date = datetime.strptime(date_string, '%Y-%m-%dT%H:%M:%S.%fZ').date()


    start_time_string = request.data['start_time']
    start_time = datetime.strptime(start_time_string, '%H:%M').time()
    end_time = datetime.strptime(end_time_string, '%H:%M').time()

    start_datetime = timezone.make_aware(datetime.combine(date, start_time))
    end_datetime = timezone.make_aware(datetime.combine(date, end_time))

    slots = Slot.objects.filter(turf_id=turf_id, start_time=start_datetime, end_time=end_datetime)

    try:
            slot = Slot.objects.get(id=turf_id)
            order = Booking.objects.create(
                slot=slot,
                user=user,
                amount=int(amount),
                start_time=start_datetime,
                end_time=end_datetime,
            )

            order_id = order.id 

            serializer = BookingSerializer(order)

            data = {
                "payment": payment,
                "order": serializer.data,
                "order_id": order_id,
            }
            return Response(data)
    except Slot.DoesNotExist:
            return Response({'error': 'Slot with the provided ID does not exist'})
 




import json
@api_view(['POST'])

def Handle_payment_success(request):
    
    print('kkk')
  
    print("dsfa")
    try:
   
        ord_id = ""
        raz_pay_id = "" 
        raz_signature = ""

        res = json.loads(request.data["response"])
        print(res,'resssssssssssssss')

        
        for key in res.keys():
            if key == 'razorpay_order_id':
                ord_id = res[key]
            elif key == 'razorpay_payment_id':
                raz_pay_id = res[key]
            elif key == 'razorpay_signature':
                raz_signature = res[key]
    
        ord_id = res.get('razorpay_order_id', '') 
        print(ord_id,'-------------------')
        if ord_id is None:
            raise ValueError("Missing 'razorpay_order_id' in the response")

        order = Booking.objects.get(id=int(ord_id))
       


        # we will pass this whole data in razorpay client to verify the payment
        data = {
            'razorpay_order_id': ord_id,
            'razorpay_payment_id': raz_pay_id,
            'razorpay_signature': raz_signature
        }

        client = razorpay.Client(auth=("rzp_test_k6Ms2BWCn74AHT","aZeXrea3AybLuVTSGEcemHGv"))
        
        check = client.utility.verify_payment_signature(data)
        print(check)
        print(order,'ordo')
        if check is None:
            print("Redirect to error url or error page")
            return Response({'error': 'Something went wrong'})

    

        order = Booking.objects.get(order_payment_id=ord_id)
        order.isPaid = True
        
        order.save()
        print('user is',request.user)
        
        
        res_data = {
            'message': 'payment successfully received!'
        }
    except Booking.DoesNotExist:
        print("Booking with the provided ID does not exist")
        return Response({'error': 'Booking does not exist'})

    except Exception as e:
        print(e)
        return Response({'error': 'An error occurred'})

    return Response(res_data)



class BookingAPIView(APIView):
    def post(self, request, format=None):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # This will create both Booking and Slot instances
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class TurfBookedSlotsAPIView(APIView):
    def get(self, request, turf_id, format=None):
        try:
            slots = Slot.objects.filter(turf_id=turf_id, is_available=False)
            serializer = SlotSerializer(slots, many=True)
            return Response(serializer.data)
        except Turf.DoesNotExist:
            return Response({"error": "Turf not found"}, status=404)



   
   
   

   

   



