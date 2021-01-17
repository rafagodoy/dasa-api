import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

export default class Token {
    static create(payload) {
        return jwt.sign(payload, authConfig.JWT_SECRET, { expiresIn: authConfig.EXPIRE_TOKEN });
    }

    static decode(payload) {
        return jwt.verify(payload, authConfig.JWT_SECRET, (err, decode) => (err ? false : decode));
    }
}
