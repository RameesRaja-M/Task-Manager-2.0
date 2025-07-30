import express from "express"
import { getUserProfile, loginUser, registerUser, updateUserProfile } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";
import path from "path"
import upload from "../middlewares/uploadMiddleware.js";

const authRouter = express.Router()

// Auth Routes
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/profile", protect, getUserProfile);
authRouter.put("/profile", protect, updateUserProfile)




authRouter.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No file Uploaded"
        })
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename
        }`;
    res.status(200).json({
        imageUrl
    })
})

export default authRouter