document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem("token");

    const url = window.location.href;

    const params = new URLSearchParams(new URL(url).search);

    const idLink = params.get("id");

    try {
        const response = await fetch(`https://malaria-xi.vercel.app/patients/pacientById/${idLink}`,//cambiar estoo
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

        const dataRequired = data[0];

        console.log(dataRequired);

        console.log(data)

        document.getElementById('user-apellido').textContent = dataRequired.apellido;
        document.getElementById('user-name').textContent = dataRequired.nombre;
        document.getElementById('user-telefono').textContent = dataRequired.phone;
        document.getElementById('user-email').textContent = dataRequired.email;
        document.getElementById('user-descripcion').textContent = dataRequired.descripcion;


    } catch (err) {
        alert('Error al obtener los datos del usuario');
        console.error('Error al obtener los datos del usuario:', err);
    }
}, false);
