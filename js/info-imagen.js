// Obtener el contenedor de errores
const responseDiv = document.getElementById('response');

// Función para mostrar errores
function mostrarError(mensaje) {
    // Limpiar mensaje previo
    responseDiv.classList.remove('show');
    responseDiv.textContent = ""; // Limpia cualquier mensaje anterior

    // Actualizar y mostrar el nuevo mensaje
    responseDiv.textContent = mensaje;
    responseDiv.classList.add('show');
}

// Función para ocultar el mensaje de error
function ocultarError() {
    responseDiv.classList.remove('show');
    responseDiv.textContent = "";
}

// Selecciona el botón de continuar
const continuarBtn = document.querySelector('.sp');
const loadingScreen = document.getElementById("loading-container");

document.getElementById('back-button').addEventListener('click', function () {
    window.history.back();
});

// Agrega un evento de clic al botón
continuarBtn.addEventListener('click', async () => {
    loadingScreen.style.display = 'flex';
    iniciarProgreso();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const file = document.getElementById('file').files[0];

    if (nombre && apellido && file) {
        ocultarError(); // Oculta cualquier error previo

        const id = localStorage.getItem('id');
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('file', file);
        formData.append('id', id);

        try {
            const response = await fetch('http://localhost:8000/analyze/uploadAnalyzePost', { // Corrected URL
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                detenerProgreso();
                loadingScreen.style.display = 'none';

                if (result.prediccion) {
                    window.location.href = 'no-infectado.html';
                } else if (!result.prediccion) {
                    window.location.href = 'infectado.html';
                } else {
                    mostrarError("Error: Resultado del análisis desconocido.");
                }
            } else {
                detenerProgreso();
                loadingScreen.style.display = 'none';
                mostrarError(`Error: ${result.message}`);
            }
        } catch (error) {
            detenerProgreso();
            loadingScreen.style.display = 'none';
            mostrarError(`Error al guardar los datos: ${error.message}`);
        }
    } else {
        detenerProgreso();
        loadingScreen.style.display = 'none';
        mostrarError("Por favor, completa todos los campos e incluye una imagen para subir.");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file');
    const imgArea = document.querySelector('.img-area');
    const selectImage = document.querySelector('.select-image');

    if (selectImage) {
        selectImage.addEventListener('click', () => {
            fileInput.click();
        });
    }

    const processImage = async (file) => {
        if (file) {
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validImageTypes.includes(fileType)) {
                mostrarError('Por favor, selecciona un archivo de imagen válido (JPEG, PNG).');
                return;
            }

            if (file.size > 2 * 1024 * 1024) { // 2MB
                mostrarError('El tamaño de la imagen debe ser menor a 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const allImg = imgArea.querySelectorAll('img');
                allImg.forEach(img => img.remove());

                const imgUrl = reader.result;
                const img = document.createElement('img');
                img.src = imgUrl;
                imgArea.appendChild(img);
                imgArea.classList.add('active');
                imgArea.dataset.img = file.name;
            };
            reader.readAsDataURL(file);
        }
    };

    if (fileInput) {
        fileInput.addEventListener('change', function () {
            const file = fileInput.files[0];
            processImage(file);
        });
    }

    if (imgArea) {
        imgArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            imgArea.classList.add('dragging');
        });

        imgArea.addEventListener('dragleave', () => {
            imgArea.classList.remove('dragging');
        });

        imgArea.addEventListener('drop', (event) => {
            event.preventDefault();
            imgArea.classList.remove('dragging');

            const file = event.dataTransfer.files[0];
            processImage(file);
        });
    }
});

// Barra de progreso
let progress = 0;
const numberElement = document.getElementById("number").querySelector("h1");
let progressInterval;

function incrementarPorcentaje() {
    if (progress < 95) {
        progress++;
        numberElement.textContent = `${progress}%`;
    }
}

function iniciarProgreso() {
    progressInterval = setInterval(incrementarPorcentaje, 100);
}

function detenerProgreso() {
    clearInterval(progressInterval);
    progress = 100;
    numberElement.textContent = `${progress}%`;
}

document.addEventListener('DOMContentLoaded', () => {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');

    function capitalizeWords(text) {
        return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    }

    nombreInput.addEventListener('input', () => {
        nombreInput.value = capitalizeWords(nombreInput.value);
    });

    apellidoInput.addEventListener('input', () => {
        apellidoInput.value = capitalizeWords(apellidoInput.value);
    });
});
