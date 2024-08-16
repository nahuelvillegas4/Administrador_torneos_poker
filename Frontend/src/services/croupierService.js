import axios from "axios";
import { baseUrl } from "./baseService";

// SERVICE DE CROUPIERS

//obtener crupiers

const getCrupiers = async () => {
    const response = await axios.get(`${baseUrl}/crupiers`)
    return response.data
};

  // filtrar torneos
  const getCrupiersFiltrados = async (filtro) => {
    const params = {};
  
    if (filtro.nombre) {
      params.nom = filtro.nombre;
    }
  
    const response = await axios.get(`${baseUrl}/crupiers`, { params });
    
    return response.data;
  };



//cargar crupier

const postCrupier = async (nuevoCrupier) => {
    try {
        const response = await axios.post(`${baseUrl}/crupiers`, nuevoCrupier)
        return response.data
    } catch (error) {
        console.error("Error al crear el crupier: ", error)
        throw error
    }
}

//borrar crupier

const borrarCrupier = async (idCrupier) => {
    const response = await axios.delete(`${baseUrl}/crupiers/${idCrupier}`,)
  }

const getCrupierById = async (idCrupier) => {
    const response = await axios.get(`${baseUrl}/crupiers/${idCrupier}`)
    return response.data
}

const putCrupier = async (crupier) => {
    await axios.put(`${baseUrl}/crupiers/${crupier.idCrupier}`, crupier)
}

export default {getCrupiers, getCrupiersFiltrados,postCrupier, borrarCrupier, getCrupierById, putCrupier}