from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Document, Chunk
from .utils import split_documents, connect_milvus
from langchain.schema import Document as LC_Document
from uuid import uuid4

@receiver(post_save, sender=Document)
def handle_document_save(sender, instance, created, **kwargs):
    if not created or not instance.content:  # chỉ chạy khi tạo mới & có content
        return

    try:
        # Cập nhật trạng thái: processing
        instance.status = 'processing'
        instance.save(update_fields=['status'])

        # B1: Tạo document giả lập cho Langchain
        doc = LC_Document(
            page_content=instance.content,
            metadata={
                "doc_name": instance.name,
                "language": "vi",
                "source": f"{instance.uuid}",
                "content_type": instance.source_type,
                "start_index": 0,
            }
        )

        # B2: Chia chunk
        chunks = split_documents([doc])

        # B3: Lưu chunks vào DB
        for i, chunk in enumerate(chunks):
            Chunk.objects.create(
                uuid=uuid4(),
                document=instance,
                chunk_index=i,
                content=chunk.page_content
            )

        # B4: Đẩy lên Milvus
        milvus = connect_milvus("http://localhost:19530", "haui_data")
        milvus.add_documents(
            documents=chunks,
            ids=[str(uuid4()) for _ in chunks]
        )

        # B5: Trạng thái thành công
        instance.status = 'processed'
        instance.save(update_fields=['status'])

    except Exception as e:
        # B6: Nếu có lỗi
        instance.status = 'error'
        instance.save(update_fields=['status'])
        print(f"❌ Lỗi khi xử lý document {instance.uuid}: {e}")
