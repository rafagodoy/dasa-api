import express from "express";
import Sessions from "../controllers/Sessions";
import Users from "../controllers/Users";
import Passwords from "../controllers/Passwords";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

//Users routes

router.post("/users/sessions", Sessions.create);

router.post("/users", Users.create);

router.put("/users/:id", authMiddleware, Users.update);

router.get("/users/:id", authMiddleware, Users.view);

router.patch("/users/:id/password-change", authMiddleware, Passwords.update);

export default router;
