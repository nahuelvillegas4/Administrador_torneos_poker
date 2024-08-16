/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app.js";
import {
    obtenerJuegoArmado,
    obtenerJuegoPorId,
    crearJuego,
    actualizarJuego,
    borrarJuego,
    obtenerJuegoArmadoPorFiltro
} from "../../services/juegoArmado.service.js";

let newJuegoArmado = null;

describe("JuegoArmado Endpoints", () => {

    // Test para el endpoint GET /juegoArmado
    describe("GET /juegoArmado", () => {
        it("should return all juegos armados", async () => {
            const res = await request(app).get("/juegoArmado");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("should return filtered juegos armados", async () => {
            const res = await request(app).get("/juegoArmado").query({ desc: "Descripción" });
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // Test para el endpoint GET /juegoArmado/:id
    describe("GET /juegoArmado/:id", () => {
        it("should return a specific juego armado", async () => {
            const existingJuegoArmadoId = 1; // Asegúrate de que este ID exista en tu base de datos
            const res = await request(app).get(`/juegoArmado/${existingJuegoArmadoId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("idJuegoArmado", existingJuegoArmadoId);
        });

        it("should return 404 if juego armado does not exist", async () => {
            const nonExistingJuegoArmadoId = 9999;
            const res = await request(app).get(`/juegoArmado/${nonExistingJuegoArmadoId}`);
            expect(res.status).toBe(404);
        });
    });

    // Test para el endpoint POST /juegoArmado
    describe("POST /juegoArmado", () => {
        it("should create a new juego armado", async () => {
            newJuegoArmado = { descripcion: "Nuevo Juego Armado" }; // Asegúrate de que los datos sean válidos
            const res = await request(app)
                .post("/juegoArmado")
                .send(newJuegoArmado);
            newJuegoArmado = res.body;
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("descripcion", "Nuevo Juego Armado");
        });
    });

    // Test para el endpoint PUT /juegoArmado/:id
    describe("PUT /juegoArmado/:id", () => {
        it("should update a specific juego armado", async () => {
            const updatedJuegoArmadoData = { descripcion: "Juego Armado Actualizado" };
            const res = await request(app)
                .put(`/juegoArmado/${newJuegoArmado.idJuegoArmado}`)
                .send(updatedJuegoArmadoData);
            expect(res.status).toBe(204);
        });
    });

    // Test para el endpoint DELETE /juegoArmado/:id
    describe("DELETE /juegoArmado/:id", () => {
        it("should delete a specific juego armado", async () => {
            const res = await request(app).delete(`/juegoArmado/${newJuegoArmado.idJuegoArmado}`);
            expect(res.status).toBe(204);
        });
    });
});
