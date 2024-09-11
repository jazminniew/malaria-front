
// Cargar estado del modo oscuro desde localStorage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        circulo.classList.add('prendido');
    }

    // Cargar estado del sidebar desde localStorage
    if (localStorage.getItem('sidebar-open') === 'true') {
        barraLateral.classList.add('max-barra-lateral');
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    }
});


