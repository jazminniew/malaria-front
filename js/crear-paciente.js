const continuarBtn = document.querySelector('.btn');

// Agrega un evento de clic al botón
continuarBtn.addEventListener('click', async () => {
  // Obtén los valores de los campos de entrada
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const fechaNacimiento = document.getElementById('fechaNacimiento').value; // Asume que es de tipo "date"
  const pais = document.getElementById('pais').value; // Asume que es un campo select, no necesita trim()
  const genero = document.getElementById('genero').value; // Asume que es un select o radio button
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim(); // Número de teléfono como texto
  
  // Verifica si todos los campos están completos
  if (nombre && apellido && fechaNacimiento /*&& pais*/ && genero && email && telefono) {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('fechaNacimiento', fechaNacimiento);
      formData.append('pais', pais);
      formData.append('genero', genero);
      formData.append('email', email);
      formData.append('telefono', telefono);

      const token = localStorage.getItem('token'); // Recupera el token de localStorage


      try {
        const response = await fetch('https://malaria-xi.vercel.app/patients/registerPatient', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`, // Agrega el token en el header
          },
          body: formData,
      });
          const result = await response.json();

          if (response.ok) {
              // Redirige a la página de home3.html
              window.location.href = 'home3.html';
          } else {
              // Si hay un error, muestra un mensaje
              alert(`Error: ${result.message}`);
          }
      } catch (error) {
          alert(`Error al guardar los datos: ${error.message}`);
      }
  } else {
      // Si falta algún campo, muestra un mensaje de error
      alert('Por favor, completa todos los campos.');
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


/*

document.getElementById('crearPacienteForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario por defecto
  
    // Recoger los datos del formulario
    const paciente = {
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      fechaNacimiento: document.getElementById('fechaNacimiento').value,
      pais: document.getElementById('pais').value,
      genero: document.getElementById('genero').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
    };
  
    try {
      // Enviar los datos al backend
      const response = await fetch('https://malaria-xi.vercel.app/patients/registerPatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer tu-token-aqui',  // Reemplaza 'tu-token-aqui' con el token correcto.
        },
        body: JSON.stringify(paciente)
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar el paciente.');
      }
  
      // Redirigir a la página anterior si existe, o a home3.html
      const previousPage = document.referrer; // Obtiene la página de la que vino
      if (previousPage) {
        window.location.href = previousPage;
      } else {
        window.location.href = 'home3.html';
      }
  
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al guardar el paciente.');
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
*/