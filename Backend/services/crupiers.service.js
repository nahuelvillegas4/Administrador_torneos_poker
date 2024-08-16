import { Op } from "sequelize";
import sequelize from "../data/db.js";
import Crupiers from "../models/crupiers.js";

export async function obtenerCrupier(){

    const crupiers = await Crupiers.findAll({
        order: [["idCrupier"]],
    }
    );

    return crupiers;
}

export async function obtenerCrupiersPorFiltro(query){
    const {nom} = query;
    
    const where = {}

    if (nom) {
        where.nombre = { [Op.like]: `%${nom}%`}
    }

    const crupiers = await Crupiers.findAll(
        {
            where,
            order: sequelize.col("idCrupier")
        }
    )

    return crupiers
}

export async function obtenerCrupierPorId(idCrupier){
    const crupier = await Crupiers.findByPk(idCrupier);
    return crupier;
}

export async function crearCrupier(data){
    return await Crupiers.create(data);
}

export async function actualizarCrupier(id, data) {
    return Crupiers.update(data, { where: { idCrupier: id } });
}


export async function borrarCrupier(id) {
    return Crupiers.destroy({ where: { idCrupier: id } });
}
