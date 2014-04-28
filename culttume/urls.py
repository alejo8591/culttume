from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'culttume.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'account.views.home'),
    url(r'^login/$', 'account.views.home'),
    url(r'^logout/$', 'account.views.logout'),
    url(r'^register/$', 'account.views.register', name='register'),
    url(r'^done/$', 'account.views.done', name='done'),
    # url(r'', include('social.apps.django_app.urls', namespace='social')),
)
