import { Op } from "sequelize";
import sequelize from "../data/db.js";
import Torneos from "../models/torneos.js";



export async function obtenerTorneosPorFiltro(query) {
    const { nom, locacion, enjuego } = query;

    const where = {};
    if (nom) {
        where.nombreTorneo = { [Op.like]: `%${nom}%` };
    }

    if (locacion) {
        where.locacionTorneo = { [Op.like]: `%${locacion}%` };
    }

    if (enjuego) {
        where.enJuego = 1;
        console.log('entro')
    }

    const torneos = await Torneos.findAll(
        {
        where,
        order: sequelize.col("nombreTorneo") }
    );


    return torneos;
}



export async function obtenerTorneos(){

    const torneos = await Torneos.findAll({
        
        order: [["fechaInicioTorneo", "ASC"]],
    }
    );

    return torneos;
}

export async function obtenerTorneoPorId(idTorneo){
    const torneo = await Torneos.findByPk(idTorneo);
    return torneo;
}


export async function crearTorneo(data) {
    const torneoEntity = { ...data, enJuego: false };
    return Torneos.create(torneoEntity)
}


export async function desactivarTorneo(id) {
    const torneo = await Torneos.findByPk(id);

    if (torneo.enJuego === 0) {
        torneo.enJuego = 1;
        torneo.save();
    } else {
        torneo.enJuego = 0;
        torneo.save();
    }
    
    return torneo;
}

export async function activarTorneo(id) {
    const torneo = await Torneos.findByPk(id);

    torneo.enJuego = 1;
    torneo.save();
    return torneo;
}

export async function actualizarTorneo(id, data) {
    return Torneos.update(data, { where: { idTorneo: id } });
}
