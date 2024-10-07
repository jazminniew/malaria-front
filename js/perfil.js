// script.js

// Lista de países en formato HTML
const countries = [
    "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina",
    "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Barbados", "Bélgica", "Belice", "Benín", "Bielorrusia",
    "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botswana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi",
    "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Chad", "Chile", "China", "Chipre", "Colombia", "Comoras",
    "Congo", "Congo (República Democrática del)", "Corea del Norte", "Corea del Sur", "Costa Rica", "Croacia", "Cuba", 
    "Dinamarca", "Dominica", "República Dominicana", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos",
    "Ecuador", "España", "Estados Unidos", "Estonia", "Eswatini", "Etiopía", "Fiji", "Filipinas", "Finlandia", "Francia",
    "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guinea", "Guinea-Bisáu", "Guinea Ecuatorial",
    "Guyana", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irán", "Iraq", "Irlanda", "Islas Marshall", "Islandia",
    "Islas Salomón", "Islas Seychelles", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia",
    "Kirguistán", "Kiribati", "Kuwait", "Laos", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania",
    "Luxemburgo", "Madagascar", "Malasia", "Malawi", "Maldivas", "Malta", "Marruecos", "Mauricio", "Mauritania", 
    "México", "Micronesia", "Moldova", "Mónaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru",
    "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos",
    "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana",
    "República Checa", "República del Congo", "Rumanía", "Rusia", "Ruanda", "San Cristóbal y Nieves", "San Marino",
    "San Tomé y Príncipe", "Santa Lucía", "Santa Sé", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur",
    "Siria", "Somalia", "Sri Lanka", "Suecia", "Suiza", "Surinam", "Tailandia", "Taiwán", "Tanzania", "Togo", "Tonga",
    "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán",
    "Vanuatu", "Vaticano", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabue"
];

function populateCountries() {
    const select = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.toLowerCase().replace(/\s+/g, '-');
        option.textContent = country;
        select.appendChild(option);
    });
}

//------------------------final paises----------------------------------------
const profilePicInput = document.getElementById('profile-pic-input');
const profilePic = document.getElementById('profile-pic');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const countryInput = document.getElementById('country');
const occupationInput = document.getElementById('occupation');
const emailInput = document.getElementById('email');
const descriptionInput = document.getElementById('description');
const editButton = document.getElementById('edit-button');


let editMode = false;

