
import { getGlobalInfoAPI } from '../services/globalService.js'
// Función para obtener información global del mercado de criptomonedas
async function getGlobalInfo() {
    try {
        const response = await getGlobalInfoAPI()
        return response;
    } catch(error) {
        console.error(`Error en la función getGlobalInfo. Detalles del error: ${error}`)
    }
}

export { getGlobalInfo }