document.addEventListener("DOMContentLoaded", function () {
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const chatMessages = document.getElementById("chat-messages");

    function appendMessage(content, sender = 'user') {
        const message = document.createElement("div");
        message.className = `d-flex mb-2 ${sender === 'bot' ? 'justify-content-start' : 'justify-content-end'}`;
        message.innerHTML = `
            <div class="p-3 rounded-3 ${sender === 'bot' ? 'bg-light text-dark' : 'bg-primary text-white'}" style="max-width: 75%;">
                ${content}
            </div>
        `;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendQuestion(question) {
        try {
            const response = await fetch("/chatbot/api/v1/qa_chatbot/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                appendMessage("Lỗi khi gọi API", "bot");
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let answerText = "";

            const answerElement = document.createElement("div");
            answerElement.className = "d-flex mb-2 justify-content-start";
            const bubble = document.createElement("div");
            bubble.className = "p-3 rounded-3 bg-light text-dark";
            bubble.style.maxWidth = "75%";
            bubble.innerText = "...";
            answerElement.appendChild(bubble);
            chatMessages.appendChild(answerElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                bubble.innerText += chunk + " ";
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        } catch (error) {
            appendMessage("Đã xảy ra lỗi: " + error.message, "bot");
        }
    }

    function handleSend() {
        const question = chatInput.value.trim();
        if (!question) return;

        appendMessage(question, "user");
        chatInput.value = "";
        sendQuestion(question);
    }

    sendBtn.addEventListener("click", handleSend);

    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });
});
