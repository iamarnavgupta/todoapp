import express from 'express';
import Note from '../models/Note.js';
import middleware from '../middleware/middleware.js';

const router = express.Router();

// ✅ Add a new note
router.post('/add', middleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log("BODY", title, description);

        // ✅ Create new note in MongoDB
        const newNote = new Note({
            title,
            description,
            userId: req.user.id // ✅ Attach userId from middleware
        });

        await newNote.save(); // ✅ Save correctly

        return res.status(200).json({ 
            success: true,
            message: "Note Added Successfully",
            note: newNote
        });

    } catch (error) {
        console.error("❌ Error in Adding Note:", error.message);
        return res.status(500).json({ success: false, message: "Error in Adding Note" });
    }
});

// ✅ Get all notes (User-Specific)
router.get('/', middleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }); // ✅ Fetch only notes for the logged-in user
        return res.status(200).json({ success: true, notes });

    } catch (error) {
        console.error("❌ Error in Fetching Notes:", error.message);
        return res.status(500).json({ success: false, message: "Can't retrieve notes" });
    }
});

// ✅ Update a note
router.put("/:id", middleware, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedNote) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        return res.status(200).json({ success: true, message: "Note updated successfully", note: updatedNote });

    } catch (error) {
        console.error("❌ Error in Updating Note:", error.message);
        return res.status(500).json({ success: false, message: "Can't update note" });
    }
});

// ✅ Delete a note
router.delete("/:id", middleware, async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        return res.status(200).json({ success: true, message: "Note deleted successfully" });

    } catch (error) {
        console.error("❌ Error in Deleting Note:", error.message);
        return res.status(500).json({ success: false, message: "Can't delete note" });
    }
});

export default router;
