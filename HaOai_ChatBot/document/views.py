from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Document
from .forms import DocumentForm

@login_required
def document_view(request):
    documents = Document.objects.all()
    context = {
        'documents': documents
    }
    return render(request, 'document/document_view.html', context)


@login_required
def document_detail_view(request, pk):
    document = get_object_or_404(Document, pk=pk)
    return render(request, 'document/document_detail.html', {'document': document})


@login_required
def upload_document_view(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            document = form.save(commit=False)
            document.uploaded_by = request.user
            document.save()
    else:
        form = DocumentForm()
    return render(request, 'document/upload_document.html', {'form': form})

