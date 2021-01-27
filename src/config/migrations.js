module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_SERVER,
        dialect: "postgres",
    },
    test: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_SERVER,
        dialect: "postgres",
    },
    production: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: "dasa-api-personal",
        host: "127.0.0.1",
        dialect: "postgres",
        ssl: true,
        dialectOptions: {
            ssl: true,
        },
    },
};
