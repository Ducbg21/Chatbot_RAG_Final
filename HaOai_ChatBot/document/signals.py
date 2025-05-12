# documents/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Document, Chunk
from langchain.schema import Document as LangchainDocument

from .utils import seed_data_to_milvus, split_documents
import traceback
from uuid import uuid4

@receiver(post_save, sender=Document)
def process_document(sender, instance, created, **kwargs):
    if not created:
        return

    try:
        # Cập nhật trạng thái: processing
        instance.status = 'processing'
        instance.save(update_fields=["status"])

        # Tạo document cho Langchain
        langchain_doc = LangchainDocument(
            page_content=instance.content,
            metadata={
                "doc_id": str(instance.uuid),
                "title": instance.name,
                "uploaded_by": str(instance.uploaded_by_id),
                "source_type": instance.source_type
            }
        )

        # Chia chunk
        chunks = split_documents([langchain_doc])

        chunk_objs = []
        for chunk in chunks:
            chunk_objs.append(Chunk(
                uuid=uuid4(),
                document=instance,
                chunk_index=chunk.metadata.get("chunk_index", 0),
                content=chunk.page_content
            ))

        # Lưu vào DB
        Chunk.objects.bulk_create(chunk_objs)

        # Push lên Milvus
        seed_data_to_milvus(
            url='http://localhost:19530',
            collection_name='haui_data',
            docs=[langchain_doc]
        )

        # Cập nhật embedding_sent = True cho các chunk
        Chunk.objects.filter(document=instance).update(embedding_sent=True)

        # Cập nhật trạng thái: processed
        instance.status = 'processed'
        instance.save(update_fields=["status"])

    except Exception as e:
        instance.status = 'error'
        instance.save(update_fields=["status"])
        print("Lỗi xử lý document:", e)
        traceback.print_exc()
