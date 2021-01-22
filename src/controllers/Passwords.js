import CryptoJs from "crypto-js";
import { updatePasswordSchema } from "../validations/password";
import validateSchema from "../validations/validateSchema";
import throwError from "../helpers/throwError";
import users from "../models/users";
import UsersService from "../services/UsersService";

class Passwords {
    async update(req, res, next) {
        try {
            const { hasErrorValidation, error } = await validateSchema(req.body, updatePasswordSchema, next);

            if (hasErrorValidation) {
                return throwError(400, error, next);
            }

            if (parseInt(req.params.id) !== parseInt(req.headers.id_user)) {
                return throwError(403, "You dont't have permission for change this password", next);
            }

            const service = new UsersService(req.body, next);
            const serviceResponse = await service.changeUserPassword(req.headers.id_user);

            res.status(200).json(serviceResponse);
        } catch (error) {
            throwError(500, error, next);
        }
    }
}

export default new Passwords();
