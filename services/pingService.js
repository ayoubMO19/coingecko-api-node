import axios from "axios";
import dotenv from "dotenv";

// Sirve para permitir cargar todas las variables del .env y poder utilizarlas en cualquier parte del archivo
dotenv.config();
// Carga una variable específica del .env
const API_KEY = process.env.COINGECKO_API_KEY;

// Función para comprobar conexión con coingecko
async function pingCoingeckoAPI(){
    try {
        // Definimos la variable que guardará la respuesta
        const response = await 
        axios.get(
            "https://api.coingecko.com/api/v3/ping", // Param 1: URL del endpoin que deseamos 
            {
                headers: {"x-cg-demo-api-key": `${API_KEY}`} // Param 2: Headers con api key
            }
        );
        // Retornamos la respuesta de la llamada
        return response.data
    } catch(error){
        console.error(`Error en la función pingCoingecko. Detalles del error: ${error}`)
    }
}

export { pingCoingeckoAPI };