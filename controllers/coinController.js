import {getTopTenCoins, getCoinDetails} from '../services/coinService.js'
// Función para estandarizar los datos del top 10 coins
async function standarizeTopTenCoins() {
    try{
        const data = await getTopTenCoins() 
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

// Función para estandarizar los datos de los detalles de una moneda específica
async function standarizeDetailsCoin(coinId) {
    const data = await getCoinDetails(coinId)
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

// Función para estandarizar datos de resumen global del mercado

export { standarizeTopTenCoins, standarizeDetailsCoin };