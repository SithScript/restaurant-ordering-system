import express from "express";
import { randomUUID } from "node:crypto";

const app = express();

app.use(express.json());

// Initial data

const pizzasCategoryId = randomUUID();
const drinksCategoryId = randomUUID();

const categories = [
    {
        id: pizzasCategoryId,
        name: "Pizzas",
        description:
            "Pizzas artesanais com diversos sabores, tamanhos e opções de massa para todos os gostos.",
    },
    {
        id: drinksCategoryId,
        name: "Bebidas",
        description:
            "Bebidas geladas para acompanhar sua pizza, incluindo refrigerantes, sucos e águas.",
    },
];

const products = [
    {
        id: randomUUID(),
        category: pizzasCategoryId,
        name: "Pizza Calabresa",
        description:
            "Pizza com molho de tomate, queijo muçarela, calabresa fatiada e cebola.",
        price: 49.9,
    },
    {
        id: randomUUID(),
        category: pizzasCategoryId,
        name: "Pizza Frango com Catupiry",
        description:
            "Pizza com molho de tomate, queijo muçarela, frango desfiado e Catupiry.",
        price: 54.9,
    },
    {
        id: randomUUID(),
        category: drinksCategoryId,
        name: "Refrigerante Coca-Cola 2L",
        description:
            "Refrigerante Coca-Cola de 2 litros, ideal para acompanhar sua pizza.",
        price: 12.0,
    },
    {
        id: 4,
        category: "Sobremesas",
        name: "Pizza de Chocolate",
        description: "Pizza doce com chocolate cremoso e cobertura de chocolate.",
        price: 39.9,
    },
];

app.get("/", (req, res) => {
    res.status(200).json({
        message: "API Restaurante",
        version: "1.0.0",
    });
});

app.get("/categories", (req, res) => {
    res.status(200).json(categories);
});

app.get("/categories/:id", (req, res) => {
    const category = categories.find((category) => {
        return category.id == req.params.id;
    });

    if (!category) {
        return res.status(404).json({
            message: "Categoria não encontrada",
        });
    }

    res.status(200).json(category);
});

app.post("/categories", (req, res) => {
    const category = {
        id: randomUUID(),
        ...req.body,
    }

    categories.push(category);

    res.status(200).json(category);
});

app.get("/products", (req, res) => {
    res.status(200).json(products);
});

app.post("/products", (req, res) => {
    const product = req.body;

    products.push(product);

    res.status(200).json(product);
});

export default app;
