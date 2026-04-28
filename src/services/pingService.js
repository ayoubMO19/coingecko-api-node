import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.COINGECKO_API_KEY;

// Función para comprobar conexión con coingecko
async function pingCoingeckoAPI(){
    try {
        const response = await 
        axios.get(
            "https://api.coingecko.com/api/v3/ping",
            {
                headers: {"x-cg-demo-api-key": `${API_KEY}`}
            }
        );
        return response.data
    } catch(error){
        console.error(`Error en la función pingCoingecko. Detalles del error: ${error}`)
    }
}

export { pingCoingeckoAPI };