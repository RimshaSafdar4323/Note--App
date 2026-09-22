import express from "express";
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from "../controllers/noteController.js";
import { requireAuth } from "../middleware/requireAuth.js";


const router=express.Router();

router.use(requireAuth); // Apply the requireAuth middleware to all routes in this router


router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;