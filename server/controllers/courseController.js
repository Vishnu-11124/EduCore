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

// get courseby id
export const getCourseById = async (req, res) =>{
    try {
        const { id } = req.params

        if(!id){
            return res.status(400).json({ success: false, message: "Course id is not available"})
        }

        const courseData = await Course.findById(id).populate({ path: 'educator' }).lean()
        if(!courseData){
            return res.status(400).json({ success: false, message: "Course is not available"})
        }

        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl = ""
                }
            })
        })

        res.status(200).json({ success: true, message: "Successfully fetched course data.", data: courseData})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}