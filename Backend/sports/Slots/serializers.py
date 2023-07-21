# serializers.py
from rest_framework import serializers
from .models import Slot,Turf,Booking


class TurfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turf
        fields = ('id', 'name', 'location', 'contact_number', 'photo')

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ['id', 'turf', 'start_time', 'end_time', 'price', 'is_available']

class BookingSerializer(serializers.ModelSerializer):
    slot = SlotSerializer()

    class Meta:
        model = Booking
        fields = ['id', 'slot', 'name', 'phone_number', 'amount', 'is_paid', 'order_id']

    def create(self, validated_data):
        slot_data = validated_data.pop('slot')
        slot = Slot.objects.create(**slot_data)

        booking = Booking.objects.create(slot=slot, **validated_data)
        return booking
