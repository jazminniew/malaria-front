document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        rememberMe: document.getElementById('rememberMe').checked,
    };

    try {
        const response = await fetch('https://malaria-xi.vercel.app/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        // Limpiar mensaje previo
        const responseDiv = document.getElementById('response');
        responseDiv.classList.remove('show');

        // Log para ver la respuesta completa
        console.log('Respuesta del servidor:', result);

        if (response.ok) {
            // Guardar el token en el localStorage
            localStorage.setItem('token', result.token); // Asumiendo que el token se recibe en result.token

            // Log para verificar que el token se ha guardado correctamente
            console.log('Token guardado en localStorage:', result.token);

            // Redirigir al usuario a home3.html
            window.location.href = 'home3.html';
        } else {
            // Mostrar mensaje de error
            if (response.status === 404) {
                responseDiv.innerText = 'Usuario no encontrado. Verifica tus credenciales.';
            } else if (response.status === 401) {
                responseDiv.innerText = 'Contraseña incorrecta. Inténtalo de nuevo.';
            } else {
                responseDiv.innerText = `Error: ${result.message}`;
            }
            responseDiv.classList.add('show'); // Mostrar el mensaje de error
        }
    } catch (error) {
        const responseDiv = document.getElementById('response');
        responseDiv.innerText = `Error al iniciar sesión: ${error.message}`;
        responseDiv.classList.add('show'); // Mostrar el mensaje de error
    }
});
