import request from "supertest";
import app from "../../app.js";
/* eslint-disable no-undef */
import {
    obtenerTorneos,
    obtenerTorneoPorId,
    crearTorneo,
    desactivarTorneo,
    activarTorneo,
    actualizarTorneo,
    obtenerTorneosPorFiltro
} from "../../services/torneos.service.js";

let newTorneo = null;

describe("Torneos Endpoints", () => {

    // Test para el endpoint GET /torneos
    describe("GET /torneos", () => {
        it("should return all torneos", async () => {
            const res = await request(app).get("/torneos");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("should return filtered torneos", async () => {
            const res = await request(app).get("/torneos").query({ nom: "Torneo" });
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // Test para el endpoint POST /torneos
    describe("POST /torneos", () => {
        it("should create a new torneo", async () => {
            newTorneo = { nombreTorneo: "Nuevo Torneo", fechaInicioTorneo: "2024-07-01", fechaFinTorneo: "2024-07-10", locacionTorneo: "Buenos Aires", fondoDePremiosTorneo: 10000 };
            const res = await request(app)
                .post("/torneos")
                .send(newTorneo);
            newTorneo = res.body;
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("idTorneo");
        });
    });

    // Test para el endpoint GET /torneos/:id
    describe("GET /torneos/:id", () => {
        it("should return a specific torneo", async () => {
            const existingTorneoId = newTorneo.idTorneo;
            const res = await request(app).get(`/torneos/${existingTorneoId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("idTorneo", existingTorneoId);
            expect(res.body).toHaveProperty("nombreTorneo", newTorneo.nombreTorneo);
        });

        it("should return 404 if torneo does not exist", async () => {
            const nonExistingTorneoId = 9999;
            const res = await request(app).get(`/torneos/${nonExistingTorneoId}`);
            expect(res.status).toBe(404);
        });
    });

    // Test para el endpoint PUT /torneos/:id
    describe("PUT /torneos/:id", () => {
        it("should update a specific torneo", async () => {
            const existingTorneoId = newTorneo.idTorneo;
            const updatedTorneoData = { nombreTorneo: "Torneo Actualizado" };
            const res = await request(app)
                .put(`/torneos/${existingTorneoId}`)
                .send(updatedTorneoData);
            expect(res.status).toBe(204);
        });
    });

    // Test para el endpoint DELETE /torneos/:id
    describe("DELETE /torneos/:id", () => {
        it("should delete a specific torneo", async () => {
            const existingTorneoId = newTorneo.idTorneo;
            const res = await request(app).delete(`/torneos/${existingTorneoId}`);
            expect(res.status).toBe(204);
        });
    });
});
