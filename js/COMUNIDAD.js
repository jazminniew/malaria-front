/*document.addEventListener('DOMContentLoaded', () => {
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
                <button class="like-btn"><i class='bx bx-heart'></i> 0</button>
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
            likeBtn.innerHTML = `<i class='bx bxs-heart'></i> ${likeCount}`;
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
    */
document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('message-modal');
    const token = localStorage.getItem('token'); // Token guardado en localStorage
    
    // Función para obtener los posts de la base de datos
    async function fetchPosts() {
      try {
        const response = await fetch('https://malaria-xi.vercel.app/analyze/todosAnalisis', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        // Verificar si la respuesta no es 200 OK
        if (!response.ok) {
          if (response.status === 401) {
            console.error('No autorizado. Verifica el token.');
          } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
          }
          return;
        }
  
        const data = await response.json();
        mostrarPosts(data.posts); // Verifica y renderiza los posts
  
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  
    // Función para renderizar y mostrar los posts
    function mostrarPosts(posts) {
      // Limpiar el contenido del contenedor antes de añadir los posts
      postsContainer.innerHTML = '';
  
      if (!posts || posts.length === 0) {
        // Mostrar el mensaje si no hay posts
        postsContainer.innerHTML = '<p>No hay posts disponibles.</p>';
      } else {
        // Renderizar los posts
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
  
          postElement.innerHTML = `
            <p><strong>${post.usuario}</strong></p>
            <p>${post.mensaje}</p>
            <div class="icons">
              <span class="like-icon" data-id="${post.id}">❤️ ${post.likes}</span>
              <span class="comment-icon" data-id="${post.id}">💬 Comentar</span>
              <span class="message-icon" data-id="${post.id}">✉️ Enviar mensaje</span>
            </div>
            <div class="comment-section" id="comments-${post.id}" style="display: none;">
              <input type="text" class="comment-input" placeholder="Escribe un comentario">
              <button class="send-comment" data-id="${post.id}">Enviar</button>
            </div>
          `;
  
          postsContainer.appendChild(postElement);
        });
      }
    }
  
    // Evento para agregar un nuevo post (crea nuevo post)
    document.getElementById('sendPostBtn').addEventListener('submit', async (e) => {
      e.preventDefault();
      const newPost = document.getElementById('new-post').value;
  
      try {
        const response = await fetch('https://malaria-xi.vercel.app/analyze/todosAnalisis', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ mensaje: newPost })
        });
  
        const result = await response.json();
        console.log('Post creado:', result);
        fetchPosts(); // Actualiza los posts después de crear uno nuevo
      } catch (error) {
        console.error('Error creando el post:', error);
      }
    });
  
    // Funcionalidad de likes
    postsContainer.addEventListener('click', async (e) => {
      if (e.target.classList.contains('like-icon')) {
        const postId = e.target.getAttribute('data-id');
        try {
          await fetch(`https://tu-vercel-backend.vercel.app/api/posts/${postId}/like`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          fetchPosts(); // Actualiza los posts después de dar like
        } catch (error) {
          console.error('Error dando like:', error);
        }
      }
    });
  
    // Funcionalidad de comentarios
    postsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('comment-icon')) {
        const postId = e.target.getAttribute('data-id');
        const commentSection = document.getElementById(`comments-${postId}`);
        commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
      }
    });
  
    // Evento para enviar un comentario
    postsContainer.addEventListener('click', async (e) => {
      if (e.target.classList.contains('send-comment')) {
        const postId = e.target.getAttribute('data-id');
        const commentInput = document.querySelector(`#comments-${postId} .comment-input`).value;
  
        try {
          await fetch(`https://tu-vercel-backend.vercel.app/api/posts/${postId}/comment`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comentario: commentInput })
          });
          fetchPosts(); // Actualiza los posts después de comentar
        } catch (error) {
          console.error('Error comentando:', error);
        }
      }
    });
  
    // Llama a la función para obtener posts al cargar la página
    fetchPosts();
  });
  