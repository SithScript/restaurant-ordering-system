import { describe, it, expect } from "vitest";
import { Product } from "../models/Products.js";

// Título, preço e categoria já possuem validação no método construtor

describe("Product - testes unitários", () => {
    it("Deve criar um produto válido", () => {
        const category_id = "ded69c7a-3ff9-473e-8df8-367801e1644b";
        const title = "Pizza de 5 queijo";
        const description = "pizza de queijo com 5 tipos de queijos diferentes desmanchando";
        const price = 80.99;
        const image = "🍕";

        const product = new Product(
            category_id,
            title,
            price,
            description,
            image,
        );

        expect(product.getCategoryId()).toBe("ded69c7a-3ff9-473e-8df8-367801e1644b");
        expect(product.getTitle()).toBe("Pizza de 5 queijo");
        expect(product.getPrice()).toBe(80.99);
        expect(product.getDescription()).toBe("pizza de queijo com 5 tipos de queijos diferentes desmanchando");
        expect(product.getImage()).toBe("🍕");
        expect(product.isAvailable()).toBe(true);
        expect(product.isActive()).toBe(true);
    });

    it("Não deve permitir criar um produto com preço negativo", () => {
        const category_id = "ded69c7a-3ff9-473e-8df8-367801e1644b";
        const preco = -1;

        expect(() => {
            new Product(category_id, "Pizza de Queijo", preco);
        }).toThrow("O preço do produto deve ser um número maior ou igual a zero.");
    });

    it("Não deve permitir criar um produto com categoria inválida", () => {
        expect(() => {
            new Product("categoria-invalida", "Pizza", 50);
        }).toThrow("O identificador da categoria deve ser um UUID válido.");
    });

    it("Não deve permitir criar um produto com título vazio", () => {
        const category_id = "ded69c7a-3ff9-473e-8df8-367801e1644b";

        expect(() => {
            new Product(category_id, "   ", 50);
        }).toThrow("O título do produto é obrigatório.");
    });
});
