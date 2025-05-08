from django.contrib import admin
from .models import Document, Chunk

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('name', 'source_type', 'uploaded_by', 'status', 'created_at')
    search_fields = ('name', 'uploaded_by__username')
    list_filter = ('source_type', 'status', 'created_at')
    ordering = ('-created_at',)

@admin.register(Chunk)
class ChunkAdmin(admin.ModelAdmin):
    list_display = ('document', 'chunk_index', 'embedding_sent', 'created_at')
    search_fields = ('document__name',)
    list_filter = ('embedding_sent', 'created_at')
    ordering = ('document', 'chunk_index')
