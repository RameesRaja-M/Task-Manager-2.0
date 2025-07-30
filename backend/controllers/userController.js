import Task from "../models/Task.js"
import User from "../models/User.js"


export const getUsers = async (req, res) => {

    try {

        const users = await User.find({ role: "member" }).select("-password");

        const usersWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pendingTasks = await Task.countDocuments(
                {
                    assignedTo: user._id,
                    status: "Pending"
                }
            )
            const inProgressTasks = await Task.countDocuments(
                {
                    assignedTo: user._id,
                    status: "In Progress"
                }
            )
            const completedTasks = await Task.countDocuments(
                {
                    assignedTo: user._id,
                    status: "Completed"
                }
            )

            return {
                ...user._doc,
                pendingTasks,
                inProgressTasks,
                completedTasks
            }
        }))

        res.status(200).json(usersWithTaskCounts)
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

export const getUserById = async (req, res) => {

    try {

        const userId = req.params.id
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res(400).json({
                message: "User Not Found"
            })
        }

        res.json(user)
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

