/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app.js";
import {
    obtenerPremios,
    obtenerPremiosPorFiltro,
    obtenerPremiosPorId,
    crearPremio,
    actualizarPremio,
    eliminarPremio,
    verificarPosicionEnUso
} from "../../services/premios.service.js";

let newPremio = null;

describe("Premios Endpoints", () => {

    // Test para el endpoint GET /premios
    describe("GET /premios", () => {
        it("should return all premios", async () => {
            const res = await request(app).get("/premios");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("should return filtered premios", async () => {
            const res = await request(app).get("/premios").query({ idTorneo: 1 });
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // Test para el endpoint GET /premios/:numeroPosicion/:idTorneo
    describe("GET /premios/:numeroPosicion/:idTorneo", () => {
        it("should return a specific premio", async () => {
            const res = await request(app).get("/premios/1/1");
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("numeroPosicion", 1);
            expect(res.body).toHaveProperty("idTorneo", 1);
        });

        it("should return 404 if premio does not exist", async () => {
            const res = await request(app).get("/premios/999/999");
            expect(res.status).toBe(404);
        });
    });

    // Test para el endpoint POST /premios
    describe("POST /premios", () => {
        it("should create a new premio", async () => {
            newPremio = { numeroPosicion: 10, idTorneo: 1, descripcionPremio: "Nuevo Premio" };
            const res = await request(app)
                .post("/premios")
                .send(newPremio);
            newPremio = res.body;
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("numeroPosicion", 10);
            expect(res.body).toHaveProperty("idTorneo", 1);
        });

        it("should not create a premio with existing numeroPosicion", async () => {
            const duplicatePremio = { numeroPosicion: 1, idTorneo: 1, descripcionPremio: "Duplicado Premio" };
            const res = await request(app)
                .post("/premios")
                .send(duplicatePremio);
            expect(res.status).toBe(400);
        });
    });

    // Test para el endpoint PUT /premios/:numeroPosicion/:idTorneo
    describe("PUT /premios/:numeroPosicion/:idTorneo", () => {
        it("should update a specific premio", async () => {
            const updatedPremio = { descripcionPremio: "Premio Actualizado" };
            const res = await request(app)
                .put(`/premios/${newPremio.numeroPosicion}/${newPremio.idTorneo}`)
                .send(updatedPremio);
            expect(res.status).toBe(204);
        });
    });

    // Test para el endpoint DELETE /premios/:numeroPosicion/:idTorneo
    describe("DELETE /premios/:numeroPosicion/:idTorneo", () => {
        it("should delete a specific premio", async () => {
            const res = await request(app).delete(`/premios/${newPremio.numeroPosicion}/${newPremio.idTorneo}`);
            expect(res.status).toBe(204);
        });
    });

    // Test para el endpoint GET /premios/verificar-posicion
    describe("GET /premios/verificar-posicion", () => {
        it("should verify if position is in use", async () => {
            const res = await request(app).get("/premios/verificar-posicion").query({ numeroPosicion: 1, idTorneo: 1 });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("enUso", true);
        });

        it("should return false if position is not in use", async () => {
            const res = await request(app).get("/premios/verificar-posicion").query({ numeroPosicion: 999, idTorneo: 1 });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("enUso", false);
        });
    });
});
