
// Obtener datos del perfil desde Vercel
document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem("token");

    const url = window.location.href;

    const params = new URLSearchParams(new URL(url).search);

    const idLink = params.get("id");

    try {
        const response = await fetch(`http://localhost:8000/analyze/analisisPorId/${idLink}`,
            {
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
            estado = "Positivo";
        }
        else {
            estado = "Negativo";
        }

        document.getElementById('user-apellido').textContent = perfil.apellido;
        document.getElementById('user-name').textContent = perfil.nombre;
        document.getElementById('imagen-analisis').src = perfil.imagen;
        document.getElementById('user-diagnostico').textContent = estado;
        
        } catch (err) {
        alert('Error al obtener los datos del usuario');
        console.error('Error al obtener los datos del usuario:', err);
    }
}, false);