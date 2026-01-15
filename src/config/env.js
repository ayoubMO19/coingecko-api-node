import dotenv from 'dotenv';
dotenv.config();

// Validación rápida de variables críticas
if (!process.env.JWT_SECRET_KEY) {
  console.warn("⚠️ WARNING: JWT_SECRET_KEY is not defined in .env file!");
}

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET_KEY,
  allowedOrigins: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:5173'],
  nodeEnv: process.env.NODE_ENV || 'development',
};