import express from "express";
import Sessions from "../controllers/Sessions";
import Users from "../controllers/Users";
import Laboratories from "../controllers/Laboratories";
import Exams from "../controllers/Exams";
import Passwords from "../controllers/Passwords";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

//Users routes

router.post("/users/sessions", Sessions.create);

router.post("/users", Users.create);

router.put("/users/:id", authMiddleware, Users.update);

router.get("/users/:id", authMiddleware, Users.view);

router.patch("/users/:id/password-change", authMiddleware, Passwords.update);

//Laboratories routes

router.post("/laboratories", authMiddleware, Laboratories.create);

router.get("/laboratories", authMiddleware, Laboratories.index);

router.get("/laboratories/:idLaboratory", authMiddleware, Laboratories.view);

router.put("/laboratories/:idLaboratory", authMiddleware, Laboratories.update);

router.delete("/laboratories/:idLaboratory", authMiddleware, Laboratories.delete);

//Exams routes

router.post("/exams", authMiddleware, Exams.create);

router.get("/exams", authMiddleware, Exams.index);

router.get("/exams/:idExam", authMiddleware, Exams.view);

router.delete("/exams/:idExam", authMiddleware, Exams.delete);

router.put("/exams/:idExam", authMiddleware, Exams.update);

export default router;
