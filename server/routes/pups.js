import express from "express";
import {
  createPup,
  getAllPups,
  getPupById,
  editPup
} from "../controllers/PupControllers.js";
const router = express.Router();

router.post("/", createPup);
router.post("/all", getAllPups);
router.get("/:pupId", getPupById);
router.put("/:pupId", editPup)

export { router as pupsRoutes };
