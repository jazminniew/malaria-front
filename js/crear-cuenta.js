document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };


        // Validar que la contraseña tenga al menos 8 caracteres
        if (formData.password.length < 8) {
            document.getElementById('response').innerText = 'La contraseña debe tener al menos 8 caracteres';
            return; // Detener el envío del formulario si la contraseña no es válida
        }
        
    try {
        const response = await fetch('https://malaria-xi.vercel.app/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('response').innerText = 'Usuario registrado correctamente';
            window.location.href = 'iniciar-sesion4.html';  // Redirigir a iniciar-sesion4.html
        } else {
            document.getElementById('response').innerText = `Error: ${result.message}`;
        }
    } catch (error) {
        document.getElementById('response').innerText = `Error al registrar usuario: ${error.message}`;
    }
});