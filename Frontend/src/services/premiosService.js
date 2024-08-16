import axios from "axios";
import { baseUrl } from "./baseService";


const getPremios = async () => {
    const response = await axios.get(`${baseUrl}/premios`);
    return response.data;
};

const postPremio = async (nuevoPremio) => {
    try {
        const response = await axios.post(`${baseUrl}/premios`, nuevoPremio);
        return response.data;
    } catch (error) {
        console.error("Error al crear el premio: ", error);
        throw error;
    }
};

const getPremiosFiltrados = async (filtro) => {
    // Lógica para filtrar premios con filtro
    const response = await axios.get(`${baseUrl}/premios`, { params: filtro });
    return response.data.map(premio => ({
        ...premio,
        torneo: {
            idTorneo: premio.idTorneo,  // Asegúrate de tener el id del torneo
            nombreTorneo: premio.torneo ? premio.torneo.nombreTorneo : 'Sin Torneo' // Incluir el nombre del torneo si está definido
        }
    }));
};

const borrarPremio = async (numeroPosicion, idTorneo) => {
    const response = await axios.delete(`${baseUrl}/premios/${numeroPosicion}/${idTorneo}`);
    return response.data;
};

const putPremio = async (numeroPosicion, idTorneo, premio) => {
    await axios.put(`${baseUrl}/premios/${numeroPosicion}/${idTorneo}`, premio);
};

const getPremioById = async (numeroPosicion, idTorneo) => {
    const response = await axios.get(`${baseUrl}/premios/${numeroPosicion}/${idTorneo}`);
    return response.data;
};

const verificarPosicionEnUso = async (numeroPosicion, idTorneo) => {
    try {
        const response = await axios.get(`${baseUrl}/premios/verificar-posicion`, {
            params: {
                numeroPosicion,
                idTorneo
            }
        });

        return response.data.enUso;
    } catch (error) {
        console.error("Error al verificar la posición del premio:", error);
        throw new Error("Error al verificar la posición del premio");
    }
};

  export default { getPremios, postPremio, getPremiosFiltrados, borrarPremio, putPremio, getPremioById, verificarPosicionEnUso };
