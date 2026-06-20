import express from 'express'
import { addCourse, getEducatorCourses, updateRoleToEducator } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import { isEducator } from '../middlewares/authMiddleware.js'

const educatorRouter = express.Router()

educatorRouter.get('/update-role', updateRoleToEducator)

educatorRouter.post('/add-course', isEducator, upload.single('image'), addCourse)

educatorRouter.get('/courses', isEducator, getEducatorCourses )

export default educatorRouter