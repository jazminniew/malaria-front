document.addEventListener('DOMContentLoaded', () => {
    // Mostrar/Ocultar contraseña
    const passwordInput = document.getElementById('password');
    const lockIcon = document.getElementById('lockIcon');
    const emailInput = document.getElementById('email');

    lockIcon.addEventListener('click', () => {
        // Alternar entre tipos de input
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';

        // Cambiar ícono dependiendo del estado
        lockIcon.classList.toggle('bxs-lock-alt', !isPassword);
        lockIcon.classList.toggle('bxs-lock-open-alt', isPassword);
    });

    // Validar que no haya espacios en el email
    emailInput.addEventListener('input', () => {
        emailInput.value = emailInput.value.replace(/\s+/g, ''); // Elimina los espacios
    });

    // Validaciones en tiempo real para la contraseña
    passwordInput.addEventListener('input', () => {
        const passwordValue = passwordInput.value;

        const hasUpperCase = /[A-Z]/.test(passwordValue);
        const hasNumber = /\d/.test(passwordValue);
        const minLength = passwordValue.length >= 8;

        if (!hasUpperCase || !hasNumber || !minLength) {
            passwordInput.setCustomValidity(
                'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.'
            );
        } else {
            passwordInput.setCustomValidity('');
        }
    });

    // Rellena los campos si existe localStorage
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    
    if (savedEmail && savedPassword) {
        emailInput.value = savedEmail;
        passwordInput.value = savedPassword;
        document.getElementById('rememberMe').checked = true;
    }

    // Manejo del formulario
    document.getElementById('registerForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            email: emailInput.value,
            password: passwordInput.value,
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

            const responseDiv = document.getElementById('response');
            responseDiv.classList.remove('show');

            if (response.ok) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('id', result.id);
                window.location.href = 'home3.html';
            } else {
                responseDiv.innerText = result.message || 'Error al iniciar sesión.';
                responseDiv.classList.add('show');
            }
        } catch (error) {
            const responseDiv = document.getElementById('response');
            responseDiv.innerText = `Error: ${error.message}`;
            responseDiv.classList.add('show');
        }
    });
});

