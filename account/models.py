# -*- encoding: utf-8 -*-
from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class UserProfile(models.Model):
	GENDER_CHOICES = (
		('M','Male'),
        ('F','Female'),
    )
	user = models.OneToOneField(User, related_name='profile', unique=True, primary_key=True)
	slug_field = models.SlugField(max_length=64, null=True)
	gender = models.CharField(max_length=4, choices=GENDER_CHOICES, null=True)
	twitter_user = models.CharField(max_length=255, null=True)
	fb_user = models.CharField(max_length=255, null=True)
	behance_user = models.CharField(max_length=255, null=True)
	soundcloud_user = models.CharField(max_length=255, null=True)
	flickr_user = models.CharField(max_length=255, null=True)
	linkedin_user = models.CharField(max_length=255, null=True)

	def __unicode__(self):
		return "%s Perfil" % self.user

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		profile, created = UserProfile.objects.get_or_create(user=instance)

post_save.connect(create_user_profile, sender=User)
