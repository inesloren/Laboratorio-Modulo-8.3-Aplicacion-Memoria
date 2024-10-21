import {Carta, Tablero, cartas} from "./modelo";

//Barajar cartas
export const barajarCartas = (cartas : Carta[]): Carta[] => {
    for (let i = cartas.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;
};

//¿Se puede voltear la carta?
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    if(!tablero.cartas[indice].encontrada && !tablero.cartas[indice].estaVuelta && tablero.estadoPartida !== "DosCartasLevantadas"){
        return true;
    }
    return false;
};

//Voltear carta
export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
    const cartaTablero = tablero.cartas[indice];
    const cartaArray = cartas.find(
      (carta) => carta.idFoto === cartaTablero.idFoto
    );
  
    if (cartaArray) {
      cartaTablero.imagen = cartaArray.imagen;
      cartaTablero.estaVuelta = true;
    }
  };

//¿Son pareja?
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    if(tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto){
        return true;
    }
    return false;
};

export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    tablero.cartas[indiceA].encontrada = true;
    tablero.cartas[indiceB].encontrada = true;
    tablero.estadoPartida = "CeroCartasLevantadas";
  };

  export const parejaNoEncontrada = (
    tablero: Tablero,
    indiceA: number,
    indiceB: number
  ): void => {
    tablero.cartas[indiceA].encontrada = false;
    tablero.cartas[indiceA].estaVuelta = false;
  
    tablero.cartas[indiceB].encontrada = false;
    tablero.cartas[indiceB].estaVuelta = false;
    tablero.estadoPartida = "CeroCartasLevantadas";
  };

export const esPartidaCompleta = (tablero: Tablero): boolean => {
    return tablero.cartas.every(carta => carta.encontrada);
  };

export const iniciaPartida = (tablero: Tablero): void => {
    tablero.cartas = barajarCartas([...tablero.cartas]);
    
    tablero.cartas.forEach(carta => {
      carta.estaVuelta = false;   
      carta.encontrada = false; 
    });
    tablero.estadoPartida = "CeroCartasLevantadas";
};

export function cambiarEstadoPartida(tablero: Tablero) {
    let cartasVueltas = 0;
  
    tablero.cartas.forEach((carta) => {
      if (carta.estaVuelta) {
        cartasVueltas++;
      }
    });
  
    switch (cartasVueltas) {
      case 0:
        tablero.estadoPartida = "CeroCartasLevantadas";
        break;
      case 1:
        tablero.estadoPartida = "UnaCartaLevantada";
        break;
      case 2:
        tablero.estadoPartida = "DosCartasLevantadas";
        break;
    }
  
    if (esPartidaCompleta(tablero)) {
      tablero.estadoPartida = "PartidaCompleta";
    }
  }

