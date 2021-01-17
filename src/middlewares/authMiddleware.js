import throwError from "../helpers/throwError";
import Token from "../utils/Token";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return throwError(401, "Token not found", next);
    }

    const dataUser = Token.decode(token);

    if (!dataUser) {
        return throwError(401, "Invalid token", next);
    }

    req.headers = { ...req.headers, id_user: dataUser.id_user };

    next();
};

export default authMiddleware;
