// Obtener datos del perfil desde Vercel
document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem("token");

    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    const idLink = params.get("id");

    const responseDiv = document.getElementById('response'); // Div para mostrar mensajes de error
    responseDiv.classList.remove('show'); // Limpia cualquier mensaje previo

    try {
        const response = await fetch(`https://malaria-xi.vercel.app/analyze/analisisPorId/${idLink}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();
        const perfil = data.rows[0];

        let estado = perfil.resultados ? "Positivo en Malaria" : "Negativo en Malaria";

        document.getElementById('user-apellido').textContent = perfil.apellido;
        document.getElementById('user-name').textContent = perfil.nombre;
        document.getElementById('imagen-analisis').src = perfil.imagen;
        document.getElementById('user-diagnostico').textContent = estado;

    } catch (err) {
        // Muestra el error en responseDiv con el estilo definido
        responseDiv.textContent = 'Error al obtener los datos del usuario. Por favor, inténtalo nuevamente.';
        responseDiv.classList.add('show');
        console.error('Error al obtener los datos del usuario:', err);
    }
}, false);
// Eliminar análisis
document.addEventListener('DOMContentLoaded', () => {
    const deleteIcon = document.querySelector('.bx.bxs-trash-alt');
    const idLink = new URLSearchParams(new URL(window.location.href).search).get("id");
    const token = localStorage.getItem("token");

    const responseDiv = document.getElementById('response'); // Div para mostrar mensajes de error
    responseDiv.classList.remove('show'); // Limpia cualquier mensaje previo

    if (deleteIcon) {
        deleteIcon.addEventListener('click', async () => {
            try {
                const response = await fetch(`https://malaria-xi.vercel.app/analyze/deleteAnalyze/${idLink}`, { // URL de localhost
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el análisis');
                }

                // Redirigir o actualizar la página
                window.location.href = 'home3.html'; // Cambia esta URL si es necesario
            } catch (err) {
                // Muestra el error en responseDiv con el estilo definido
                responseDiv.textContent = 'Error al eliminar el análisis. Por favor, inténtalo nuevamente.';
                responseDiv.classList.add('show');
                console.error('Error al eliminar el análisis:', err);
            }
        });
    }
});
