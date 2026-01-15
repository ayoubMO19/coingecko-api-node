import { standarizeTopTenCoins, standarizeDetailsCoin } from '../controllers/coinController.js'
import { Router } from 'express';
const router = Router();

/**
 * @swagger
 * /coins/top-ten-coins:
 *   get:
 *     summary: Obtener top 10 mejores criptomonedas del momento actual
 *     description: Este método retorna un top 10 de las mejores criptomonedas del momento
 *     responses:
 *       200:
 *         description: Respuesta exitosa top 10 criptomonedas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Bitcoin
 *                       symbol:
 *                         type: string
 *                         example: btc
 *                       current_price:
 *                         type: number
 *                         example: 115839
 *                       market_cap:
 *                         type: number
 *                         example: 2308411299764
 *                       market_cap_rank:
 *                         type: integer
 *                         example: 1
 *                       price_change_percentage_24h:
 *                         type: number
 *                         example: 0.63626
 *                       total_volume:
 *                         type: number
 *                         example: 40503096103
 *             example:
 *               message:
 *                 - name: Bitcoin
 *                   symbol: btc
 *                   current_price: 115839
 *                   market_cap: 2308411299764
 *                   market_cap_rank: 1
 *                   price_change_percentage_24h: 0.63626
 *                   total_volume: 40503096103
 *                 - name: Ethereum
 *                   symbol: eth
 *                   current_price: 4693.06
 *                   market_cap: 566646410917
 *                   market_cap_rank: 2
 *                   price_change_percentage_24h: 3.19826
 *                   total_volume: 37350445571
 *                 - name: XRP
 *                   symbol: xrp
 *                   current_price: 3.15
 *                   market_cap: 187677741751
 *                   market_cap_rank: 3
 *                   price_change_percentage_24h: 3.57635
 *                   total_volume: 6099361633
 *                 - name: Tether
 *                   symbol: usdt
 *                   current_price: 1.001
 *                   market_cap: 170091973210
 *                   market_cap_rank: 4
 *                   price_change_percentage_24h: 0.01269
 *                   total_volume: 103765707061
 *                 - name: Solana
 *                   symbol: sol
 *                   current_price: 240.48
 *                   market_cap: 130441570465
 *                   market_cap_rank: 6
 *                   price_change_percentage_24h: 0.38837
 *                   total_volume: 9131888227
 *                 - name: BNB
 *                   symbol: bnb
 *                   current_price: 936.63
 *                   market_cap: 130433935814
 *                   market_cap_rank: 5
 *                   price_change_percentage_24h: 3.16062
 *                   total_volume: 1717246340
 *                 - name: USDC
 *                   symbol: usdc
 *                   current_price: 0.999802
 *                   market_cap: 73136709495
 *                   market_cap_rank: 7
 *                   price_change_percentage_24h: -0.00106
 *                   total_volume: 18368733442
 *                 - name: Dogecoin
 *                   symbol: doge
 *                   current_price: 0.297082
 *                   market_cap: 44795181067
 *                   market_cap_rank: 8
 *                   price_change_percentage_24h: 12.66793
 *                   total_volume: 7744486214
 *                 - name: Lido Staked Ether
 *                   symbol: steth
 *                   current_price: 4681.98
 *                   market_cap: 40339766199
 *                   market_cap_rank: 9
 *                   price_change_percentage_24h: 3.08619
 *                   total_volume: 38190981
 *                 - name: Cardano
 *                   symbol: ada
 *                   current_price: 0.941528
 *                   market_cap: 34385095315
 *                   market_cap_rank: 10
 *                   price_change_percentage_24h: 5.7251
 *                   total_volume: 2392832545
 */
router.get("/top-ten-coins", async (req, res) => {
    const data = await standarizeTopTenCoins();
    res.json({message: data});
});

