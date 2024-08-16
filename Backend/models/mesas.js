import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";
import Torneos from "./torneos.js";
import Crupiers from "./crupiers.js";

const Mesas = sequelize.define("Mesas", {
    idMesa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true,
        field: "idMesa",
    },
    idTorneo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "idTorneo",
    },
    fechaCreacionMesa: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        field: "fechaCreacionMesa",
    },
    fechaActualizacionMesa: {
        type: DataTypes.DATE,
        field: "fechaActualizacionMesa",
    },
    idCrupierMesa: {
        type: DataTypes.INTEGER,
        notNull: true,
        field: "idCrupierMesa",
    },
    nombreMesa: {
        type: DataTypes.TEXT,
        field: "nombreMesa",
    },
    jugadoresActualesMesa: {
        type: DataTypes.INTEGER,
        field: "jugadoresActualesMesa",
    },
}, {
    primaryKey: ["idMesa"],
    timestamps: false,
    tableName: "Mesas",
});

Mesas.belongsTo(Torneos, { foreignKey: "idTorneo", as: "torneo" });
Mesas.belongsTo(Crupiers, { foreignKey: "idCrupierMesa", as: "crupier" });

export default Mesas