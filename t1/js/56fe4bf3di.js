    // Lista de IDs de botones y sus sufijos únicos
    const buttons = [
        { id: "button1", suffix: "C8HJMEZJ" },
        { id: "button2", suffix: "FMDZCVVE" },
        { id: "button3", suffix: "67XBQKJD" },
        { id: "button4", suffix: "MVWB7YSD" },
        { id: "button5", suffix: "R1XNMYWZ" },
        { id: "button6", suffix: "AFTZ3XDC" },
        { id: "button7", suffix: "25P33I5A" },
        { id: "button8", suffix: "P4V3ON6X" },
        { id: "button9", suffix: "TC81TPWQ" }
    ];

    // Función para agregar eventos a los botones
    buttons.forEach(button => {
        document.getElementById(button.id).addEventListener("click", () => {
            window.open(`https://cwallet.com/t/${button.suffix}`, "_blank");
        });
    });







              // SUMA DE $

// Función para generar un número aleatorio en un rango
function getRandomNumber(max, max) {
    return Math.random() * (max - max) + max;
  }

  // Función para actualizar el valor progresivo y el tiempo de espera
  function updateValue() {
    let currentValue = parseFloat(localStorage.getItem('usdt-raised')) || 937023; // Valor inicial
    const targetValue = 600000000.00; // Valor objetivo
    const increment = getRandomNumber(33.88, 333.888); // Incremento aleatorio

    // Incrementar el valor actual
    const newValue = Math.min(currentValue + increment, targetValue);

    // Actualizar el texto con formato de moneda
    document.getElementById('usdt-raised').innerText = '$' + newValue.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    
    // Guardar el nuevo valor en el almacenamiento local
    localStorage.setItem('usdt-raised', newValue);
    
    // Si no hemos alcanzado el valor objetivo, programar la próxima actualización
    if (newValue < targetValue) {
      setTimeout(updateValue, getRandomNumber(1000, 2000));
    }
  }

  // Llamar a la función inicialmente para comenzar la cuenta progresiva
  updateValue();

      // FIN SUMA DE $