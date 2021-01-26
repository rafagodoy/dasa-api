import { registerAndUpdateExamSchema } from "../validations/exams";
import validateSchema from "../validations/validateSchema";
import throwError from "../helpers/throwError";
import ExamsService from "../services/ExamsService";
import ExamsLaboratoriesService from "../services/ExamsLaboratoriesService";

class Exams {
    async index(req, res, next) {
        try {
            const service = new ExamsLaboratoriesService(next);
            const serviceResponse = await service.listLaboratoriesAssociateInAExam();

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }

    async create(req, res, next) {
        try {
            const { hasErrorValidation, error } = await validateSchema(req.body, registerAndUpdateExamSchema, next);

            if (hasErrorValidation) {
                return throwError(400, error, next);
            }

            const service = new ExamsService(req.body, next);

            const serviceResponse = await service.createExam();

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }

    async view(req, res, next) {
        try {
            const service = new ExamsService(null, next);
            const serviceResponse = await service.viewExam(req.params.idExam);

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }

    async update(req, res, next) {
        try {
            const { hasErrorValidation, error } = await validateSchema(req.body, registerAndUpdateExamSchema, next);

            if (hasErrorValidation) {
                return throwError(400, error, next);
            }

            const service = new ExamsService(req.body, next);
            const serviceResponse = await service.updateExam(req.params.idExam);

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }

    async delete(req, res, next) {
        try {
            const service = new ExamsService(null, next);
            const serviceResponse = await service.deleteExam(req.params.idExam);

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }
}

export default new Exams();
