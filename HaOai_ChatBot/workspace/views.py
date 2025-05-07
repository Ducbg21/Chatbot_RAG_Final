from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def workspace_view(request):
    return render(request, 'workspace/content.html', {})
