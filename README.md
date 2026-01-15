# Advanced Crypto Analyser API 🚀

API robusta construida con Node.js y Express para obtener información relevante de criptomonedas, estadísticas, precios y detalles de valor.

## 🛠️ Tecnologías utilizadas
- **Node.js** (Runtime)
- **Express** (Framework web)
- **Swagger** (Documentación de API)
- **JWT** (Autenticación)
- **CORS** (Seguridad de acceso)
- **Dotenv** (Gestión de variables de entorno)

## 📁 Estructura del Proyecto
```
📁 proyecto-raíz/
├── 📁 src/
│   ├── 📁 config/           # Configuraciones (Swagger, Variables de entorno)
│   ├── 📁 middlewares/      # Middlewares (Auth, Error handler)
│   ├── 📁 controllers/      # Controladores de lógica
│   ├── 📁 services/         # Servicios y lógica de negocio
│   ├── 📁 routes/           # Definición de rutas y endpoints
│   ├── 📄 app.js            # Configuración de Express y middlewares
│   └── 📄 server.js         # Punto de entrada y arranque del servidor
├── 📁 public/               # Archivos estáticos (CSS personalizado para Swagger)
└── 🔒 .env                  # Variables de entorno (no incluido en el repo)
```
## 🚀 Instalación y Uso
1. **Clona el repositorio:**
git clone [repo](https://github.com/ayoubMO19/coingecko-api-node.git)
cd coingeko-api-node

2. **Instala las dependencias:**
npm install

3. **Configura las variables de entorno:**
Crea un archivo .env en la raíz del proyecto y completa los siguientes valores:
PORT=3000
JWT_SECRET_KEY=tu_clave_secreta_aqui
ALLOWED_ORIGINS=http://localhost:5173,https://tu-dominio.com
NODE_ENV=development

4. **Inicia el servidor:**
npm run start

## 📖 Documentación (Swagger)
Una vez que el servidor esté en marcha, puedes acceder a la documentación interactiva de la API en:
http://localhost:3000/api-docs
Aquí podrás probar todos los endpoints disponibles y ver los esquemas de datos.

## 🔐 Seguridad
- La mayoría de los endpoints están protegidos mediante JWT (JSON Web Tokens).
- Usa el endpoint /login para obtener un token válido.
    - User: VEXA
    - Password: 1234
- Incluye el token en las peticiones protegidas en el header de autorización:
Authorization: Bearer <tu_token>
