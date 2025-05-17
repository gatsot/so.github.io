// Configuración para ajustar la cantidad de gotas y el tiempo de caída
const cantidadDeGotas = 5; // Número de gotas que caerán
const tiempoDeCaida = 1; // Tiempo en segundos que tarda una gota en caer de principio a fin
const intervalo = 15000 / 5; // 60Hz, o 60 imágenes por segundo

// Obtener las imágenes del HTML
const imagenesDisponibles = Array.from(document.querySelectorAll('img[id^="imagen"]'))
    .map(img => img.src);  // Obtiene las rutas de las imágenes que tienen id que comienza con "imagen"

// Función para crear una gota de imagen
function crearGota() {
    const imagen = document.createElement('img');
    imagen.src = imagenesDisponibles[Math.floor(Math.random() * imagenesDisponibles.length)];
    imagen.style.position = 'absolute';
    imagen.style.width = '100px';
    imagen.style.height = 'auto';
    imagen.style.borderRadius = '50%'; // Hace que la imagen sea redonda
    
    // Posición inicial aleatoria en el eje X
    imagen.style.left = Math.random() * window.innerWidth + 'px';
    imagen.style.top = '0px';  // Comienza fuera de la pantalla en la parte superior

    // Añadir la imagen al cuerpo del documento
    document.body.appendChild(imagen);

    // Animación para que la imagen caiga
    let topPosition = 0; // Comienza fuera de la pantalla
    const animacionCaida = setInterval(() => {
        topPosition += 5; // Ajusta la velocidad de caída (5px por intervalo)
        imagen.style.top = topPosition + 'px';

        // Eliminar la imagen después de que haya caído completamente
        if (topPosition > window.innerHeight) {
            clearInterval(animacionCaida);
            imagen.remove();
        }
    }, (tiempoDeCaida * 1000) / 60); // Dividir el tiempo de caída entre los 60Hz
}

// Función para generar gotas continuamente
function generarLluvia() {
    setInterval(crearGota, intervalo); // Generar gotas a intervalos regulares
}

// Iniciar la lluvia de imágenes
generarLluvia();
