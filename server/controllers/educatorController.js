import { clerkClient, getAuth } from "@clerk/express";

// update role
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth().userId;

    if(!userId){
      return res.status(400).json({ error: "User ID is required" });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.status(200).json({ success: true, message: "Role updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  
  }
}