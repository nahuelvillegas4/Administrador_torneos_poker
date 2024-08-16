import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";
import Torneos from "./torneos.js";
import Mesas from "./mesas.js";
import Jugadores from "./jugadores.js";

const Inscripcion = sequelize.define("Inscripcion", {
    idTorneo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "idTorneo"
    },
    idJugador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "idJugador"
    },
    idMesa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "idMesa"
    },
    fechaCreacionInscripcion: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        field: "fechaCreacionInscripcion",
    },
    fechaActualizacionInscripcion: {
        type: DataTypes.DATE,
        field: "fechaActualizacionInscripcion"
    }
}, {
    timestamps: false,
    tableName: "Inscripcion"
})

Inscripcion.belongsTo(Torneos, {foreignKey: "idTorneo", as: "torneo"})
Inscripcion.belongsTo(Mesas, {foreignKey: "idMesa", as: "mesa"})
Inscripcion.belongsTo(Jugadores, {foreignKey: "idJugador", as: "jugador"})

export default Inscripcion