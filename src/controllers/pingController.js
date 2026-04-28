
import { pingCoingeckoAPI } from "../services/pingService";

// Función para hacer ping a la API de CoinGecko
async function doPingCoingecko() {
    try {
        const response = await pingCoingeckoAPI();
        return response;
    } catch(error) {
        console.error(`Error en la función doPingCoingecko. Detalles del error: ${error}`)
    }
}

export { doPingCoingecko }