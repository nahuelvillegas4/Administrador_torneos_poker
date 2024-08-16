import { Op } from "sequelize";
import sequelize from "../data/db.js";
import Mesas from "../models/mesas.js";
import { query } from "express";
import Torneos from "../models/torneos.js";
import Crupiers from "../models/crupiers.js";

export async function obtenerMesas(){

    const mesas = await Mesas.findAll({
        include: [
            {
                model: Torneos,
                as: "torneo",
                required: false
            },
            {
                model: Crupiers,
                as: "crupier",
                required: false
            },
        ],
        attributes: [
            'idMesa',
            'fechaCreacionMesa',
            'fechaActualizacionMesa',
            'nombreMesa',
            [
              sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM Inscripcion as ins
                    WHERE ins.idMesa = Mesas.idMesa
                    GROUP BY ins.idMesa
              )`),
              'cantidadJugadores',
            ],
          ],
        order: [["idMesa"]],
    }
    );

    return mesas;
}

export async function obtenerMesasPorFiltro(query){
    const {idTorneo, idCrupierMesa, nombreMesa} = query

    const where = {}

    if (idTorneo) {
        where.idTorneo = idTorneo
    }

    if (idCrupierMesa) {
        where.idCrupierMesa = idCrupierMesa
    }

    if (nombreMesa) {
        where.nombreMesa = {[Op.like]: `%${nombreMesa}%`}
    }


    const mesas = await Mesas.findAll(
        {
            include: [
                {
                    model: Torneos,
                    as: "torneo",
                    required: false,
                },
                {
                    model: Crupiers,
                    as: "crupier",
                    required: false,
                },
            ],
            attributes: [
                'idMesa',
                'fechaCreacionMesa',
                'fechaActualizacionMesa',
                'nombreMesa',
                [
                  sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM Inscripcion as ins
                    WHERE ins.idMesa = Mesas.idMesa
                    GROUP BY ins.idMesa
                  )`),
                  'cantidadJugadores',
                ],
              ],
            where,
            order:  sequelize.col("idMesa")
        }
    )
    return mesas
}

export async function obtenerMesaPorId(idMesa){
    const mesa = await Mesas.findByPk(idMesa);
    return mesa;
}

export async function crearMesa(data){
    return Mesas.create(data);
}


export async function actualizarMesa(id, data) {
    return Mesas.update(data, { where: { idMesa: id } });
}


export async function borrarMesa(id) {
    return Mesas.destroy({ where: { idMesa: id } });
}