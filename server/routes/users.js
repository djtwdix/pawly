import express from 'express'
import {createUser} from "../controllers/UserControllers"
const router = express.Router();


router.post("/", createUser) 

export {router as usersRoute}



