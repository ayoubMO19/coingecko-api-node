import {getTopTenCoins, getCoinDetails} from '../services/coinService.js'

// Function to get top ten coins controller
export async function getTopTenCoinsController(req, res) {
    try {
        const data = await getTopTenCoins();
        res.json({ message: data });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

// Función para estandarizar los datos de los detalles de una moneda específica
export async function getCoinDetailsController(req, res) {
    try {
        const { coinId } = req.query;
        const data = await getCoinDetails(coinId)
        res.json({ message: data });
    } catch(error) {
        res.status(500).json({ error: "Internal server error" });
    }
}