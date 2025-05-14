from typing import Union
from langchain_core.documents import Document
from langchain_community.retrievers import BM25Retriever
from langchain.retrievers import EnsembleRetriever
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import ConversationalRetrievalChain
from langchain_milvus import Milvus
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

from .embedding import GTEEmbeddingFunction


_embedding_fn = GTEEmbeddingFunction()


def build_retriever(collection_name: str) -> Union[BM25Retriever, EnsembleRetriever]:
    try:
        vectorstore = Milvus(
            embedding_function=_embedding_fn,
            connection_args={"uri": 'http://localhost:19530', "db_name": "haui"},
            collection_name=collection_name,
            drop_old=False
        )

        vector_retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})

        documents = vectorstore.similarity_search("", k=100)
        if not documents:
            raise ValueError("Không tìm thấy document nào!")

        bm25 = BM25Retriever.from_documents(documents)
        bm25.k = 4

        return EnsembleRetriever(retrievers=[vector_retriever, bm25], weights=[0.7, 0.3])
    except Exception as e:
        print(f"Lỗi retriever: {e}")
        return BM25Retriever.from_documents([
            Document(page_content="Không thể kết nối Milvus", metadata={"source": "error"})
        ])


def build_qa_chain(retriever):
    """
    Tạo QA chain sử dụng retriever và model Ollama Gemma
    """
    # Dùng handler để in từng phần trả lời
    callback_handler = StreamingStdOutCallbackHandler()

    # Khởi tạo model Ollama
    llm = ChatOllama(
        model="llama3.1:8b",
        temperature=0,
        streaming=True,
        base_url="http://localhost:11434",
        callbacks=[callback_handler]
    )

    # Tạo prompt template
    prompt = ChatPromptTemplate.from_messages([
        ("system", """Bạn là trợ lý ảo HaOai, chuyên giải đáp những thắc mặc về đại học công nghiệp hà nội.

        Hãy sử dụng thông tin từ context để trả lời câu hỏi. Nếu không có thông tin trong context, 
        hãy trả lời trung thực rằng bạn không có đủ thông tin.

        Context: {context}
        """),
        ("human", "{question}")
    ])

    # Tạo QA chain
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        combine_docs_chain_kwargs={"prompt": prompt},
        return_source_documents=True,
        verbose=True
    )

    return qa_chain


def query_qa_chain(qa_chain, question: str, chat_history: list = None):
    """
    Hàm để query QA chain với câu hỏi
    """
    if chat_history is None:
        chat_history = []

    result = qa_chain({"question": question, "chat_history": chat_history})
    return result






