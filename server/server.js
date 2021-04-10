import express from "express"
import http from "http"
import cors from "cors"
import mongoose from "mongoose"
import { Server } from "socket.io"
const PORT = process.env.PORT || 8080

const app = express()

const httpServer = http.createServer(app)

app.use(cors())

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"]
  }
})

app.get("/", (req, res) => {
  res.status(200).send("Pawly")
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

