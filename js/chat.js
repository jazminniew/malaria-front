// En chat.html, cargar el ID del chat desde el localStorage y obtener los mensajes del chat
async function fetchChatMessages() {
    const chatId = localStorage.getItem('currentChatId');
    if (!chatId) {
        console.error('No chat ID found.');
        return;
    }

    try {
        const response = await fetch(`https://tu-enlace-vercel.com/api/chats/${chatId}`);
        const chatMessages = await response.json();
        displayChatMessages(chatMessages);
    } catch (error) {
        console.error('Error fetching chat messages:', error);
    }
}

function displayChatMessages(messages) {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = '';

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <div class="message-header">
                <img src="${message.profilePic}" alt="Foto de perfil" class="profile-pic">
                <strong>${message.username}</strong>
                <span class="message-time">${formatTime(message.timestamp)}</span>
            </div>
            <div class="message-content">
                <p>${message.text}</p>
            </div>
        `;
        chatContainer.appendChild(messageElement);
    });
}

document.addEventListener('DOMContentLoaded', fetchChatMessages);
