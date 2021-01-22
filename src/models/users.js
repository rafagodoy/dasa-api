import { sequelize, DataTypes, Model } from "../config/sequelize";

class users extends Model {}

users.init(
    {
        id_users: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(150),
        },
        email: {
            type: DataTypes.STRING(150),
        },
        password: {
            type: DataTypes.STRING(150),
        },
        status: {
            type: DataTypes.ENUM("active", "disabled"),
        },
    },
    { sequelize, tableName: "users" }
);

export default users;
