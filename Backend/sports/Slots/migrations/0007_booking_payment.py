# Generated by Django 4.2.2 on 2023-07-15 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Slots', '0006_alter_turf_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='payment',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
