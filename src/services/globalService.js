import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.COINGECKO_API_KEY;

// Función para obtener información global del mercado
async function getGlobalInfoAPI(){
    const response = await
    axios.get('https://api.coingecko.com/api/v3/global',
        {
            headers: {"x-cg-demo-api-key": `${API_KEY}`},
        }
    )
    return response.data;
}

export { getGlobalInfoAPI }