from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.views import APIView
from . serializers import Signupserializer
from rest_framework.response import Response
from rest_framework import status
    
from rest_framework.parsers import MultiPartParser, FormParser

from django.contrib.auth import  login
from rest_framework.exceptions import AuthenticationFailed
# from django.core.exceptions import ObjectDoesNotExist
from . models import signup
from django.core.files.base import ContentFile
import base64

from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from django.contrib.auth.models import User
# from django.contrib.auth.hashers import check_password
from rest_framework.request import Request
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import check_password

import random

# def generate_otp():
#     otp = random.randint(100000, 999999)
#     return str(otp)






# Create your views here.

def index(request):
    pass

class UserSignup(APIView):
    print("user signup  contianer outside")
    def get(self, request):
        if request.method == 'GET':
            print(' indide get ')
            email = request.GET.get('email')
            print(email,'email  in get method---------------------')
            try:
                user = signup.objects.get(email=email)
                print('existing email', user)

                return Response({'message':'Email already Exists'})
            except:
                return Response({'message':'success'})
    def post(self,request):
            print(' inside post in singup')
            serializer = Signupserializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                email = serializer.validated_data.get('email')
                print(' emial from serializer output', email)
                # Check if the user already exists in the backend
                existing_user = User.objects.filter(email=email).exists()
                if existing_user:
                    return Response({"success": False, "errors": {"email": "Email already exists."}}, status=status.HTTP_400_BAD_REQUEST)
                

                # otp = serializer.validated_data.get('otp')
                # if not self.verify_otp(email, otp):
                #     return Response({"success": False, "errors": {"otp": "Invalid OTP."}}, status=status.HTTP_400_BAD_REQUEST)

                else:
                    print(" post elese-----------------------------------------------------------------------------777777777777777777777777777-----------------------")
                    user =serializer.save()
                    print(user.id,'this is usr id from signup -----------------------------------------------------')
                    return Response({"success": True, "user_id": user.id}, status=status.HTTP_201_CREATED)
            else:
                errors = {}
                for field, field_errors in serializer.errors.items():
                    # Customize the error messages based on the field
                    if field == 'password':
                        print(' if error', errors)
                        errors[field] = "Invalid password."
                    else:
                        print('else errors', errors)
                        errors[field] = field_errors[0]  # Use the first error message

                return Response({"success": False, "errors": errors}, status=status.HTTP_400_BAD_REQUEST)
        


def create_user(request):
     serializer = Signupserializer(data=request.data)
     if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get('email')
            serializer.save()

            return Response({"success": True, "message": "registered"}, status=status.HTTP_201_CREATED)
  
class UserLogin(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        print("Received from React", email, password)
        
        try:
            user = signup.objects.get(email=email)
            print("user", user)
        except signup.DoesNotExist:
            print("not user")
            raise AuthenticationFailed("Account does not exist")
        print(password,'-----------enterd pass -------------------')
        print(user.password,'-----------db pass -------------------')
        print(check_password(password,user.password),'hased pas -----------------------------------')
        if not check_password(password, user.password):
            print("incorrect password ")
            raise AuthenticationFailed("Incorrect Password")
        

        if user.is_active is False:
            print("User is blocked")
            raise AuthenticationFailed("You are blocked")

        # At this point, the user exists, the password is correct, and the user is not blocked
        login(request, user)
        # Set session variable indicating that the user is logged in
        request.session['is_logged_in'] = True
        print("User logged in")
        
        access_token = str(AccessToken.for_user(user))
        refresh_token = str(RefreshToken.for_user(user))
        return Response({
            "access_token": access_token,
            "refresh_token": refresh_token,
            'id': user.id,
            'full_name': user.full_name,
            'email': user.email,
            'phone_number': user.phone_number,
            'age': user.age,
            'loginstatus' : True
        })


            

        

class AdminLoginView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        print("Received from React", email, password)

        try:
            user = User.objects.get(email=email)
            print("admin is here")
        except User.DoesNotExist:
            print("not here")
            raise AuthenticationFailed("Account does not exist")

        if user is None:
            raise AuthenticationFailed("User does not exist")
        if user.check_password(password):
            raise AuthenticationFailed("Incorrect Password")
        if not user.is_superuser:
            raise AuthenticationFailed("User is not a superuser")  # Add the condition to check if the user is a superuser

        access_token = str(AccessToken.for_user(user))
        refresh_token = str(RefreshToken.for_user(user))
        return Response({
            "access_token": access_token,
            "refresh_token": refresh_token
        })
    


class UserLogoutView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Blacklist the refresh token to invalidate it
            except Exception as e:
                # Handle token verification or blacklist errors
                return Response({'detail': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Refresh token not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)


class AdminLogoutView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Blacklist the refresh token to invalidate it
            except Exception as e:
                # Handle token verification or blacklist errors
                return Response({'detail': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Refresh token not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)


class UserDataView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        user_id = request.GET.get('user_id')
        try:
            user = signup.objects.get(id=user_id)
            data = {
                'full_name': user.full_name,
                'age': user.age,
                'phone_number': user.phone_number,
                'email': user.email,
            }
            if user.photo:
                data['photo'] = user.photo.url
            
            return Response(data)
        
        except signup.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

    def put(self, request):
        user_id = request.data.get('user_id')
        try:
            user = signup.objects.get(id=user_id)
            user.full_name = request.data['full_name']
            user.age = request.data['age']
            user.phone_number = request.data['phone_number']
            user.email = request.data['email']

            profile_photo = request.FILES.get('photo')

            if profile_photo:
                user.photo = profile_photo

            user.save()

            return Response({"message": "User profile updated successfully"})
        except signup.DoesNotExist:
            return Response({"error": "User not found"}, status=404)



# class UserProfileView(APIView):
#     queryset = signup.objects.all()
#     serializer_class = Signupserializer
#     lookup_field = 'user_id'  # assuming 'user_id' is the parameter name used in the URL

#     # Override the get_object method to get the UserProfile based on user_id
#     def get_object(self):
#         user_id = self.kwargs['user_id']
#         obj, created = signup.objects.get_or_create(user_id=user_id)
#         return obj