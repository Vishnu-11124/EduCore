import express from 'express'
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import { isEducator } from '../middlewares/authMiddleware.js'

const educatorRouter = express.Router()

educatorRouter.get('/update-role', updateRoleToEducator)

educatorRouter.post('/add-course', isEducator, upload.single('image'), addCourse)

educatorRouter.get('/courses', isEducator, getEducatorCourses )

educatorRouter.get('/dashboard', isEducator, educatorDashboardData)

educatorRouter.get('/enrolled-students', isEducator, getEnrolledStudentsData)

export default educatorRouter