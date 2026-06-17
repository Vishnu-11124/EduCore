import { clerkClient } from "@clerk/express";
import Course from "../models/Course";
import { v2 as cloudinary } from "cloudinary";


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

// add neww course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body
    if(!courseData){
      return res.json({ error: "Course data is required" })
    }

    const imageFile = req.file
    if(!imageFile){
      return res.json({ error: "Image file is required" })
    }

    const educatorId = req.auth().userId
    if(!educatorId){
      return res.json({ error: "Educator ID is required" })
    }

    const parsedCourseData = await JSON.parse(courseData)
    parsedCourseData.educator = educatorId

    const newCourse = await Course.create(parsedCourseData)

    const imageUpload = await cloudinary.uploader.upload(imageFile.path)
    newCourse.courseThumbnail = imageUpload.secure_url

    await newCourse.save()

    res.status(200).json({ success: true, message: "Course added successfully" })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}