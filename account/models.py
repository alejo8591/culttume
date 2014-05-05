# -*- encoding: utf-8 -*-
from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db.models.signals import post_save

# Create your models here.
class UserProfile(models.Model):
	user = models.OneToOneField(User, related_name='profile', unique=True, primary_key=True)
	user_url = models.CharField(max_length=24, null=True)

	def __unicode__(self):
		return "%s Profile" % self.user


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		profile, created = UserProfile.objects.get_or_create(user=instance)

post_save.connect(create_user_profile, sender=User)
