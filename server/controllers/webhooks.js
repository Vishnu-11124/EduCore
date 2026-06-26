import { Webhook } from "svix";
import User from "../models/User.js";
import { stripeInstance } from "../configs/stripe.js";
import Stripe from "stripe";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";


export const clerkWebhooks = async (req, res) => {
  const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  const payload = req.body;
  console.log("Payload", payload)

  const headers = {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"],
  };

  let event;

  try {
  event = whook.verify(payload, headers);
  console.log("Webhook verified successfully");
} catch (err) {
  console.error("Verification Error:", err.message);
  return res.status(400).json({
    message: "Invalid webhook signature",
    error: err.message,
  });
}

  const { data, type } = event;
  console.log("Event", event)

  
  try {
  switch (type) {
    case "user.created": {
      await User.create({
        _id: data.id,
        name: `${data.first_name || ""} ${data.last_name || ""}`,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url,
      });
      console.log("User created:", user?._id)
      break;
    }

    case "user.updated": {
      await User.findByIdAndUpdate(data.id, {
        name: `${data.first_name || ""} ${data.last_name || ""}`,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url,
      });
      break;
    }

    case "user.deleted": {
      await User.findByIdAndDelete(data.id);
      break;
    }
  }

  console.log("Webhook completed successfully");

  return res.json({ success: true });

} catch (error) {
  console.error("MongoDB Error:", error);

  return res.status(500).json({
    success: false,
    error: error.message,
  });
}

  return res.json({ success: true });
};

export const stripeWebhooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = Stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`)
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntentId
        })

        const { purchaseId } = session.data[0].metadata

        const purchaseData = await Purchase.findById(purchaseId)
        const userData = await User.findById(purchaseData.userId)
        const courseData = await Course.findById(purchaseData.courseId.toString())

        courseData.enrolledStudents.push(userData)
        await courseData.save()

        userData.enrolledCourses.push(courseData._id)
        await userData.save()

        purchaseData.status = 'completed'
        await purchaseData.save()

        break;
    
      default:
        break;
    }
}