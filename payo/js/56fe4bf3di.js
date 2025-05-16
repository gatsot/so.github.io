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