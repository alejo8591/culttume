import datetime
from account.models import UserProfile

# User details pipeline
def user_details(strategy, details, response, user=None, *args,**kwargs):
	"""Update user details using data from provider."""
	if user:
		if kwargs['is_new']:
			attrs = {'user' : user }
			# Twitter and Facebook backend
			if strategy.backend.__class__.__name__ == 'FacebookOAuth2':
			    # We should check values before this, but for the example
			    # is_fine
			    fb_data = {
			    'city' : response['location']['name'],
			    'gender' : response['gender'],
			    'locale' : response['locale'],
			    'is_staff' : True
			    #'dob' : datetime.fromtimestamp(mktime(strptime(response['birthday'], '%d/%m/%Y')))
			    }
			    attrs = dict(attrs.items() + fb_data.items())
			    UserProfile.objects.create(**attrs)
		else:
			pass
