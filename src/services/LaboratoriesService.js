import throwError from "../helpers/throwError";
import laboratories from "../models/laboratories";

export default class LaboratoriesService {
    constructor(data, next) {
        this._data = data;
        this._next = next;
    }

    async listLaboratories() {
        try {
            const laboratory = await laboratories.findAll({ where: { status: "active" } });

            return { status: "true", laboratory };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async viewLaboratory(idLaboratory) {
        try {
            const laboratory = await laboratories.findOne({ where: { id_laboratories: parseInt(idLaboratory) } });

            return { status: "true", laboratory };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async createLaboratory() {
        try {
            const laboratory = await laboratories.create({
                ...this._data,
                status: "active",
            });

            return { status: "true", laboratory };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async updateLaboratory(idLaboratory) {
        try {
            const laboratory = await laboratories.update(this._data, {
                where: { id_laboratories: parseInt(idLaboratory) },
            });

            return { status: "true", message: "Laboratory update successfully" };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async deleteLaboratory(idLaboratory) {
        try {
            const laboratory = await laboratories.update(
                { status: "disabled" },
                {
                    where: { id_laboratories: parseInt(idLaboratory) },
                }
            );

            return { status: "true", message: "The laboratory was deleted successfully" };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }
}
