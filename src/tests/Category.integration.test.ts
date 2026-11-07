import { randomUUID } from "node:crypto";
import { afterEach, describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";
import supabase from "../config/supabase.js";

describe("Category - Teste de Integração", () => {

    const testNames: string[] = [];

    function makeCategoryData() {
        const name = `Teste integração ${randomUUID()}`;

        testNames.push(name);

        return {
            name,
            display_order: 1,
            description: "Categoria criada pelo teste de integração",
            icon: "🍕",
        };
    }

    async function createCategory() {
        const data = makeCategoryData();

        const response = await request(app).post("/categories").send(data);

        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(expect.any(String));

        return {
            id: response.body.id as string,
            data,
        };
    }

    afterEach(async () => {
        const names = testNames.splice(0);
        if (names.length === 0) {
            return;
        }
        const { error } = await supabase
            .from("categories")
            .delete()
            .in("name", names);

        if (error) {
            throw new Error('Falha ao limpar categorias do teste: ${error.message}');
        }

    }, 20_000);

    //POST
    it("deve criar uma categoria válida", async () => {

        const data = makeCategoryData();

        const response = await request(app).post("/categories").send(data);

        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(expect.any(String));
        expect(response.body).toMatchObject({
            ...data,
            active: true,
        });
    });

    //GET
    it("deve listar as categorias incluindo a categoria criada", async () => {
        const { id, data } = await createCategory();

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id,
                    name: data.name
                }),
            ]),
        );
    }, 20_000);

    //GET by ID
    it("deve consultar uma categoria por ID", async () => {
        const { id, data } = await createCategory();

        const response = await request(app).get(`/categories/${id}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            id,
            ...data,
            active: true,
        });

    }, 20_000);

    //GET by Keyword
    it("deve buscar uma categoria por palavra-chave", async () => {
        const { id, data } = await createCategory();

        const response = await request(app)
            .get(`/categories/search/${data.name}`)
            .query({ keyword: data.name });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id,
                    name: data.name
                }),
            ]),
        );
    }, 20_000);
});