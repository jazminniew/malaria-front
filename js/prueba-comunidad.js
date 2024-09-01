document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const sendPostButton = document.getElementById('send-post');
    const newPostTextarea = document.getElementById('new-post');

    const messageModal = document.getElementById('message-modal');
    const closeModalButtons = document.querySelectorAll('.close');

    // Controlar los "likes" por usuario
    const likedPosts = new Set();

    // Manejar el envío de un nuevo post
    sendPostButton.addEventListener('click', () => {
        const content = newPostTextarea.value.trim();
        if (content !== '') {
            const postElement = createPostElement('Usuario', content);
            postsContainer.appendChild(postElement);
            newPostTextarea.value = ''; // Limpiar el textarea

            // Reorganizar los posts en dos columnas
            reorganizePosts();
        }
    });

    // Función para crear un post
    function createPostElement(username, content) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <p><strong>${username}</strong>: ${content}</p>
            <div class="actions">
                <span class="like-btn">❤️ 0</span>
                <span class="comment-btn">💬</span>
                <span class="message-btn">📧</span>
            </div>
            <div class="comments-section"></div>
        `;

        // Manejar los eventos de los botones
        postElement.querySelector('.like-btn').addEventListener('click', (event) => likePost(event, postElement));
        postElement.querySelector('.comment-btn').addEventListener('click', () => toggleCommentInput(postElement));
        postElement.querySelector('.message-btn').addEventListener('click', openMessageModal);

        return postElement;
    }

    // Función para manejar los "likes"
    function likePost(event, postElement) {
        if (likedPosts.has(postElement)) return;  // Evitar más de un like

        let likeCount = parseInt(event.target.textContent.split(' ')[1]);
        event.target.textContent = `❤️ ${++likeCount}`;
        likedPosts.add(postElement);  // Marcar como liked
    }

    // Función para mostrar/ocultar el input de comentarios
    function toggleCommentInput(postElement) {
        let commentInput = postElement.querySelector('.comment-input');
        if (!commentInput) {
            commentInput = document.createElement('textarea');
            commentInput.classList.add('comment-input');
            commentInput.placeholder = "Escribe un comentario...";
            postElement.appendChild(commentInput);

            const sendCommentButton = document.createElement('button');
            sendCommentButton.classList.add('send-comment');
            sendCommentButton.textContent = 'Comentar';
            sendCommentButton.addEventListener('click', () => addComment(postElement, 'Usuario', commentInput));
            postElement.appendChild(sendCommentButton);
        } else {
            commentInput.remove();
            postElement.querySelector('.send-comment').remove();
        }
    }

    // Función para agregar un comentario
    function addComment(postElement, username, commentInput) {
        const commentText = commentInput.value.trim();
        if (commentText !== '') {
            const commentElement = document.createElement('p');
            commentElement.innerHTML = `<strong>${username}</strong>: ${commentText}`;
            commentElement.classList.add('comment');
            postElement.querySelector('.comments-section').appendChild(commentElement);
            commentInput.value = ''; // Limpiar el textarea de comentario
        }
    }

    // Función para reorganizar los posts en dos columnas
    function reorganizePosts() {
        const posts = Array.from(postsContainer.querySelectorAll('.post'));
        postsContainer.innerHTML = ''; // Limpiar el contenedor

        // Crear dos columnas
        const column1 = document.createElement('div');
        const column2 = document.createElement('div');
        column1.classList.add('post-column');
        column2.classList.add('post-column');

        // Dividir los posts entre las dos columnas
        posts.forEach((post, index) => {
            if (index % 2 === 0) {
                column1.appendChild(post);
            } else {
                column2.appendChild(post);
            }
        });

        // Añadir las columnas al contenedor
        postsContainer.appendChild(column1);
        postsContainer.appendChild(column2);
    }

    // Función para abrir el modal de mensaje privado
    function openMessageModal() {
        messageModal.style.display = 'block';
    }

    // Cerrar el modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            messageModal.style.display = 'none';
        });
    });

    // Cerrar el modal al hacer clic fuera de la ventana modal
    window.addEventListener('click', (event) => {
        if (event.target === messageModal) {
            messageModal.style.display = 'none';
        }
    });
});
