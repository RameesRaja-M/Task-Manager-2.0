import express from "express"
import { adminOnly, protect } from "../middlewares/authMiddleware.js"
import { exportTasksReport, exportUsersReport } from "../controllers/reportController.js"

const reportRouter = express.Router()

reportRouter.get("/export/tasks", protect, adminOnly, exportTasksReport)  // export all task as excel

reportRouter.get("/export/users", protect, adminOnly, exportUsersReport) // export User all task 

export default reportRouter