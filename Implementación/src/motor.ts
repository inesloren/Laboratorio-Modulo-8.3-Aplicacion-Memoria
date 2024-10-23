import { Carta, Tablero } from "./modelo";

export const aumentarIntentos = (tablero: Tablero) => {  
    tablero.intentos++;
    console.log("intentos");

};

//Barajar cartas
export const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas;
};

//¿Se puede voltear la carta?
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
 return !tablero.cartas[indice].encontrada && !tablero.cartas[indice].estaVuelta && tablero.estadoPartida !== "DosCartasLevantadas";
};

//Voltear carta
export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice].estaVuelta = true;
  aumentarIntentos(tablero);

  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = 'UnaCartaLevantada'
  } else if (tablero.estadoPartida === 'UnaCartaLevantada') {
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = 'DosCartasLevantadas'
  }
};

//¿Son pareja?
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number): void => {
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


