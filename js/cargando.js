document.addEventListener("DOMContentLoaded", () => {
    const numberElement = document.querySelector("#number h1");
    let progress = 0;
    const duration = 10000; // Duración total del progreso en milisegundos (5 segundos)
    const interval = 50; // Intervalo de actualización en milisegundos

    // Función para actualizar el progreso
    function updateProgress() {
        progress += (interval / duration) * 100;
        if (progress > 100) progress = 100; // Asegurarse de no superar el 100%

        numberElement.textContent = `${Math.round(progress)}%`;

        if (progress < 100) {
            setTimeout(updateProgress, interval);
        } else {
            // Redirigir cuando el progreso llegue al 100%
            window.location.href = 'index.html'; // Cambia esta URL por la página a la que deseas redirigir
        }
    }

    // Iniciar la actualización del progreso
    updateProgress();
});
