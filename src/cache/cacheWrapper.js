import { setCache, getCache } from './redis.js';

const inFlightRequests = {};

export async function cacheWrapper(fn, options) {
    return async (...args) => {
        // Generar key con options
        const key = options.key(args);
        
        // Comprobar si existe en cache con getCache
        const value = await getCache(key);
        if (value) {
            console.log("getTopTenCoins - CACHE HIT")
            return JSON.parse(value);
        }

        // Comprobar si existe una promesa en proceso en inFlightRequest
        if (inFlightRequests[key]) {
            // Si existe retornamos la promesas
            return inFlightRequests[key];
        }

        // Si no existe ejecutamos la función guardandola en una promesa
        const promise = (async () => {
            try {
                const result = await fn(...args);
                await setCache(key, JSON.stringify(result), options.ttl);
                console.log("getTopTenCoins - CACHE MISS")
                return result;
            } finally {
                // Eliminamos la promesa de inFlightRequests cuando termine
                delete inFlightRequests[key];
            }
        })();

        // La asignamos a inFlightRequests
        inFlightRequests[key] = promise;

        // Retornamos la promesa
        return promise;
    }
}