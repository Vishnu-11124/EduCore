import { clerkClient } from "@clerk/express";

export const isEducator = async (req, res, next) => {
    try {
        const userId = req.auth().userId
        console.log("userId", userId)
        if(!userId){
            return res.status(401).json({ success: false, message: "User ID is required"})
        }

        const response = await clerkClient.users.getUser(userId)

        if(response.publicMetadata?.role !== "educator") {
            return res.status(403).json({ success: false,message: "Unauthorized access"})
        }

        next()

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}