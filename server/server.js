import express from "express"
import http from "http"
import cors from "cors"
import mongoose from "mongoose"
import { Server } from "socket.io"
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT || 8080

const app = express()

const httpServer = http.createServer(app)

app.use(cors())

app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"]
  }
})

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to MongoDB")
})

app.get("/", (req, res) => {
  res.status(200).send("Pawly")
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

