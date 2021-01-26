import { sequelize, DataTypes, Model } from "../config/sequelize";
import laboratories from "./laboratories";
import exams from "./exams";

class examsLaboratories extends Model {}

examsLaboratories.init(
    {
        id_exams_laboratories: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        id_laboratories: {
            type: DataTypes.INTEGER,
        },
        id_exams: {
            type: DataTypes.INTEGER,
        },
    },
    { sequelize, tableName: "exams_laboratories" }
);

laboratories.belongsToMany(exams, { through: examsLaboratories, foreignKey: "id_laboratories" });
exams.belongsToMany(laboratories, { through: examsLaboratories, foreignKey: "id_exams" });

export default examsLaboratories;
