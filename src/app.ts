import express from "express";
import { version } from "node:os";

const app = express();

const categories = [
    [
        {
            id: 1,
            name: "Pizzas",
            description:
                "Pizzas artesanais com diversos sabores, tamanhos e opções de massa para todos os gostos.",
        },
        {
            id: 2,
            name: "Bebidas",
            description:
                "Bebidas geladas para acompanhar sua pizza, incluindo refrigerantes, sucos e águas.",
        },
        {
            id: 3,
            name: "Sobremesas",
            description:
                "Deliciosas opções doces para finalizar sua refeição com chave de ouro.",
        },
    ],
];

const products = [
    [
        {
            id: 1,
            category: "Pizzas",
            name: "Pizza Calabresa",
            description:
                "Pizza com molho de tomate, queijo muçarela, calabresa fatiada e cebola.",
            price: 49.9,
        },
        {
            id: 2,
            category: "Pizzas",
            name: "Pizza Frango com Catupiry",
            description:
                "Pizza com molho de tomate, queijo muçarela, frango desfiado e Catupiry.",
            price: 54.9,
        },
        {
            id: 3,
            category: "Bebidas",
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
    ],
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

app.get("/categories", (req, res) => {
    res.status(200).json({
        message: "Lista de produtos",
    });
});

export default app;
