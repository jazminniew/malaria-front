document.addEventListener('DOMContentLoaded', () => {
    // Contenedor de los pacientes
    const container = document.getElementById('elements-container');

    /*const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = "No hay ningún análisis realizado";
    noResultsMessage.style.display = 'none';
    noResultsMessage.id = 'noResults';
    container.appendChild(noResultsMessage);  // Añadir el mensaje al contenedor


VOLVER A PONER ESTOO
*/




//BORRRAR DESDE ACA


  // Función para crear un análisis ficticio
  function createFakePost() {
    const fakeAnalysis = {
        nombre: 'Jazmin',
        apellido: 'Niew',
        status: 'infectado',
        id: 999,  // ID ficticio
        imagen: 'https://img.freepik.com/fotos-premium/fondo-purpura-fondo-blanco-que-dice-esquina-inferior-derecha_1131454-42.jpg?semt=ais_hybrid',  // URL de imagen ficticia
        resultados: 'infectado'
    };

    // Crear y agregar la tarjeta del análisis ficticio
    const fakeCard = createPatientCard(fakeAnalysis);
    container.appendChild(fakeCard);
    noResultsMessage.style.display = 'none'; // Ocultar mensaje de no resultados si el análisis ficticio está presente
}

// Llama a la función para crear el análisis ficticio
createFakePost();

function createPatientCard(analis) {
    const card = document.createElement('div');
    card.classList.add('cartas-separadas');

    const cardContent = `
        <div class="card ${analis.status}" id="cartaa">
            <div class="IMAGENANALISIS" style="background-image: url('${analis.imagen}');">
                <span>${analis.resultados === 'infectado' ? 'Infectado' : 'No Infectado'}</span>
            </div>
            <div class="card_data">
                <div style="display: flex" class="data">
                    <div class="text">
                        <div class="cube text_s">
                            <label class="side front">${analis.nombre} ${analis.apellido}</label>
                            <label onclick="location.href='imagen-accedida-posta.html?id=${analis.id}'" class="side top">Acceder</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    card.innerHTML = cardContent;

    return card;
}





















    
  
    const searchBar = document.getElementById('searchBar');
  
    // Función para obtener todos los pacientes desde la base de datos
    async function getPatients() {
        try {
            // Obtén el token del localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No se encontró token de autenticación. Inicia sesión primero.');
            }
    
            // Realiza la petición con el token
            const response = await fetch('http://localhost:8000/analyze/todosAnalisis', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    /* 'Authorization': `Bearer ${token}` // Aquí se añade el token al header */
                }
            });
    
            if (!response.ok) {
                throw new Error('Error al obtener los pacientes: ' + response.status);
            }
    
            const analisisTodo = await response.json();
            const analisis = analisisTodo.rows;
            return Array.isArray(analisis) ? analisis : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    
    
  
    // Función para mostrar los resultados de la búsqueda
    function displayPatients(analisis) {
        // Limpiar el contenedor de pacientes
        container.innerHTML = '';
        container.appendChild(noResultsMessage); // Asegurarse de que el mensaje siempre esté presente
  
        if (analisis.length === 0) {
            // Mostrar mensaje si no hay resultados
            noResultsMessage.style.display = 'block';
        } else {
            // Ocultar el mensaje de "No hay resultados"
            noResultsMessage.style.display = 'none';
  
            // Crear cartas para cada paciente
            analisis.forEach(analis => {
                const analisCard = createPatientCard(analis);
                container.appendChild(analisCard);
            });
        }
    }
  
    // Función para crear una carta de paciente
    function createPatientCard(analis) {
        const card = document.createElement('div');
        card.classList.add('cartas-separadas');
  
        const cardContent = `
            <div class="card ${analis.status}" id="cartaa">
                <img class="IMAGENANALISIS" src="${analis.imagen}">
                <div class="card_form">
                    <span>${analis.resultados === 'infectado' ? 'Infectado' : 'No Infectado'}</span>
                </div>
                <div class="card_data">
                    <div style="display: flex" class="data">
                        <div class="text">
                            <div class="cube text_s">
                                <label class="side front">${analis.nombre} ${analis.apellido}</label>
                                <label onclick="location.href='imagen-accedida-posta.html?id=${analis.id}'" class="side top">Acceder</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        card.innerHTML = cardContent;
        return card;
    }
  
    // Función para buscar pacientes
    async function searchPatients(query) {
        const patients = await getPatients();
        // Filtrar los pacientes que coincidan con el nombre o apellido
        const filteredPatients = patients.filter(patient =>
            patient.nombre.toLowerCase().includes(query.toLowerCase()) || 
            patient.apellido.toLowerCase().includes(query.toLowerCase())
        );
        displayPatients(filteredPatients);
    }
  
    // Evento de la barra de búsqueda
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.trim()) {
            searchPatients(query); // Buscar pacientes
        } else {
            // Si la búsqueda está vacía, mostrar todos los pacientes
            getPatients().then(displayPatients);
        }
    });
  
    // Mostrar todos los pacientes cuando la página se cargue
    getPatients().then(displayPatients);
  });



  /*fake para tic experience
  document.addEventListener("DOMContentLoaded", () => {
    // Contenedor de los pacientes
    const container = document.getElementById('elements-container');

    // Crear y configurar el mensaje "No hay ningún análisis realizado"
    const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = "No hay ningún analisis";
    noResultsMessage.style.display = 'none'; // Ocultar inicialmente
    noResultsMessage.id = 'noResults';
    container.appendChild(noResultsMessage); // Añadir el mensaje al contenedor

    // Recuperar los datos del localStorage
    const nombre = localStorage.getItem("nombrePaciente");
    const apellido = localStorage.getItem("apellidoPaciente");

    console.log("Nombre:", nombre); // Verifica si es null o tiene valor
    console.log("Apellido:", apellido); // Verifica si es null o tiene valor

    // Verificar si los datos existen
    if (nombre && apellido) {
        // Crear un objeto paciente simulando que siempre es infectado
        const patient = {
            nombre: nombre,
            apellido: apellido,
            status: 'infectado',
            id: 1 // Puedes cambiarlo por un valor dinámico si lo necesitas
        };

        // Llamar a la función para crear la tarjeta del paciente
        const nuevaTarjeta = createPatientCard(patient);
        container.appendChild(nuevaTarjeta);

        // Limpiar el localStorage después de haber usado los datos
        localStorage.removeItem("nombrePaciente");
        localStorage.removeItem("apellidoPaciente");

        // Para verificar que los datos se han eliminado
        console.log(localStorage.getItem("nombrePaciente")); // Esto debería mostrar 'null'
        console.log(localStorage.getItem("apellidoPaciente")); // Esto debería mostrar 'null'

        // Ocultar el mensaje de "noResults" si está visible
        noResultsMessage.style.display = 'none'; // Ocultar el mensaje
    } else {
        // Mostrar el mensaje si no hay datos en localStorage
        console.log("No se encontraron datos de paciente en el localStorage.");
        
        noResultsMessage.style.display = 'block'; // Mostrar el mensaje
    }

    // Función para crear la tarjeta del paciente
    function createPatientCard(patient) {
        const card = document.createElement('div');
        card.classList.add('cartas-separadas');

        const cardContent = `
            <div class="card ${patient.status}" id="cartaa">
                <div class="card_form">
                    <span>${patient.status === 'infectado' ? 'Infectado' : 'No Infectado'}</span>
                </div>
                <div class="card_data">
                    <div style="display: flex" class="data">
                        <div class="text">
                            <div class="cube text_s">
                                <label class="side front">${patient.nombre} ${patient.apellido}</label>
                                <label onclick="location.href='imagen-accedida-posta.html?id=${patient.id}'" class="side top">Acceder</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        card.innerHTML = cardContent;
        return card;
    }
});
*/
