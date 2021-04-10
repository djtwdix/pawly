import express from "express";
import {
  createUser,
  updateUser,
  getUserById,
} from "../controllers/UserControllers.js";
import { getPupsByOwner } from "../controllers/PupControllers.js";
const router = express.Router();

router.post("/", createUser);
router.get("/:userId/pups", getPupsByOwner);
router.put("/:userId", updateUser);
router.get("/:userId", getUserById);

export { router as userRoutes };
