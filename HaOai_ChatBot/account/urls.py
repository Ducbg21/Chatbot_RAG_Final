from django.urls import reverse_lazy
from django.urls import path
from . import views
from . import api_views
from django.contrib.auth import views as auth_views

app_name = "account"
urlpatterns = [
    path('signin/', views.signin_view, name='signin_view'),
    path('sign-out/', views.sign_out_view, name='sign_out_view'),
    path('signup/', views.sign_up_view, name='signup_view'),
    path('verify-mail/', views.verify_mail_view, name='verify_mail_view'),
    path('change-password/', views.change_password_view, name='change_password_view'),
    path('my-profile/', views.my_profile_view, name='my_profile_view'),
    path('user-setting/', views.user_settings_view, name='user_settings_view'),

    # Reset password
    path('reset-password/', auth_views.PasswordResetView.as_view(
        template_name='account/jetpro/sign-in/password-reset.html',
        success_url=reverse_lazy('account:password_reset_done')
    ), name='reset_password_view'),

    path('reset-password_sent/', auth_views.PasswordResetDoneView.as_view(
        template_name='account/jetpro/sign-in/password-reset-done.html',
    ), name='password_reset_done'),

    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
        template_name='account/jetpro/sign-in/new-password.html',
        success_url=reverse_lazy('account:password_reset_complete')
    ), name='password_reset_confirm'),

    path('reset-password-complete/', auth_views.PasswordResetCompleteView.as_view(
        template_name='account/jetpro/sign-in/password-reset-complete.html',
    ), name='password_reset_complete'),

    ### Api View ###
    path('api/v1/signin/', api_views.signin_api_view, name='signin_api_view'),
    path('api/v1/signup/', api_views.signup_api_view, name='signup_api_view'),
    path('api/v1/verify-otp/', api_views.verify_otp_api, name='verify_otp_api'),
    path('api/v1/change-password/', api_views.change_password_api, name='change_password_api'),
    path('api/v1/update-profile/', api_views.update_profile_api, name='update_profile_api'),
    path('api/v1/change-email/', api_views.change_email_api, name='change_email_api'),
    path('api/v1/verify-email/', api_views.verify_email_api, name='verify_email_api'),
    path('api/v1/deactivate-user/', api_views.deactivate_user_api, name='deactivate_user_api'),
]
