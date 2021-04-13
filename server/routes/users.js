import express from "express";
import {
  createUser,
  updateUser,
  getUserById,
  addLike,
} from "../controllers/UserControllers.js";
import { getPupsByOwner } from "../controllers/PupControllers.js";
const router = express.Router();

router.post("/", createUser);
router.get("/:userId/pups", getPupsByOwner);
router.put("/:userId", updateUser);
router.get("/:userId", getUserById);
router.put("/:userId/likes", addLike);

export { router as userRoutes };
