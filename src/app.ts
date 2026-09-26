import express from "express";
import Category from "./models/Category.js";
import Products from "./models/Products.js";
import categoryRoutes from "./routes/categoryRoutes.js"

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

app.use("/categories", categoryRoutes);

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

app.get("/products/:id", async (req, res) => {
    try {
        const products = await Products.findById(req.params.id);

        res.status(200).json(products);
    } catch(error) {
        console.error("Erro ao buscar categoria:", error);

        res.status(500).json({
            message: "Erro ao buscar categoria.",
        });
    }
});

app.post("/products", async (req, res) => {
    try {
        const products   = await Products.create(req.body);

        res.status(200).json(products);
    } catch(error) {
        console.error("Erro ao criar categoria:", error);

        res.status(500).json({
            message: "Erro ao criar categoria.",
        });
    }
});

// PUT - Atualizar Produto
app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Products.update(id, req.body);

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);

        res.status(500).json({
            message: "Erro ao atualizar produto.",
        });
    }
});

// DELETE - Remover Produto
app.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Products.remove(id);

        res.status(200).json(deletedProduct);
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        
        res.status(500).json({
            message: "Erro ao deletar produto.",
        });
    }
});

export default app;