from sentence_transformers import SentenceTransformer


class GTEEmbeddingFunction:
    def __init__(self):
        self.model = SentenceTransformer("Alibaba-NLP/gte-multilingual-base", trust_remote_code=True)

    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        return self.model.encode(texts, normalize_embeddings=True).tolist()

    def embed_query(self, text: str) -> list[float]:
        return self.model.encode([text], normalize_embeddings=True)[0].tolist()
