import axios from "axios";
import { baseUrl } from "./baseService"; // Asegúrate de tener este archivo configurado con el baseUrl

const getInscripciones = async () => {
    const response = await axios.get(`${baseUrl}/inscripciones`);
    return response.data;
};

const getInscripcionById = async (idInscripcion) => {
    try {
        const response = await axios.get(`${baseUrl}/inscripciones/${idInscripcion}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la inscripción con ID ${idInscripcion}: `, error);
        throw error;
    }
};

const getInscripcionByKeys = async (idTorneo, idJugador, idMesa) => {
    try {
        const response = await axios.get(`${baseUrl}/inscripciones/${idTorneo}/${idJugador}/${idMesa}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la inscripción con torneo ${idTorneo}, jugador ${idJugador}, mesa ${idMesa}: `, error);
        throw error;
    }
};

const postInscripcion = async (nuevaInscripcion) => {
    try {
        const response = await axios.post(`${baseUrl}/inscripciones`, nuevaInscripcion);
        return response.data;
    } catch (error) {
        console.error("Error al crear la inscripción: ", error);
        throw error;
    }
};

const deleteInscripcion = async (idTorneo, idJugador, idMesa) => {
    try {
        await axios.delete(`${baseUrl}/inscripciones/${idTorneo}/${idJugador}/${idMesa}`);
    } catch (error) {
        console.error("Error al eliminar la inscripción: ", error);
        throw error;
    }
};

const getInscripcionesFiltradas = async (filtro) => {
    const params = {}

    if (filtro.idTorneo && filtro.idTorneo !== '0'){
        params.idTorneo = filtro.idTorneo
    }

    if (filtro.idMesa && filtro.idMesa !== '0'){
        params.idMesa = filtro.idMesa
    }


    const response = await axios.get(`${baseUrl}/inscripciones`, {params})
    return response.data
}

export default { getInscripciones, getInscripcionById, getInscripcionByKeys, postInscripcion, deleteInscripcion, getInscripcionesFiltradas };
