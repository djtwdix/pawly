import express from "express";
import {
  createDate, getDatesForUser
} from "../controllers/DateControllers.js";
const router = express.Router();

router.post("/", createDate);
router.get("/", getDatesForUser);

export { router as dateRoutes };

