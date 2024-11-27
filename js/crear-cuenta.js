document.addEventListener('DOMContentLoaded', () => {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const lockIcon = document.getElementById('lockIcon');
    const responseElement = document.getElementById('response');

    // Función para capitalizar la primera letra y quitar espacios
    const formatInput = (input) => {
        input.value = input.value
            .replace(/\s/g, '') // Elimina espacios
            .replace(/^(.)/, (char) => char.toUpperCase()); // Primera letra mayúscula
    };

    // Validaciones en tiempo real
    nombreInput.addEventListener('input', () => formatInput(nombreInput));
    apellidoInput.addEventListener('input', () => formatInput(apellidoInput));
    usernameInput.addEventListener('input', () => {
        usernameInput.value = usernameInput.value.replace(/\s/g, ''); // Quita espacios
    });
    emailInput.addEventListener('input', () => {
        emailInput.value = emailInput.value.replace(/\s/g, ''); // Quita espacios
    });

    // Mostrar/Ocultar contraseña
    lockIcon.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';

        lockIcon.classList.toggle('bxs-lock-alt', !isPassword);
        lockIcon.classList.toggle('bxs-lock-open-alt', isPassword);
    });

    // Validación de contraseña
    const validatePassword = (password) => {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasThreeNumbers = (password.match(/\d/g) || []).length >= 3;

        return hasMinLength && hasUpperCase && hasThreeNumbers;
    };

    // Manejo del formulario
    document.getElementById('registerForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            nombre: nombreInput.value,
            apellido: apellidoInput.value,
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        };

        // Validar contraseña
        if (!validatePassword(formData.password)) {
            responseElement.innerText = 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y al menos 3 números.';
            return;
        }

        try {
            const response = await fetch('https://malaria-xi.vercel.app/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log(response);  // Añade este log para verificar la respuesta
            const result = await response.json();

            if (response.ok) {
                responseElement.innerText = 'Usuario registrado correctamente';
                window.location.href = 'iniciar-sesion4.html';
            } else {
                responseElement.innerText = `Error: ${result.message}`;
            }
        } catch (error) {
            responseElement.innerText = `Error al registrar usuario: ${error.message}`;
        }
    });
});
