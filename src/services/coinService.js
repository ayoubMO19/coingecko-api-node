import axios from "axios";
import dotenv from "dotenv";
import { setCache, getCache } from "../cache/redis.js";

dotenv.config();

const API_KEY = process.env.COINGECKO_API_KEY;

const inFlightRequests = {};

// Función para obtener top 10 cryptomonedas
async function getTopTenCoins(limit = 10, vs = "usd"){
    try {
        const key = `topTenCoins:${vs}:${limit}`
        const expirationTime = 300;

        // If the key exists, return directly the cached data
        const value = await getCache(key)
        if (value) {
            console.log("getTopTenCoins - CACHE HIT")
            return JSON.parse(value);
        }

        // If has a promise in process, return it
        if (inFlightRequests[key]) {
            console.log('getTopTenCoins - Waiting EXISITING Promise')
            return inFlightRequests[key];
        }

        const promise = (async () => {
            try {
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
                
                // Cache the data to the next requests
                await setCache(key, JSON.stringify(response.data), expirationTime);
                console.log("getTopTenCoins - CACHE MISS")

                return response.data;
            } finally {
                // Delete promise in inFlightRequests
                delete inFlightRequests[key];
            }
        })();

        // Save de promise and return
        inFlightRequests[key] = promise;
        return promise;

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

export { getTopTenCoins, getCoinDetails };