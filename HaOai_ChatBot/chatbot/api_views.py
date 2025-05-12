import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.http import StreamingHttpResponse, JsonResponse
from .chatbot_qa import build_retriever, build_qa_chain

@login_required
@require_POST
def qa_chatbot_api(request):
    try:
        data = json.loads(request.body)
        question = data.get("question")
        if not question:
            return JsonResponse({"error": "Thiếu 'question'"}, status=400)

        retriever = build_retriever("haui_data")
        qa_chain = build_qa_chain(retriever)

        def generate():
            response = qa_chain.stream({"question": question, "chat_history": []})
            for chunk in response:
                content = chunk.get("answer", "") or chunk.get("content", "")
                if content:
                    yield content

        return StreamingHttpResponse(generate(), content_type="text/plain")

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)