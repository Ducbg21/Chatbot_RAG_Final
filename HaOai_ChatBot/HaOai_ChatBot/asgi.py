import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddleware
import chatbot.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'HaOai_ChatBot.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddleware(
        URLRouter(
            chatbot.routing.websocket_urlpatterns
        )
    ),
})