
// Selecciona los botones de filtro
const filterButtons = document.querySelectorAll('input[name="filter"]');
const elementsContainer = document.getElementById('elements-container');
let patientCount = 5; // Comienza en 5 porque ya hay 5 pacientes predefinidos

// Función para aplicar el filtro a todos los elementos
function applyFilter() {
    const filterValue = document.querySelector('input[name="filter"]:checked').value;
    
    const elements = elementsContainer.querySelectorAll('.card');
    elements.forEach(element => {
        if (filterValue === 'all') {
            element.style.display = 'flex';
        } else if (filterValue === 'infectado' && element.classList.contains('infectado')) {
            element.style.display = 'flex';
        } else if (filterValue === 'no-infectado' && element.classList.contains('no-infectado')) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}

// Añadir eventos a los botones de filtro
filterButtons.forEach(button => {
    button.addEventListener('change', applyFilter);
});

// Función para agregar un nuevo paciente sin clasificar
function addPatient() {
    patientCount++;
    const newElement = document.createElement('div');
    newElement.classList.add('element', 'unclassified');
    newElement.innerHTML = `
        <span>Paciente ${patientCount} - Sin clasificar</span>
        <div>
            <button class="status-btn" data-status="infected">Infectado</button>
            <button class="status-btn" data-status="not-infected">No infectado</button>
        </div>
    `;
    elementsContainer.appendChild(newElement);

    // Añadir eventos a los botones de estado
    const statusButtons = newElement.querySelectorAll('.status-btn');
    statusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const status = this.getAttribute('data-status');
            newElement.classList.remove('unclassified', 'infectado', 'no-infectado');
            newElement.classList.add(status);
            newElement.querySelector('span').textContent = `Paciente ${patientCount} - ${status === 'infected' ? 'Infectado' : 'No infectado'}`;
            applyFilter(); // Aplica el filtro después de cambiar el estado
        });
    });
}

applyFilter();


const searchInput = document.querySelector('.input');
const patientContainer = document.getElementById('elements-container');

// Función para obtener pacientes desde la API
async function fetchPatients() {
  try {
    const response = await fetch(API_URL);
    const patients = await response.json();
    return patients; // Devuelve la lista de pacientes
  } catch (error) {
    console.error('Error al obtener los pacientes:', error);
    return [];
  }
}

// Función para filtrar y mostrar los pacientes por nombre
async function searchPatients(event) {
  const searchQuery = event.target.value.toLowerCase(); // Convierte a minúsculas para una búsqueda sin distinción de mayúsculas/minúsculas

  // Obtén todos los pacientes
  const patients = await fetchPatients();

  // Filtra los pacientes que coincidan con el nombre ingresado
  const filteredPatients = patients.filter(patient =>
    patient.nombre.toLowerCase().includes(searchQuery)
  );

  // Limpiar el contenedor antes de mostrar los resultados
  patientContainer.innerHTML = '';

  // Mostrar solo los pacientes filtrados
  filteredPatients.forEach(patient => {
    const patientCard = `
      <div class="cartas-separadas">
        <div class="card ${patient.infectado ? 'infectado' : 'no-infectado'}">
          <div class="card_form">
            <span>${patient.infectado ? 'Infectado' : 'No Infectado'}</span>
          </div>
          <div class="card_data">
            <div style="display: flex" class="data">
              <div class="text">
                <div class="cube text_s">
                  <label class="side front">${patient.nombre} ${patient.apellido}</label>
                  <label onclick="location.href='imagen-accedida-posta.html'" class="side top">Acceder</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    patientContainer.insertAdjacentHTML('beforeend', patientCard);
  });
}

// Agregar evento para la barra de búsqueda
searchInput.addEventListener('input', searchPatients);


const searchBar = document.getElementById('searchBar');
const patientsList = document.getElementById('patientsList');
const noResults = document.getElementById('noResults');
const patients = document.querySelectorAll('.patient'); // Todos los pacientes

searchBar.addEventListener('input', function() {
    const searchValue = searchBar.value.toLowerCase();
    let found = false;

    patients.forEach(patient => {
        const patientName = patient.textContent.toLowerCase();
        if (patientName.includes(searchValue)) {
            patient.style.display = 'block'; // Mostrar si coincide
            found = true;
        } else {
            patient.style.display = 'none'; // Ocultar si no coincide
        }
    });

    // Mostrar o ocultar el mensaje "No hay ningún paciente con ese nombre"
    if (searchValue && !found) {
        noResults.style.display = 'block'; // Mostrar mensaje si no hay resultados
    } else {
        noResults.style.display = 'none'; // Ocultar mensaje si hay resultados o el campo está vacío
    }

    // Si se borra el valor de búsqueda, mostrar todos los pacientes
    if (!searchValue) {
        patients.forEach(patient => {
            patient.style.display = 'block'; // Mostrar todos si el campo está vacío
        });
    }
});
s