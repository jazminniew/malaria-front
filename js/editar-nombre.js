/*PARA MI NO SIRVE ESTO CHEQUEARRR! ------------------------------------------
const countries = [
    "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina",
    "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Barbados", "Bélgica", "Belice", "Benín", "Bielorrusia",
    "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botswana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi",
    "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Chad", "Chile", "China", "Chipre", "Colombia", "Comoras",
    "Congo", "Congo (República Democrática del)", "Corea del Norte", "Corea del Sur", "Costa Rica", "Croacia", "Cuba", 
    "Dinamarca", "Dominica", "República Dominicana", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos",
    "España", "Estados Unidos", "Estonia", "Eswatini", "Etiopía", "Fiji", "Filipinas", "Finlandia", "Francia",
    "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guinea", "Guinea-Bisáu", "Guinea Ecuatorial",
    "Guyana", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irán", "Iraq", "Irlanda", "Islas Marshall", "Islandia",
    "Islas Salomón", "Islas Seychelles", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia",
    "Kirguistán", "Kiribati", "Kuwait", "Laos", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania",
    "Luxemburgo", "Madagascar", "Malasia", "Malawi", "Maldivas", "Malta", "Marruecos", "Mauricio", "Mauritania", 
    "México", "Micronesia", "Moldova", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru",
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
    select.innerHTML = ''; // Limpiar opciones existentes
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




function toggleEditMode() {
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const countrySelect = document.getElementById('country');
    const emailInput = document.getElementById('email');
    const editButton = document.getElementById('edit-button');

    const isEditing = nameInput.disabled;

    // Habilitar o deshabilitar campos
    nameInput.disabled = !isEditing;
    surnameInput.disabled = !isEditing;
    countrySelect.disabled = !isEditing;
    emailInput.disabled = !isEditing;

    // Cambiar el texto del botón
    editButton.textContent = isEditing ? 'Confirmar' : 'Editar';

    // Cambiar el borde a violeta si está habilitado
    if (isEditing) {
        nameInput.classList.add('editable');
        surnameInput.classList.add('editable');
        countrySelect.classList.add('editable');
        emailInput.classList.add('editable');
    } else {
        nameInput.classList.remove('editable');
        surnameInput.classList.remove('editable');
        countrySelect.classList.remove('editable');
        emailInput.classList.remove('editable');
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


// Cargar los datos del perfil al cargar la página

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

document.getElementById('back-button').addEventListener('click', function () {
    window.history.back();
});



*/const nombre = document.getElementById('nombre');
const editButton = document.getElementById('edit-button');
const backButton = document.getElementById('back-button'); // Referencia al botón "back"
const responseDiv = document.getElementById('response');

let editMode = false;

const id = localStorage.getItem('id');
const token = localStorage.getItem("token");


// Función para mostrar mensajes en el responseDiv
function mostrarMensaje(mensaje, tipo = 'error') {
    responseDiv.innerHTML = `<div class="${tipo}">${mensaje}</div>`;
    responseDiv.style.display = 'block';
}

// Obtener datos del perfil desde Vercel
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`http://localhost:8000/user/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        
        if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();
        nombre.value = data.nombre;
    } catch (err) {
        mostrarMensaje('Error al obtener los datos del usuario');
        console.error('Error al obtener los datos del usuario:', err);
    }
}, false);

// Editar nombre
editarNombre.addEventListener("click", async () => {
    try {
        const nuevoNombre = nombre.value;

        const formData = {
            nombre: nuevoNombre
        };

        const response = await fetch(`http://localhost:8000/user/editNombre/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Error al editar los datos del usuario');
        } else {
            window.location.href = "perfil.html";
        }
    } catch (err) {
        mostrarMensaje('Error al editar los datos del usuario');
        console.error(err);
    }
});

// Volver a la página anterior
backButton.addEventListener('click', function () {
    window.history.back();
});
