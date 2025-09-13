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
       // await pingCoingecko(); // Ping para comprobar conexión con coingecko
       // const topTenCoins = await getTopTenCoins(); // Obtención de top 10 coins
       //console.log(topTenCoins)
       await getCoinDetails('bitcoin');
    } catch(error){
        console.error(`Error en la función main. Detalles del error: ${error}`)
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
        console.error(`Error en la función pingCoingecko. Detalles del error: ${error}`)
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
        const standarizedData = await standarizeTopTenCoins(response.data)
        return standarizedData
    } catch(error){
        console.error(`Error en la función getTopTenCoins. Detalles del error: ${error}`)
    }
}

// Función para estandarizar los datos del top 10 coins
async function standarizeTopTenCoins(data) {
    try{
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
    } catch(error) {
        console.error(`Error en la función standarizeTopTenCoins. Detalles del error: ${error}`)
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
        const coinDetails = await standarizeDetailsCoin(response.data)
        console.log(`Detalles de la moneda con id ${coinId}: ${JSON.stringify(coinDetails)}`)
        return coinDetails;
    } catch(error){
        console.log(`Error en la función getCoinDetails. Detalles del error: ${error}`)
    }
}
// Función para estandarizar los datos de los detalles de una moneda específica
async function standarizeDetailsCoin(data) {
    return {
        generic_details: {
            id: data.id,
            symbol: data.symbol,
            name: data.name,
            image: data.image,
            description: data.description.en 
        },
        market_data: {
            current_price: data.market_data.current_price.usd,
            market_cap: data.market_data.market_cap.usd,
            market_cap_rank: data.market_data.market_cap_rank,
            total_volume: data.market_data.total_volume.usd,
            high_24h: data.market_data.high_24h.usd,
            low_24h: data.market_data.low_24h.usd,
            price_change_24h: data.market_data.price_change_24h,
            price_change_percentage_24h: data.market_data.price_change_percentage_24h,
            ath: data.market_data.ath.usd,
            ath_date: data.market_data.ath_date.usd,
            atl: data.market_data.atl.usd,
            atl_date: data.market_data.atl_date.usd
        },
        supply: {
            circulating_supply: data.market_data.circulating_supply,
            total_supply: data.market_data.total_supply,
            max_supply: data.market_data.max_supply
        }
    }
}
// Función para obtener resumen global del mercado

// Ejecución de función main
await main()