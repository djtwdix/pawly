import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { userRoutes } from "./routes/users.js";
import { pupsRoutes } from "./routes/pups.js";
import { chatRoutes } from "./routes/chats.js";
import { messageRoutes } from "./routes/messages.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

const httpServer = http.createServer(app);

app.use(cors());

app.use(express.json());

//websockets with CORS init
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
  },
});

//mongoDB connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to MongoDB");
});

//app routes
app.use("/users", userRoutes);
app.use("/pups", pupsRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Pawly");
});

//server port
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
