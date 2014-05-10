from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from culttume import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'culttume.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'account.views.home'),
    url(r'^signin/$', 'account.views.sign_in', name='sign_in'),
    url(r'^signup/$', 'account.views.sign_up', name='sign_up'),
    url(r'^done/$', 'account.views.done', name='done'),
    url(r'^logout/$', 'account.views.logout', name='logout'),
    url(r'^profile/$', 'account.views.profile', name='profile'),
    url(r'', include('social.apps.django_app.urls', namespace='social')),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
