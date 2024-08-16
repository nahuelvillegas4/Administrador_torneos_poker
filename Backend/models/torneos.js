import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Torneos = sequelize.define("Torneos", {
    idTorneo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idTorneo",
    },
    nombreTorneo: {
        type: DataTypes.TEXT,
        field: "nombreTorneo",
    },
    fechaInicioTorneo: {
        type: DataTypes.DATE,
        field: "fechaInicioTorneo",
    },
    fechaFinTorneo: {
        type: DataTypes.DATE,
        field: "fechaFinTorneo",
    },
    locacionTorneo: {
        type: DataTypes.TEXT,
        field: "locacionTorneo",
    },
    fondoDePremiosTorneo: {
        type: DataTypes.INTEGER,
        field: "fondoDePremiosTorneo",
    },
    fechaCreacionTorneo: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        field: "fechaCreacionTorneo",
    },
    fechaActualizacionTorneo: {
        type: DataTypes.DATE,
        field: "fechaActualizacionTorneo",
    },
    enJuego: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        field: "enJuego",
    },
}, {
    timestamps: false,
    tableName: "Torneos",
});

export default Torneos