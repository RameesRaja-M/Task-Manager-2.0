import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt, { genSalt } from "bcryptjs"

// Generate Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

export const registerUser = async (req, res) => {

    try {

        const { name, email, password, profileImageUrl, adminInviteToken } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist"
            })
        }

        let role = "member";
        if (adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN) {
            role = "admin";
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role
        })

        res.status(201).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

// Login User
export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid User"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Invalid"
            })
        }

        res.status(200).json({
            success: true,
            message: "Login Successfully",
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

export const getUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            res.status(401).json({
                success: false,
                message: "User Not Found"
            })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

export const updateUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
        if (user) {
            res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }

        user.name = req.user.name || user.name;
        user.email = req.user.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, genSalt)
        }

        const updateUser = await user.save()

        res.status(200).json({
            _id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
            role: updateUser.role,
            token: generateToken(updateUser._id)
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}