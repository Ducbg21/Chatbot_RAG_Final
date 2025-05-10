from uuid import uuid4
from typing import List
from langchain.schema import Document
from langchain.text_splitter import CharacterTextSplitter
from langchain_milvus import Milvus


def split_documents(docs: Document, chunk_size: int = 1000, chunk_overlap: int = 200) -> List[Document]:
    splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )

    all_chunks = []
    for doc in docs:
        chunks = splitter.split_text(doc.page_content)
        for i, chunk in enumerate(chunks):
            all_chunks.append(Document(
                page_content=chunk,
                metadata={**doc.metadata, "chunk_index": i}
            ))
    return all_chunks


def connect_milvus(url: str, collection_name: str) -> Milvus:
    return Milvus(
        embedding_function=GTEEmbeddingFunction(),
        connection_args={"uri": url, "db_name": "haui"},
        collection_name=collection_name,
        drop_old=False
    )


def seed_data_to_milvus(url: str, collection_name: str, docs: Document, doc_name: str = "") -> Milvus:
    chunks = split_documents(docs)

    ids = [str(uuid4()) for _ in chunks]

    vectorstore = connect_milvus(url, collection_name)
    vectorstore.add_documents(documents=chunks, ids=ids)

    print(f"Push {len(chunks)} chunks vào collection `{collection_name}`")
    return vectorstore