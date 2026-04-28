import cron from 'node-cron';
import axios from 'axios';

// Función principal del cron donde se configuran y se inicializan los cron jobs necesarios
export default function startCronJob() {
    // Se ejecuta cada 10 segundos  
    cron.schedule('*/10 * * * * *', () => {
        // Ping para mantener el bot activo en render
        axios.get('https://vexa-coingecko-api-nodejs.onrender.com/') // TODO: Mover la URL a una variable de entorno
        .then(response => console.log('Ping successful!'))
        .catch(error => console.error('Ping failed'))
    });
}