// Obtener datos del perfil desde Vercel
async function fetchProfileData() {
    try {
        const response = await fetch('https://tu-enlace-vercel.com/api/perfil'); // Cambia por tu enlace real
        const data = await response.json();
        
        // Rellenar los campos con los datos obtenidos
        nameInput.value = data.name || '';
        surnameInput.value = data.surname || '';
        emailInput.value = data.email || '';
        descriptionInput.value = data.description || '';
        
        // Rellenar select de país con el array global 'countries'
        populateCountries();  // Usa la función global para países
        if (data.country) {
            countryInput.value = data.country.toLowerCase().replace(/\s+/g, '-');
        }
        
        const occupations = ['Médico', 'Ingeniero', 'Abogado']; // Ocupaciones reales
        occupations.forEach(occupation => {
            const option = document.createElement('option');
            option.value = occupation;
            option.textContent = occupation;
            if (occupation === data.occupation) option.selected = true; // Seleccionar ocupación actual
            occupationInput.appendChild(option);
        });
        
        // Cargar la foto de perfil
        profilePic.src = data.profilePicUrl || 'userphoto.avif'; 
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}


// Función para alternar el modo de edición
function toggleEditMode() {
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const countrySelect = document.getElementById('country');
    const occupationSelect = document.getElementById('occupation');
    const emailInput = document.getElementById('email');
    const descriptionTextarea = document.getElementById('description');
    const editButton = document.getElementById('edit-button');

    const isEditing = nameInput.disabled;

    // Habilitar o deshabilitar campos
    nameInput.disabled = !isEditing;
    surnameInput.disabled = !isEditing;
    countrySelect.disabled = !isEditing;
    occupationSelect.disabled = !isEditing;
    emailInput.disabled = !isEditing;
    descriptionTextarea.disabled = !isEditing;

    // Cambiar el texto del botón
    editButton.textContent = isEditing ? 'Confirmar' : 'Editar';

    // Cambiar el borde a violeta si está habilitado
    if (isEditing) {
        nameInput.classList.add('editable');
        surnameInput.classList.add('editable');
        countrySelect.classList.add('editable');
        occupationSelect.classList.add('editable');
        emailInput.classList.add('editable');
        descriptionTextarea.classList.add('editable');
    } else {
        nameInput.classList.remove('editable');
        surnameInput.classList.remove('editable');
        countrySelect.classList.remove('editable');
        occupationSelect.classList.remove('editable');
        emailInput.classList.remove('editable');
        descriptionTextarea.classList.remove('editable');
    }
}

function validateProfileData() {
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validación de formato de email

    // Verificar que los campos obligatorios no estén vacíos
    if (!nameInput.value.trim() || !surnameInput.value.trim()) {
        alert('Por favor, completa los campos obligatorios: Nombre y Apellido.');
        return false;
    }

    // Verificar formato de email
    if (!emailRegex.test(emailInput.value)) {
        alert('Por favor, ingresa un email válido.');
        return false;
    }

    return true;
}

// Función para guardar los datos del perfil
async function saveProfileData() {
    if (!validateProfileData()) {
        return; // Si la validación falla, no continuar
    }
    const profileData = {
        name: nameInput.value,
        surname: surnameInput.value,
        country: countryInput.value,
        occupation: occupationInput.value,
        email: emailInput.value,
        description: descriptionInput.value,
    };

    try {
        await fetch('https://tu-enlace-vercel.com/api/perfil', { // Cambia por tu enlace real
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });
        alert('Perfil actualizado exitosamente');
    } catch (error) {
        console.error('Error updating profile data:', error);
    }

    
}

// Cargar los datos del perfil al cargar la página
fetchProfileData();

//---------------------------final info usuario----------------------------

function deleteConversation(button) {
    const message = button.closest('.message');
    message.remove();
    const messageList = document.querySelector('#message-list');
    const noMessages = document.getElementById('no-messages');

    if (messageList.children.length === 0) {
        noMessages.style.display = 'block';
        document.getElementById('reply-text').style.display = 'none';
        document.getElementById('send-button').style.display = 'none';
    }
}

function sendReply() {
    const replyText = document.getElementById('reply-text').value;

    if (replyText.trim() === '') {
        alert('Escribe un mensaje antes de enviar');
        return;
    }

    const messageList = document.querySelector('#message-list');
    const newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.innerHTML = `<div class="message-header">
                                <strong>Tú:</strong>
                                <button class="delete-button" onclick="deleteConversation(this)">
                                    <img src="trash-icon.png" alt="Eliminar" class="trash-icon">
                                </button>
                            </div>
                            <div class="message-content">
                                <p>${replyText}</p>
                            </div>`;
    messageList.appendChild(newMessage);
    document.getElementById('reply-text').value = '';
    document.getElementById('no-messages').style.display = 'none';
    document.getElementById('reply-text').style.display = 'none';
    document.getElementById('send-button').style.display = 'none';
}

function startReply() {
    const replyText = document.getElementById('reply-text');
    const sendButton = document.getElementById('send-button');

    if (replyText.style.display === 'block') {
        replyText.style.display = 'none';
        sendButton.style.display = 'none';
    } else {
        replyText.style.display = 'block';
        sendButton.style.display = 'block';
    }
}


function enableProfilePicUpload() {
    const profilePicInput = document.getElementById('profile-pic-input');
    const nameInput = document.getElementById('name');
    
    // Solo habilita la carga si está en modo de edición
    if (!nameInput.disabled) {
        profilePicInput.click();
    }
}
function updateProfilePic(event) {
    const profilePic = document.getElementById('profile-pic');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result; // Cambia la fuente de la imagen
        };
        reader.readAsDataURL(file);
    }
}


//-----------------------------------mensajes privados--------------------------------
// Función para obtener los chats de la base de datos desde Vercel
async function fetchChats() {
    try {
        const response = await fetch('https://tu-enlace-vercel.com/api/chats'); // Cambia por tu enlace real de la base de datos en Vercel
        const chats = await response.json();

        // Si la lista de chats está vacía, muestra un mensaje indicando que no hay mensajes
        if (chats.length === 0) {
            displayNoChatsMessage();
            console.log(displayNoChatsMessage);
        } else {
            displayChats(chats);
        }
    } catch (error) {
        console.error('Error fetching chats:', error);
    }
}

// Función para mostrar un mensaje cuando no hay chats
function displayNoChatsMessage() {
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';  // Limpiar contenido previo

    const noChatsMessage = document.createElement('p');
    noChatsMessage.className = 'no-chats-message';
    noChatsMessage.textContent = 'No hay ningún mensaje';
    
    messageList.appendChild(noChatsMessage);
    
}

// Función para mostrar los chats en la interfaz
function displayChats(chats) {
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';  // Limpiar el contenido anterior

    chats.forEach(chat => {
        const chatElement = document.createElement('div');
        chatElement.className = 'chat-item';  // Mantener la misma clase del HTML
        chatElement.innerHTML = `
            <img src="${chat.profilePic}" alt="Foto de perfil" class="chat-pic">
            <div class="chat-name">${chat.username}</div>
            <div class="chat-time">${formatTime(chat.timestamp)}</div>
        `;
        chatElement.addEventListener('click', () => openChat(chat.chatId));  // Redirigir a la página de chat
        messageList.appendChild(chatElement);
    });
}

// Función para formatear la hora del mensaje
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// Función para redirigir a la página del chat cuando se haga clic en un mensaje
function openChat(chatId) {
    localStorage.setItem('currentChatId', chatId);
    window.location.href = 'chat.html';
}

// Llamar a fetchChats cuando cargue la página
document.addEventListener('DOMContentLoaded', fetchChats);
