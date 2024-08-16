import appExpress from "express"
import { obtenerInscripcion, obtenerInscripcionPorId ,obtenerInscripcionesPorFiltro, crearInscripcion, actualizarInscripcion, borrarInscripcion } from "../services/inscripciones.service.js"

const inscripcionesRouter = appExpress.Router()

inscripcionesRouter.get("/", async (req, res) => {
    try {
        
        let inscripciones = null

        if(Object.keys(req.query).length === 0){
            inscripciones = await obtenerInscripcion()
        } else {
            inscripciones = await obtenerInscripcionesPorFiltro(req.query)
        }

        res.json(inscripciones)

    } catch (error) {
        res.status(500)
            .json({error: "error obteniendo inscripciones filtradas"})
    }
})

inscripcionesRouter.get("/:idTorneo/:idJugador/:idMesa", async (req, res, next) => {
    try {
        
        const inscripcion = await obtenerInscripcionPorId(req.params.idTorneo, req.params.idJugador, req.params.idMesa)
        if (inscripcion) {
            res.json(inscripcion)
        } else {
            res.status(404).send("inscripcion not found")
        }
    } catch (error) {
        next(error)
    }
})

inscripcionesRouter.post("/", async (req, res, next) => {
    try {
        
        const inscripcion = await crearInscripcion(req.body)
        res.status(201).json(inscripcion)

    } catch (error) {

        next(error)

    }
})

inscripcionesRouter.delete("/:idTorneo/:idJugador/:idMesa", async (req, res, next) => {
    try {
        
        await borrarInscripcion(req.params.idTorneo, req.params.idJugador, req.params.idMesa)
        res.status(204).end()

    } catch (error) {
        
        next(error)

    }
})

inscripcionesRouter.put("/:idTorneo/:idJugador/:idMesa", async (req, res, next) => {
    try {
        
        await actualizarInscripcion(req.params.idTorneo, req.params.idJugador, req.params.idMesa, req.body)
        res.sendStatus(204);

    } catch (error) {
        
        next(error)

    }
})

export default inscripcionesRouter