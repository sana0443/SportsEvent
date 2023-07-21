# Generated by Django 4.1.7 on 2023-07-18 05:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Slots', '0011_alter_slot_turf'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='slot',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Slots.slot'),
        ),
        migrations.AlterField(
            model_name='slot',
            name='turf',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='Slots.turf'),
            preserve_default=False,
        ),
    ]
