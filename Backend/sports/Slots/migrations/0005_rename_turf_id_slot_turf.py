# Generated by Django 4.2.2 on 2023-07-12 16:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Slots', '0004_rename_turf_slot_turf_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='slot',
            old_name='turf_id',
            new_name='turf',
        ),
    ]
