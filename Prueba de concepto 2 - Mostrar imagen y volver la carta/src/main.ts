const carta =  document.getElementById("contendor-carta");

const voltearCarta = (): void => {
    const imgCarta = document.getElementById("imagen-carta");
    if(imgCarta && imgCarta instanceof HTMLImageElement) {
        imgCarta.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/6.png";
    }
    if (carta && carta instanceof HTMLDivElement) {
        carta.style.backgroundColor = "#b899ff";
    }
};

if(carta && carta instanceof HTMLDivElement){
    carta.addEventListener ("click", voltearCarta)
};