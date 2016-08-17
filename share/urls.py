from django.conf.urls import url
from . import views

urlpatterns=[
	url(r'^index/$',views.index,name='index'),
	url(r'^data/$',views.data,name='data'),
	url(r'^service/$',views.service,name='service'),
	url(r'^news/$',views.news,name='news'),
	url(r'^register/$',views.register,name='register'),
]