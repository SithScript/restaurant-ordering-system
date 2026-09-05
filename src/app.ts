import express from "express";
import Category from "./models/Category.js";
import Products from "./models/Products.js";

const app = express();

app.use(express.json());

//Root 

app.get("/", (req, res) => {
    res.status(200).json({
        message: "API Restaurante",
        version: "1.0.0",
    });
});

//Categories
app.get("/categories", async (req, res) => {
    try {
        const categories = await Category.findAll();

        res.status(200).json(categories);
    } catch(error) {
        console.error("Erro ao buscar categorias.", error);

        res.status(500).json({
            message: "Erro ao buscar categorias.",
        });
    }
});

app.get("/categories:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        res.status(200).json(category);
    } catch(error) {
        console.error("Erro ao buscar categoria:", error);

        res.status(500).json({
            message: "Erro ao buscar categoria.",
        });
    }
});

app.post("/categories", async (req, res) => {
    try {
        const category   = await Category.create(req.body);

        res.status(200).json(category);
    } catch(error) {
        console.error("Erro ao criar categoria:", error);

        res.status(500).json({
            message: "Erro ao criar categoria.",
        });
    }
});

//Products
app.get("/products", async (req, res) => {
    try {
        const products = await Products.findAll();

        res.status(200).json(products);
    } catch(error) {
        console.error("Erro ao buscar produtos.", error);

        res.status(500).json({
            message: "Erro ao buscar produtos.",
        });
    }
});

export default app;
