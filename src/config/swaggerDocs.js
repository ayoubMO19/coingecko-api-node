// Configuración swagger UI
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerOptions = {
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
        security: [{ bearerAuth: [] }] // Aplica a todas las rutas si se pone aquí
    },
    apis: [path.join(__dirname, "../routes/*.js")] // aquí el swagger buscará los comentarios JSDoc
}

export default swaggerJSDoc(swaggerOptions)