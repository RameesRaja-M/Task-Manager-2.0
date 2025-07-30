import express from "express"
import { adminOnly, protect } from "../middlewares/authMiddleware.js"
import { getUserById, getUsers } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/", protect, adminOnly, getUsers)
userRouter.get("/:id", protect, getUserById)

export default userRouter