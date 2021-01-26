import throwError from "../helpers/throwError";
import examsLaboratories from "../models/examsLaboratories";
import laboratories from "../models/laboratories";
import exams from "../models/exams";

export default class ExamsService {
    constructor(next) {
        this._next = next;
    }

    async listExamsAssociatesInALaboratory() {
        try {
            const allLaboratories = await laboratories.findAll({
                where: { status: "active" },
                include: {
                    model: exams,
                    through: {
                        attributes: [],
                    },
                },
            });

            return { status: "true", laboratories: allLaboratories };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async listLaboratoriesAssociateInAExam() {
        try {
            const allExams = await exams.findAll({
                where: { status: "active" },
                include: {
                    model: laboratories,
                    through: {
                        attributes: [],
                    },
                },
            });

            return { status: "true", exams: allExams };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async associateExamInLaboratory(idExam, idLaboratory) {
        try {
            const examLaboratory = await examsLaboratories.create({
                id_laboratories: parseInt(idLaboratory),
                id_exams: parseInt(idExam),
            });

            return { status: "true", exams_laboratories: examLaboratory };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async disassociateExamInLaboratory(idExamLaboratory) {
        try {
            console.log(idExamLaboratory);
            const exam = await examsLaboratories.destroy({
                where: { id_exams_laboratories: parseInt(idExamLaboratory) },
            });

            return { status: "true", message: "The exam-laboratory association was deleted successfully" };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }
}
