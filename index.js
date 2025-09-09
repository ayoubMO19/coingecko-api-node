import axios from "axios";
import dotenv from "dotenv";

// Sirve para permitir cargar todas las variables del .env y poder utilizarlas en cualquier parte del archivo index.js
dotenv.config();

// Carga una variable específica del .env
const API_KEY = process.env.COINGECKO_API_KEY;

// Creamos una función main para manejar las llamadas
async function main(){
    // try catch para capturar errores
    try {
       await pingCoingecko(); // Ping para comprobar conexión con coingecko
       const topTenCoins = await getTopTenCoins(); // Obtención de top 10 coins
       console.log(topTenCoins)
    } catch(error){
        console.error("Ha habido un problema: ", error)
    }
}

// Función para comprobar conexión con coingecko
async function pingCoingecko(){
    try {
        // Realizamos 1 llamada de ejemplo para probar la API
        // Definimos la variable que guardará la respuesta
        const response = await 
        axios.get(
            "https://api.coingecko.com/api/v3/ping", // Param 1: URL del endpoin que deseamos 
            {
                headers: {"x-cg-demo-api-key": `${API_KEY}`} // Param 2: Headers con api key
            }
        );

        console.log(response.data)

    } catch(error){
        console.error("Ha habido un problema: ", error)
    }
}

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
        const standarizedData = await standarizeTop10Coins(response.data)
        return standarizedData
    } catch(error){
        console.error(`La llamada a fallado: ${error}`)
    }
}

// Función para estandarizar los datos del top 10 coins
async function standarizeTop10Coins(data) {
    let standarizedData = [];
    data.forEach(coin => {
        // console.log(coin.name, coin.symbol, coin.current_price, coin.market_cap, coin.market_cap_rank, coin.price_change_percentage_24h, coin.total_volume) 
        standarizedData.push({
            "name": coin.name,
            "symbol": coin.symbol,
            "current_price": coin.current_price,
            "market_cap": coin.market_cap,
            "market_cap_rank": coin.market_cap_rank,
            "price_change_percentage_24h": coin.price_change_percentage_24h,
            "total_volume": coin.total_volume
        })
    });
    return standarizedData;
} 
// Función para obtener información de 1 cryptomoneda específica

// Función para obtener resumen global del mercado

// Ejecución de función main
await main()