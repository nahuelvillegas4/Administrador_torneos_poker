import axios from "axios";
import { baseUrl } from "./baseService";

// ESTE ES EL SERVICIO DE TORNEOS

// Obtener torneos
const getTorneos = async () => {
  const response = await axios.get(`${baseUrl}/torneos`, {
    params: {
      enJuego: 1
    }
  });
  return response.data;
};



  // filtrar torneos
  const getTorneosFiltrados = async (filtro) => {
    const params = {};
    console.log(filtro)
  
    if (filtro.nombreTorneo) {
      params.nom = filtro.nombreTorneo;
    }

    if (filtro.locacionTorneo){
      params.locacion = filtro.locacionTorneo
    }
  
    
    if (filtro.enJuego) {
      params.enjuego = 1;
      console.log('entro')
    }
  
    const response = await axios.get(`${baseUrl}/torneos`, { params });
    return response.data;
  };




  const postTorneo = async (nuevoTorneo) => {
    try {
      const response = await axios.post(`${baseUrl}/torneos`, nuevoTorneo);
      return response.data;
    } catch (error) {
      console.error("Error al crear El torneo:", error);
      throw error;
    }
  };

  const borrarTorneo = async (idTorneo) => {
    const response = await axios.delete(`${baseUrl}/torneos/${idTorneo}`,)
    // no retorna nada porque no me interesa el torneo borrado
  
  }

  const getTorneosById = async (idTorneo) => {
    const response = await axios.get(`${baseUrl}/torneos/${idTorneo}`)
    return response.data
  }


  const putTorneo = async (torneo) => {
    await axios.put(`${baseUrl}/torneos/${torneo.idTorneo}`, torneo, {
      headers: {
        "Content-Type": "application/json"//,
        //"Authorization": `Bearer ${token}`          ESO SERIA PARA EL TOKEN si usamos el iniciar sesion
      }
    })
    
  }


  const patchTorneo = async (torneo) => {
    await axios.patch(`${baseUrl}/torneos/${torneo.idTorneo}`, torneo, {
      headers: {
        "Content-Type": "application/json"//,
        //"Authorization": `Bearer ${token}`          ESO SERIA PARA EL TOKEN si usamos el iniciar sesion
      }
    })
    
  }

export default { getTorneos, getTorneosFiltrados, postTorneo, borrarTorneo, getTorneosById, putTorneo }