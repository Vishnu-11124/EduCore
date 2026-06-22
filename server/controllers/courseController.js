import Course from '../models/Course.js'

// get all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({isPublished: true}).select('-courseContent -enrolledStudents').populate({path: 'educator'})

        res.status(200).json({ success: true, message: 'Successfully fetched Courses!', data: courses})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}