import appExpress from "express";
import {obtenerJugadores, obtenerJugadoresPorId, crearJugador, actualizarJugador, borrarJugador, obtenerJugadoresPorFiltro  } from "../services/jugadores.service.js";



const jugadoresRouter = appExpress.Router();


jugadoresRouter.get("/", async (req, res, next) => {
    try {
      let jugadores = null;
  
      if (Object.keys(req.query).length === 0 || req.query.idMesa === "0") {
        console.log("general");
        jugadores = await obtenerJugadores();
      } else {
        jugadores = await obtenerJugadoresPorFiltro(req.query);
        console.log('filtrando');
      }
  
      res.json(jugadores);
    } catch (err) {
      console.log("que paso");
      next(err);
    }
  });
  

jugadoresRouter.get("/:id", async (req, res, next) => {
    try {
        const jugador = await obtenerJugadoresPorId(req.params.id);
        if (jugador) {
            res.json(jugador);
        }
        else {
            res.status(404).send("jugador not found");
        }
    }
    catch (err) {
        next(err);
    }
});


jugadoresRouter.post("/", async (req, res, next) => {
    try {
        const jugador = await crearJugador(req.body);
        res.status(201).json(jugador);
    }
    catch (err) {
        next(err);
    }
});


jugadoresRouter.delete("/:id", async (req, res, next) => {
    try {
        await borrarJugador(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});



jugadoresRouter.put("/:id", async (req, res, next) => {
    try {
        await actualizarJugador(req.params.id, req.body);
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});


export default jugadoresRouter;