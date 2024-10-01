document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file');
    const imgArea = document.querySelector('.img-area');
    const selectImage = document.querySelector('.select-image');
    const submitButton = document.querySelector('.subir');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');

    // Permitir que el usuario haga clic en "buscala" para abrir el input de archivos
    selectImage.addEventListener('click', () => {
        fileInput.click();
    });

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

            // Enviar la imagen, nombre y apellido al backend
            try {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('nombre', nombreInput.value); // Agregar nombre
                formData.append('apellido', apellidoInput.value); // Agregar apellido

                const response = await fetch('https://malaria-xi.vercel.app/user/login', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Error al subir la imagen.');
                }

                const result = await response.json();
                console.log('Datos subidos correctamente:', result);

                // Redirigir a la página de carga
                submitButton.addEventListener('click', function () {
                    window.location.href = 'cargando.html';
                });

            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al subir la imagen.');
            }
        }
    };

    // Cuando se selecciona una imagen usando el input
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        processImage(file);
    });

    // Agregar funcionalidad de arrastrar y soltar
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
});
