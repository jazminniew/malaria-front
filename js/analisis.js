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

        let estado = "";

        if (perfil.resultados) {
            estado = "Positivo en Malaria";
        } else {
            estado = "Negativo en Malaria";
        }

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
