const cloud = document.querySelector(".bx-chevron-left"); 
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

const sidebarToggle = document.getElementById('sidebarToggle');
const content = document.getElementById('content');
const searchBar = document.querySelector('.search-bar');

const logoutBtn = document.getElementById('logout-btn');
const logoutCard = document.getElementById('logout-card');
const cancelBtn = document.getElementById('cancel-btn');
const exitBtn = document.getElementById('exit-btn');

const btnNuevo = document.getElementById('buttonNuevo');
const botonesNuevosCard = document.getElementById('botonesnuevosCard');
const pacienteBtn = document.getElementById('paciente-btn');
const imagenBtn = document.getElementById('imagen-btn');

const mainContent = document.getElementById('FONDOPACIENTES');

//modo obscuro quede seleccionado
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

// Manejo del botón "Nuevo"
btnNuevo.addEventListener('click', function() {
    botonesNuevosCard.classList.add('show');
});

pacienteBtn.addEventListener('click', function() {
    window.location.href = 'crear-paciente.html';
});

imagenBtn.addEventListener('click', function() {
    window.location.href = 'seleccionar-imagen.html';
});

document.addEventListener('click', function(event) {
    if (!botonesNuevosCard.contains(event.target) && !btnNuevo.contains(event.target)) {
        botonesNuevosCard.classList.remove('show');
    }
});

// Cerrar sesión
logoutBtn.addEventListener('click', function() {
    logoutCard.classList.add('show');
});

cancelBtn.addEventListener('click', function() {
    logoutCard.classList.remove('show');
});

exitBtn.addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.addEventListener('click', function(event) {
    if (!logoutCard.contains(event.target) && !logoutBtn.contains(event.target)) {
        logoutCard.classList.remove('show');
    }
});

// Cargar estado del modo oscuro desde localStorage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        circulo.classList.add('prendido');
    }

    // Cargar estado del sidebar desde localStorage
    if (localStorage.getItem('sidebar-open') === 'true') {
        barraLateral.classList.add('max-barra-lateral');
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    }
});

// Manejo del botón de modo oscuro
palanca.addEventListener('click', () => {
    let body = document.body;
    body.classList.toggle('dark-mode');
    circulo.classList.toggle('prendido');
    localStorage.setItem('dark-mode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

// Manejo de la barra lateral
cloud.addEventListener('click', () => {
    barraLateral.classList.toggle('mini-barra-lateral');
    main.classList.toggle('min-main');
    spans.forEach((span) => {
        span.classList.toggle('oculto');
    });
    cloud.classList.toggle('rotated');
});

// Guardar estado del sidebar en localStorage
sidebarToggle.addEventListener('click', () => {
    barraLateral.classList.toggle('barra-lateral-closed');
    localStorage.setItem('sidebar-open', !barraLateral.classList.contains('barra-lateral-closed'));
});
