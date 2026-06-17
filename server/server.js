import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express";
import educatorRouter from "./routes/educatorRoute.js";
import connectCloudinary from "./configs/cloudinary.js";

// dotenv.config();
const app = express()

//connect to database
connectDB()
// connect to cloudinary
await connectCloudinary()

// middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


// clerk webhook 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(clerkMiddleware())

// routes
app.get("/", (req, res) => {
    res.send("Api working")
})
app.post("/clerk", clerkWebhooks);
app.use("/api/educator", educatorRouter)

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res) => {
    console.log(`The server is running ${PORT}`)
})