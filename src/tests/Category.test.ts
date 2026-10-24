import { describe, it, expect } from "vitest";
import { Category } from "../models/Category.js";

describe("Category - Testes Unitários", () => {

    it("não deve  permitir criar umma categoria com nome vazio", () => {
        const name = "Pizzas";
        const display_order = 1;
        const description = "Categoria de Pizzas";
        const icon = "🍕";

        const category = new Category(
            name,
            display_order,
            description,
            icon
        );

        expect(category.getName()).toBe("Pizzas");
        expect(category.getDisplayOrder()).toBe(1);
        expect(category.getDescription()).toBe("Categoria de Pizzas");
        expect(category.getIcon()).toBe("🍕");
        expect(category.isActive()).toBe(true);
        expect(category.getId()).toBeUndefined();
    });

    it("não deve permitir criar uma categoria com nome vazio", () => {

        const name = "";
        const display_order = 1;

        expect(() => {
            new Category(name, display_order);
        }).toThrow("O nome da categoria é obrigatório.");

    });

    it("não deve permitir ordem de exibição negativa", () => {

        const name = "Pizzas";
        const display_order = -1;

        expect(() => {
            new Category(name, display_order);
        }).toThrow(
            "A ordem da exibição deve ser um número inteiro maior ou igual a zero."
        );
    });

    it("deve remover espaços antes e depois do nome da categoria", () => {

        const name = "      Pizzas      ";//trim()
        const display_order = 1;

        const category = new Category(name, display_order);

        expect(category.getName()).toBe("Pizzas");
    });

    it("não deve permitir criar uma categoria  com nome contendo apenas espaços", () => {

        const name = "       ";//trim()
        const display_order = 1;

        expect(() => {
            new Category(name, display_order);
        }).toThrow("O nome da categoria é obrigatório.");
    });

    it("não deve permitir ordem de exibiação decimal", () => {

        const name = "Pizzas";
        const display_order = 1.5;

        expect(() => {
            new Category(name, display_order);
        }).toThrow("A ordem da exibição deve ser um número inteiro maior ou igual a zero.");

    });

    it("deve permitir ordem de exibição igual a zero", () => {

        const name = "Pizzas";
        const display_order = 0;

        const category = new Category(name, display_order);

        expect(category.getDisplayOrder()).toBe(0);
    });

    it("deve permitir renomear categoria existente", () => {

        const category = new Category("Pizzas", 1);

        category.rename("Bebidas");

        expect(category.getName()).toBe("Bebidas");
    });

    it("deve preservar o nome original após uma tentavia inválida de renomeação", () => {

        const category = new Category("Pizzas", 1);

        expect(() => {
            category.rename("");
        }).toThrow("O nome da categoria é obrigatório.");

        expect(category.getName()).toBe("Pizzas");
    });

    it("deve permitir desativar e ativar uma categoria", () => {

        const category = new Category("Pizzas", 1);

        category.deactivate();

        expect(category.isActive()).toBe(false);

        category.activate();

        expect(category.isActive()).toBe(true);
    });

    it("deve restaurar uma categoria existente", () => {

        const id = "385f82c4-d938-444b-a94a-afe1ac9de8df"
        const name = "Pizzas";
        const display_order = 1;
        const active = false;
        const description = "Categoria de Pizzas";
        const icon = "🍕";

        const category = Category.restore(
            id,
            name,
            display_order,
            active,
            description,
            icon
        );

        expect(category.getId()).toBe(id);
        expect(category.getName()).toBe("Pizzas");
        expect(category.getDisplayOrder()).toBe(1);
        expect(category.isActive()).toBe(false);
        expect(category.getDescription()).toBe("Categoria de Pizzas");
        expect(category.getIcon()).toBe("🍕");
    });

    it("deve permitir alterar a descrição de uma categoria", () => {

        const name = "Pizzas";
        const display_order = 1;
        const description = "Categoria de Pizzas";
        
        const category = new Category(
            name,
            display_order,
            description
        );

        category.changeDescription("Categoria de Pizzas")

        expect(category.getDescription()).toBe("Categoria de Pizzas");
    });

    it("deve permitir alterar o ícone de uma categoria", () => {
        
        const category = new Category(
            "Pizzas",
            1,
            "Categoria de Pizzas tradicionais",
            "🍕"
        );

        category.changeIcon("🥤")
        
        expect(category.getIcon()).toBe("🥤");
    });

    it("deve permitir alterar a ordem  de axibição de uma categoria", () => {

        const category = new Category("Pizzas", 1);

        category.changeDiplayOrder(14)

        expect(category.getDisplayOrder()).toBe(14);
    });




});

