import express from 'express'
import { createUser } from "../controllers/UserControllers.js"
const router = express.Router();


router.post("/", createUser) 

export {router as userRoutes}