import { sequelize, DataTypes, Model } from "../config/sequelize";

class exams extends Model {}

exams.init(
    {
        id_exams: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(150),
        },
        type: {
            type: DataTypes.ENUM("clinical_analysis", "image"),
        },
        status: {
            type: DataTypes.ENUM("active", "disabled"),
        },
    },
    { sequelize, tableName: "exams" }
);

export default exams;
