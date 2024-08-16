/* eslint-disable no-unused-vars */
// Import sequelize
import sequelize from "./db.js";

// Import de los Modelos
import Torneos from "../models/torneos.js";


// Función para sincronizar los modelos con la base de datos
async function dbInit() {
    try {
        await sequelize.authenticate();

        await sequelize.sync();
        console.log("Modelos sincronizados con la base de datos");
    }
    catch (error) {
        console.error("Error al sincronizar modelos:", error);
    }
}

export default dbInit;
