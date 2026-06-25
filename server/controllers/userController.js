
import Purchase from '../models/Purchase.js'
import User from '../models/User.js'
import Stripe from 'stripe'
import Course from '../models/Course.js'

// get user data
export const getUserData = async (req, res) => {
    try {
        const userId = req.auth().userId
        if(!userId){
            return res.status(401).json({ success: false, message: "UserId is unavailable"})
        }

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({ success: false, message: "User not found"})
        }
        
        res.status(200).json({ success: true, message: "User fetched successfully", data: user})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}

// users enrolled courses with lecture links
export const userEnrolledCourses = async (req, res) =>{
    try {
         const userId = req.auth().userId
        if(!userId){
            return res.status(401).json({ success: false, message: "UserId is unavailable"})
        }

        const user = await User.findById(userId).populate('enrolledCourses')
        if(!user){
            return res.status(404).json({ success: false, message: "User not found"})
        }

        res.status(200).json({ success: true, message: "User enrolled courses are fetched successfully", data: user.enrolledCourses})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message})
    }
}

// purchase course
export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        if(!courseId){
            return res.status(404).json({ success: false, message: "Course id is not available!"})
        }
        const { origin } = req.headers
        if(!origin){
            return res.status(404).json({ success: false, message: "Origin is not available!"})
        }
        const userId = req.auth().userId
        if(!userId){
            return res.status(404).json({ success: false, message: "User id is not available!"})
        }
        const userData = await User.findById(userId)
        if(!userData){
            return res.status(404).json({ success: false, message: "User data is not available!"})
        }
        const courseData = await Course.findById(courseId)
        if(!courseData){
            return res.status(404).json({ success: false, message: "Course data is not available!"})
        }

        const purchaseData = {
            courseId: courseData._id,
            userId,
            amount: (courseData.coursePrice -courseData.discount * courseData.coursePrice / 100).toFixed(2),
        }

        const newPurchase = await Purchase.create(purchaseData)
        if(!newPurchase){
            return res.status(404).json({ success: false, message: "Purchase data is not available!"})
        }
        
        // stripe gateway
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

        const currency = process.env.CURRENCY.toLowerCase()

        // creating items
        const line_items = [{
            price_data : {
                currency,
                product_data: {
                    name: courseData?.courseTitle
                },
                unit_amount: Math.floor(newPurchase?.amount) * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                purchaseId: newPurchase?._id.toString()
            }
        })

        res.status(200).json({ success: true, session_url: session.url })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}