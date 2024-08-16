import { Op } from "sequelize";
import sequelize from "../data/db.js";
import Inscripcion from "../models/inscripcion.js";
import Torneos from "../models/torneos.js";
import Mesas from "../models/mesas.js";
import Jugadores from "../models/jugadores.js";

export async function obtenerInscripcion(){

    const inscripciones = await Inscripcion.findAll({
        include: [
            { model: Torneos, as: "torneo" },
            { model: Mesas, as: "mesa" },
            { model: Jugadores, as: "jugador" }
        ]
    })
    return inscripciones

}

export async function obtenerInscripcionesPorFiltro(query){
    const {idTorneo, nomJugador, idMesa} = query

    const where = {}

    if(idTorneo){
        where.idTorneo = query.idTorneo
    }

    if(idMesa){
        where.idMesa = idMesa
    }

    const inscripciones = await Inscripcion.findAll(
        {
            include: [
                { model: Torneos, as: "torneo" },
                { model: Mesas, as: "mesa" },
                { model: Jugadores, as: "jugador" }
            ],
            where,
        }
    )
    return inscripciones
}

export async function obtenerInscripcionPorId(idTorneo, idJugador, idMesa){
    try {
        const inscripcion = await Inscripcion.findOne({
            where: {
                idTorneo: idTorneo,
                idJugador: idJugador,
                idMesa: idMesa
            },
            include: [
                { model: Torneos, as: "torneo" },
                { model: Mesas, as: "mesa" },
                { model: Jugadores, as: "jugador" }
            ]
        });
        
        return inscripcion;
    } catch (error) {
        console.error("Error al obtener la inscripción:", error);
        throw error;
    }
}

export async function crearInscripcion(data){
    return await Inscripcion.create(data)
}

export async function actualizarInscripcion(idTorneo, idJugador, idMesa, data){
    return Inscripcion.update(data, {where: {idTorneo: idTorneo, idJugador: idJugador, idMesa: idMesa}})
}

export async function borrarInscripcion(idTorneo, idJugador, idMesa){
    return Inscripcion.destroy({where: {idTorneo: idTorneo, idJugador: idJugador, idMesa: idMesa}})
}