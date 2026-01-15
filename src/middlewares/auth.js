import jwt from 'jsonwebtoken';
import { config } from '../config/env.js'; // Importamos config

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(' ')[1];

  try {
    // Usamos config.jwtSecret
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    // Cambiado a 401 por ser error de autenticación (token inválido)
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};