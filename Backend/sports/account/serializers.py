from rest_framework import serializers
from . models import signup

class Signupserializer(serializers.ModelSerializer):

    def validate_phone_number(self, phone_number):
        # Perform your custom validation here
        if not phone_number.isdigit():
            raise serializers.ValidationError("Mobile number should only contain digits.")
        
        return phone_number
    class Meta:
        model=signup
        fields=['id','full_name','email','photo','age','phone_number','password','password2','is_blocked']