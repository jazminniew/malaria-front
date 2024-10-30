document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    try {
        const response = await fetch('http://localhost:8000/user/register', {
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