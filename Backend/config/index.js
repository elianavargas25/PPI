require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== "production",
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    dbUser: process.env.DB_USER || "admin",
    dbPassword: process.env.DB_PASSWORD || "admin",
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME || "FINANZAS",
    seed: process.env.SEED = "esto-es-en-desarrollo"
}

module.exports = { config };