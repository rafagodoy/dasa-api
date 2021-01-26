import throwError from "../helpers/throwError";
import ExamsLaboratoriesService from "../services/ExamsLaboratoriesService";

class ExamsLaboratories {
    async create(req, res, next) {
        try {
            if (!req.params.idExam || !req.params.idLaboratory) {
                return throwError(400, error, next);
            }

            const service = new ExamsLaboratoriesService(next);

            const serviceResponse = await service.associateExamInLaboratory(req.params.idExam, req.params.idLaboratory);

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.idExamLaboratory) {
                return throwError(400, error, next);
            }

            const service = new ExamsLaboratoriesService(next);
            const serviceResponse = await service.disassociateExamInLaboratory(req.params.idExamLaboratory);

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }
}

export default new ExamsLaboratories();
