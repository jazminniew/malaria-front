document.addEventListener('DOMContentLoaded', () => {
    const sendPostBtn = document.getElementById('sendPostBtn');
    const postContent = document.getElementById('postContent');
    const postsContainer = document.querySelector('.FONDOPOSTS');
    const currentUserName = "Jazmin";

    // Crear un mensaje para mostrar cuando no hay posts
    const noPostsMessage = document.createElement('div');
    noPostsMessage.className = 'no-posts-message';
    noPostsMessage.textContent = 'No hay posts.';
    noPostsMessage.style.display = 'none'; // Inicialmente ocultar
    postsContainer.appendChild(noPostsMessage);

    sendPostBtn.addEventListener('click', () => {
        const content = postContent.value.trim();
        if (content) {
            createPost(content);
            postContent.value = ''; // Limpiar el textarea
        }
    });

    postsContainer.addEventListener('click', (event) => {
        const post = event.target.closest('.post');
        if (!post) return;

        if (event.target.classList.contains('like-btn')) {
            handleLike(post);
        } else if (event.target.classList.contains('comment-btn')) {
            handleComment(post);
        } else if (event.target.classList.contains('message-btn')) {
            handleMessage(post);
        }
    });

    function createPost(content) {
        const newPost = document.createElement('div');
        newPost.className = 'post';
        newPost.innerHTML = `
            <div class="post-header">
                <div class="post-user-info">
                    <strong>${currentUserName}</strong>
                </div>
            </div>
            <div class="post-content">
                <p>${content}</p>
            </div>
            <div class="post-actions">
                <button class="like-btn"><i class='bx bx-heart'></i> 0</button>
                <button class="comment-btn"><i class='bx bx-comment'></i></button>
                <button class="message-btn"><i class='bx bx-chat'></i></button>
            </div>
            <div class="comment-section"></div>
            <div class="contact-form hidden"></div>
        `;
        postsContainer.appendChild(newPost);
        
        // Ocultar el mensaje "no hay posts" si se ha creado un post
        noPostsMessage.style.display = 'none';
    }

    function updateNoPostsMessage() {
        if (postsContainer.children.length === 0) {
            noPostsMessage.style.display = 'block'; // Mostrar mensaje
        } else {
            noPostsMessage.style.display = 'none'; // Ocultar mensaje
        }
    }

    function handleLike(post) {
        const likeBtn = post.querySelector('.like-btn');
        let likeCount = parseInt(likeBtn.textContent.split(' ')[1]);
    
        if (post.classList.contains('liked')) {
            // Si ya está 'liked', quitar el like
            likeCount--;
            likeBtn.innerHTML = `<i class='bx bx-heart'></i> ${likeCount}`; // Cambiar icono a no 'liked'
            post.classList.remove('liked');
        } else {
            // Si no está 'liked', agregar el like
            likeCount++;
            likeBtn.innerHTML = `<i class='bx bxs-heart'></i> ${likeCount}`; // Cambiar icono a 'liked'
            post.classList.add('liked');
        }
    }

    function handleComment(post) {
        // Ocultar el formulario de mensaje privado
        const contactForm = post.querySelector('.contact-form');
        if (contactForm) {
            contactForm.classList.add('hidden');
        }

        let commentSection = post.querySelector('.comment-section');
        if (!commentSection) {
            commentSection = document.createElement('div');
            commentSection.className = 'comment-section';
            post.appendChild(commentSection);
        }

        let commentInput = commentSection.querySelector('.comment-input');
        let submitCommentBtn = commentSection.querySelector('.submit-comment-btn');

        if (!commentInput) {
            const { input, button } = createInputField(
                'Escribe un comentario...',
                'Enviar',
                (commentText) => {
                    const newComment = document.createElement('div');
                    newComment.className = 'comment';
                    newComment.innerHTML = `<strong>${currentUserName}:</strong> ${commentText}`;
                    commentSection.appendChild(newComment);
                }
            );

            commentInput = input;
            submitCommentBtn = button;
            commentSection.appendChild(commentInput);
            commentSection.appendChild(submitCommentBtn);
        }

        commentSection.querySelector('.comment-input').classList.toggle('hidden');
        commentSection.querySelector('.submit-comment-btn').classList.toggle('hidden');
    }

    function handleMessage(post) {
        // Ocultar la sección de comentarios
        const commentSection = post.querySelector('.comment-section');
        if (commentSection) {
            commentSection.querySelector('.comment-input')?.classList.add('hidden');
            commentSection.querySelector('.submit-comment-btn')?.classList.add('hidden');
        }

        let contactForm = post.querySelector('.contact-form');
        if (!contactForm) {
            contactForm = document.createElement('div');
            contactForm.className = 'contact-form';
            contactForm.innerHTML = `
                <input type="text" class="contact-input" placeholder="Escribe un mensaje privado..." style="height: 50px;">
                <button class="send-message-btn">Enviar</button>
            `;
            post.appendChild(contactForm);

            const sendMessageBtn = contactForm.querySelector('.send-message-btn');
            sendMessageBtn.addEventListener('click', () => {
                const messageInput = contactForm.querySelector('.contact-input');
                const messageText = messageInput.value.trim();
                if (messageText) {
                    alert(`Mensaje enviado: ${messageText}`);
                    messageInput.value = ''; // Limpiar el input de mensaje
                }
            });
        }

        contactForm.classList.toggle('hidden');
    }

    function createInputField(placeholder, btnText, callback) {
        const input = document.createElement('textarea');
        input.className = 'comment-input';
        input.placeholder = placeholder;
        input.style.height = '50px';

        const button = document.createElement('button');
        button.className = 'submit-comment-btn';
        button.textContent = btnText;

        button.addEventListener('click', () => {
            const inputText = input.value.trim();
            if (inputText) {
                callback(inputText);
                input.value = ''; // Limpiar el campo
            }
        });

        return { input, button };
    }

    // Inicializar la verificación del mensaje de posts
    updateNoPostsMessage();
});
