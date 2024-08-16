import express from "express";
import {
    obtenerPremios,
    obtenerPremiosPorId,
    crearPremio,
    actualizarPremio,
    eliminarPremio,
    obtenerPremiosPorFiltro,
    verificarPosicionEnUso
} from "../services/premios.service.js";

const premiosRouter = express.Router();

premiosRouter.get("/", async (req, res, next) => {
    try {
        let premios = null;

        if (Object.keys(req.query).length === 0) {
            premios = await obtenerPremios();
        } else {
            premios = await obtenerPremiosPorFiltro(req.query);
        }

        res.json(premios);
    } catch (err) {
        next(err);
    }
});

premiosRouter.get("/:numeroPosicion/:idTorneo", async (req, res, next) => {
    try {
        const { numeroPosicion, idTorneo } = req.params;
        const premio = await obtenerPremiosPorId(numeroPosicion, idTorneo);
        if (premio) {
            res.json(premio);
        } else {
            res.status(404).send("Premio no encontrado");
        }
    } catch (err) {
        next(err);
    }
});

premiosRouter.post("/", async (req, res) => {
    const premioData = req.body;

    try {
        const nuevoPremio = await crearPremio(premioData);
        res.status(201).json(nuevoPremio);
    } catch (error) {
        console.error("Error al crear el premio:", error.message);
        res.status(400).json({ error: error.message });
    }
});

premiosRouter.put("/:numeroPosicion/:idTorneo", async (req, res, next) => {
    try {
        const { numeroPosicion, idTorneo } = req.params;
        await actualizarPremio(numeroPosicion, idTorneo, req.body);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

premiosRouter.delete("/:numeroPosicion/:idTorneo", async (req, res, next) => {
    try {
        const { numeroPosicion, idTorneo } = req.params;
        await eliminarPremio(numeroPosicion, idTorneo);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

premiosRouter.get("/verificar-posicion", async (req, res, next) => {
    const { numeroPosicion, idTorneo } = req.query;

    try {
        const enUso = await verificarPosicionEnUso(numeroPosicion, idTorneo);
        res.json({ enUso });
    } catch (error) {
        console.error("Error al verificar la posición del premio:", error);
        res.status(500).json({ error: "Error al verificar la posición del premio" });
    }
});

export default premiosRouter;
