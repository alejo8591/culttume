# -*- coding: utf-8 -*-
from django import forms
from django.contrib.auth.models import User
from django.forms import ModelForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from account.models import UserProfile

class UserCreateForm(ModelForm):
	username = forms.CharField(label="", widget=forms.TextInput(attrs={'class': 'special', 'placeholder' : 'Usuario para culttu.me'}))
	email = forms.EmailField(label="", widget=forms.TextInput(attrs={'class': 'special', 'placeholder' : '¡Tu correo Aquí!'}))
	#password = forms.CharField(label="", widget=forms.TextInput(attrs={'class':'special', 'type' : 'password', 'placeholder' : 'Contraseña'}))
	password = forms.CharField(label="", widget=forms.PasswordInput(), help_text='Contraseña')

	class Meta:
		model = User
		fields = ('username', 'email', 'password')
		exclude = ('last_name', 'first_name', 'last_login', 'groups', 'user_permissions', 'is_staff', 'is_superuser','is_active', 'date_joined',)

	def __init__(self, *args, **kwargs):
		self.helper = FormHelper()
		self.helper.form_method = 'POST'
		self.helper.add_input(Submit('update', 'Registarme!', css_class='button [primary success alert]'))

		super(UserCreateForm, self).__init__(*args, **kwargs)


class UserProfileForm(forms.Form):
	"""
	Fields for UserProfile:
	    slug_field   
	    gender 		 
	    twitter_user 
	    about_user   
	    dob_user     	    
	    behance_user  
	    soundcloud_user
	    flickr_user   
	    linkedin_user
	"""
	slug_field = forms.SlugField(label="", widget=forms.TextInput(attrs={'placeholder' : 'url del usuario'}))
	gender = forms.CharField(label="", widget=forms.TextInput(attrs={'class': 'special', 'placeholder' : 'Usuario para culttu.me'}))
	about_user = forms.CharField(label="", widget=forms.Textarea)
	twitter_user = forms.CharField(label="", widget=forms.TextInput(attrs={'class': 'special', 'placeholder' : 'Usuario para culttu.me'}))
	behance_user = forms.CharField(label="", widget=forms.TextInput(attrs={'class': 'special', 'placeholder' : 'Usuario para culttu.me'}))
	soundcloud_user = forms.CharField(label="", widget=forms.TextInput(attrs={'class': 'special', 'placeholder' : 'Usuario para culttu.me'}))
	flickr_user = forms.CharField(label="", widget=forms.TextInput(attrs={'class': 'special', 'placeholder' : 'Usuario para culttu.me'}))
	linkedin_user = forms.CharField(label="", widget=forms.TextInput(attrs={'class': 'special', 'placeholder' : 'Usuario para culttu.me'}))

	def __init__(self, *args, **kwargs):
		self.helper = FormHelper()
		self.helper.form_method = 'POST'
		self.helper.add_input(Submit('update', 'Actualizar', css_class='button [secondary success alert]'))

		super(UserProfileForm, self).__init__(*args, **kwargs)



