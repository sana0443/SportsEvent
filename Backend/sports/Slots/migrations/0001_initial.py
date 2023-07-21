# Generated by Django 4.2.2 on 2023-07-11 06:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Turf',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=120)),
                ('photo', models.ImageField(upload_to='slotz/')),
                ('description', models.IntegerField()),
                ('contact_number', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Slot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('price', models.IntegerField()),
                ('is_available', models.BooleanField(default=True)),
                ('turf', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Slots.turf')),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment', models.CharField(max_length=50)),
                ('is_paid', models.BooleanField(default=False)),
                ('slot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Slots.slot')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
