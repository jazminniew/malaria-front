document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir que el formulario recargue la página

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Datos que enviarás al backend
    const userData = {
        email: email,
        password: password
    };

    // Hacemos la petición a la API de inicio de sesión
    fetch('https://malaria-xi.vercel.app/user/login', {  // Cambia el link al que te envió Oliver
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            return response.json().then(data => {
                // Manejar error en base al mensaje del backend
                throw new Error(data.message || 'Error en la solicitud');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            // Guardamos el token en localStorage
            localStorage.setItem('token', data.token);
            alert('Inicio de sesión exitoso');
            // Redireccionamos a la página principal o dashboard
            window.location.href = 'home3.html';
        } else if (data.message) {
            // Si el backend devolvió un mensaje de error, lo mostramos
            alert('Error en el inicio de sesión: ' + data.message);
        }
    })
    .catch(error => {
        if (error.message === 'Usuario ya existe') {
            alert('Este usuario ya está registrado.');
        } else {
            console.error('Error:', error);
            alert('Hubo un problema con el inicio de sesión: ' + error.message);
        }
    });
});
