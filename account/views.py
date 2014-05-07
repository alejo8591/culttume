from django.conf import settings
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
	pass

def sign_up(request):
	""" Register for email """
	form = UserCreateForm()
	if request.user.is_authenticated():
		return redirect('done')
	elif request.method == 'POST':
		form = UserCreateForm(request.POST)
		if form.is_valid():
			form.save()
			send_mail('Bienvenido a Culttu.me', 'This is content email', 'alejo8591@gmail.com', ['alejo8591@gmail.com'])
			return redirect('done')
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
