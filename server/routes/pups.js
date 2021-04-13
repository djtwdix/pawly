import express from "express";
import {
  createPup,
  getAllPups,
  getPupById,
} from "../controllers/PupControllers.js";
const router = express.Router();

router.post("/", createPup);
router.post("/all", getAllPups);
router.get("/:pupId", getPupById);

export { router as pupsRoutes };
