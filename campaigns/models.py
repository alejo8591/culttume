from django.db import models
from account.models import UserProfile

class Campaign(models.Model):
    name_campaign = models.CharField(max_length=128, null=True)
    ubication = models.CharField(max_length=128, null=True)
    datetime_campaign_start  = models.DateTimeField(auto_now=True, null=True, blank=True)
    datetime_campaign_end    = models.DateTimeField(auto_now=True, null=True, blank=True)
    datetime_campaign_create = models.DateTimeField(auto_now=True, null=True, blank=True)
    datetime_campaign_update = models.DateTimeField(auto_now=True, null=True, blank=True)
    logo_image_file_campaign = models.ImageField(upload_to='images', null=True, blank=True)
    logo_image_url_campaign  = models.URLField(null=True, blank=True)
    description_campaign     = models.TextField(null=True, blank=True)
    # behalf of the organizer
    owner_campaign       = models.ForeignKey(UserProfile)
    name_event_organizer = models.CharField(max_length=255, null=True, blank=True)
    description_event_organizer = models.TextField(null=True, blank=True)
    social_network_campaign = models.ForeignKey('SocialNetwork')

class SocialNetwork(models.Model):
	name_social_network = models.CharField(max_length=128, null=True)
	url_social_network  = models.URLField(null=True, blank=True)
	datetime_social_network_create = models.DateTimeField(auto_now=True, null=True, blank=True)
	datetime_social_network_update = models.DateTimeField(auto_now=True, null=True, blank=True)

