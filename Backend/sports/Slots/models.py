from django.db import models

# Create your models here.
from django.db import models
import datetime
from django.core.validators import RegexValidator

# class Slot(models.Model):
#     photo = models.ImageField(upload_to='slotz/')
#     date=models.DateField(default=datetime.date.today().strftime('%Y-%m-%d'))
#     day = models.CharField(max_length=500)
#     start_time = models.TimeField()
#     end_time = models.TimeField()
#     total_slot = models.IntegerField()
#     price = models.DecimalField(max_digits=8, decimal_places=2)


# class Turf(models.Model):
    # photo = models.ImageField(upload_to='slotz/')
#     location=models.CharField(max_length=120)
#     no_slot=models.IntegerField()
#     contact_number=models.IntegerField()
from django.db import models
from django.contrib.auth.models import User

class Turf(models.Model):
    name = models.CharField(max_length=100)
    location=models.CharField(max_length=120)
    photo = models.ImageField(upload_to='slotz/')
    description=models.CharField(max_length=100000)
    contact_number=models.IntegerField()





class Slot(models.Model):
    turf = models.ForeignKey(Turf, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    price=models.IntegerField()
    is_available=models.BooleanField(default=True)
    
    def __str__(self) :
        return self.turf.name

class Booking(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    name=models.CharField(max_length=150)
    mobile_regex = RegexValidator(regex=r'^\d+$')
    phone_number = models.CharField(validators=[mobile_regex], max_length=10,null=True)
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE,null=True,blank=True)
    amount=models.IntegerField()
    is_paid=models.BooleanField(default=False)
    order_id = models.CharField(max_length=100)