/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app.js";
import { 
    obtenerCrupier, 
    obtenerCrupiersPorFiltro, 
    obtenerCrupierPorId, 
    crearCrupier, 
    actualizarCrupier, 
    borrarCrupier 
} from "../../services/crupiers.service.js"

let newCrupier = null;

describe("Crupiers Endpoints", () => {

    // Test para el endpoint GET /crupiers
    describe("GET /crupiers", () => {
        it("should return all crupiers", async () => {
            const res = await request(app).get("/crupiers");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("should return filtered crupiers", async () => {
            const res = await request(app).get("/crupiers").query({ nombre: "Juan" });
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // Test para el endpoint POST /crupiers
    describe("POST /crupiers", () => {
        it("should create a new crupier", async () => {
            newCrupier = { nombre: "Nuevo Crupier", edad: "1990-01-01", fechaInicioActividadLaboral: "2020-01-01" };
            const res = await request(app)
                .post("/crupiers")
                .send(newCrupier);
            newCrupier = res.body;
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("idCrupier");
        });
    });

    // Test para el endpoint GET /crupiers/:id
    describe("GET /crupiers/:id", () => {
        it("should return a specific crupier", async () => {
            const existingCrupierId = newCrupier.idCrupier;
            const res = await request(app).get(`/crupiers/${existingCrupierId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("idCrupier", existingCrupierId);
            expect(res.body).toHaveProperty("nombre", newCrupier.nombre);
        });

        it("should return 404 if crupier does not exist", async () => {
            const nonExistingCrupierId = 9999;
            const res = await request(app).get(`/crupiers/${nonExistingCrupierId}`);
            expect(res.status).toBe(404);
        });
    });

    // Test para el endpoint PUT /crupiers/:id
    describe("PUT /crupiers/:id", () => {
        it("should update a specific crupier", async () => {
            const existingCrupierId = newCrupier.idCrupier;
            const updatedCrupierData = { nombre: "Crupier Actualizado" };
            const res = await request(app)
                .put(`/crupiers/${existingCrupierId}`)
                .send(updatedCrupierData);
            expect(res.status).toBe(204);
        });
    });

    // Test para el endpoint DELETE /crupiers/:id
    describe("DELETE /crupiers/:id", () => {
        it("should delete a specific crupier", async () => {
            const existingCrupierId = newCrupier.idCrupier;
            const res = await request(app).delete(`/crupiers/${existingCrupierId}`);
            expect(res.status).toBe(204);
        });
    });
});
