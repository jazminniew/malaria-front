document.addEventListener('DOMContentLoaded', async () => {

    
    // Contenedor de los pacientes
    const container = document.getElementById('elements-container');
    let allPatients = []; // Aquí se almacenarán todos los pacientes cargados inicialmente.

    // Función para cargar pacientes desde el backend al inicio
    async function getPatients() {
        try {
            const token = localStorage.getItem('token');
            const id = localStorage.getItem("id");
            if (!token || !id) {
                throw new Error('No se encontró token de autenticación. Inicia sesión primero.');
            }

            const url = `https://malaria-xi.vercel.app/analyze/analisisPorUsuario/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener los pacientes: ' + response.status);
            }

            const analisisTodo = await response.json();
            allPatients = analisisTodo.rows; // Guardar todos los pacientes en memoria.
            displayPatients(allPatients); // Mostrar pacientes iniciales.
        } catch (error) {
            console.error(error);
            displayPatients(allPatients);
        }
    }

    // Función para mostrar pacientes en el contenedor
    function displayPatients(patients) {
        container.innerHTML = ''; // Limpiar el contenedor
        if (patients.length === 0) {
            container.innerHTML = '<div class="respuesta">No hay análisis que coincidan con la búsqueda</div>';
            return;
        }

        const fragment = document.createDocumentFragment();
        patients.forEach(patient => {
            const patientCard = createPatientCard(patient); // Crear la tarjeta del paciente
            fragment.appendChild(patientCard);
        });
        container.appendChild(fragment);
    }

    // Crear una tarjeta para cada paciente
    function createPatientCard(patient) {
        const card = document.createElement('div');
        card.classList.add('cartas-separadas');

        // Asegurarnos de que "resultados" sea un valor booleano o comparable para determinar el estado
        const estado = (patient.resultados === "true" || patient.resultados === true) ? "Infectado" : "No Infectado";

        // Añadir el estado al DOM correctamente
        card.innerHTML  = `
            <div class="card ${patient.status}" id="cartaa">
                <div class="card_form">
                    <span>${estado}</span> <!-- Mostrar el estado correctamente -->
                </div>
                <div class="card_data">
                    <div style="display: flex" class="data">
                        <div class="text">
                            <div class="cube text_s">
                                <label class="side front">${patient.nombre} ${patient.apellido}</label>
                                <label onclick="location.href='analisis.html?id=${patient.id}'" class="side top">Acceder</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const cardForm = card.querySelector(".card_form");
        cardForm.style.backgroundImage = `url('${patient.imagen}')`;
        cardForm.style.backgroundSize = "cover";
        cardForm.style.backgroundPosition = "center";

        return card;
    }

    // Función para filtrar pacientes por nombre o estado
    function filterPatients(query, estadoFilter) {
        let filteredPatients = allPatients;

        // Filtrar por nombre
        if (query) {
            filteredPatients = filteredPatients.filter(patient => 
                patient.nombre.toLowerCase().includes(query.toLowerCase()) || 
                patient.apellido.toLowerCase().includes(query.toLowerCase())
            );
        }

 // Función para filtrar pacientes por estado
 function filterPatientsByEstado(estado) {
    let filteredPatients;

    if (estado === "Todos") {
        filteredPatients = allPatients; // Mostrar todos
    } else {
        const isInfected = estado === "Infectado";
        filteredPatients = allPatients.filter(patient =>
            (patient.resultados === "true" || patient.resultados === true) === isInfected
        );
    }

    displayPatients(filteredPatients); // Mostrar pacientes filtrados
}

// Agregar evento para los botones de filtro
document.querySelectorAll('input[name="estado"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const estado = document.querySelector('input[name="estado"]:checked').value; // Obtener el estado seleccionado
        filterPatientsByEstado(estado); // Filtrar por el estado seleccionado
    });
});

        displayPatients(filteredPatients); // Volver a mostrar los pacientes filtrados
    }

    // Agregar evento para búsqueda
    document.getElementById('searchBar').addEventListener('input', (event) => {
        const query = event.target.value;
        const estadoFilter = document.querySelector('input[name="estado"]:checked')?.value; // Obtener el filtro de estado (Infectado / No Infectado)

        filterPatients(query, estadoFilter); // Filtrar pacientes por nombre y estado
    });

    // Agregar evento para filtrar por estado (Infectado / No Infectado)
    const estadoRadios = document.querySelectorAll('input[name="estado"]');
    estadoRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const query = document.getElementById('searchBar').value;
            const estadoFilter = document.querySelector('input[name="estado"]:checked')?.value;
            filterPatients(query, estadoFilter); // Filtrar por estado y nombre
        });
    });

    // Cargar pacientes al inicio
    await getPatients();
});

