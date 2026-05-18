import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

// dotenv.config();
const app = express()

//connect to database
connectDB()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routes
app.get("/", (req, res) => {
    res.send("Api working")
})
app.post("/clerk", express.raw({ type: "application/json" }), clerkWebhooks);


// port
const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res) => {
    console.log(`The server is running ${PORT}`)
})