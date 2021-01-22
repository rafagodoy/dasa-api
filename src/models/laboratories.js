import { sequelize, DataTypes, Model } from "../config/sequelize";

class laboratories extends Model {}

laboratories.init(
    {
        id_laboratories: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(150),
        },
        address: {
            type: DataTypes.STRING(200),
        },
        status: {
            type: DataTypes.ENUM("active", "disabled"),
        },
    },
    { sequelize, tableName: "laboratories" }
);

export default laboratories;
