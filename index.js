import express, { json } from "express";
const app = express();
import dotenv from "dotenv";
import { DbConnect } from "./config/db.js";
import cors from "cors";
import authRoutes from "./route/auth.route.js";
import taskRoutes from "./route/task.route.js";

dotenv.config();
app.use(json());
app.use(cors());

// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/task/", taskRoutes);

(async () => {
  await DbConnect();

  app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
  });
})();
