const cloud = document.querySelector(".bx-chevron-left"); 
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

const sidebarToggle = document.getElementById('sidebarToggle');
const content = document.getElementById('content');
const searchBar = document.querySelector('.search-bar');

const logoutBtn = document.getElementById('logout-btn');
const logoutCard = document.getElementById('logout-card');
const cancelBtn = document.getElementById('cancel-btn');
const exitBtn = document.getElementById('exit-btn');

const btnNuevo = document.getElementById('buttonNuevo');
const botonesNuevosCard = document.getElementById('botonesnuevosCard');
const pacienteBtn = document.getElementById('paciente-btn');
const imagenBtn = document.getElementById('imagen-btn');

const mainContent = document.getElementById('FONDOPACIENTES');

let currentPostElement = null;

function postMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();

    if (message) {
        const postsContainer = document.querySelector('.posts');
        
        // Crear un nuevo elemento para el mensaje
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <span class="username">Nuevo Usuario</span>
            </div>
            <p class="post-text">${message}</p>
            <div class="post-footer">
                <button class="icon-button like-button" onclick="likePost(this)"><i class='bx bx-heart'></i> <span class="like-count">0</span></button>
                <button class="icon-button comment-button" onclick="toggleCommentForm(this)"><i class='bx bxs-comment-detail'></i></button>
                <button class="icon-button contact-button" onclick="contactPost(this)"><i class='bx bxs-contact'></i></button>
            </div>
            <div class="comments"></div>
        `;

        // Añadir el mensaje a una de las columnas
        let columns = document.querySelectorAll('.post-column');
        if (columns.length > 0) {
            // Añadir el mensaje a la columna con menos mensajes
            let column = [...columns].sort((a, b) => a.children.length - b.children.length)[0];
            column.appendChild(postElement);
        }

        messageInput.value = ''; // Limpiar el campo de texto
    } else {
        alert('Escribe un mensaje antes de publicar.');
    }
}

function likePost(button) {
    const likeButton = button;
    const likeCountElement = likeButton.querySelector('.like-count');
    let likeCount = parseInt(likeCountElement.textContent);

    if (likeButton.classList.contains('liked')) {
        likeButton.classList.remove('liked');
        likeCount--;
    } else {
        likeButton.classList.add('liked');
        likeCount++;
    }

    likeCountElement.textContent = likeCount;
}

function toggleCommentForm(button) {
    const postElement = button.closest('.post');
    const existingCommentForm = postElement.querySelector('.comment-form');
    
    if (existingCommentForm) {
        existingCommentForm.style.display = existingCommentForm.style.display === 'none' ? 'flex' : 'none';
    } else {
        // Crear un nuevo formulario de comentario
        const commentForm = document.createElement('div');
        commentForm.className = 'comment-form';
        commentForm.innerHTML = `
            <textarea placeholder="Escribe un comentario..." rows="2"></textarea>
            <button onclick="submitComment(this)">Enviar</button>
        `;
        postElement.querySelector('.comments').appendChild(commentForm);
    }
}

function submitComment(button) {
    const commentForm = button.closest('.comment-form');
    const textarea = commentForm.querySelector('textarea');
    const comment = textarea.value.trim();

    if (comment) {
        const commentsContainer = commentForm.parentElement;
        
        // Crear un nuevo comentario
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-header">Tú</div>
            <div>${comment}</div>
        `;

        // Añadir el comentario
        commentsContainer.insertBefore(commentElement, commentForm);

        textarea.value = ''; // Limpiar el campo de texto
        commentForm.style.display = 'none'; // Ocultar el formulario después de enviar
    } else {
        alert('Escribe un comentario antes de enviar.');
    }
}

function contactPost(button) {
    currentPostElement = button.closest('.post');
    document.getElementById('contact-modal').style.display = 'flex';
}

function closeContactModal() {
    document.getElementById('contact-modal').style.display = 'none';
}

function sendContactRequest() {
    const contactMessage = document.getElementById('contact-message').value.trim();
    const contactName = document.getElementById('contact-name').value.trim();
    const contactInfo = document.getElementById('contact-info').value.trim();
    
    if (contactMessage && contactName && contactInfo && currentPostElement) {
        // Aquí puedes manejar el envío de la solicitud de contacto, como mostrar una alerta o enviar el mensaje al servidor
        alert(`Solicitud enviada a ${currentPostElement.querySelector('.username').textContent}.\n\nMensaje: ${contactMessage}\nNombre: ${contactName}\nContacto: ${contactInfo}`);
        closeContactModal();
    } else {
        alert('Completa todos los campos antes de enviar.');
    }
}
