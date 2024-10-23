import { tablero, Tablero } from "./modelo";
import { iniciaPartida, parejaEncontrada, parejaNoEncontrada, sePuedeVoltearLaCarta, sonPareja, voltearLaCarta, } from "./motor";


const btnEmpezarPartida = document.getElementById("iniciar-partida");

if(btnEmpezarPartida && btnEmpezarPartida instanceof HTMLButtonElement) {
    btnEmpezarPartida.addEventListener("click", () => {
        window.location.reload();
      });
};

export const iniciarPartidaVisible = () => {
    iniciaPartida (tablero);
    crearTablero(tablero);
    mostrarIntentos(tablero);
};

let numeroCarta = 0;
let numeroImagen = 0;
export const crearDiv = (nombreClase : string): HTMLDivElement => {
    const div = document.createElement("div");
    div.classList.add(nombreClase);
    div.id = nombreClase + numeroCarta++;

    return div;
};

export const crearImagen = (nombreClase : string): HTMLImageElement => {
    const img = document.createElement("img");
    img.classList.add(nombreClase);
    img.id = nombreClase + numeroImagen++;
    img.src = "";
    
    return img;
};

export const crearTablero = (tablero: Tablero ) : void => {

    //Obtener div principal
    const contenedorCartas = document.getElementById("contenedor-cartas");

    if(contenedorCartas && contenedorCartas instanceof HTMLDivElement){
        tablero.cartas.forEach((carta) => {
            let indice = carta.idFoto;
            let indiceDiv = tablero.cartas.indexOf(carta);

            //Crear div carta
            const divCarta = crearDiv("carta");
            divCarta.setAttribute("indice", indice.toString());
            contenedorCartas.appendChild(divCarta);

            //Crear img carta
            const imgCarta = crearImagen("img")
            imgCarta.setAttribute("indice", indice.toString());
            divCarta.appendChild(imgCarta);

            divCarta.addEventListener("click", () => handleClickCarta(indiceDiv));
        });
    };
};


export const handleClickCarta = (indice: number): void => {
    const imagen = document.getElementById(`img${indice}`);

    if(tablero.cartas[indice].estaVuelta) {
        window.alert('Esta carta ya está volteada, elige otra');
    };

    if (imagen && imagen instanceof HTMLImageElement) {
        if (sePuedeVoltearLaCarta(tablero, indice)) {
            voltearLaCarta(tablero, indice);
            imagen.src = tablero.cartas[indice].imagen;
            const indiceA = tablero.indiceCartaVolteadaA;
            const indiceB = tablero.indiceCartaVolteadaB;

                if (indiceA !== undefined && indiceB !== undefined) {
                    if (sonPareja(indiceA, indiceB, tablero)) {
                        parejaEncontrada(tablero, indiceA, indiceB)
                        mostrarIntentos(tablero);
                    } else {
                        parejaNoEncontrada(tablero, indiceA, indiceB);
                        darleLaVueltaALasCartas(tablero);
                        mostrarIntentos(tablero);
                    }
                }
            }
        }
    };

const darleLaVueltaALasCartas = (tablero: Tablero) => {
    setTimeout(() => {
        // Ocultar las imágenes
        const cartaA = document.getElementById(`img${tablero.indiceCartaVolteadaA}`) as HTMLImageElement;
        const cartaB = document.getElementById(`img${tablero.indiceCartaVolteadaB}`) as HTMLImageElement;
        cartaA.src = "";  // Ocultar carta A
        cartaB.src = "";  // Ocultar carta B
        tablero.indiceCartaVolteadaA = undefined;
        tablero.indiceCartaVolteadaB = undefined;
    }, 500);
};

const mostrarIntentos = (tablero: Tablero) => {
    const contador = document.getElementById(
      "numero-intentos"
    ) as HTMLParagraphElement;
  
    if (contador && contador instanceof HTMLParagraphElement) {
      contador.innerHTML = `Número de intentos: ${tablero.intentos}`;
    }
  };
