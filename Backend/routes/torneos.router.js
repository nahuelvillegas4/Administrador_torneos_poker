import appExpress from "express";
import { obtenerTorneos, obtenerTorneoPorId, crearTorneo, desactivarTorneo, activarTorneo, actualizarTorneo, obtenerTorneosPorFiltro } from "../services/torneos.service.js";


// Ruta para obtener los torneos
const torneosRouter = appExpress.Router();


torneosRouter.get("/", async (req, res, next) => {
    try {
        let torneos = null;

        if (Object.keys(req.query).length === 0) {
            console.log("general");
            torneos = await obtenerTorneos();
        }
        else torneos = await obtenerTorneosPorFiltro(req.query);

        res.json(torneos);
    }
    catch (err) {
        console.log(object);
        next(err);
    }
});

torneosRouter.get("/:id", async (req, res, next) => {
    try {
        const torneo = await obtenerTorneoPorId(req.params.id);
        if (torneo) {
            res.json(torneo);
        }
        else {
            res.status(404).send("torneo not found");
        }
    }
    catch (err) {
        next(err);
    }
});

// para crear nuevo torneo
torneosRouter.post("/", async (req, res, next) => {
    try {
        const torneo = await crearTorneo(req.body);
        res.status(201).json(torneo);
    }
    catch (err) {
        next(err);
    }
});


torneosRouter.delete("/:id", async (req, res, next) => {
    try {
        await desactivarTorneo(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});



torneosRouter.put("/:id", async (req, res, next) => {
    try {
        await actualizarTorneo(req.params.id, req.body);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});


export default torneosRouter;