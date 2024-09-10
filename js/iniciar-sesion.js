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
    fetch('https://tu-backend.vercel.app/api/login', {  // Cambia este link por el que te envíe Oliver
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Guardamos el token en localStorage
            localStorage.setItem('token', data.token);
            alert('Inicio de sesión exitoso');
            // Redireccionamos a la página principal o dashboard
            window.location.href = 'home3.html';
        } else {
            // Si hay un error, lo mostramos
            alert('Error en el inicio de sesión: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema con el inicio de sesión');
    });
});
