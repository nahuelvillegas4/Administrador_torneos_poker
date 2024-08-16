import axios from "axios";
import { baseUrl } from "./baseService";

const getJugadores = async () => {
    const response = await axios.get(`${baseUrl}/jugadores`)
    return response.data
}

const postJugadores = async (nuevoJugador) => {
    try {
        const response = await axios.post(`${baseUrl}/jugadores`, nuevoJugador)
        return response.data
    } catch (error) {
        console.error("Error al crear el jugador: ", error)
        throw error
    }
}

const getJugadoresFiltrados = async (filtro) => {
    const params = {};
  
    if (filtro.nombreJugador) {
      params.nom = filtro.nombreJugador;
    }

    if (filtro.idMesa && filtro.idMesa !== "0"){
      params.mesa = filtro.idMesa
    }
  
    if (filtro.idJugador) {
      params.id = filtro.idJugador
    }

    if (filtro.idMesa) {
        params.sinMesa = filtro.idMesa;
      }
  
    const response = await axios.get(`${baseUrl}/jugadores`, { params });
    return response.data;
  };

const borrarJugador = async (idJugador) => {
    const response = await axios.delete(`${baseUrl}/jugadores/${idJugador}`)
}

const putJugador = async (jugador) => {
    await axios.put(`${baseUrl}/jugadores/${jugador.idJugador}`, jugador)
}

const getJugadorById = async (idJugador) => {
    const response = await axios.get(`${baseUrl}/jugadores/${idJugador}`)
    return response.data
}


export default { getJugadores, postJugadores, getJugadoresFiltrados, borrarJugador, putJugador, getJugadorById }
