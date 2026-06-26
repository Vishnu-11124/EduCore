
import Purchase from '../models/Purchase.js'
import User from '../models/User.js'
import { stripeInstance } from '../configs/stripe.js'
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
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course id is required!"
            });
        }

        const userId = req.auth().userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized!"
            });
        }

        const userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        const courseData = await Course.findById(courseId);

        if (!courseData) {
            return res.status(404).json({
                success: false,
                message: "Course not found!"
            });
        }

        // Prevent duplicate purchase
        const alreadyPurchased = await Purchase.findOne({
            userId,
            courseId
        });

        if (alreadyPurchased) {
            return res.status(400).json({
                success: false,
                message: "You have already purchased this course!"
            });
        }

        // Calculate final amount after discount
        const amount = Number(
            (
                courseData.coursePrice -
                (courseData.discount * courseData.coursePrice) / 100
            ).toFixed(2)
        );

        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid course price!"
            });
        }

        // Save purchase with pending status
        const newPurchase = await Purchase.create({
            courseId,
            userId,
            amount,
            status: "pending",
        });

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ["card"],

            mode: "payment",

            line_items: [
                {
                    price_data: {
                        currency: process.env.CURRENCY.toLowerCase(),

                        product_data: {
                            name: courseData.courseTitle,
                        },

                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],

            success_url: `${process.env.CLIENT_URL}/loading/my-enrollments`,
            cancel_url: `${process.env.CLIENT_URL}/`,

            metadata: {
                purchaseId: newPurchase._id.toString(),
                userId: userId.toString(),
                courseId: courseId.toString(),
            },
        });

        return res.status(200).json({
            success: true,
            session_url: session.url,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};