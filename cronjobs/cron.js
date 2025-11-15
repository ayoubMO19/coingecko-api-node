import cron from 'node-cron';

// Función principal del cron donde se configuran y se inicializan los cron jobs necesarios
export default function startCronJob() {
    // Se ejecuta cada 10 segundos  
    cron.schedule('*/10 * * * * *', () => {
        // Ping para mantener el bot activo en render
        axios.get('https://vexa-coingecko-api-nodejs.onrender.com/')
        .then(response => console.log('Ping successful!'))
        .catch(error => console.error('Ping failed'))
    });
}
