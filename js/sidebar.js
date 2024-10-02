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

const FONDOPACIENTES = document.getElementById('elements-container');
const searchbar = document.getElementById('formulario');
const CREATEPOSTS = document.getElementById('FONDOPOSTS');
const mensajesPrivados = document.getElementById('privados');
const noResultsMessage = document.getElementById('noResults');

// Comprobar el estado del modo oscuro al cargar la página
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    circulo.classList.add('prendido');
}

// Comprobar el estado de la barra lateral al cargar la página
if (localStorage.getItem('sidebarState') === 'mini') {
    spans.forEach((span) => span.classList.add("oculto"));
    barraLateral.classList.add("mini-barra-lateral");
    main.classList.add("min-main");
    if (FONDOPACIENTES)
        FONDOPACIENTES.classList.add("expanded");
    noResultsMessage.classList.add("expandido3");
    if (CREATEPOSTS)
        CREATEPOSTS.classList.add("expandido1");
    if(searchbar)
    searchbar.classList.add("expandido");
    if(mensajesPrivados)
    mensajesPrivados.classList.add("expandido2");
} else {
    spans.forEach((span) => span.classList.remove("oculto"));
}

// Manejo del botón "Nuevo"
btnNuevo.addEventListener('click', function () {
    botonesNuevosCard.classList.add('show');
});

pacienteBtn.addEventListener('click', function () {
    window.location.href = 'crear-paciente.html';
});

imagenBtn.addEventListener('click', function () {
    window.location.href = 'seleccionar-imagen.html';
});

document.addEventListener('click', function (event) {
    if (!botonesNuevosCard.contains(event.target) && !btnNuevo.contains(event.target)) {
        botonesNuevosCard.classList.remove('show');
    }
});

// Cerrar sesión
logoutBtn.addEventListener('click', function () {
    logoutCard.classList.add('show');
});

cancelBtn.addEventListener('click', function () {
    logoutCard.classList.remove('show');
});

exitBtn.addEventListener('click', function () {

    function logout() {
        // Eliminar cualquier dato que almacenes en localStorage o sessionStorage
        localStorage.removeItem('authToken'); // Ejemplo de eliminar token de autenticación
        sessionStorage.removeItem('userSession'); // Si usas sessionStorage

        // Si usas cookies, también debes eliminarlas (si son manejadas en el frontend)
        document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = 'iniciar-sesion.html';
    }

});

document.addEventListener('click', function (event) {
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

    // Guardar en localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});



/* Comprobar el estado de la barra lateral al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    console.log('Estado guardado de la barra lateral:', localStorage.getItem('sidebarState'));

    if (localStorage.getItem('sidebarState') === 'mini') {
        spans.forEach((span) => span.classList.add("oculto"));
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        FONDOPACIENTES.classList.add("expanded");
        noResultsMessage.classList.add("expandido3");
        CREATEPOSTS.classList.add("expandido1");
        searchbar.classList.add("expandido");
        mensajesPrivados.classList.add("expandido2");
        console.log('La barra lateral está en estado mini al cargar.');
    } else {
        spans.forEach((span) => span.classList.remove("oculto"));
        console.log('La barra lateral está en estado máximo al cargar.');
    }
});*/

// Comprobar el estado de la barra lateral al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    let sidebarState = localStorage.getItem('sidebarState');
    console.log('Estado guardado de la barra lateral:', sidebarState);

    if (sidebarState === 'mini') {
        spans.forEach((span) => span.classList.add("oculto"));
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        if (FONDOPACIENTES)
            FONDOPACIENTES.classList.add("expanded");
        noResultsMessage.classList.add("expandido3");
        if (CREATEPOSTS)
            CREATEPOSTS.classList.add("expandido1");
        if(searchbar)
        searchbar.classList.add("expandido");
        if(mensajesPrivados)
        mensajesPrivados.classList.add("expandido2");
        console.log('La barra lateral está en estado mini al cargar.');
    } else if (sidebarState === 'max') {
        spans.forEach((span) => span.classList.remove("oculto"));
        barraLateral.classList.remove("mini-barra-lateral");
        main.classList.remove("min-main");
        console.log('La barra lateral está en estado máximo al cargar.');
    } else {
        console.log('No hay estado guardado, cargando como estado máximo.');
    }
});

// Manejo de la barra lateral al hacer clic en el ícono
cloud.addEventListener("click", () => {
    spans.forEach((span) => {
        span.classList.toggle("oculto");
    });

    cloud.classList.toggle("rotated");
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");

if (FONDOPACIENTES)
            FONDOPACIENTES.classList.add("expanded");
        noResultsMessage.classList.add("expandido3");
        if (CREATEPOSTS)
            CREATEPOSTS.classList.add("expandido1");
        if(searchbar)
        searchbar.classList.add("expandido");
        if(mensajesPrivados)
        mensajesPrivados.classList.add("expandido2");

    // Guardar el estado de la barra lateral en localStorage
    if (barraLateral.classList.contains("mini-barra-lateral")) {
        localStorage.setItem('sidebarState', 'mini');
        console.log('Estado de la barra lateral guardado como: mini');
    } else {
        localStorage.setItem('sidebarState', 'max');
        console.log('Estado de la barra lateral guardado como: max');
    }
});
