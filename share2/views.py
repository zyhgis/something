from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template import RequestContext,loader
from .models import Group
# from django.shortcuts import render-to-response
# Create your views here.
def index(request):
  latest_group_list=Group.objects.order_by('time')[:5]
  template=loader.get_template('share/index.html')
  context=RequestContext(request,{
    'latest_group_list':latest_group_list,
  })
  return HttpResponse(template.render(context))
def data(request):
  latest_group_list=Group.objects.order_by('time')[:5]
  template=loader.get_template('share/data.html')
  context=RequestContext(request,{
    'latest_group_list':latest_group_list,
  })
  return HttpResponse(template.render(context))
  
def service(request):
  latest_group_list=Group.objects.order_by('time')[:5]
  template=loader.get_template('share/service.html')
  context=RequestContext(request,{
    'latest_group_list':latest_group_list,
  })
  return HttpResponse(template.render(context))
  
def news(request):
  latest_group_list=Group.objects.order_by('time')[:5]
  template=loader.get_template('share/news.html')
  context=RequestContext(request,{
    'latest_group_list':latest_group_list,
  })
  return HttpResponse(template.render(context))

def register(request):
  latest_group_list=Group.objects.order_by('time')[:5]
  template=loader.get_template('share/register.html')
  context=RequestContext(request,{
    'latest_group_list':latest_group_list,
  })
  return HttpResponse(template.render(context))