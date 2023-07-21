# Generated by Django 4.1.7 on 2023-07-20 14:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_alter_signup_photo'),
        ('Tournament', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TournamentRegistration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tournament', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='registrations', to='Tournament.tournament_ancmt')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tournament_registrations', to='account.signup')),
            ],
        ),
    ]