//import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import handleErrorMiddleware from "./middlewares/handleErrorMiddleware";
import router from "./routes";

//require("dotenv").config();

const app = express();

// Enabling cors
app.use(cors());
// Disabling header x-powered-by
app.disable("x-powered-by");
// Allowing parsing content as json
app.use(bodyParser.json());

app.use("/", router);

app.use((err, req, res, next) => {
    handleErrorMiddleware(err, res, next);
});

app.use((req, res) => {
    res.status(404).json({ msg: "general.error.404" });
});

export default app;
