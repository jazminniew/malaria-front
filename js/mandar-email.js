document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', async () => {
        const email = emailInput.value;
        try {
            const response = await fetch('http://localhost:8000/user/sendPasswordResetEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Error al enviar el email');
            }

            window.location.href = "iniciar-sesion4.html"

            console.log('Email enviado exitosamente');
        } catch (err) {
            console.error('Error al enviar el email:', err);
        }
    });
});