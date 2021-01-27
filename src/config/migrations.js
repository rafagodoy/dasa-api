module.exports = {
    development: {
        username: process.env.POSTGRES_USER || "postgres",
        password: process.env.POSTGRES_PASSWORD || "1234",
        database: process.env.POSTGRES_DATABASE || "dasa",
        host: process.env.POSTGRES_SERVER || "192.168.99.100",
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
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_SERVER,
        dialect: "postgres",
        protocol: "postgres",
        port: 5432,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    },
};
