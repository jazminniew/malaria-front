let progress = 0;
const numberElement = document.getElementById("number").querySelector("h1");
let progressInterval;

// Función para incrementar el porcentaje de carga
function incrementarPorcentaje() {
    if (progress < 95) { // Limitar el progreso máximo a 95% mientras esperamos la respuesta
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
    clearInterval(progressInterval); // Detener el incremento de porcentaje
    progress = 100;
    numberElement.textContent = `${progress}%`;
}

// Función para realizar la solicitud a la API de Vercel
function verificarMalaria() {
    iniciarProgreso(); // Iniciar el progreso al hacer la solicitud

    const apiUrl = 'https://malaria-xi.vercel.app/user/login'; 

    const options = {
        method: 'POST', // Cambia según la API
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer tu-token-si-es-necesario' // Solo si tu API requiere autenticación
        },
        body: JSON.stringify({
            // Los datos del paciente o análisis
            sampleData: "data del paciente o análisis"
        })
    };

    // Hacemos la solicitud a la API
    fetch(apiUrl, options)
        .then(response => response.json()) // Parseamos la respuesta a JSON
        .then(data => {
            detenerProgreso(); // Detener el progreso al recibir la respuesta

            // Aquí asumimos que 'data.resultado' es lo que la API devuelve (infectado o no)
            if (data.resultado === 'infectado') {
                setTimeout(() => {
                    window.location.href = "infectado.html"; // Redirige a la página de infectado
                }, 500); // Pausa breve para asegurar que el progreso alcance el 100%
            } else {
                setTimeout(() => {
                    window.location.href = "no-infectado.html"; // Redirige a la página de no infectado
                }, 500);
            }
        })
        .catch(error => {
            console.error('Error al conectar con la API:', error);
            detenerProgreso(); // Detener el progreso incluso si hay error
            // Puedes mostrar un mensaje de error aquí si es necesario
        });
}

// Llamar a la función para verificar malaria
verificarMalaria();
