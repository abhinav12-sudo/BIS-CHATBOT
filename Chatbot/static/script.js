async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();
    if (!message) return;

    appendMessage(message, "user-message");
    inputField.value = "";

    const chatBox = document.getElementById("chat-box");
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "message bot-message";
    typingIndicator.innerText = "Thinking...";
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        chatBox.removeChild(typingIndicator);
        appendMessage(data.response, "bot-message");
    } catch (error) {
        chatBox.removeChild(typingIndicator);
        appendMessage("Error connecting to the server.", "bot-message");
    }
}

function appendMessage(text, className) {
    const chatBox = document.getElementById("chat-box");
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text; // innerText renders line breaks safely
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}