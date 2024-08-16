import appExpress from "express";

import {obtenerJuegoArmado,obtenerJuegoPorId,crearJuego,borrarJuego,actualizarJuego, obtenerJuegoArmadoPorFiltro} from "../services/juegoArmado.service.js";

// Ruta para obtener las manos
const juegoArmadoRouter = appExpress.Router();



juegoArmadoRouter.get("/" , async (req, res) => {
    try {
        let juegos = null;

        if (Object.keys(req.query).length === 0){
            juegos = await obtenerJuegoArmado();
        }
        else juegos= await obtenerJuegoArmadoPorFiltro(req.query)

        res.json(juegos);
        }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo juego armado." });
    }    
});


juegoArmadoRouter.get("/:id", async (req, res, next) => {
    try {
        const juegoAr = await obtenerJuegoPorId(req.params.id);
        if (juegoAr) {
            res.json(juegoAr);
        }
        else {
            res.status(404).send("juego No Encontrada");
        }
    }
    catch (err) {
        next(err);
    }
});

// para crear nuevo juego 
juegoArmadoRouter.post("/", async (req, res, next) => {
    try {
        const crearmano = await crearJuego(req.body);
        res.status(201).json(crearmano);
    }
    catch (err) {
        next(err);
    }
});

// para eliminar un juego armado 
juegoArmadoRouter.delete("/:id", async (req, res, next) => {
    try {
        await borrarJuego(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

juegoArmadoRouter.put("/:id", async (req, res, next) => {
    try {
        await actualizarJuego(req.params.id, req.body);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});

export default juegoArmadoRouter;
