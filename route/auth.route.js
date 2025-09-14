import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  signUp,
  updateUser,
  userLogin,
} from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", userLogin);
router.get("/getAll", authMiddleware, getAllUser);
router.get("/user/:id", authMiddleware, getSingleUser);
router.patch("/user/:id", authMiddleware, updateUser);
router.delete("/user/:id", authMiddleware, deleteUser);

export default router;
