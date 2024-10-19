/* Simulando el progreso de carga con la animación del porcentaje*/
let progress = 0;
const numberElement = document.getElementById("number").querySelector("h1");

function incrementarPorcentaje() {
    if (progress < 100) {
        progress++;
        numberElement.textContent = `${progress}%`;
    }
}

setInterval(incrementarPorcentaje, 50); // Simula el progreso de carga

// Función para realizar la solicitud a la API de Vercel
function verificarMalaria() {
    const apiUrl = 'https://malaria-xi.vercel.app/user/login'; 

    // Opciones de la solicitud
    const options = {
        method: 'POST', // o 'GET', dependiendo de tu API
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer tu-token-si-es-necesario' // Solo si tu API requiere autenticación
        },
        body: JSON.stringify({
            // Los datos del paciente o lo que necesites enviar a la API
            // Por ejemplo, una imagen o información de análisis
            sampleData: "data del paciente o análisis"
        })
    };

    // Hacemos la solicitud a la API
    fetch(apiUrl, options)
        .then(response => response.json()) // Parseamos la respuesta a JSON
        .then(data => {
            // Aquí asumimos que 'data.resultado' es lo que la API devuelve (infectado o no)
            if (data.resultado === 'infectado') {
                window.location.href = "infectado.html"; // Redirige a la página de infectado
            } else {
                window.location.href = "no-infectado.html"; // Redirige a la página de no infectado
            }
        })
        .catch(error => {
            console.error('Error al conectar con la API:', error);
            // Aquí puedes manejar el error si es necesario
        });
}

// Simulamos el tiempo de espera antes de hacer la llamada a la API
setTimeout(verificarMalaria, 3000); // Llamamos a la API después de 3 segundos (puedes ajustarlo)



/* Simulacion para tic experience)
let progress = 0;
const numberElement = document.getElementById("number").querySelector("h1");

function incrementarPorcentaje() {
    if (progress < 100) {
        progress++;
        numberElement.textContent = `${progress}%`;
    } else {
        clearInterval(progressInterval); // Detener el intervalo al llegar al 100%
        // Aquí se redirige a la página de infectado después de llegar al 100%
        window.location.href = "infectado.html"; 
    }
}

const progressInterval = setInterval(incrementarPorcentaje, 50); // Simula el progreso de carga
*/