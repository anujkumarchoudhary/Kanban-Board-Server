import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  getSingleTask,
  UpdateTask,
} from "../controller/task.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/getAll", authMiddleware, getAllTask);
router.get("/:id", authMiddleware, getSingleTask);
router.patch("/:id", authMiddleware, UpdateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
