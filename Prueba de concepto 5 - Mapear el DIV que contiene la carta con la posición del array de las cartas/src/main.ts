interface InfoCarta {
    idFoto: number;
    image: string;
}

const infoCartas: InfoCarta[] = [
    {
        idFoto: 1,
        image: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png",
    },
    {
        idFoto: 2,
        image: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/2.png",
    },
    {
        idFoto: 3,
        image: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/3.png",
    },
    {
        idFoto: 4,
        image: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/4.png",
    },
    {
        idFoto: 5,
        image: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/5.png",
    },
    {
        idFoto: 6,
        image: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/6.png",
    },
];

const crearDiv = (nombreClase : string): HTMLDivElement => {
    const div = document.createElement("div");
    div.classList.add(nombreClase);
    div.id = nombreClase;

    return div;
};

const crearImagen = (nombreClase : string): HTMLImageElement => {
    const img = document.createElement("img");
    img.classList.add(nombreClase);
    img.id = nombreClase;
    img.src = "";
    
    return img;
};

const voltearCarta = (img : HTMLImageElement, image: string) : void => {
    if(img && img instanceof HTMLImageElement){
        img.src = image;
    }
};

const crearTablero = (cartas: InfoCarta[]) : void => {
    //Obtener div principal
    const contenedorCartas = document.getElementById("contenedor-cartas");

    //Comprobar existencia
    if(contenedorCartas && contenedorCartas instanceof HTMLDivElement){
        cartas.forEach((carta) => {
            let indice = carta.idFoto;

            //Crear div carta
            const divCarta = crearDiv("carta");
            divCarta.setAttribute("indice", indice.toString());
            contenedorCartas.appendChild(divCarta);

            //Crear img carta
            const imgCarta = crearImagen("img")
            imgCarta.setAttribute("indice", indice.toString());
            divCarta.appendChild(imgCarta);

            //Añadir evento de clic a la carta
            divCarta.addEventListener("click", () => {
                voltearCarta (imgCarta, carta.image);
            });

        });
    }
}

// Duplicar cartas
const cartasDuplicadas: InfoCarta[] = [...infoCartas, ...infoCartas];

document.addEventListener("DOMContentLoaded", () => crearTablero (cartasDuplicadas));

