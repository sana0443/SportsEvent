from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractUser,Group, Permission
from django.core.validators import RegexValidator
from django.contrib.auth.hashers import make_password


class UserManager(BaseUserManager):
    def _create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self._create_user(email, password,**extra_fields)



class signup(AbstractUser):
        full_name= models.CharField(max_length=250)
        email=models.EmailField(unique=True)
        age = models.IntegerField(null=True)
        photo=models.ImageField(null=True,upload_to='Dp/')
        mobile_regex = RegexValidator(regex=r'^\d+$')
        phone_number = models.CharField(validators=[mobile_regex], max_length=10,null=True)
        password=models.CharField(max_length=250)
        password2=models.CharField(max_length=250)
        is_blocked = models.BooleanField(default=False)
        groups = models.ManyToManyField(
            Group,
            verbose_name=('groups'),
            blank=True,
            related_name='signup_groups'  # Add a unique related name
        )
        user_permissions = models.ManyToManyField(
            Permission,
            verbose_name=('user permissions'),
            blank=True,
            related_name='signup_user_permissions'  # Add a unique related name
        )



        

    
   

        def __str__(self):
            return f"Signup #{self.pk}"
        
        USERNAME_FIELD = 'email'
        REQUIRED_FIELDS = []
        username = None
        first_name = None
        last_name = None
        # objects = UserManager()
        class Meta:
            db_table='sign'
            # permissions = [
            #     ("can_access_signin", "Can access signin endpoint"),
        
            # ]

        


