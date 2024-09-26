const cloud = document.querySelector(".bx-chevron-left"); 
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

const sidebarToggle = document.getElementById('sidebarToggle');

const logoutBtn = document.getElementById('logout-btn');
const logoutCard = document.getElementById('logout-card');
const cancelBtn = document.getElementById('cancel-btn');
const exitBtn = document.getElementById('exit-btn');

const btnNuevo = document.getElementById('buttonNuevo');
const botonesNuevosCard = document.getElementById('botonesnuevosCard');
const pacienteBtn = document.getElementById('paciente-btn');
const imagenBtn = document.getElementById('imagen-btn');

// Manejo del botón "Nuevo"
btnNuevo.addEventListener('click', function() {
    botonesNuevosCard.classList.add('show');
});

pacienteBtn.addEventListener('click', function() {
    window.location.href = 'crear-paciente.html';
});

imagenBtn.addEventListener('click', function() {
    window.location.href = 'form-preguntas.html';
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
    window.location.href = 'iniciar-sesion.html';
});

document.addEventListener('click', function(event) {
    if (!logoutCard.contains(event.target) && !logoutBtn.contains(event.target)) {
        logoutCard.classList.remove('show');
    }
});

/* Responsive design */
menu.addEventListener("click", () => {
    barraLateral.classList.toggle("max-barra-lateral");
    document.querySelector("#search-container").classList.toggle("barra-lateral-open");
    document.querySelector("#search-container").classList.toggle("barra-lateral-closed");
    
    main.classList.toggle('min-main'); // Actualiza el main para ajustar el ancho
    
    if (barraLateral.classList.contains("max-barra-lateral")) {
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    } else {
        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";
    }

    if (window.innerWidth <= 320) {
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach((span) => {
            span.classList.add("oculto");
        });
    }
});

/* Modo oscuro y modo claro */
palanca.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mode");
    circulo.classList.toggle("prendido");
});

// Manejo de la barra lateral
cloud.addEventListener("click", () => {
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");

    spans.forEach((span) => {
        span.classList.toggle("oculto");
    });

    cloud.classList.toggle("rotated");
});

