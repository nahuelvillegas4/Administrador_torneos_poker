import { Op } from "sequelize";
import sequelize from "../data/db.js";
import Premios from "../models/premios.js"
import Torneos from "../models/torneos.js";


export async function obtenerPremios(){

    const premios = await Premios.findAll({
        include:[
            {
                model: Torneos,
                as: 'torneo',
                required: false
            }
        ]
    })
    return premios

}

export async function obtenerPremiosPorFiltro(query) {
    const { numeroPosicion, idTorneo, divisa } = query;

    const where = {};
    if (numeroPosicion) {
        where.numeroPosicion = numeroPosicion;
    }

    if (idTorneo) {
        where.idTorneo = idTorneo;
    }

    if (divisa) {
        where.divisa = { [Op.like]: `%${divisa}%` };
    }

    const premios = await Premios.findAll({
        where,
        order: sequelize.col("numeroPosicion")
    });

    return premios;
}


export async function obtenerPremiosPorId(numeroPosicion, idTorneo){
    const premio = await Premios.findOne({ //debido a que tiene dos claves primarias
        where: {
            idTorneo: idTorneo,
            numeroPosicion: numeroPosicion
        }
    });
    return premio;
}

export async function crearPremio(data) {
    const { numeroPosicion, idTorneo } = data;

    // Obtener todos los premios existentes para el torneo ordenados por número de posición
    const premiosExistentes = await Premios.findAll({
        where: {
            idTorneo,
        },
        order: [['numeroPosicion', 'ASC']]
    });

    // Encontrar si ya existe un premio en una posición superior
    const posicionSuperior = premiosExistentes.find(premio => premio.numeroPosicion > numeroPosicion);
    if (posicionSuperior) {
        throw new Error(`No se puede crear el premio en la posición ${numeroPosicion} porque ya existe un premio en una posición superior.`);
    }

    // Crear el nuevo premio
    return Premios.create(data);
}


export async function actualizarPremio(numeroPosicion, idTorneo, data) {
    return Premios.update(data, {
        
        where: {
            numeroPosicion,
            idTorneo
        }
    });
}

export async function eliminarPremio(numeroPosicion, idTorneo) {
    return Premios.destroy({
        where: {
            numeroPosicion,
            idTorneo
        }
    });
}

export async function verificarPosicionEnUso(numeroPosicion, idTorneo) {
    try {
        const premio = await Premios.findOne({
            where: {
                numeroPosicion,
                idTorneo
            }
        });

        return premio ? true : false;
    } catch (error) {
        console.error("Error al verificar la posición del premio:", error);
        throw new Error("Error al verificar la posición del premio");
    }
}