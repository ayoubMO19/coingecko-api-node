import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import coinsRouter from './routes/coins.js';
import testsRouter from './routes/tests.js';
import globalRouter from './routes/global.js';
import loginRouter from './routes/login.js';
import startCronJob from './cronjobs/cron.js';
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/auth.js';
import { corsMiddleware } from './middleware/cors.js';
import { swaggerOptions } from './config/swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.listen(PORT)

const allowedOrigins = [
  'http://localhost:5173', // Desarrollo local
  'https://vexa-dash.vercel.app', // Producción Vercel
]; // TODO: Mover a variable de entorno

// Permitir al frontend realizar llamadas
app.use(corsMiddleware(allowedOrigins));

// Objeto de configuración swagger UI
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

// Importars de rutas
app.use('/coins', coinsRouter);

app.use('/tests', testsRouter);

app.use('/global', globalRouter);

app.use('/global', globalRouter);

app.use('/login', loginRouter);

// Inciación de cronjob
startCronJob();