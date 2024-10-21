import { tablero, Tablero } from "./modelo";
import { cambiarEstadoPartida, iniciaPartida, parejaEncontrada, parejaNoEncontrada, sePuedeVoltearLaCarta, sonPareja, voltearLaCarta, } from "./motor";


const btnEmpezarPartida = document.getElementById("iniciar-partida");

if(btnEmpezarPartida && btnEmpezarPartida instanceof HTMLButtonElement) {
    btnEmpezarPartida.addEventListener("click", () => {
        window.location.reload();
      });
};

export const iniciarPartidaVisible = () => {
    iniciaPartida (tablero);
    crearTablero(tablero);
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
  
    if (imagen && imagen instanceof HTMLImageElement) {
        if (sePuedeVoltearLaCarta(tablero, indice)) {
            voltearLaCarta(tablero, indice);
            imagen.src = tablero.cartas[indice].imagen;

            if (tablero.estadoPartida === "CeroCartasLevantadas") {
                tablero.indiceCartaVolteadaA = indice;
                cambiarEstadoPartida(tablero);
            } else if (tablero.estadoPartida === "UnaCartaLevantada") {
                tablero.indiceCartaVolteadaB = indice;
                cambiarEstadoPartida(tablero);

                if (
                    tablero.indiceCartaVolteadaA !== undefined &&
                    tablero.indiceCartaVolteadaB !== undefined
                ) {
                    if (
                        sonPareja(tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB, tablero)
                    ) {
                        parejaEncontrada(tablero, tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB);
                        // Reiniciar índices a undefined
                        tablero.indiceCartaVolteadaA = undefined;
                        tablero.indiceCartaVolteadaB = undefined;
                    } else {
                        // Si no son pareja, ejecutar setTimeout
                        setTimeout(() => {
                            if (tablero.indiceCartaVolteadaA !== undefined && tablero.indiceCartaVolteadaB !== undefined) {
                                parejaNoEncontrada(tablero, tablero.indiceCartaVolteadaA, tablero.indiceCartaVolteadaB);
                                // Ocultar las imágenes
                                const cartaA = document.getElementById(`img${tablero.indiceCartaVolteadaA}`) as HTMLImageElement;
                                const cartaB = document.getElementById(`img${tablero.indiceCartaVolteadaB}`) as HTMLImageElement;
                                cartaA.src = "";  // Ocultar carta A
                                cartaB.src = "";  // Ocultar carta B

                                // Reiniciar índices a undefined
                                tablero.indiceCartaVolteadaA = undefined;
                                tablero.indiceCartaVolteadaB = undefined;
                                cambiarEstadoPartida(tablero);
                            }
                        }, 1000); // Esperar 1 segundo antes de voltear cartas de nuevo
                    }
                }
            }
        }
    }
};
