
export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Advanced Crypto Analyser",
            version: "1.0.0",
            description: "API para obtener información relevante de criptomonedas, estadisticas, porcentajes, precios y detalles entre otro tipo de información de valor.",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ["./routes/*.js"]
}
