"""
Django settings for culttume project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Import Celery
import djcelery

djcelery.setup_loader()

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = ')kf_5lsp0@7(tnx6apjl^w(u1k#chgo*+w_#0r3-o-_)se5ydf'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'djcelery',
    'mailer',
    'south',
    'analytical',
    'social.apps.django_app.default',
    'account',
)
# Migrations broken in django-celery 3.0 #149 
# https://github.com/celery/django-celery/issues/149
SOUTH_MIGRATION_MODULES = {
    'djcelery': 'ignore',
}

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'culttume.urls'

WSGI_APPLICATION = 'culttume.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'es-ES'

TIME_ZONE = 'America/Bogota'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_ROOT = os.sep.join(os.path.abspath(__file__).split(os.sep)[:-2] + ['static'])

STATIC_URL = '/static/'

#STATICFILES_DIRS = (
#    os.path.join(BASE_DIR, 'static'),
#)

AUTHENTICATION_BACKENDS = (
    'social.backends.behance.BehanceOAuth2',
    'social.backends.disqus.DisqusOAuth2',
    'social.backends.facebook.FacebookAppOAuth2',
    'social.backends.facebook.FacebookOAuth2',
    'social.backends.flickr.FlickrOAuth',
    'social.backends.google.GoogleOAuth',
    'social.backends.google.GoogleOAuth2',
    'social.backends.google.GoogleOpenId',
    'social.backends.google.GooglePlusAuth',
    'social.backends.persona.PersonaAuth',
    'social.backends.soundcloud.SoundcloudOAuth2',
    'social.backends.twitter.TwitterOAuth',
    'social.backends.email.EmailAuth',
    'social.backends.username.UsernameAuth',
    'django.contrib.auth.backends.ModelBackend',
)

GOOGLE_ANALYTICS_PROPERTY_ID = 'UA-41467616-1'
GOOGLE_ANALYTICS_DOMAIN = 'culttu.me'

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    # 'social_auth.context_processors.social_auth_by_type_backends',
    'social.apps.django_app.context_processors.backends',
    'culttume.context_processors.google_analytics',
)

# http://stackoverflow.com/questions/20353880/template-dirs-is-missing-in-settings-py-django-1-6
TEMPLATE_DIRS = (
    os.path.join(BASE_DIR,  'templates'),
)

SOCIAL_AUTH_PIPELINE = (
    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'social.pipeline.user.get_username',
    #'example.app.pipeline.require_email',
    'social.pipeline.mail.mail_validation',
    'social.pipeline.user.create_user',
    'social.pipeline.social_auth.associate_user',
    'social.pipeline.social_auth.load_extra_data',
    'social.pipeline.user.user_details',
    'account.pipeline.user_details'
)
AUTH_PROFILE_MODULE = 'account.UserProfile'

SOCIAL_AUTH_ENABLED_BACKENDS = ('facebook','twitter',)
#SOCIAL_AUTH_DEFAULT_USERNAME = 'new_social_auth_user'

#SOCIAL_AUTH_GOOGLE_PLUS_KEY = 'AIzaSyBS5iaJc0xRzq7kdnSn8zi3VZ1g_ALXb3U'
SOCIAL_AUTH_STRATEGY = 'social.strategies.django_strategy.DjangoStrategy'
SOCIAL_AUTH_STORAGE = 'social.apps.django_app.default.models.DjangoStorage'
#SOCIAL_AUTH_GOOGLE_OAUTH_SCOPE = [
#    'https://www.googleapis.com/auth/drive',
#    'https://www.googleapis.com/auth/userinfo.profile'
#]
SOCIAL_AUTH_FACEBOOK_KEY = '1405572559682582'
SOCIAL_AUTH_FACEBOOK_SECRET = 'a4c9aa1d22c92c82c4580742b6b3ff4e'

SOCIAL_AUTH_TWITTER_KEY = 'PmldI0OyOIKc5Sg1lgATG7wH6'
SOCIAL_AUTH_TWITTER_SECRET = 'OLzXbX0dvinjNH2qS42Wgh7aA4u5ar3bna11pPV7Et5EFnJxmo'

LOGIN_URL = '/signin/'
LOGIN_REDIRECT_URL = '/done/'
URL_PATH = ''
LOGIN_ERROR_URL = '/signin-error/'

FACEBOOK_EXTENDED_PERMISSIONS = ['email']

try:
    from culttume.local_settings import *
except ImportError:
    pass

EMAIL_BACKEND = "mailer.backend.DbBackend"

# BROKER_URL = 'amqp://ptc_user:1q2w3e@localhost:5672/myvhost'
BROKER_URL = 'amqp://guest:guest@localhost:5672//'

# List of modules to import when celery starts.
CELERY_IMPORTS = ('culttume.tasks',)

# smtp settings for email
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'alejo8591@gmail.com'
EMAIL_HOST_PASSWORD = '2BeM5EIc'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = 'alejo8591@gmail.com'

GRAPH_MODELS = {
  'all_applications': True,
  'group_models': True,
}