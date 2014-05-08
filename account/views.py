from django.conf import settings
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext
from django.shortcuts import redirect, render_to_response
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as auth_logout
from account.forms import UserCreateForm
from mailer import send_mail
from culttume.tasks import email_tasks

from social.backends.facebook import FacebookOAuth2

def home(request):
	""" Home view, display login mechanism """
	form = UserCreateForm()
	if request.user.is_authenticated():
		return redirect('done')
	elif request.method == 'POST':
		form = UserCreateForm(request.POST)
		if form.is_valid():
			form.save()
			return redirect('done')
	return render_to_response('login/home.html', {
		'form' : form,
		'appId': getattr(settings, 'SOCIAL_AUTH_FACEBOOK_KEY', None)
		}, RequestContext(request))

def sign_in(request):
	""" Login view, for email user auth """
	# Like before, obtain the context for the user's request.
	context = RequestContext(request)
	# If the request is a HTTP POST, try to pull out the relevant information.
	if request.method == 'POST':
	    # Gather the username and password provided by the user.
	    # This information is obtained from the login form.
	    username = request.POST['username']
        password = request.POST['password']

        print username, password

        # Use Django's machinery to attempt to see if the username/password
        # combination is valid - a User object is returned if it is.
        user = authenticate(username=username, password=password)

        print user
        if user.is_active:
            # If the account is valid and active, we can log the user in.
            # We'll send the user back to the homepage.
            login(request, user)
            return render_to_response('login/done.html', context)

def sign_up(request):
	""" Register for email """
	# Like before, get the request's context.
	context = RequestContext(request)
	# A boolean value for telling the template whether the registration was successful.
	# Set to False initially. Code changes value to True when registration succeeds.
	registered = False

	if request.user.is_authenticated():
		return redirect('done')
	# If it's a HTTP POST, we're interested in processing form data.
	elif request.method == 'POST':
		# Attempt to grab information from the raw form information.
        # Note that we make use of both UserForm and UserProfileForm.
		form = UserCreateForm(request.POST)
		if form.is_valid():
		    # Save the user's form data to the database.
		    user = form.save()
		    # Now we hash the password with the set_password method.
		    # Once hashed, we can update the user object.
		    user.set_password(user.password)
		    user.save()
		    # Gather the username and password provided by the user.
	        # This information is obtained from the login form.
	        username = request.POST['username']
	        password = request.POST['password']
	        # Use Django's machinery to attempt to see if the username/password
	        # combination is valid - a User object is returned if it is.
	        user = authenticate(username=username, password=password)
	        # if register.is_active:
	        # If the account is valid and active, we can log the user in.
	        # We'll send the user back to the homepage.
	        login(request, user)
	        # Now we hash the password with the set_password method.
	        # Once hashed, we can update the user object.
	        # send_mail('Bienvenido a Culttu.me', 'This is content email', 'alejo8591@gmail.com', ['alejo8591@gmail.com'])
	        # return redirect('done')
	        return render_to_response('login/done.html', context)
	return render_to_response('login/register.html', {'form': form}, RequestContext(request))
	
def logout(request):
	""" Logout User """
	auth_logout(request)
	return render_to_response('home.html', {}, RequestContext(request))

@login_required
def done(request):
	""" Login complete view, displays user data """
	return render_to_response('login/done.html', {
		'user': request.user,
		'appId' : getattr(settings, 'SOCIAL_AUTH_FACEBOOK_KEY', None)
		}, RequestContext(request))
