/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app.js";

let newMesa = null;

describe("Mesas Endpoints", () => {

    // Test para el endpoint GET /mesas
    describe("GET /mesas", () => {
        it("should return all mesas", async () => {
            const res = await request(app).get("/mesas");
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it("should return filtered mesas", async () => {
            const res = await request(app).get("/mesas").query({ nombreMesa: "Mesa1" });
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // Test para el endpoint POST /mesas
    describe("POST /mesas", () => {
        it("should create a new mesa", async () => {
            newMesa = { nombreMesa: "Mesa Test", idTorneo: 1, idCrupierMesa: 1 };
            const res = await request(app)
                .post("/mesas")
                .send(newMesa);
            newMesa = res.body;
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("idMesa");
            expect(res.body).toHaveProperty("nombreMesa", newMesa.nombreMesa);
        });
    });

    // Test para el endpoint GET /mesas/:id
    describe("GET /mesas/:id", () => {
        it("should return a specific mesa", async () => {
            const res = await request(app).get(`/mesas/${newMesa.idMesa}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("idMesa", newMesa.idMesa);
        });

        it("should return 404 if mesa does not exist", async () => {
            const res = await request(app).get("/mesas/999");
            expect(res.status).toBe(404);
        });
    });

    // Test para el endpoint PUT /mesas/:id
    describe("PUT /mesas/:id", () => {
        it("should update a specific mesa", async () => {
            const updatedMesaData = { nombreMesa: "Mesa Updated" };
            const res = await request(app)
                .put(`/mesas/${newMesa.idMesa}`)
                .send(updatedMesaData);
            expect(res.status).toBe(204);
        });
    });

    // Test para el endpoint DELETE /mesas/:id
    describe("DELETE /mesas/:id", () => {
        it("should delete a specific mesa", async () => {
            const res = await request(app).delete(`/mesas/${newMesa.idMesa}`);
            expect(res.status).toBe(204);
        });
    });
});
