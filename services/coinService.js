import axios from "axios";
import dotenv from "dotenv";

// Sirve para permitir cargar todas las variables del .env y poder utilizarlas en cualquier parte del archivo index.js
dotenv.config();
// Carga una variable específica del .env

const API_KEY = process.env.COINGECKO_API_KEY;
// Función para obtener top 10 cryptomonedas
async function getTopTenCoins(limit = 10, vs = "usd"){
    try {
        // Realizamos la llamada al endpoint
        const response = await
        axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                headers: {"x-cg-demo-api-key": `${API_KEY}`},
                params: {
                    vs_currency: vs,
                    order: "market_cap_desc",
                    per_page: limit,
                    page: 1,
                    sparkline: false
                } 
            }
        );
        return response.data
    } catch(error){
        console.error(`Error en la función getTopTenCoins. Detalles del error: ${error}`)
    }
}

// Función para obtener información más detallada de 1 cryptomoneda específica
async function getCoinDetails(coinId) {
    try{
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinId}`,
            {
                 headers: {"x-cg-demo-api-key": `${API_KEY}`}
            }
        )
        return response.data
    } catch(error){
        console.log(`Error en la función getCoinDetails. Detalles del error: ${error}`)
    }
}

// Función para obtener resumen global del mercado

export { getTopTenCoins, getCoinDetails };