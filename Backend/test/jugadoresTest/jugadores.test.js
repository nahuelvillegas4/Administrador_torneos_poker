/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app.js";
import {
    obtenerJugadores,
    obtenerJugadoresPorId,
    crearJugador,
    actualizarJugador,
    borrarJugador,
    obtenerJugadoresPorFiltro
} from "../../services/jugadores.service.js";

let newJugador = null;

describe("Jugadores Endpoints", () => {

    // Test para el endpoint GET /jugadores
    describe("GET /jugadores", () => {
        it("should return all jugadores", async () => {
            const res = await request(app).get("/jugadores");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("should return filtered jugadores", async () => {
            const res = await request(app).get("/jugadores").query({ nom: "Juan" });
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("should return jugadores without mesa", async () => {
            const res = await request(app).get("/jugadores").query({ sinMesa: "on" });
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // Test para el endpoint GET /jugadores/:id
    describe("GET /jugadores/:id", () => {
        it("should return a specific jugador", async () => {
            const existingJugadorId = 1; // Asegúrate de que este ID exista en tu base de datos
            const res = await request(app).get(`/jugadores/${existingJugadorId}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("idJugador", existingJugadorId);
        });

        it("should return 404 if jugador does not exist", async () => {
            const nonExistingJugadorId = 9999;
            const res = await request(app).get(`/jugadores/${nonExistingJugadorId}`);
            expect(res.status).toBe(404);
        });
    });

    // Test para el endpoint POST /jugadores
    describe("POST /jugadores", () => {
        it("should create a new jugador", async () => {
            newJugador = { nombreJugador: "Nuevo Jugador", idMesaJugador: null }; // Asegúrate de que los datos sean válidos
            const res = await request(app)
                .post("/jugadores")
                .send(newJugador);
            newJugador = res.body;
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("nombreJugador", "Nuevo Jugador");
        });
    });

    // Test para el endpoint PUT /jugadores/:id
    describe("PUT /jugadores/:id", () => {
        it("should update a specific jugador", async () => {
            const updatedJugadorData = { nombreJugador: "Jugador Actualizado" };
            const res = await request(app)
                .put(`/jugadores/${newJugador.idJugador}`)
                .send(updatedJugadorData);
            expect(res.status).toBe(204);
        });
    });

    // Test para el endpoint DELETE /jugadores/:id
    describe("DELETE /jugadores/:id", () => {
        it("should delete a specific jugador", async () => {
            const res = await request(app).delete(`/jugadores/${newJugador.idJugador}`);
            expect(res.status).toBe(204);
        });
    });
});
