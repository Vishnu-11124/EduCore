
import User from '../models/User.js'

// get user data
export const getUserData = async (req, res) => {
    try {
        const userId = req.auth().userId
        if(!userId){
            return res.status(401).json({ success: false, message: "UserId is unavailable"})
        }

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({ success: false, message: "User not found"})
        }
        
        res.status(200).json({ success: true, message: "User fetched successfully", data: user})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}

// users enrolled courses with lecture links
export const userEnrolledCourses = async (req, res) =>{
    try {
         const userId = req.auth().userId
        if(!userId){
            return res.status(401).json({ success: false, message: "UserId is unavailable"})
        }

        const user = await User.findById(userId).populate('enrolledCourses')
        if(!user){
            return res.status(404).json({ success: false, message: "User not found"})
        }

        res.status(200).json({ success: true, message: "User enrolled courses are fetched successfully", data: user.enrolledCourses})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}