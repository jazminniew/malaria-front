const continuarBtn = document.querySelector('.btn');
const responseDiv = document.getElementById('response'); // Seleccionamos el div de respuesta

continuarBtn.addEventListener('click', async () => {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("telefono").value;
  const descripcion = document.getElementById("descripcion").value;

  if (!nombre || !apellido || !email || !phone || !descripcion) {
    responseDiv.textContent = "Por favor, completa todos los campos obligatorios.";
    responseDiv.classList.add('show'); // Muestra el mensaje de error
    return; // Detener el envío
  }

  const id_user = localStorage.getItem("id");

  const formData = {
    nombre,
    apellido,
    email,
    phone,
    descripcion,
    id_user
  }

  const token = localStorage.getItem("token")

  try {
    const response = await fetch('https://malaria-xi.vercel.app/patients/registerPatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Error al registrar al paciente');
    }
    const result = await response.json();  // Añadir esta línea para ver la respuesta del servidor
console.log('Paciente registrado:', result);  // Mostrar la respuesta
console.log("Descripción:", descripcion);

    // Redirige a mis-pacientes.html si la respuesta es exitosa
    window.location.href = 'mis-pacientes.html';

  } catch (error) {
    // Muestra el mensaje de error en el div #response
    responseDiv.textContent = `Error: ${error.message}`;
    responseDiv.classList.add('show');  // Hacemos visible el div
  }
});


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

document.getElementById('back-button').addEventListener('click', function () {
  window.history.back();
});

document.addEventListener("DOMContentLoaded", () => {
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const telefonoInput = document.getElementById("telefono");

  // Capitalizar primera letra de Nombre y Apellido
  nombreInput.addEventListener("input", () => {
      nombreInput.value = nombreInput.value
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase());
  });

  apellidoInput.addEventListener("input", () => {
      apellidoInput.value = apellidoInput.value
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase());
  });

  // Validar el formato de Teléfono
  telefonoInput.addEventListener("input", () => {
      telefonoInput.value = telefonoInput.value.replace(/[^0-9]/g, ""); // Solo permite números
      if (telefonoInput.value.length > 10) {  // Ajusta el largo según el país si es necesario
          telefonoInput.value = telefonoInput.value.slice(0, 10);
      }
  });
});

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\s/g, ''); // Reemplaza todos los espacios
  });
});