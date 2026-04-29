import { createClient } from "redis";

// Create redis client
const client = createClient();

// Error manage
client.on('error', err => console.log('Redis Client Error: ', err));

// Start redis client
await client.connect();

// Function to cache data
export async function setCache(key, value, ttl) {
    await client.set(key, value, 'EX', ttl);
}

// Function to get cached data
export async function getCache(key) {
    return await client.get(key);
}
