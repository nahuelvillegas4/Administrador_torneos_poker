import appExpress from "express";

import { obtenerMesaPorId, obtenerMesas, crearMesa, actualizarMesa, borrarMesa, obtenerMesasPorFiltro } from "../services/mesas.service.js";

// Ruta para obtener las mesas
const mesasRouter = appExpress.Router();


// ruta para obtener todas las mesas
mesasRouter.get("/" , async (req, res) => {
    try {

        let mesas = null

        if (Object.keys(req.query).length === 0){
            mesas = await obtenerMesas()
        }
        else {
            mesas = await obtenerMesasPorFiltro(req.query);
        }
        res.json(mesas);
        }
        //else torneos = await obtenerEstacionesPorFiltro(req.query);
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "Database error obteniendo mesas." });
    }    
});



// ruta para obtener una mesa por id
mesasRouter.get("/:id", async (req, res, next) => {
    try {
        const mesa = await obtenerMesaPorId(req.params.id);
        if (mesa) {
            res.json(mesa);
        }
        else {
            res.status(404).send("Mesa No Encontrada asdasd");
        }
    }
    catch (err) {
        next(err);
    }
});


// Ruta para crear una mesa
mesasRouter.post("/", async (req, res, next) => {
    try {
        const mesa = await crearMesa(req.body);
        res.status(201).json(mesa);
    }
    catch (err) {
        next(err);
    }
});



mesasRouter.delete("/:id", async (req, res, next) => {
    try {
        await borrarMesa(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});


mesasRouter.put("/:id", async (req, res, next) => {
    try {
        await actualizarMesa(req.params.id, req.body);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});


export default mesasRouter;