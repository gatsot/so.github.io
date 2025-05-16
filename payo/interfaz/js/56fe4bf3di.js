    // Lista de IDs de botones y sus sufijos únicos
    const buttons = [
        { id: "button1", suffix: "WCKCXGNO" },
        { id: "button2", suffix: "7KJAGGDO" },
        { id: "button3", suffix: "8HFDZR1A" },
        { id: "button4", suffix: "6W3HN6AA" },
        { id: "button5", suffix: "WNFLBXF2" },
        { id: "button6", suffix: "DNJKX4QL" },
        { id: "button7", suffix: "HURMIN4E" }
    ];

    // Función para agregar eventos a los botones
    buttons.forEach(button => {
        document.getElementById(button.id).addEventListener("click", () => {
            window.open(`https://cwallet.com/t/${button.suffix}`, "_blank");
        });
    });