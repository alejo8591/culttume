# -*- coding: utf-8 -*-
from django import forms
from django.contrib.auth.models import User
from django.forms import ModelForm

class UserCreateForm(ModelForm):
	username = forms.CharField(label="", widget=forms.TextInput(attrs={'class': 'special', 'placeholder' : 'Usuario para culttu.me'}))
	email = forms.EmailField(label="", widget=forms.TextInput(attrs={'class': 'special', 'placeholder' : '¡Tu correo Aquí!'}))
	password = forms.CharField(label="", widget=forms.TextInput(attrs={'class':'special', 'type' : 'password', 'placeholder' : 'Contraseña'}))

	class Meta:
		model = User
		fields = ('username', 'email', 'password')
		exclude = ('last_name', 'first_name', 'last_login', 'groups', 'user_permissions', 'is_staff', 'is_superuser','is_active', 'date_joined',)