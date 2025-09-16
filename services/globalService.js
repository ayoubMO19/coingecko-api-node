import axios from 'axios';
import dotenv from 'dotenv';

// Sirve para permitir cargar todas las variables del .env y poder utilizarlas en cualquier parte del archivo
dotenv.config();
// Carga una variable específica del .env
const API_KEY = process.env.COINGECKO_API_KEY;

async function getGlobalInfoAPI(){
    // Llamada API para obtenre información global del mercado    
    const response = await
    axios.get('https://api.coingecko.com/api/v3//global',
        {
            headers: {"x-cg-demo-api-key": `${API_KEY}`},
        }
    )
    return response.data;
}

export { getGlobalInfoAPI }