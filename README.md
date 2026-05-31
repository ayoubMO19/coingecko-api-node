# Advanced Crypto Analyser API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)

</div>

Professional Node.js REST API designed to consume, process, and analyze real-time cryptocurrency data from the CoinGecko API, optimized with a high-performance Redis caching layer.

---

## 🚀 Tech Stack

* **Backend Core:** Node.js & Express.js
* **Caching Layer:** Redis
* **Authentication:** JSON Web Tokens (JWT)
* **API Documentation:** Swagger / OpenAPI 3.0
* **HTTP Client:** Axios (CoinGecko API v3 Integration)
* **Automation:** node-cron (Scheduled background tasks)
* **Environment Management:** dotenv

---

## ✨ Key Features

### Performance & Automation

* ⚡ **Redis Caching Layer:** Caches frequently requested market data to significantly reduce external API latency and optimize overall response times.
* ⏰ **Automated Crons:** Scheduled background jobs powered by `node-cron` to keep historical data up to date without manual intervention.

### Security & Architecture

* 🔐 **Secure Access Control:** Custom JWT middleware for stateless endpoint authorization.
* 🌐 **Configurable CORS:** Multi-origin CORS setup ready for production environments.
* 🏛️ **Decoupled MVC Pattern:** Clean separation of routes, controllers, services, and middlewares to ensure high code maintainability.

### API Documentation & Integration

* 📚 **Interactive API Docs:** Auto-generated Swagger UI accessible directly via web browser.
* 📡 **Resilient External Fetching:** Optimized integration targeting multiple CoinGecko v3 production endpoints.

---

## ⚡ Redis Caching Layer

The application integrates Redis to intercept frequent requests to CoinGecko's rate-limited endpoints.

### Core Benefits:
* **Reduced Latency:** Millisecond-level delivery for top-tier assets and global market states.
* **API Rate-Limit Protection:** Significantly lowers heavy direct outbound hits to CoinGecko API.
* **Scalability:** Prepares the server instances to serve massive parallel client read volumes.
* **Temporary Persistence:** Smart time-to-live (TTL) strategies configured for dynamic market data.

---

## 🏗️ Architecture

The project follows a refactored Model-View-Controller (MVC) directory breakdown:

```text
src/
├── config/          # Swagger configuration and initial app bindings
├── controllers/     # Request routers, parameter parsing and HTTP responses
├── cronjobs/        # Programmed scripts for background updates
├── middleware/      # Global error handlers, JWT authentication, and CORS security
├── routes/          # REST route declarations mapping to controllers
├── services/        # Business logic operations and outbound API wrapper clients
├── app.js           # Express instance initialization and middleware attachments
├── index.js         # Master cluster entry point execution script
└── server.js        # Server network listener bindings and port execution lifecycle
```

---

## 📡 Core API Endpoints

### 🔍 Market Insights
* `GET /coins/top-ten-coins` - Lists top 10 ranked assets
* `GET /coins/details/{id}` - Complete metric profile for an asset ID
* `GET /global/global` - Worldwide total cryptocurrency statistics

### 🔐 Authentication
* `POST /login/login` - Secure user identification & JWT token payload generation

### 📚 Interactive Docs
* `GET /api-docs` - Live Swagger UI instance

---

## ▶️ Quick Start

### Prerequisites

* Node.js 18+
* Redis Server instance active

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayoubMO19/coingecko-api-node.git
   cd coingecko-api-node
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Configure your configuration inside `.env`:**
   ```env
   PORT=3000
   JWT_SECRET_KEY=your_jwt_secret_key_here
   ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
   REDIS_URL=redis://localhost:6373
   ```

5. **Start production server:**
   ```bash
   npm start
   ```

---

## 👨‍💻 Author

**Ayoub Morghi Ouhda**

Full Stack Developer | Node.js · TypeScript · React · Java · SQL/NoSQL
