from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth import logout
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.decorators import login_required

from .models import UserProfile

def signin_view(request):
    context = {'website_template': 'jetpro', "pagename": "Login"}
    if request.user.is_authenticated:
        return redirect('workspace:workspace_view')

    template = loader.get_template(str('account/%s/sign-in/signin_view.html' % context['website_template']))

    return HttpResponse(template.render(context, request))

def sign_out_view(request):
    logout(request)
    return redirect('/')

def sign_up_view(request):
    context = {'website_template': 'jetpro', "pagename": "Signup"}
    template = loader.get_template(str('account/%s/sign-up/signup_view.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

def  verify_mail_view(request):
    context = {'website_template': 'jetpro', "pagename": "VerifyMail"}
    template = loader.get_template(str('account/%s/sign-up/verify_mail.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def change_password_view(request):
    context = {'website_template': 'jetpro', "pagename": "ChangePass"}
    template = loader.get_template(str('account/%s/sign-in/change-password.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def my_profile_view(request):
    context = {
        'user': request.user,
        'website_template': 'jetpro',
        "pagename": "ChangePass"}
    template = loader.get_template(str('account/%s/profile/my-profile.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def user_settings_view(request):
    context = {
        'user': request.user,
        'website_template': 'jetpro',
        "pagename": "ChangePass"}
    template = loader.get_template(str('account/%s/profile/account_setting.html' % context['website_template']))
    return HttpResponse(template.render(context, request))

@login_required
def activity_view(request):
    context = {
        # 'user': request.user,
        'website_template': 'jetpro',
        "pagename": "ChangePass"}
    template = loader.get_template(str('account/%s/profile/activity_view.html' % context['website_template']))
    return HttpResponse(template.render(context, request))





