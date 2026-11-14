// ====================================================================
// Documentação com Swagger / OpenAPI
// ====================================================================

import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Restaurant Ordering System API",
            version: "1.0.0",
            description: "API REST para gerenciamento de categorias e produtos de um sistema de pedidos de restaurante.",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
        tags: [
            {
                name: "Categories",
                description: "Gerenciamento de categorias",
            },
            {
                name: "Products",
                description: "Gerenciamento de produtos",
            },
        ],
        components: {
            schemas: {
                Category: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            example: "e8c9a25a-f7b4-4649-af9d-06190ead2362",
                        },
                        name: {
                            type: "string",
                            example: "pizza",
                        },
                        description: {
                            type: "string",
                            example: "Pizzas tradicionais e especiais",
                        },
                        icon: {
                            type: "string",
                            nullable: true,
                            example: "🍕",
                        },
                        display_order: {
                            type: "integer",
                            minimum: 0,
                            example: 1,
                        },
                        active: {
                            type: "boolean",
                            example: true,
                        },
                    },
                },

                CreateCategory: {
                    type: "object",
                    required: ["name", "display_order"],
                    properties: {
                        name: {
                            type: "string",
                            minLength: 1,
                            example: "Pizza",
                        },
                        description: {
                            type: "string",
                            example: "Pizzas tradicionais e especiais",
                        },
                        icon: {
                            type: "string",
                            example: "🍕",
                        },
                        display_order: {
                            type: "integer",
                            minimum: 0,
                            example: 1,
                        },
                    },
                },

                UpdateCategory: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            minLength: 1,
                            example: "Pizza",
                        },
                        description: {
                            type: "string",
                            example: "Pizzas tradicionais e especiais",
                        },
                        icon: {
                            type: "string",
                            example: "🍕",
                        },
                        display_order: {
                            type: "integer",
                            minimum: 0,
                            example: 1,
                        },
                        active: {
                            type: "boolean",
                            example: true,
                        },
                    },
                },

                ErrorCategory: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Erro ao processar a solicitação",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
