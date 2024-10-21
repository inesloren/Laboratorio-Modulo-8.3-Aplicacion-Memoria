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
  
        // Mostrar imagen
        imagen.src = tablero.cartas[indice].imagen;
  
        // Cambiar estado
        if (tablero.estadoPartida === "CeroCartasLevantadas") {
          // Volteamos la primera carta
          tablero.indiceCartaVolteadaA = indice;
          cambiarEstadoPartida(tablero);
        } else if (tablero.estadoPartida === "UnaCartaLevantada") {
          // Volteamos la segunda carta
          tablero.indiceCartaVolteadaB = indice;
          cambiarEstadoPartida(tablero);
  
          // Comprobar si son pareja
          if (
            tablero.indiceCartaVolteadaA !== undefined &&
            tablero.indiceCartaVolteadaB !== undefined
          ) {
            if (
              sonPareja(
                tablero.indiceCartaVolteadaA,
                tablero.indiceCartaVolteadaB,
                tablero
              )
            ) {
              // Si son pareja, las marcamos como encontradas
              parejaEncontrada(
                tablero,
                tablero.indiceCartaVolteadaA,
                tablero.indiceCartaVolteadaB
              );
  
              // Reiniciar índices para permitir seguir jugando
              tablero.indiceCartaVolteadaA = undefined;
              tablero.indiceCartaVolteadaB = undefined;
              cambiarEstadoPartida(tablero);
            } else {
              // Si no son pareja, las volteamos de nuevo después de 1 segundo
              setTimeout(() => {
                if (tablero.indiceCartaVolteadaA !== undefined &&
                    tablero.indiceCartaVolteadaB !== undefined){
                parejaNoEncontrada(
                  tablero,
                  tablero.indiceCartaVolteadaA,
                  tablero.indiceCartaVolteadaB
                );
  
                // Ocultar las imágenes (poner imagen vacía o reverso)
                const cartaA = document.getElementById(
                  `img${tablero.indiceCartaVolteadaA}`
                ) as HTMLImageElement;
                const cartaB = document.getElementById(
                  `img${tablero.indiceCartaVolteadaB}`
                ) as HTMLImageElement;
  
                // Aseguramos que las cartas vuelven a estar boca abajo (sin imagen)
                cartaA.src = "";  // Ocultar la imagen de la carta A
                cartaB.src = "";  // Ocultar la imagen de la carta B
  
                // Reiniciar los índices después de no encontrar pareja
                tablero.indiceCartaVolteadaA = undefined;
                tablero.indiceCartaVolteadaB = undefined;
                cambiarEstadoPartida(tablero);
                }
              }, 1000);
            }
          }
        }
      }
    }
  };  