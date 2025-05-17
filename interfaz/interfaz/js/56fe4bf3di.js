    // Lista de IDs de botones y sus sufijos únicos
    const buttons = [
        { id: "button1", suffix: "XD5MZMXZ" },
        { id: "button2", suffix: "JI48TV18" },
        { id: "button3", suffix: "UEZ7DKAS" },
        { id: "button4", suffix: "U2ZOICFJ" },
        { id: "button5", suffix: "25TDX41Y" },
        { id: "button6", suffix: "M428NNVW" },
        { id: "button7", suffix: "I6315N6T" }
    ];

    // Función para agregar eventos a los botones
    buttons.forEach(button => {
        document.getElementById(button.id).addEventListener("click", () => {
            window.open(`https://cwallet.com/t/${button.suffix}`, "_blank");
        });
    });