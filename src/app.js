import express from "express";
import { config } from './config/env.js';import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';

// Configuraciones y Middlewares
import swaggerDocs from './config/swaggerDocs.js';
import swaggerUi from "swagger-ui-express";
import { authMiddleware } from './middlewares/auth.js';

// Rutas
import coinsRouter from './routes/coins.js';
import testsRouter from './routes/tests.js';
import globalRouter from './routes/global.js';
import loginRouter from './routes/login.js';


const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middlewares globales
app.use(cors({
  origin: config.allowedOrigins, 
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Documentación (Abierta)
app.get('/', (req, res) => res.redirect('/api-docs'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { 
  customCssUrl: '/css/custom-swagger.css' 
}));

// Rutas públicas
app.use('/login', loginRouter);

// rutas protegidas
app.use(authMiddleware); 
app.use('/coins', coinsRouter);
app.use('/tests', testsRouter);
app.use('/global', globalRouter);

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    }
  });
});

export default app;