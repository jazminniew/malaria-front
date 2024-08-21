const cloud = document.querySelector(".bx-chevron-left"); // Cambia getElementById por querySelector
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

const sidebarToggle = document.getElementById('sidebarToggle');
const content = document.getElementById('content');
const searchBar = document.querySelector('.search-bar');



menu.addEventListener("click", () => {
    menu.addEventListener("click", () => {
        barraLateral.classList.toggle("max-barra-lateral");
        document.querySelector("#search-container").classList.toggle("barra-lateral-open");
        document.querySelector("#search-container").classList.toggle("barra-lateral-closed");
        // ... rest of your code ...
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

let products = {
    data: [
        {
            productName: "Jazmin Sued",
            category: "18/1",
            price: "90 años",
            image:"userphoto.avif",
        },
        {
            productName: "Pedro López",
            category: "22/4",
            price: "75 años",
            image:"userphoto.avif",
        },
        {
            productName: "Ana Martínez",
            category: "15/7",
            price: "85 años",
            image:"userphoto.avif",
        },
        {
            productName: "Luis García",
            category: "10/2",
            price: "80 años",
            image:"userphoto.avif",
        },
        {
            productName: "María Rodríguez",
            category: "25/3",
            price: "92 años",
            image:"userphoto.avif",
        },
        {
            productName: "Carlos Fernández",
            category: "30/6",
            price: "88 años",
            image:"userphoto.avif",
        },
        {
            productName: "Elena Gómez",
            category: "12/5",
            price: "78 años",
            image:"userphoto.avif",
        },
        {
            productName: "Sofía Torres",
            category: "7/9",
            price: "84 años",
            image:"userphoto.avif",
        }
    ]
};

for (let i of products.data) {
    // Crear paciente
    let patient = document.createElement("div");
    // Categoria del paciente
    patient.classList.add("card", i.category);
    // Imagen div
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    // img tag
    let image = document.createElement("img");
    image.setAttribute("src", i.image);
    imgContainer.appendChild(image);
    // Añadir imgContainer al paciente
    patient.appendChild(imgContainer);
    // Añadir paciente al contenedor de productos
    document.getElementById("products").appendChild(patient);
    let container = document.createElement("div");
    container.classList.add("container");
    // Nombre del paciente
    let name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.patientName.toUpperCase();
    container.appendChild(name);
    patient.appendChild(container);
    //precio
    let price = document.createElement("h6");
    price.innerText = i.price;
    container.appendChild(price);
    card.appendChild(container);
    document.getElementById("products").appendChild(card);
}

// Filtrar productos
function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        if (value.toUpperCase() === button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    // Seleccionar todas las tarjetas
    let elements = document.querySelectorAll(".card");
elements.forEach((element) => {
    if (value === "Todos") {
        element.classList.remove("hide");
    } else {
        if (element.classList.contains(value)) {
            element.classList.remove("hide");
        } else {
            element.classList.add("hide");
        }
    }
});
}

// Botón de búsqueda
document.getElementById("search").addEventListener("click", () => {
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");
    elements.forEach((element, index) => {
        if (element.innerText.includes(searchInput.toUpperCase())) {
            cards[index].classList.remove("hide");
        } else {
            cards[index].classList.add("hide");
        }
    });
});

window.onload = () => {
    filterProduct("Todos");
};

const searchInput = document.querySelector("#placeholder");

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        // Aquí puedes colocar la lógica de búsqueda
        alert("Buscando: " + searchInput.value);
        // Por ejemplo, podrías llamar a una función para filtrar los productos o hacer una búsqueda en el servidor
    }
});
barraLateralToggle.addEventListener('click', function() {
    barraLateral.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
    searchBar.classList.toggle('collapsed');
});
