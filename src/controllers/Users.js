import { registerUserSchema, updateUserSchema } from "../validations/users";
import validateSchema from "../validations/validateSchema";
import throwError from "../helpers/throwError";
import UsersService from "../services/UsersService";

class Users {
    async create(req, res, next) {
        try {
            const { hasErrorValidation, error } = await validateSchema(req.body, registerUserSchema, next);

            if (hasErrorValidation) {
                return throwError(400, error, next);
            }

            const service = new UsersService(req.body, next);

            const serviceResponse = await service.createUser();

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }

    async view(req, res, next) {
        try {
            if (parseInt(req.params.id) !== parseInt(req.headers.id_user)) {
                return throwError(403, "The user does't matched with searched id", next);
            }

            const service = new UsersService(null, next);
            const serviceResponse = await service.viewUser(req.headers.id_user);

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }

    async update(req, res, next) {
        try {
            const { hasErrorValidation, error } = await validateSchema(req.body, updateUserSchema, next);

            if (hasErrorValidation) {
                return throwError(400, error, next);
            }

            if (parseInt(req.params.id) !== parseInt(req.headers.id_user)) {
                return throwError(403, "The user does't matched with searched id", next);
            }

            const service = new UsersService(req.body, next);
            const serviceResponse = await service.updateUser(req.headers.id_user);

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }
}

export default new Users();
