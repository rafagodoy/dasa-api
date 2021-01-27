import { Sequelize, DataTypes, Model } from "sequelize";

const Op = Sequelize.Op;

const getConnection = () => {
    if (process.env.NODE_ENV === "development") {
        return new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
            host: process.env.POSTGRES_SERVER,
            timezone: "-03:00",
            dialect: process.env.POSTGRES_DIALECT,
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            define: {
                timestamps: false,
                freezeTableName: true,
            },
            protocol: "postgres",
        });
    }

    if (process.env.NODE_ENV === "production") {
        return new Sequelize(process.env.DATABASE_URL, {
            timezone: "-03:00",
            dialect: process.env.POSTGRES_DIALECT,
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            define: {
                timestamps: false,
                freezeTableName: true,
            },
            protocol: "postgres",
            dialectOptions: {
                ssl: {
                    rejectUnauthorized: false,
                },
            },
        });
    }
};

const sequelize = getConnection();

export { sequelize, Model, DataTypes, Op };
