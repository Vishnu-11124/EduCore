import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js";

// dotenv.config();
const app = express()

//connect to database
connectDB()

// middleware
app.use(cors())


// routes
app.get("/", (req, res) => {
    res.send("Api working")
})

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res) => {
    console.log(`The server is running ${PORT}`)
})