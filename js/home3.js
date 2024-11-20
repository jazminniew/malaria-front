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


/*probar esto



document.addEventListener('DOMContentLoaded', () => {
    // Contenedor de los pacientes
    const container = document.getElementById('elements-container');
    const responseDiv = document.getElementById('response');

    // Mostrar mensaje
    function mostrarMensaje(mensaje, tipo = 'error') {
        responseDiv.innerHTML = `<div class="${tipo}">${mensaje}</div>`;
        responseDiv.style.display = 'block';
    }

    // Consolidar solicitudes de pacientes
    async function obtenerAnalisis(url) {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem("id");

        if (!token || !id) {
            throw new Error('No se encontró token de autenticación. Inicia sesión primero.');
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status}`);
        }

        const data = await response.json();
        return data.rows; // Retornar solo la lista de análisis
    }

    // Mostrar pacientes
    async function mostrarAnalisis(query = '', filter = 'Todos') {
        container.innerHTML = ''; // Limpiar contenedor
        let url = `http://localhost:8000/analyze/analisisPorUsuario/${localStorage.getItem("id")}`;

        if (query) {
            url = `http://localhost:8000/analyze/analisisPorNombre?nombre=${query}&id_usuario=${localStorage.getItem("id")}`;
        } else if (filter === 'Infectado') {
            url += '?status=infectado';
        } else if (filter === 'No Infectado') {
            url += '?status=no_infectado';
        }

        try {
            const analisis = await obtenerAnalisis(url);

            if (analisis.length === 0) {
                mostrarMensaje('No hay ningún análisis realizado', 'info');
                return;
            }

            const fragment = document.createDocumentFragment();
            analisis.forEach(analis => {
                fragment.appendChild(createPatientCard(analis));
            });
            container.appendChild(fragment);
            responseDiv.style.display = 'none'; // Ocultar mensajes previos si hay resultados
        } catch (error) {
            console.error(error);
            mostrarMensaje('Error al cargar los análisis', 'error');
        }
    }

    // Crear tarjeta de paciente
    function createPatientCard(analis) {
        const card = document.createElement('div');
        card.classList.add('cartas-separadas');

        const estado = analis.resultados === "true" ? "Infectado" : "No Infectado";

        card.innerHTML = `
            <div class="card ${analis.status}" id="cartaa">
                <div class="card_form"></div>
                <div class="card_data">
                    <div class="data">
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

        const cardForm = card.querySelector(".card_form");
        cardForm.style.backgroundImage = `url('${analis.imagen}')`;
        cardForm.style.backgroundSize = "cover";
        cardForm.style.backgroundPosition = "center";

        return card;
    }

    // Evento de búsqueda
    document.getElementById('searchBar').addEventListener('input', (event) => {
        const query = event.target.value;
        if (query.length >= 3) {
            mostrarAnalisis(query);
        } else {
            mostrarAnalisis();
        }
    });

    // Cargar pacientes al inicio
    mostrarAnalisis();
});



*/