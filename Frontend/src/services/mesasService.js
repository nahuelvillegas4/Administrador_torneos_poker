import axios from "axios";
import { baseUrl } from "./baseService";

const getMesas = async () => {
    const response = await axios.get(`${baseUrl}/mesas`)
    return response.data
}

const postMesa = async (nuevaMesa) => {
    try {
        const response = await axios.post(`${baseUrl}/mesas`, nuevaMesa)
        return response.data
    } catch (error) {
        console.error("Error al crear la mesa: ", error)
        throw error
    }
}

const getMesasFiltradas = async (filtro) => {
    const params = {}

    if (filtro.idTorneo && filtro.idTorneo !== "0") {
        params.idTorneo = filtro.idTorneo
    }

    if (filtro.idCrupierMesa && filtro.idCrupierMesa !== "0") {
        params.idCrupierMesa = filtro.idCrupierMesa
    }

    if (filtro.nombreMesa){
        params.nombreMesa = filtro.nombreMesa
    }

    const response = await axios.get(`${baseUrl}/mesas`, {params})
    return response.data
}

const borrarMesa = async (idMesa) => {
    const response = await axios.delete(`${baseUrl}/mesas/${idMesa}`)
}

const putMesa = async (mesa) => {
    await axios.put(`${baseUrl}/mesas/${mesa.idMesa}`, mesa)
}

const getMesaById = async (idMesa) => {
    const response = await axios.get(`${baseUrl}/mesas/${idMesa}`)
    return response.data
}

export default {getMesas, postMesa, getMesasFiltradas, borrarMesa, putMesa, getMesaById}