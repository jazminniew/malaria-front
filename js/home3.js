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

            const url = `http://localhost:8000/analyze/analisisPorUsuario/${id}`;
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
            container.innerHTML = '<div>No hay análisis que coincidan con la búsqueda</div>';
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

        // Filtrar por estado (Infectado / No Infectado)
        if (estadoFilter) {
            filteredPatients = filteredPatients.filter(patient => {
                const estado = (patient.resultados === "true" || patient.resultados === true) ? "Infectado" : "No Infectado";
                return estado === estadoFilter;
            });
        }

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




/* CODIGO QUE ANDABA ANTES SIN SEARCHBARRRR---------------------------------------------------


document.addEventListener('DOMContentLoaded', () => {
    // Contenedor de los pacientes
    const container = document.getElementById('elements-container');
    const responseDiv = document.getElementById('response'); // Referencia al div para los mensajes

    // Función para mostrar mensajes en el responseDiv
function mostrarMensaje(mensaje, tipo = 'error') {
    responseDiv.innerHTML = `<div class="${tipo}">${mensaje}</div>`;
    responseDiv.style.display = 'block';
}
    // Función para realizar la búsqueda en el servidor
    async function searchPatients(query) {
        try {
            const token = localStorage.getItem('token');
            const id = localStorage.getItem("id");
            if (!token || !id) {
                throw new Error('No se encontró token de autenticación. Inicia sesión primero.');
            }

            const url = `http://localhost:8000/analyze/analisisPorNombre?nombre=${query}&id_usuario=${id}`;

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
            const analisis = analisisTodo.rows;
            console.log(analisis);
            container.innerHTML = ''; // Limpiar resultados anteriores
            analisis.forEach(analis => {
                const analisCard = createPatientCard(analis);
                container.appendChild(analisCard);
            });
            displayPatients(Array.isArray(analisis) ? analisis : []);
        } catch (error) {
            console.error(error);
            displayPatients([]);
        }
    }

    // Agregar el evento para la búsqueda
    document.getElementById('searchBar').addEventListener('input', (event) => {
        const query = event.target.value;
        if (query.length >= 3) {
            searchPatients(query);
        } else {
            getPatients(); // Cargar todos los pacientes si la búsqueda es vacía o muy corta
        }
    });

    const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = "No hay ningún análisis realizado";
    noResultsMessage.style.display = 'none';
    noResultsMessage.id = 'noResults';
    container.appendChild(noResultsMessage);

    // Función para realizar la búsqueda en el servidor
    async function getPatients(filter = 'Todos') {
        try {
            // Obtén el token del localStorage
            const token = localStorage.getItem('token');
            const id = localStorage.getItem("id");
            if (!token || !id) {
                throw new Error('No se encontró token de autenticación. Inicia sesión primero.');
            }

            // Construye la URL de acuerdo con el filtro seleccionado
            let url = `http://localhost:8000/analyze/analisisPorUsuario/${id}`;
            if (filter === 'Infectado') {
                url += '?status=infectado';
            } else if (filter === 'No Infectado') {
                url += '?status=no_infectado';
            }

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
            const analisis = analisisTodo.rows;
            console.log(analisis);
            analisis.forEach(analis => {
                const analisCard = createPatientCard(analis);
                container.appendChild(analisCard);
            });
            displayPatients(Array.isArray(analisis) ? analisis : []);
        } catch (error) {
            console.error(error);
            displayPatients([]);
        }
    }

    function createPatientCard(analis) {
        const card = document.createElement('div');
        card.classList.add('cartas-separadas');
        let estado = "";
        if (analis.resultados === "true") {
            estado = "Infectado";
        } else {
            estado = "No Infectado";
        }

        const cardContent = `
            <div class="card ${analis.status}" id="cartaa">
                <div class="card_form">
                    <span>${estado}</span>
                </div>
                <div class="card_data">
                    <div style="display: flex" class="data">
                        <div class="text">
                            <div class="cube text_s">
                                <label class="side front">${analis.nombre} ${analis.apellido}</label>
                                <label onclick="location.href='analisis.html?id=${analis.id}'" class="side top">Acceder</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        card.innerHTML = cardContent;

        // Ahora seleccionamos el elemento `.card_form` dentro de la tarjeta recién creada
        const cardForm = card.querySelector(".card_form");

        // Cambiamos el background image
        cardForm.style.backgroundImage = `url('${analis.imagen}')`;
        cardForm.style.backgroundSize = "cover"; // También puedes probar con "contain"
        cardForm.style.backgroundPosition = "center"; // Para centrar la imagen en el contenedor
        return card;
    }

    // Función para mostrar los resultados de la búsqueda

    // Mostrar todos los pacientes cuando la página se cargue
    getPatients().then(displayPatients);
});

// Agregar el evento para la búsqueda
document.getElementById('searchBar').addEventListener('input', buscarPerfiles);



*/