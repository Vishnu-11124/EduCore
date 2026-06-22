import express from 'express'
import { getAllCourses } from '../controllers/courseController.js'

const courseRouter = express.Router()

courseRouter.get('/', getAllCourses)

export default courseRouter