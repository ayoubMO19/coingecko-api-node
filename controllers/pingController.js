
import { pingCoingeckoAPI } from "../services/pingService";
async function doPingCoingecko() {
    try {
        const response = await pingCoingeckoAPI();
        return response;
    } catch(error) {
        console.error(`Error en la función doPingCoingecko. Detalles del error: ${error}`)
    }
}

export { doPingCoingecko }