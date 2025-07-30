import express from "express"
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
    createTask,
    deleteTask,
    getDashboardData,
    getTaskById,
    getTasks,
    getUserDashboardData,
    updateTask,
    updateTaskChecklist,
    updateTaskStatus
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.get("/dashboard-data", protect, getDashboardData);
taskRouter.get("/user-dashboard-data", protect, getUserDashboardData);

taskRouter.post("/", protect, adminOnly, createTask);
taskRouter.get("/", protect, getTasks);
taskRouter.get("/:id", protect, getTaskById);
taskRouter.put("/:id", protect, adminOnly, updateTask);
taskRouter.put("/:id/status", protect, updateTaskStatus);
taskRouter.put("/:id/todo", protect, updateTaskChecklist)
taskRouter.delete("/:id", protect, adminOnly, deleteTask);


export default taskRouter