import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const JuegoArmado = sequelize.define("JuegoArmado", { 
    idJuegoArmado:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "idJuegoArmado"
    },
    descripcion:{
        type: DataTypes.TEXT,
        field:"Descripcion"
    }
},{
    timestamps: false,
    tableName: "JuegoArmado",
})

export default JuegoArmado