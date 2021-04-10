import express from 'express'
import { createUser, updateUser, getUser } from "../controllers/UserControllers.js"
import { getPupsByOwner } from "../controllers/PupControllers.js"
const router = express.Router();


router.post("/", createUser)
router.put("/:userId", updateUser)
router.get("/:userId/pups", getPupsByOwner)
router.get("/:userId", getUser)


export {router as userRoutes}