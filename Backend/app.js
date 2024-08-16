import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import dbInit from "./data/db-init.js";

import logger from "./middlewares/requestLogger.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

import serverStatusRouter from "./routes/serverStatus.router.js";
import torneosRouter from "./routes/torneos.router.js";
import mesasRouter from "./routes/mesas.router.js";
import crupierRouter from "./routes/crupiers.router.js";
import jugadoresRouter from "./routes/jugadores.router.js";

import juegoArmadoRouter from "./routes/juegoArmado.router.js";

import premiosRouter from "./routes/premios.router.js";

import inscripcionesRouter from "./routes/inscripciones.router.js";


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json()); // Body parser para transformar httpBody en objetos json
// Logs
if (process.env.LOG ==="true") { // si queremos que use login 
    app.use(logger);
}

app
    .use("/status", serverStatusRouter);

app
    .use("/torneos", torneosRouter)
    .use("/mesas", mesasRouter)
    .use("/crupiers", crupierRouter)
    .use("/juegoarmado", juegoArmadoRouter)
    .use("/jugadores", jugadoresRouter)
    .use("/premios", premiosRouter)
    .use("/inscripciones", inscripcionesRouter)



app
    .use(errorHandler)
    .use(notFound);

async function start() {
    const PORT = process.env.PORT || 3000;

    // Inicializar la conexión a la base de datos
    await dbInit();

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
}

await start();

export default app;






