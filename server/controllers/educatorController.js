import { clerkClient } from "@clerk/express";

// role update
export const updateRoleToEducator = async () => {
    try {
        const userId = req.auth.userId
        
        await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                role: 'educator'
            }
        })
        res.json({success: true, message: 'Role updated successfully'})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}