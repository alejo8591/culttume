from django.test import TestCase
from django.contrib.auth.models import User
from account.models import UserProfile

class CreateUser(TestCase):

	def setUp(self):

		#User.objects.create(first_name='Alejandro', username='alejo8591', password='alejo8591',email='alejo8591@gmail.com')
		#User.objects.create(first_name='Luis', username='alejo8592', password='alejo8592',email='alejo8592@gmail.com')

		#self.user1 = User.objects.get(username='alejo8591')
		#self.user2 = User.objects.get(username='alejo8592')

		#self.profile1 = self.user1.get_profile()

		#self.profile2 = self.user2.get_profile()

		self.user1 = User(first_name='Alejandro', username='alejo8591', password='alejo8591',email='alejo8591@gmail.com')
		self.user1.save()
		self.user2 = User(first_name='Luis', username='alejo8592', password='alejo8592',email='alejo8592@gmail.com')
		self.user2.save()

		self.user1.get_profile().user_url='alejo8591'
		self.user1.save()
		self.user2.get_profile().user_url='alejo8592'
		self.user2.save()

		print self.user1.get_profile().user_url
		print self.user2.get_profile().user_url

	def test_users(self):

		self.assertEqual(self.user1.get_profile().user_url, 'alejo8591')