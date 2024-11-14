// Selecciona el botón de continuar
const continuarBtn = document.querySelector('.sp');

const loadingScreen = document.getElementById("loading-container");


document.getElementById('back-button').addEventListener('click', function () {
    window.history.back();
});


// Agrega un evento de clic al botón
continuarBtn.addEventListener('click', async () => {
    // Obtén los valores de los campos de entrada
    loadingScreen.style.display = 'flex';
    iniciarProgreso(); 

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const file = document.getElementById('file').files[0];

    // Verifica si ambos campos están completos
    if (nombre && apellido && file) {
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
                // Redirige a la página de seleccionar-imagen.html
                detenerProgreso();
                loadingScreen.style.display = 'none';
                //window.location.href = 'home3.html';
                if (result.resultado === "positivo") {
                    window.location.href = 'infectado.html';
                } else if (result.resultado === "negativo") {
                    window.location.href = 'no-infectado.html';
                } else {
                    alert("Error: Resultado del análisis desconocido.");
                }
            } else {
                detenerProgreso();
                // si hay error, devolver un div/h3 que diga: hubo un error
                loadingScreen.style.display = 'none';
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            detenerProgreso();
            loadingScreen.style.display = 'none';
            alert(`Error al guardar los datos: ${error.message}`);
        }
    } else {
        // Si falta algún campo, muestra un mensaje de error
        detenerProgreso();
        loadingScreen.style.display = 'none';
        alert('Por favor, completa todos los campos.');
        errorMessage.style.display = "block";
        errorMessage.textContent = "Por favor, completa todos los campos e incluye una imagen para subir.";
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file');
    const imgArea = document.querySelector('.img-area');
    const selectImage = document.querySelector('.select-image');

    // Permitir que el usuario haga clic en "buscala" para abrir el input de archivos
    if (selectImage) {
        selectImage.addEventListener('click', () => {
            fileInput.click();
        });
    }

    // Función para procesar la imagen seleccionada o arrastrada
    const processImage = async (file) => {
        if (file) {
            // Verificar que el archivo es una imagen
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validImageTypes.includes(fileType)) {
                alert('Por favor, selecciona un archivo de imagen válido (JPEG, PNG).');
                return;
            }

            // Verificar que el tamaño de la imagen sea menor a 2MB
            if (file.size > 2 * 1024 * 1024) { // 2MB en bytes
                alert('El tamaño de la imagen debe ser menor a 2MB.');
                return;
            }

            // Mostrar una vista previa de la imagen seleccionada
            const reader = new FileReader();
            reader.onload = () => {
                // Remover cualquier imagen previa
                const allImg = imgArea.querySelectorAll('img');
                allImg.forEach(img => img.remove());

                // Crear una nueva etiqueta <img> y agregar la imagen
                const imgUrl = reader.result;
                const img = document.createElement('img');
                img.src = imgUrl;
                imgArea.appendChild(img);
                imgArea.classList.add('active');
                imgArea.dataset.img = file.name;
            };
            reader.readAsDataURL(file); // Leer la imagen como una URL de datos

        }
    };

    // Cuando se selecciona una imagen usando el input
    if (fileInput) {
        fileInput.addEventListener('change', function () {
            const file = fileInput.files[0];
            processImage(file);
        });
    }

    // Agregar funcionalidad de arrastrar y soltar
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


//---------------------------------------------------------------------------------------

let progress = 0;
const numberElement = document.getElementById("number").querySelector("h1");
let progressInterval;

// Función para incrementar el porcentaje de carga
function incrementarPorcentaje() {
    if (progress < 95) {
        progress++;
        numberElement.textContent = `${progress}%`;
    }
}

// Iniciar la barra de progreso al hacer la solicitud
function iniciarProgreso() {
    progressInterval = setInterval(incrementarPorcentaje, 100); // Incrementa cada 100ms
}

// Detener el progreso al recibir la respuesta
function detenerProgreso() {
    clearInterval(progressInterval);
    progress = 100;
    numberElement.textContent = `${progress}%`;
}

document.addEventListener('DOMContentLoaded', () => {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');

    // Función para capitalizar la primera letra de cada palabra
    function capitalizeWords(text) {
        return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    }

    // Evento para capitalizar la entrada en tiempo real
    nombreInput.addEventListener('input', () => {
        nombreInput.value = capitalizeWords(nombreInput.value);
    });

    apellidoInput.addEventListener('input', () => {
        apellidoInput.value = capitalizeWords(apellidoInput.value);
    });
});
