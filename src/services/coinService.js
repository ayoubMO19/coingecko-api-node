import axios from "axios";
import dotenv from "dotenv";
import { cacheWrapper } from "../cache/cacheWrapper.js";

dotenv.config();

const API_KEY = process.env.COINGECKO_API_KEY;

async function fetchTopTenCoins(limit = 10, vs = "usd"){
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

        return response.data;

    } catch(error){
        console.error(`Error en la función getTopTenCoins. Detalles del error: ${error}`)
        throw error;
    }
}

const topTenCoinsOptions = {
    key: (args) => {
        const [limit = 10, vs = "usd"] = args;
        return `topTenCoins:${limit}:${vs}`;
    },
    ttl: 300
}

const topTenCoinsCached = await cacheWrapper(fetchTopTenCoins, topTenCoinsOptions);

// Función para obtener y estandarizar los datos del top 10 coins
export async function getTopTenCoins() {
    try{
        const data = await topTenCoinsCached() 
        
        return data.map(coin => ({
            "name": coin.name,
            "symbol": coin.symbol,
            "current_price": coin.current_price,
            "market_cap": coin.market_cap,
            "market_cap_rank": coin.market_cap_rank,
            "price_change_percentage_24h": coin.price_change_percentage_24h,
            "total_volume": coin.total_volume
        }));

    } catch(error) {
        console.error(`Error en la función getTopTenCoins. Detalles del error: ${error}`);
        throw error;
    }
} 

async function fetchCoinDetails(coinId) {
    try{
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinId}`,
            {
                 headers: {"x-cg-demo-api-key": `${API_KEY}`}
            }
        );
        return response.data;
    } catch(error){
        console.error(`Error en la función getCoinDetails. Detalles del error: ${error}`);
        throw error;
    }
}

const coinDetailsOptions = {
    key: (args) => {
        return `coinDetails:${args[0]}`
    },
    ttl: 150
};

const coinDetailsCached = await cacheWrapper(fetchCoinDetails, coinDetailsOptions);

// Función para obtener y estandarizar los detalles de 1 moneda por su id
export async function getCoinDetails(coinId) {
    try {
        const data = await coinDetailsCached(coinId);
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
    } catch(error) {
        console.error(`Error en la función getCoinDetails. Detalles del error: ${error}`);
        throw error;
    }
}