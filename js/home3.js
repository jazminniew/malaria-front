document.addEventListener('DOMContentLoaded', () => {
    // Contenedor de los pacientes
    const container = document.getElementById('elements-container');

    const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = "No hay ningún análisis realizado";
    noResultsMessage.style.display = 'none';
    noResultsMessage.id = 'noResults';
    container.appendChild(noResultsMessage);  // Añadir el mensaje al contenedor


    const searchBar = document.getElementById('searchBar');
    const filterRadioButtons = document.querySelectorAll('input[name="filter"]'); // Filtros (todos, infectado, no infectado)

    // Función para obtener todos los pacientes desde la base de datos
    async function getPatients() {
        try {
            // Obtén el token del localStorage
            const token = localStorage.getItem('token');
            const id = localStorage.getItem("id");
            if (!token || !id) {
                throw new Error('No se encontró token de autenticación. Inicia sesión primero.');
            }

            // Realiza la petición con el token
            const response = await fetch(`http://localhost:8000/analyze/analisisPorUsuario/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
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
        let estado = "";
        if (analis.resultados) {
            estado = "Positivo";
        }
        else {
            estado = "Negativo";
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
        document.body.appendChild(card); // Añade la tarjeta al DOM

        // Ahora seleccionamos el elemento `.card_form` dentro de la tarjeta recién creada
        const cardForm = card.querySelector(".card_form");

        // Cambiamos el background image
        cardForm.style.backgroundImage = `url('${analis.imagen}')`;
        cardForm.style.backgroundSize = "cover"; // También puedes probar con "contain"
        cardForm.style.backgroundPosition = "center"; // Para centrar la imagen en el contenedor
        return card;
    }
    
   // Mostrar todos los pacientes cuando la página se cargue
    getPatients().then(displayPatients);
});