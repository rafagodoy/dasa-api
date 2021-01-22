import CryptoJS from "crypto-js";
import { sessionsUserSchema } from "../validations/users";
import validateSchema from "../validations/validateSchema";
import throwError from "../helpers/throwError";
import Token from "../utils/Token";
import users from "../models/users";

class Sessions {
    async create(req, res, next) {
        try {
            await validateSchema(req.body, sessionsUserSchema, next);

            const user = await users.findOne({
                where: {
                    email: req.body.email,
                    status: "active",
                },
            });

            if (!user) {
                return throwError(401, "Email or password is wrong", next);
            }

            var bytes = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_SECRET);
            var decryptPassword = bytes.toString(CryptoJS.enc.Utf8);

            if (decryptPassword !== req.body.password) {
                return throwError(401, "Email or password is wrong", next);
            }

            const token = Token.create({ id_user: user.id_users, name: user.name, email: user.email });

            res.status(200).json({ status: "true", token, user });
        } catch (error) {
            throwError(500, error, next);
        }
    }
}

export default new Sessions();
