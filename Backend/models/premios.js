import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";
import Torneos from "./torneos.js";

const Premios = sequelize.define("Premios", {
    numeroPosicion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "numeroPosicion",
    },
    idTorneo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "idTorneo",
    },
    premio: {
        type: DataTypes.INTEGER,
        field: "premio",
    },
    divisa: {
        type: DataTypes.TEXT,
        field: "divisa",
    },
    fechaCreacionPremio: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        field: "fechaCreacionPremio",
    },
    fechaActualizacionPremio: {
        type: DataTypes.DATE,
        field: "fechaActualizacionPremio",
    },
}, {
    timestamps: false,
    tableName: "Premios",
});

Premios.belongsTo(Torneos, { foreignKey: "idTorneo", as: "torneo" });

export default Premios;