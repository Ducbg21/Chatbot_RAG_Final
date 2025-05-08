from django.urls import path
from . import views

app_name = "document"
urlpatterns = [
    path('', views.document_view, name='document_view'),
    path('document-detail/<uuid:pk>', views.document_detail_view, name='document_detail_view'),
    path('upload_document/', views.upload_document_view, name='upload_document_view'),

]
