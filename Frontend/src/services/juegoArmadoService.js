import axios from "axios";
import { baseUrl } from "./baseService";

const getJuegoArmado = async () => {
    const response = await axios.get(`${baseUrl}/juegoarmado`)
    return response.data
};

const getJuegoArmadoFiltrados = async (filtro) => {
    const params = {};
  
    if (filtro.descripcion) {
      params.desc = filtro.descripcion;
    }
  
    const response = await axios.get(`${baseUrl}/juegoarmado`, { params });
    
    return response.data;
  };

  const getJuegoArmadoById = async (idJuegoArmado) => {
    const response = await axios.get(`${baseUrl}/juegoarmado/${idJuegoArmado}`)
    return response.data
}

export default {getJuegoArmado, getJuegoArmadoFiltrados, getJuegoArmadoById}