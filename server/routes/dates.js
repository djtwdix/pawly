import express from "express";
import {
  createDate
} from "../controllers/DateControllers.js";
const router = express.Router();

router.post("/", createDate);

export { router as dateRoutes };

