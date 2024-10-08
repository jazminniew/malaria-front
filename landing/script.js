document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.numero');
    let scrolled = false; // Para evitar múltiples ejecuciones

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    const updateCount = (counter) => {
        const target = +counter.getAttribute('data-target');
        const speed = 200; // Velocidad de la animación
        const increment = target / speed;

        const incrementCounter = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(incrementCounter, 20);
            } else {
                counter.innerText = target;
            }
        };

        incrementCounter();
    };

    window.addEventListener('scroll', () => {
        if (!scrolled) {
            counters.forEach(counter => {
                if (isInViewport(counter)) {
                    updateCount(counter);
                    scrolled = true; // Ejecuta solo una vez
                }
            });
        }
    });
});
