/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Realizar ping
 *     description: Este método hace ping a la API de GoinGecko
 *     responses:
 *       200:
 *         description: Respuesta exitosa ping
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: (V3) To the Moon!
 */
app.get("/ping", async (req, res) => {
    const data = await pingCoingecko();
    res.json({message: data});
});