const cloud = document.querySelector(".bx-chevron-left"); // Cambia getElementById por querySelector
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

menu.addEventListener("click", () => {
    barraLateral.classList.toggle("max-barra-lateral");
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

palanca.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mode");
    circulo.classList.toggle("prendido");
});

cloud.addEventListener("click", () => {
    // Alterna las clases del sidebar
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");

    // Alterna las clases de los spans
    spans.forEach((span) => {
        span.classList.toggle("oculto");
    });

    // Alterna la rotación de la flecha
    cloud.classList.toggle("rotated");
});

// Para el caso de que la flecha esté rotada, asegurarse de volver a su estado original
document.addEventListener("DOMContentLoaded", () => {
    if (barraLateral.classList.contains("mini-barra-lateral")) {
        cloud.classList.add("rotated");
    } else {
        cloud.classList.remove("rotated");
    }
});
