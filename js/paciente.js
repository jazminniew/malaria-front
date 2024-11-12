

// Obtener datos del perfil desde Vercel
document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem("token");


    try {
        const response = await fetch(`https://malaria-xi.vercel.app/user/user/${id}`,//cambiar estoo
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


        document.getElementById('user-apellido').textContent = data.apellido;
        document.getElementById('user-name').textContent = data.nombre;
        document.getElementById('user-nacimiento').textContent = data.nacimiento;
        document.getElementById('user-pais').textContent = data.pais;
        document.getElementById('user-genero').textContent = data.genero;
        document.getElementById('user-telefono').textContent = data.telefono;


    } catch (err) {
        alert('Error al obtener los datos del usuario');
        console.error('Error al obtener los datos del usuario:', err);
    }
}, false);
