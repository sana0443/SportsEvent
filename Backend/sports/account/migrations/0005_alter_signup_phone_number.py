# Generated by Django 4.1.7 on 2023-08-01 06:42

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_alter_signup_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='signup',
            name='phone_number',
            field=models.PositiveIntegerField(max_length=10, null=True, validators=[django.core.validators.RegexValidator(regex='^\\d+$')]),
        ),
    ]