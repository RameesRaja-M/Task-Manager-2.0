import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {

    try {

        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);

            req.user = await User.findById(decoded.id).select("-password")
            next()
        } else {
            res.status(401).json({
                success: false,
                message: "Not Authorized"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: "Token Failed",
            error: error.message
        })
    }
}

export const adminOnly = async (req, res, next) => {

    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access Denied" })
    }
}
