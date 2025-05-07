from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def document_view(request):
    return render(request, 'document/document_view.html')