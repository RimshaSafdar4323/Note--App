import mongoose from "mongoose";


const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user_id: { type: String, required: true },
  },
  { timestamps: true } // MongoDB automatically 'createdAt' aur 'updatedAt' handle kar le ga
);


const Note = mongoose.model("Note", noteSchema);

export default Note;