document.addEventListener('DOMContentLoaded', () => {
    // Contenedor de los pacientes
    const container = document.getElementById('elements-container');

    // Crear y configurar el mensaje "No hay ningún análisis realizado"
    const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = "No hay ningún paciente";
    noResultsMessage.style.display = 'none'; // Ocultar inicialmente
    noResultsMessage.id = 'noResults';
    container.appendChild(noResultsMessage);  // Añadir el mensaje al contenedor

    const searchBar = document.querySelector('.input'); // Usar la clase .input para obtener la barra de búsqueda

    // Función para obtener todos los pacientes desde la base de datos
    async function getPatients() {
        try {
            // Obtén el token del localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No se encontró token de autenticación. Inicia sesión primero.');
            }

            const id_user = localStorage.getItem("id");
    
            // Realiza la petición con el token
            const response = await fetch(`https://malaria-xi.vercel.app/patients/pacientsByUser/${id_user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Error al obtener los pacientes: ' + response.status);
            }
    
            const patients = await response.json();
            return Array.isArray(patients) ? patients : [];

            console.log(patients);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Función para mostrar los resultados de la búsqueda
    function displayPatients(patients) {
        // Limpiar el contenedor de pacientes y mostrar el mensaje de "no resultados"
        container.innerHTML = '';
        container.appendChild(noResultsMessage); // Asegurarse de que el mensaje siempre esté presente

        if (patients.length === 0) {
            // Mostrar mensaje si no hay resultados
            noResultsMessage.style.display = 'block';
        } else {
            // Ocultar el mensaje de "No hay resultados"
            noResultsMessage.style.display = 'none';

            // Crear cartas para cada paciente
            patients.forEach(patient => {
                const patientCard = createPatientCard(patient);
                container.appendChild(patientCard);
            });
        }
    }

    // Función para crear una carta de paciente
    function createPatientCard(patient) {
        const card = document.createElement('div');
        card.classList.add('cartas-separadas');

        const cardContent = `
            <div class="card ${patient.status}" id="cartaa" onclick="location.href='paciente.html?id=${patient.id}'">
                <div class="card_data">
                    <div style="display: flex" class="data">
                        <div class="text">
                            <div class="cube text_s">
                                <label class="side front">${patient.nombre} ${patient.apellido}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        card.innerHTML = cardContent;
        return card;
    }

    // Función para filtrar pacientes por nombre o estado
    function filterPatients(query) {
        let filteredPatients = allPatients;

        // Filtrar por nombre
        if (query) {
            filteredPatients = filteredPatients.filter(patient =>
                patient.nombre.toLowerCase().includes(query.toLowerCase()) ||
                patient.apellido.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Mostrar los pacientes filtrados
        displayPatients(filteredPatients);
    }

    // Agregar evento para búsqueda
    searchBar.addEventListener('input', (event) => {
        const query = event.target.value;
        filterPatients(query);
    });

    // Cargar pacientes al inicio
    let allPatients = [];
    getPatients().then(patients => {
        allPatients = patients;
        displayPatients(allPatients);
    });
});
