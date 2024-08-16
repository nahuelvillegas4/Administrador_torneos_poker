import appExpress from "express";

import { obtenerCrupierPorId, obtenerCrupier, borrarCrupier, actualizarCrupier, crearCrupier, obtenerCrupiersPorFiltro } from "../services/crupiers.service.js";

// Ruta para obtener las mesas
const crupierRouter = appExpress.Router();



crupierRouter.get("/" , async (req, res) => {
    try {

        let crupiers = null

        if (Object.keys(req.query).length === 0){
            crupiers = await obtenerCrupier();
        }
        else crupiers = await obtenerCrupiersPorFiltro(req.query)

        res.json(crupiers);
        }
        //else torneos = await obtenerEstacionesPorFiltro(req.query);
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo crupiers." });
    }    
});


crupierRouter.get("/:id", async (req, res, next) => {
    try {
        const crupier = await obtenerCrupierPorId(req.params.id);
        if (crupier) {
            res.json(crupier);
        }
        else {
            res.status(404).send("Crupier No Encontrado");
        }
    }
    catch (err) {
        next(err);
    }
});

crupierRouter.post("/", async (req, res, next) => {
    try {
        const accionesDe = await crearCrupier(req.body);
        res.status(201).json(accionesDe);
    }
    catch (err) {
        next(err);
    }
});

// para eliminar un crupier 
crupierRouter.delete("/:id", async (req, res, next) => {
    try {
        await borrarCrupier(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

crupierRouter.put("/:id", async (req, res, next) => {
    try {
        await actualizarCrupier(req.params.id, req.body);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});


export default crupierRouter;