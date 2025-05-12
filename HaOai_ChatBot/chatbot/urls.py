from django.urls import path
from . import views, api_views

app_name = 'chatbot'
urlpatterns = [
    path('', views.chat_view, name='chat_view'),

    ### API VIEW ###
    path('api/v1/qa_chatbot', api_views.qa_chatbot_api, name='qa_chatbot_api')
]