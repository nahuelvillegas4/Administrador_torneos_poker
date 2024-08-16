import { Op } from "sequelize";
import sequelize from "../data/db.js";
import Jugadores from "../models/jugadores.js";
import Mesas from "../models/mesas.js";

export async function obtenerJugadores(){

    const jugadores = await Jugadores.findAll({
        /*include: [
            {
                model: Mesas,
                as: "mesa",
                required: false
            }
        ],*/
        order: [["idJugador"]],
    }
    );

    return jugadores;
}

export async function obtenerJugadoresPorId(idJugador){
    const jugador = await Jugadores.findByPk(idJugador);
    return jugador;
}

export async function obtenerJugadoresPorFiltro(query) {
    console.log(query);
    const { nom, id} = query;
  
    const where = {};
    if (nom) {
      where.nombreJugador = { [Op.like]: `%${nom}%` };
    }
  
    if (id) {
      where.idJugador = id;
    }
  
    const jugadores = await Jugadores.findAll({
      where,
      order: sequelize.col("nombreJugador"),
    });
  
    return jugadores;
  }

export async function crearJugador(data){
    return await Jugadores.create(data);
}

export async function actualizarJugador(id, data) {
    return Jugadores.update(data, { where: { idJugador: id } });
}

export async function borrarJugador(id) {
    return Jugadores.destroy({ where: { idJugador: id } });
}
