import CryptoJs from "crypto-js";
import throwError from "../helpers/throwError";
import users from "../models/users";
import { Op } from "../config/sequelize";

export default class UsersService {
    constructor(data, next) {
        this._data = data;
        this._next = next;
    }

    async viewUser(idUser) {
        try {
            const user = await users.findOne({ where: { id_users: parseInt(idUser) } });

            return { status: "true", user };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async createUser() {
        try {
            if (await users.findOne({ where: { email: this._data.email } })) {
                return throwError(403, "Email exists in database", this._next);
            }

            const user = await users.create({
                ...this._data,
                password: CryptoJs.AES.encrypt(this._data.password, process.env.CRYPTO_SECRET).toString(),
                status: "active",
            });

            return { status: "true", user };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async updateUser(idUser) {
        try {
            const exists = await this.checkUserExistsByEmail(this._data.email, idUser);

            if (exists) {
                return throwError(403, "Email exists in database", this._next);
            }

            const user = await users.update(this._data, { where: { id_users: parseInt(idUser) } });

            return { status: "true", message: "User update successfully" };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async changeUserPassword(idUser) {
        try {
            await users.update(
                { password: CryptoJs.AES.encrypt(this._data.password, process.env.CRYPTO_SECRET).toString() },
                { where: { id_users: parseInt(idUser) } }
            );

            return { status: "true", message: "User password updated successfully" };
        } catch (error) {
            return throwError(500, error, this._next);
        }
    }

    async checkUserExistsByEmail(emailUser, idUser) {
        if (
            await users.findOne({
                where: {
                    [Op.and]: [{ email: emailUser }, { id_users: { [Op.ne]: parseInt(idUser) } }],
                },
            })
        ) {
            return true;
        } else {
            return false;
        }
    }
}
