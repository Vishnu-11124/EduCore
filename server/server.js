import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express";
import educatorRouter from "./routes/educatorRoute.js";

// dotenv.config();
const app = express()

//connect to database
connectDB()

// middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(clerkMiddleware())

// clerk webhook 
app.post("/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routes
app.get("/", (req, res) => {
    res.send("Api working")
})
app.use("/api/educator", educatorRouter)

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res) => {
    console.log(`The server is running ${PORT}`)
})