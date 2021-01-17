import { ErrorHandler } from "./error";

const throwError = (code, error, next) => {
    try {
        throw new ErrorHandler(code, error);
    } catch (err) {
        next(err);
    }
};

export default throwError;
