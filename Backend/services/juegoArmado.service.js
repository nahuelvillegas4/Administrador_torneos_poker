import { Op } from "sequelize";
import sequelize from "../data/db.js";
import JuegoArmado from "../models/juegoArmado.js";


export async function obtenerJuegoArmado(){

    const juego = await JuegoArmado.findAll({
        order: [["idJuegoArmado"]],
    }
    );

    return juego;
}

export async function obtenerJuegoArmadoPorFiltro(query){
    const {desc} = query;
    
    const where = {}

    if (desc) {
        where.descripcion = { [Op.like]: `%${desc}%`}
    }

    const juegos = await JuegoArmado.findAll(
        {
            where,
            order: sequelize.col("idJuegoArmado")
        }
    )

    return juegos
}


export async function obtenerJuegoPorId(idJuegoArmado){
    const juegoArmado = await JuegoArmado.findByPk(idJuegoArmado);
    return juegoArmado;
};


export async function crearJuego(data){
    return await JuegoArmado.create(data);
};


export async function borrarJuego(id) {
    return JuegoArmado.destroy({ where: { idJuegoArmado: id } });

};


export async function actualizarJuego(id, data) {
    return JuegoArmado.update(data, { where: { idJuegoArmado: id } });
}