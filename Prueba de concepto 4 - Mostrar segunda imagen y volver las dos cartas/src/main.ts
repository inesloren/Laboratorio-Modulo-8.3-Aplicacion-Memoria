const carta1 = document.getElementById("carta1") as HTMLElement;
const carta2 = document.getElementById("carta2") as HTMLElement;
const imagen1 = document.getElementById("imagen1") as HTMLImageElement;
const imagen2 = document.getElementById("imagen2") as HTMLImageElement;

let primeraCartaVolteada = false;

// Función para voltear la primera carta
const voltearCarta1 = () => {
    if (!primeraCartaVolteada) {
        imagen1.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png";
        imagen1.style.opacity = "1"; // Mostrar la imagen
        primeraCartaVolteada = true;
        carta1.style.backgroundColor = "#b899ff";
    }
};

// Función para voltear la segunda carta y también la primera (si está volteada)
const voltearCarta2 = () => {
    if (primeraCartaVolteada) {
        imagen2.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/6.png";
        imagen2.style.opacity = "1"; // Mostrar la imagen de la segunda carta
        carta2.style.backgroundColor = "#b899ff";
    }
};

// Asociar los eventos de clic a cada carta
carta1.addEventListener("click", voltearCarta1);
carta2.addEventListener("click", voltearCarta2);
