document.addEventListener('DOMContentLoaded', () => {
    const sendPostBtn = document.getElementById('sendPostBtn');
    const postContent = document.getElementById('postContent');
    const postsContainer = document.querySelector('.FONDOPOSTS');
    const currentUserName = "Jazmin";

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
                <img src="https://via.placeholder.com/50" alt="User Image">
                <div class="post-user-info">
                    <strong>${currentUserName}</strong>
                </div>
            </div>
            <div class="post-content">
                <p>${content}</p>
            </div>
            <div class="post-actions">
                <button class="like-btn">❤️ 0</button>
                <button class="comment-btn">💬 Comentar</button>
                <button class="message-btn">✉️ Mensaje</button>
            </div>
            <div class="comment-section"></div>
            <div class="contact-form hidden"></div>
        `;
        postsContainer.appendChild(newPost);
    }

    function handleLike(post) {
        const likeBtn = post.querySelector('.like-btn');
        if (!post.classList.contains('liked')) {
            let likeCount = parseInt(likeBtn.textContent.split(' ')[1]);
            likeCount++;
            likeBtn.textContent = `❤️ ${likeCount}`;
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
});
