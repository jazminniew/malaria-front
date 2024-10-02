// Lista de países en formato JSON
const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
    "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
    "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
    "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
    "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// Obtener el elemento select
const selectElement = document.getElementById('pais');

// Crear opciones para el select
countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    selectElement.appendChild(option);
});

// Mostrar el nombre del archivo seleccionado
document.getElementById('profilePicInput').addEventListener('change', function() {
    const fileInput = this;
    const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
    const placeholder = document.getElementById('filePlaceholder');
    const fileNameDisplay = document.getElementById('profilePicName');

    if (fileInput.files.length > 0) {
        placeholder.style.display = 'none'; // Oculta el placeholder
        fileNameDisplay.style.display = 'block'; // Muestra el nombre del archivo
        fileNameDisplay.textContent = fileName;
    } else {
        placeholder.style.display = 'block'; // Muestra el placeholder si no hay archivo
        fileNameDisplay.style.display = 'none'; // Oculta el nombre del archivo
    }
});

// Validar el formulario antes de enviarlo
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita que el formulario se envíe de forma predeterminada

    const nombre = document.querySelector('input[name="nombre"]').value;
    const apellido = document.querySelector('input[name="apellido"]').value;
    const fechaNacimiento = document.querySelector('input[name="fecha_nacimiento"]').value;
    const pais = document.querySelector('select[name="pais"]').value;
    const ocupacion = document.querySelector('select[name="ocupacion"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const profilePic = document.getElementById('profilePicInput').files.length > 0;

    // Validación de campos vacíos
    if (!nombre || !apellido || !fechaNacimiento || !pais || !ocupacion || !email || !password || !profilePic) {
        alert('Por favor, completa todos los campos.');
        return;  // No envía el formulario si falta información
    }

    const formData = new FormData(this);

    try {
        // Enviar los datos al backend
        const response = await fetch('https://malaria-xi.vercel.app/user/register', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            alert('Registro exitoso');
            window.location.href = 'iniciar-sesion.html';
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.message);
        }
    } catch (error) {
        alert('Error al conectar con el servidor');
    }
});
const lockIcon = document.getElementById("lockIcon");
const passwordInput = document.getElementById("password");

lockIcon.addEventListener("click", function () {
    // Cambia el tipo de input entre password y text
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Cambia el icono entre el candado cerrado y el candado abierto
    if (type === "text") {
        lockIcon.classList.remove('bxs-lock-alt');
        lockIcon.classList.add('bxs-lock-open-alt');
    } else {
        lockIcon.classList.remove('bxs-lock-open-alt');
        lockIcon.classList.add('bxs-lock-alt');
    }
});
