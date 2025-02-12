import { Router } from "express";
import { create, deleteSingleNote, getAllNotes, getSingleNote, updateSingleNote } from "../controllers/note";

const router = Router();
router.get("/:noteId", getSingleNote);
router.get("/", getAllNotes);
router.delete("/:noteId", deleteSingleNote);
router.patch("/:noteId", updateSingleNote);
router.post("/create", create);

export default router;