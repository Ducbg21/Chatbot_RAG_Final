from django import forms
from .models import Document

class DocumentForm(forms.ModelForm):
    upload_file = forms.FileField(label="Chọn file", required=True)

    class Meta:
        model = Document
        fields = ['name', 'source_type', 'upload_file']

    def clean(self):
        cleaned_data = super().clean()
        source_type = cleaned_data.get('source_type')
        upload_file = cleaned_data.get('upload_file')

        if source_type == 'pdf' and not upload_file.name.endswith('.pdf'):
            raise forms.ValidationError("Bạn đã chọn kiểu PDF nhưng file không phải PDF.")

        if source_type == 'txt' and not upload_file.name.endswith('.txt'):
            raise forms.ValidationError("Bạn đã chọn kiểu TXT nhưng file không phải TXT.")

        return cleaned_data

    def save(self, commit=True):
        instance = super().save(commit=False)
        upload_file = self.cleaned_data.get('upload_file')

        # Gán file vào đúng field
        if self.cleaned_data['source_type'] == 'pdf':
            instance.pdf_file = upload_file
            instance.txt_file = None  # Đảm bảo txt_file trống
        else:
            instance.txt_file = upload_file
            instance.pdf_file = None  # Đảm bảo pdf_file trống

        if commit:
            instance.save()
        return instance
