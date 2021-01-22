import throwError from "../helpers/throwError";
import exams from "../models/exams";

export default class ExamsService {
    constructor(data, next) {
        this._data = data;
        this._next = next;
    }

    async listExams() {
        try {
            const exam = await exams.findAll({ where: { status: "active" } });

            return { status: "true", exam };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async viewExam(idExam) {
        try {
            const exam = await exams.findOne({ where: { id_exams: parseInt(idExam) } });

            return { status: "true", exam };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async createExam() {
        try {
            const exam = await exams.create({
                ...this._data,
                status: "active",
            });

            return { status: "true", exam };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async updateExam(idExam) {
        try {
            const exam = await exams.update(this._data, {
                where: { id_exams: parseInt(idExam) },
            });

            return { status: "true", message: "Exam update successfully" };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async deleteExam(idExam) {
        try {
            const exam = await exams.update(
                { status: "disabled" },
                {
                    where: { id_exams: parseInt(idExam) },
                }
            );

            return { status: "true", message: "The exam was deleted successfully" };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }
}
