# Generated by Django 4.1.7 on 2023-08-10 03:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_alter_signup_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='signup',
            name='age',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
