from django.test import TestCase
from django.contrib.auth.models import User
from account.models import UserProfile

class CreateUser(TestCase):

	def setUp(self):

		self.user1 = User(first_name='Alejandro', username='alejo8591', password='alejo8591',email='alejo8591@gmail.com')
		self.user1.save()
		self.user2 = User(first_name='Luis', username='alejo8592', password='alejo8592',email='alejo8592@gmail.com')
		self.user2.save()

		self.profile1 = UserProfile(user=self.user1, slug_field='alejo8591', gender='M')
		self.profile1.save()
		self.profile2 = UserProfile(user=self.user2, slug_field='alejo8592', gender='M')
		self.profile2.save()
	
	def test_users_create(self):
		self.assertEqual(self.profile1.slug_field, 'alejo8591')
		self.assertEqual(self.profile1.gender, 'M')
		self.assertEqual(self.profile2.slug_field, 'alejo8592')
		self.assertEqual(self.profile2.gender, 'M')
		self.assertNotEqual(self.profile2.slug_field, 'alejo8591')
		self.assertNotEqual(self.profile1.slug_field, 'alejo8592')
	
	def test_users_update(self):
		self.user1.last_name = 'Romero'
		self.user1.save()
		self.user2.last_name = 'Triana'
		self.user2.save()
		self.assertEqual(self.user1.last_name, 'Romero')
		self.assertNotEqual(self.user1.last_name, 'Triana')
		self.assertEqual(self.user2.last_name, 'Triana')
		self.assertNotEqual(self.user2.last_name, 'Romero')
	
	def test_users_social_networks(self):
		self.profile1.fb_user='fb.com/alejo8591'
		self.profile1.twitter_user='@alejo8591'
		self.profile1.behance_user='alejo8591'
		self.profile1.flickr_user='alejo8591'
		self.profile1.linkedin_user='linkedin.com/in/alejo8591'

		self.profile1.save()

		print self.profile1.twitter_user

		self.assertNotEqual(self.profile1.twitter_user, '@Romero')
