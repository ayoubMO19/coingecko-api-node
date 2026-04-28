import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Router } from 'express';
const router = Router();

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const API_REST_USER = process.env.API_REST_USER;
const API_REST_PASSWORD = process.env.API_REST_PASSWORD;

/**
 * @swagger
 * /login/login:
 *   post:
 *     summary: Obtiene un token JWT autenticado
 *     description: Permite obtener un token JWT pasando el usuario y la contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Token JWT generado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales inválidas
 */
router.post('/login', (req, res) => {
    console.log(req.body)
  const { username, password } = req.body;
  if (username === API_REST_USER && password === API_REST_PASSWORD) {
    // Generar token JWT
    const token = jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

export default router;
