import express from "express"
import { createPup, getAllPups } from "../controllers/PupControllers.js"
const router = express.Router();

router.post("/", createPup);
router.get("/", getAllPups);
router.get("/:pupId", getPupById);

export{router as pupsRoutes}
