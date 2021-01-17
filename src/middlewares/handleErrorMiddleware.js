import { handleError } from "../helpers/error";

function handleErrorMiddleware(err, res) {
    handleError(err, res);
}

export default handleErrorMiddleware;
