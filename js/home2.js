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

/*--------------------Responsive design---------------------*/ 
menu.addEventListener("click", () => {
    menu.addEventListener("click", () => {
        barraLateral.classList.toggle("max-barra-lateral");
        document.querySelector("#search-container").classList.toggle("barra-lateral-open");
        document.querySelector("#search-container").classList.toggle("barra-lateral-closed");
    });
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

/*-------------------------Modo oscuro y Modo claro------------------------*/ 
palanca.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mode");
    circulo.classList.toggle("prendido");
});

cloud.addEventListener("click", () => {
    // Alterna las clases del sidebar
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");


//Ocultar el "malarIA"
spans.forEach((span) => {
    span.classList.toggle("oculto");
});

// Alterna la rotación de la flecha
cloud.classList.toggle("rotated");
});

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        alert("Buscando: " + searchInput.value);
    }
});
