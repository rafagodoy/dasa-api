import { Sequelize, DataTypes, Model } from "sequelize";

const Op = Sequelize.Op;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
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
    ssl: true,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

export { sequelize, Model, DataTypes, Op };
