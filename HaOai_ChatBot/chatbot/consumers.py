# consumers.py

from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio

from .chatbot_qa import build_retriever, build_qa_chain, query_qa_chain

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_history = []

        # Xác nhận kết nối WebSocket
        print("WebSocket connection established.")
        await self.accept()

        # Tạo retriever và QA chain khi kết nối
        self.retriever = build_retriever("haui_data")
        self.qa_chain = build_qa_chain(self.retriever)

    async def disconnect(self, close_code):
        print("WebSocket disconnected")

    async def receive(self, text_data):
        try:
            # Parse dữ liệu JSON từ client
            data = json.loads(text_data)
            question = data.get("message", "")

            # Gọi query chain trong thread blocking
            result = await asyncio.to_thread(query_qa_chain, self.qa_chain, question, self.chat_history)

            # Lưu lại lịch sử chat
            self.chat_history.append((question, result["answer"]))

            # Gửi câu trả lời lại cho client
            await self.send(text_data=json.dumps({
                'type': 'chat_message',
                'message': result["answer"]
            }))

        except Exception as e:
            # Gửi lỗi nếu có
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': str(e)
            }))
