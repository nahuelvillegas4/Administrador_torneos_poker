// db.js
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const logHabilitado = process.env.LOG;

const sequelize = new Sequelize({
    dialect: "sqlite",
    logging: (logHabilitado === "true") ? console.log : false, 
    storage: "./data/torneos1.sqlite" // aca iria la ruta de la base de datos
});

export default sequelize;


