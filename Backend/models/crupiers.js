import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Crupiers = sequelize.define("Crupiers", {
    idCrupier: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idCrupier",
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "nombre",
    },
    edad: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "edad",
    },
    fechaInicioActividadLaboral: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        field: "fechaInicioActividadLaboral",
    }
}, {
    timestamps: false,
    tableName: "Crupiers",
});

export default Crupiers