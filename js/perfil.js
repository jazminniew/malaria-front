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

function toggleEditMode() {
    const profileCard = document.querySelector('.profile-card');
    const fields = document.querySelectorAll('.profile-info input, .profile-info select, .profile-info textarea');
    const isEditing = !fields[0].disabled;

    fields.forEach(field => {
        field.disabled = isEditing;
        field.style.backgroundColor = isEditing ? '#f9f9f9' : 'white';
        field.style.border = isEditing ? '1px solid #ddd' : '1px solid #7c3ed6';
    });

    document.getElementById('edit-button').style.display = isEditing ? 'none' : 'block';
    document.getElementById('confirm-button').style.display = isEditing ? 'block' : 'none';

    // Solo permitir cambiar la foto cuando esté en modo de edición
    document.getElementById('profile-pic').onclick = isEditing ? function() {
        document.getElementById('profile-pic-input').click();
    } : null;

    profileCard.classList.toggle('edit-mode', !isEditing);
}


function saveChanges() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const country = document.getElementById('country').value;
    const occupation = document.getElementById('occupation').value;
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;

    // Hacer una solicitud fetch para actualizar los datos del usuario
    fetch('https://malaria-xi.vercel.app/', {
        method: 'PUT', // Asumiendo que el método para editar es PUT
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            country: country,
            occupation: occupation,
            email: email,
            description: description
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cambios guardados exitosamente');
            toggleEditMode(); // Desactivar el modo de edición
        } else {
            alert('Error al guardar los cambios');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar guardar los cambios');
    });
}


function updateProfilePic(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById('profile-pic').src = e.target.result;
    }

    reader.readAsDataURL(file);
}

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

// Inicializar el select de países al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    populateCountries();

    // Mensajes de muestra
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = `<div class="message">
                                <div class="message-header">
                                    <strong>Juan:</strong>
                                    <button class="delete-button" onclick="deleteConversation(this)">
                                        <img src="trash-icon.png" alt="Eliminar" class="trash-icon">
                                    </button>
                                </div>
                                <div class="message-content">
                                    <p>Hola, ¿cómo estás?</p>
                                    <button class="reply-button" onclick="startReply()">Responder</button>
                                </div>
                             </div>
                             <div class="message">
                                <div class="message-header">
                                    <strong>Pedro:</strong>
                                    <button class="delete-button" onclick="deleteConversation(this)">
                                        <img src="trash-icon.png" alt="Eliminar" class="trash-icon">
                                    </button>
                                </div>
                                <div class="message-content">
                                    <p>Hola Juan, estoy bien. ¿Y tú?</p>
                                    <button class="reply-button" onclick="startReply()">Responder</button>
                                </div>
                             </div>`;
});


