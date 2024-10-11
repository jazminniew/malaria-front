async function fetchChatMessages() {
    const chatId = localStorage.getItem('currentChatId');

    if (!chatId) {
        console.error('No chat ID found.');
        alert('No se encontró el ID del chat. Por favor, vuelve a la página anterior y selecciona un chat.');
        return; // Detiene la ejecución si no hay ID
    }

    try {
        const response = await fetch(`https://tu-api-vercel.vercel.app/api/chats/${chatId}`, {
            headers: {
                'Authorization': 'Bearer tu_token_aqui', // Asegúrate de usar tu token
            }
        });

        // Verifica que la respuesta sea exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const chatMessages = await response.json();
        displayChatMessages(chatMessages);
    } catch (error) {
        console.error('Error fetching chat messages:', error);
    }
}

function displayChatMessages(messages) {
    const chatContainer = document.getElementById('messages-container');
    chatContainer.innerHTML = ''; // Limpia mensajes anteriores
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <div class="message-header">
                <strong>${message.username}</strong>
                <span class="message-time">${formatTime(message.timestamp)}</span>
            </div>
            <div class="message-content">
                <p>${message.text}</p>
            </div>
        `;
        chatContainer.appendChild(messageElement);
    });

    // Scroll down to the latest message
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Función para formatear la hora (ajusta según tu formato deseado)
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
}

// Evento para enviar el mensaje
document.addEventListener('DOMContentLoaded', () => {
    fetchChatMessages();

    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const backBtn = document.getElementById('back-btn');

    sendBtn.addEventListener('click', async () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const chatId = localStorage.getItem('currentChatId');
            const token = 'tu_token_aqui'; // Reemplaza con tu token de autenticación

            // Enviar el mensaje a la base de datos
            await fetch(`https://tu-vercel.com/api/chats/${chatId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text: messageText, username: localStorage.getItem('username'), timestamp: Date.now() })
            });

            // Agregar el mensaje enviado en la interfaz
            addMessage(messageText, true);
            messageInput.value = ''; // Limpia el campo de entrada
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click(); // Simula clic en el botón
        }
    });

    backBtn.addEventListener('click', () => {
        window.history.back(); // Vuelve a la página anterior
    });
});

// Función para agregar un mensaje en la interfaz
function addMessage(text, isSent) {
    const messagesContainer = document.getElementById('messages-container');
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + (isSent ? 'sent' : 'received');
    messageElement.innerHTML = `<p>${text}</p>`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Desplaza hacia abajo
}

// Cuando se selecciona un chat
function selectChat(chatId) {
    localStorage.setItem('currentChatId', chatId);
    window.location.href = 'chat.html'; // Redirige a la página de chat
}

async function sendMessage(messageText) {
    const chatId = localStorage.getItem('currentChatId');
    const token = localStorage.getItem('authToken');

    if (!chatId || !token) {
        console.error('Chat ID or token not found.');
        return;
    }

    try {
        const response = await fetch(`https://tu-api-vercel.vercel.app/api/chats/${chatId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: messageText,
                username: localStorage.getItem('username'), // Asegúrate de tener el nombre de usuario almacenado
                timestamp: new Date().toISOString() // Timestamp para el mensaje
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newMessage = await response.json();
        displayChatMessages([newMessage]); // Muestra el nuevo mensaje
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
    }
}

document.getElementById('message-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;
    sendMessage(messageText);
    messageInput.value = ''; // Limpia el campo de entrada
});
