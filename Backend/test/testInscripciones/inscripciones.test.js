/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app.js";

let newInscripcion = null;

describe("Inscripciones Endpoints", () => {

    // Test para el endpoint GET /inscripciones
    describe("GET /inscripciones", () => {
        it("should return all inscripciones", async () => {
            const res = await request(app).get("/inscripciones");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("should return filtered inscripciones", async () => {
            const res = await request(app).get("/inscripciones").query({ idTorneo: 1 });
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // Test para el endpoint POST /inscripciones
    describe("POST /inscripciones", () => {
        it("should create a new inscripcion", async () => {
            newInscripcion = { idTorneo: 1, idJugador: 1, idMesa: 1 };
            const res = await request(app)
                .post("/inscripciones")
                .send(newInscripcion);
            newInscripcion = res.body;
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("idTorneo", newInscripcion.idTorneo);
            expect(res.body).toHaveProperty("idJugador", newInscripcion.idJugador);
            expect(res.body).toHaveProperty("idMesa", newInscripcion.idMesa);
        });
    });

    // Test para el endpoint GET /inscripciones/:idTorneo/:idJugador/:idMesa
    describe("GET /inscripciones/:idTorneo/:idJugador/:idMesa", () => {
        it("should return a specific inscripcion", async () => {
            const res = await request(app).get(`/inscripciones/${newInscripcion.idTorneo}/${newInscripcion.idJugador}/${newInscripcion.idMesa}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("idTorneo", newInscripcion.idTorneo);
            expect(res.body).toHaveProperty("idJugador", newInscripcion.idJugador);
            expect(res.body).toHaveProperty("idMesa", newInscripcion.idMesa);
        });

        it("should return 404 if inscripcion does not exist", async () => {
            const res = await request(app).get("/inscripciones/999/999/999");
            expect(res.status).toBe(404);
        });
    });

    // Test para el endpoint PUT /inscripciones/:idTorneo/:idJugador/:idMesa
    describe("PUT /inscripciones/:idTorneo/:idJugador/:idMesa", () => {
        it("should update a specific inscripcion", async () => {
            const updatedInscripcionData = { idMesa: 2 };
            const res = await request(app)
                .put(`/inscripciones/${newInscripcion.idTorneo}/${newInscripcion.idJugador}/${newInscripcion.idMesa}`)
                .send(updatedInscripcionData);
            expect(res.status).toBe(204);
        });
    });

    // Test para el endpoint DELETE /inscripciones/:idTorneo/:idJugador/:idMesa
    describe("DELETE /inscripciones/:idTorneo/:idJugador/:idMesa", () => {
        it("should delete a specific inscripcion", async () => {
            const res = await request(app).delete(`/inscripciones/${newInscripcion.idTorneo}/${newInscripcion.idJugador}/${newInscripcion.idMesa}`);
            expect(res.status).toBe(204);
        });
    });
});
