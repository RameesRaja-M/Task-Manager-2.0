
import "dotenv/config"
import express from "express"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url"
import connectDB from "./config/db.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js"
import taskRouter from "./routes/taskRoutes.js";
import reportRouter from "./routes/reportRoutes.js";


const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// MIDDLEWARE CORS
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "https://task-manager-2-orpin.vercel.app",
        methods: ["POST", "GET", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);

// DATABASE
connectDB()

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/reports", reportRouter);

// FILE UPLOAD ROUTE
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// START SERVER
const PORT = 5000;
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
