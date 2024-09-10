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

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita que el formulario se envíe de forma predeterminada

    // Recopilar los datos del formulario
    const formData = new FormData(this);

    try {
        // Enviar los datos al backend
        const response = await fetch('URL_DE_TU_BACKEND/crear-cuenta', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            // Redirigir al usuario a la página de inicio de sesión si el registro es exitoso
            alert('Registro exitoso');
            window.location.href = 'iniciar-sesion.html';
        } else {
            // Si hay un error, mostrar un mensaje
            const errorData = await response.json();
            alert('Error: ' + errorData.message);
        }
    } catch (error) {
        alert('Error al conectar con el servidor');
    }
});

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita que el formulario se envíe de forma predeterminada

    // Recopilar los datos del formulario
    const formData = new FormData(this);

    try {
        // Enviar los datos al backend
        const response = await fetch('URL_DE_TU_BACKEND/crear-cuenta', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            // Redirigir al usuario a la página de inicio de sesión si el registro es exitoso
            alert('Registro exitoso');
            window.location.href = 'iniciar-sesion.html';
        } else {
            // Si hay un error, mostrar un mensaje
            const errorData = await response.json();
            alert('Error: ' + errorData.message);
        }
    } catch (error) {
        alert('Error al conectar con el servidor');
    }
});

const response = await fetch('https://tu-backend-en-vercel.com/api/registro', {
    method: 'POST',
    body: formData
});

