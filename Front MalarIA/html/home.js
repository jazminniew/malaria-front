const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
});

// Filtros
let products = {
    data: [
        {
            patientName: "Marcelo",
            category: "Mas recientes",
            image: "https://www.tuterapia.com.ar/uploads/blog/imagen/6caractersticasdeunapersonasoberbia-20231018180924.jpg",
        },
        {
            patientName: "Karina",
            category: "Mas antiguos",
            image: "https://www.tuterapia.com.ar/uploads/blog/imagen/6caractersticasdeunapersonasoberbia-20231018180924.jpg",
        },
        {
            patientName: "Marta",
            category: "Tienen malaria",
            image: "https://www.tuterapia.com.ar/uploads/blog/imagen/6caractersticasdeunapersonasoberbia-20231018180924.jpg",
        },
        {
            patientName: "Roberto",
            category: "No tienen malaria",
            image: "https://www.tuterapia.com.ar/uploads/blog/imagen/6caractersticasdeunapersonasoberbia-20231018180924.jpg",
        },
    ],
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
}

// Filtro de categorías
function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        if (value.toUpperCase() === button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

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
