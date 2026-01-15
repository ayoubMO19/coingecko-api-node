import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import coinsRouter from '../routes/coins.js';
import testsRouter from '../routes/tests.js';
import globalRouter from '../routes/global.js';
import loginRouter from '../routes/login.js';
import jwt from 'jsonwebtoken';
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const PORT = process.env.PORT;
// Auth Middlware configuration
function authMiddleware(req, res, next) {
  if (req.path === '/login/login') return next(); // Permitir login sin token

  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY); // Verificar token con clave secreta
    req.user = decoded; // Opcional: guardar datos de usuario decodificados
    next();
  } catch (err) {
    // Token inválido o expirado
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// Creamos app express
const app = express();

const allowedOrigins = [
  'http://localhost:5173', // Desarrollo local
  'https://vexa-dash.vercel.app', // Producción Vercel
];

// Permitir al frontend realizar llamadas
app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  credentials: true // Si usas cookies o autenticación
}));

// Esto le indica a Express que parsea el cuerpo JSON de las peticiones HTTP y las pone en req.body
app.use(express.json());

// Definimos el puerto en el que escucha la app
app.listen(PORT)

// Objeto de configuración swagger UI
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
    apis: ["./routes/*.js"] // aquí el swagger buscará los comentarios JSDoc
}

// Asignamos las opciones de swagger a swaggerJSDoc
const swaggerDocs = swaggerJSDoc(swaggerOptions)

app.use(express.static(path.join(__dirname, '..', 'public')));

// Redireccionamos la url por defecto a /api-docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Exponemos la ruta de api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {customCssUrl: '/css/custom-swagger.css'} ));

// Proteger el uso de las llamadas limitado para usuarios autenticados
app.use(authMiddleware);

// Importar las rutas de coins
app.use('/coins', coinsRouter);

// Importar las rutas de tests
app.use('/tests', testsRouter);

// Importar las rutas de global
app.use('/global', globalRouter);

// Importar las rutas de global
app.use('/global', globalRouter);

// Importar las rutas de login
app.use('/login', loginRouter);
