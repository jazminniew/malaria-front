function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    // Validar el email
    if (!emailInput.checkValidity()) {
        emailError.style.display = 'block'; // Muestra el mensaje de error
        return false; // Evita que el formulario se envíe
    }

    emailError.style.display = 'none'; // Oculta el mensaje de error
    // Redireccionar a la página si el email es válido
    location.href = 'cambiar-contraseña.html';
    return false; // Evita el envío del formulario por defecto
}