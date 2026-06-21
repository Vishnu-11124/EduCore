import { clerkClient, User } from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "../models/Purchase.js";

// update role
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth().userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Role updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add neww course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    if (!courseData) {
      return res.json({ error: "Course data is required" });
    }

    const imageFile = req.file;
    if (!imageFile) {
      return res.json({ error: "Image file is required" });
    }

    const educatorId = req.auth().userId;
    if (!educatorId) {
      return res.json({ error: "Educator ID is required" });
    }

    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = educatorId;

    const newCourse = await Course.create(parsedCourseData);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;

    await newCourse.save();

    res
      .status(200)
      .json({ success: true, message: "Course added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get educator courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth().userId;
    if (!educator) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const courses = await Course.find({ educator });
    if (courses.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "You haven't created any courses yet.",
        });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully fetched course data..",
        data: courses,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// dashboard data
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth().userId;
    if (!educator) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const courses = await Course.find({ educator });
    if (courses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No courses found",
        data: {
          totalEarnings: 0,
          enrolledStudentsData: [],
          totalCourses: 0,
        },
      });
    }

    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course?._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + (purchase.amount || 0),
      0,
    );
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl",
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully fetched dashboard data",
        data: { totalEarnings, enrolledStudentsData, totalCourses },
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};