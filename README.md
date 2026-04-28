# 🚀 Advanced Crypto Analyser API

API REST profesional en Node.js que consume y procesa datos de la API de CoinGecko para análisis de criptomonedas en tiempo real.

## 🏗️ Arquitectura

```
src/
├── controllers/     # Lógica de controladores MVC
├── routes/          # Definición de rutas REST
├── services/        # Lógica de negocio y llamadas a APIs
├── middleware/      # Autenticación y CORS
├── config/          # Configuración Swagger y variables
├── cronjobs/        # Tareas programadas
└── index.js         # Punto de entrada
```

## ⚡ Características Técnicas

- **🔐 Autenticación JWT** con middleware personalizado
- **📚 Documentación Swagger/OpenAPI 3.0** auto-generada
- **🌐 CORS configurable** para múltiples orígenes
- **⏰ Tareas programadas** con node-cron
- **🏛️ Arquitectura MVC** con separación de responsabilidades
- **🔧 Variables de entorno** para configuración segura

## 🛠️ Stack Tecnológico

- **Node.js** + **Express.js** - Backend framework
- **JWT** - Autenticación y autorización
- **Swagger/OpenAPI** - Documentación de API
- **Axios** - Cliente HTTP para llamadas a CoinGecko
- **node-cron** - Tareas programadas
- **dotenv** - Gestión de variables de entorno

## 📡 Endpoints Principales

### 🔍 Datos de Mercado
- `GET /coins/top-ten-coins` - Top 10 criptomonedas
- `GET /coins/details/{id}` - Detalles de criptomoneda
- `GET /global/global` - Estadísticas globales del mercado

### 🔐 Autenticación
- `POST /login/login` - Generación de token JWT

### 📚 Documentación
- `GET /api-docs` - Interfaz Swagger UI

## 🚀 Instalación y Ejecución

```bash
# Clonar repositorio
git clone https://github.com/ayoubMO19/coingecko-api-node.git
cd coingecko-api-node

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar servidor
npm start
```

## 🔧 Variables de Entorno

```env
PORT=3000
JWT_SECRET_KEY=tu_secreto_jwt
ALLOWED_ORIGINS=http://localhost:5173,https://tudominio.com
```

## 📊 APIs Externas Consumidas

- **CoinGecko API v3** - Datos de criptomonedas
  - `/api/v3/ping` - Health check
  - `/api/v3/coins/markets` - Datos de mercado
  - `/api/v3/coins/{id}` - Detalles específicos
  - `/api/v3/global` - Estadísticas globales

## 🎯 Aspectos Destacados

- ✅ **Código limpio y mantenible** con patrón MVC
- ✅ **Seguridad implementada** con JWT y CORS
- ✅ **Documentación completa** con Swagger UI
- ✅ **Configuración externalizada** con variables de entorno
- ✅ **Arquitectura escalable** y modular
- ✅ **Manejo de errores** robusto
- ✅ **Tareas automatizadas** para actualización de datos

---

**Desarrollado con Node.js y mejores prácticas de desarrollo de software.**
