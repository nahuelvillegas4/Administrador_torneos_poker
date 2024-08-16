import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";
import Mesas from "./mesas.js";

const Jugadores = sequelize.define("Jugadores", {
    idJugador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idjugador",
    },
    nombreJugador: {
        type: DataTypes.TEXT,
        field: "nombreJugador",
        notNull: true,
    },
    edadJugador: {
        type: DataTypes.DATE,
        field: "edadJugador",
        notNull: true,
    },
    emailJugador:{
        type:DataTypes.TEXT,
        field:"emailJugador"
    },
    fechaCreacionJugador: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        field: "fechaCreacionJugador",
    },
    fechaActualizacionJugador: {
        type: DataTypes.DATE,
        field: "fechaActualizacionJugador",

    }
}, {
    primaryKey: ["idJugador"],
    timestamps: false,
    tableName: "Jugadores",
});

export default Jugadores