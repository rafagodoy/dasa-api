import { registerAndUpdateLaboratorySchema } from "../validations/laboratories";
import validateSchema from "../validations/validateSchema";
import throwError from "../helpers/throwError";
import LaboratoriesService from "../services/LaboratoriesService";
import ExamsLaboratoriesService from "../services/ExamsLaboratoriesService";

class Laboratories {
    async index(req, res, next) {
        try {
            const service = new ExamsLaboratoriesService(next);
            const serviceResponse = await service.listExamsAssociatesInALaboratory();

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }

    async create(req, res, next) {
        try {
            const { hasErrorValidation, error } = await validateSchema(
                req.body,
                registerAndUpdateLaboratorySchema,
                next
            );

            if (hasErrorValidation) {
                return throwError(400, error, next);
            }

            const service = new LaboratoriesService(req.body, next);

            const serviceResponse = await service.createLaboratory();

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }

    async view(req, res, next) {
        try {
            const service = new LaboratoriesService(null, next);
            const serviceResponse = await service.viewLaboratory(req.params.idLaboratory);

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }

    async update(req, res, next) {
        try {
            const { hasErrorValidation, error } = await validateSchema(
                req.body,
                registerAndUpdateLaboratorySchema,
                next
            );

            if (hasErrorValidation) {
                return throwError(400, error, next);
            }

            const service = new LaboratoriesService(req.body, next);
            const serviceResponse = await service.updateLaboratory(req.params.idLaboratory);

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }

    async delete(req, res, next) {
        try {
            const service = new LaboratoriesService(null, next);
            const serviceResponse = await service.deleteLaboratory(req.params.idLaboratory);

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }
}

export default new Laboratories();