/**
 * @swagger
 * /coins/get-coin-details:
 *   get:
 *     summary: Obtener información detallada de una criptomoneda
 *     description: Este método retorna información detallada de una criptomoneda específica
 *     parameters:
 *       - name: coinId
 *         in: query
 *         description: id de la criptomoneda
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa detalles de criptomoneda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                     generic_details:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: bitcoin
 *                         symbol:
 *                           type: string
 *                           example: btc
 *                         name:
 *                           type: string
 *                           example: Bitcoin
 *                         image:
 *                           type: object
 *                           properties:
 *                             thumb:
 *                               type: string
 *                               example: "https://coin-images.coingecko.com/coins/images/1/thumb/bitcoin.png?1696501400"
 *                             small:
 *                               type: string
 *                               example: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png?1696501400"
 *                             large:
 *                               type: string
 *                               example: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
 *                         description:
 *                           type: string
 *                           example: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process. Bitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks. Bitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the SHA-256 hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes. Being the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as Litecoin, Peercoin, Primecoin, and so on. The cryptocurrency then took off with the innovation of the turing-complete smart contract by Ethereum which led to the development of other amazing projects such as EOS, Tron, and even crypto-collectibles such as CryptoKitties."
 *                     market_data:
 *                       type: object
 *                       properties:
 *                         current_price:
 *                           type: number
 *                           example: 115956
 *                         market_cap:
 *                           type: number
 *                           example: 2309062892450
 *                         market_cap_rank:
 *                           type: integer
 *                           example: 1
 *                         total_volume:
 *                           type: number
 *                           example: 40516889401
 *                         high_24h:
 *                           type: number
 *                           example: 116705
 *                         low_24h:
 *                           type: number
 *                           example: 114991
 *                         price_change_24h:
 *                           type: number
 *                           example: 828.287
 *                         price_change_percentage_24h:
 *                           type: number
 *                           example: 0.71945
 *                         ath:
 *                           type: number
 *                           example: 124128
 *                         ath_date:
 *                           type: string
 *                           format: date-time
 *                           example: 2025-08-14T00:37:02.582Z
 *                         atl:
 *                           type: number
 *                           example: 67.81
 *                         atl_date:
 *                           type: string
 *                           format: date-time
 *                           example: 2013-07-06T00:00:00.000Z
 *                     supply:
 *                       type: object
 *                       properties:
 *                         circulating_supply:
 *                           type: number
 *                           example: 19919928
 *                         total_supply:
 *                           type: number
 *                           example: 19919928
 *                         max_supply:
 *                           type: number
 *                           example: 21000000
 *             example:
 *               message:
 *                 generic_details:
 *                   id: bitcoin
 *                   symbol: btc
 *                   name: Bitcoin
 *                   image:
 *                     thumb: "https://coin-images.coingecko.com/coins/images/1/thumb/bitcoin.png?1696501400"
 *                     small: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png?1696501400"
 *                     large: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
 *                   description: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process. Bitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks. Bitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the SHA-256 hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes. Being the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as Litecoin, Peercoin, Primecoin, and so on. The cryptocurrency then took off with the innovation of the turing-complete smart contract by Ethereum which led to the development of other amazing projects such as EOS, Tron, and even crypto-collectibles such as CryptoKitties."
 *                 market_data:
 *                   current_price: 115956
 *                   market_cap: 2309062892450
 *                   market_cap_rank: 1
 *                   total_volume: 40516889401
 *                   high_24h: 116705
 *                   low_24h: 114991
 *                   price_change_24h: 828.287
 *                   price_change_percentage_24h: 0.71945
 *                   ath: 124128
 *                   ath_date: 2025-08-14T00:37:02.582Z
 *                   atl: 67.81
 *                   atl_date: 2013-07-06T00:00:00.000Z
 *                 supply:
 *                   circulating_supply: 19919928
 *                   total_supply: 19919928
 *                   max_supply: 21000000
 */

router.get("/get-coin-details", async (req, res) => {
    const data = await standarizeDetailsCoin(req.query.coinId);
    res.json({message: data});
});

export default router;
