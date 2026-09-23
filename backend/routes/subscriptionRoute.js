import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { createCheckoutSession } from "../controllers/subscriptionController.js";
const router = express.Router();

router.use(requireAuth); 
router.post("/checkout",createCheckoutSession);


export default router;