import express from "express";
import Joi from "joi";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

const app = express();

app.use(cors());
app.use(express.json());

//let notes = [];

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true } // MongoDB automatically 'createdAt' aur 'updatedAt' handle kar le ga
);

const Note = mongoose.model("Note", noteSchema);

function validateNote(note) {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    body: Joi.string().min(1).required(),
  });
  return schema.validate(note);
}


// GET all notes


app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch (err) {
    res.status(500).send("Error fetching notes");
  }
});

// // GET single note by ID

app.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");
    res.send(note);
  } catch (err) {
    res.status(400).send("Invalid ID format");
  }
});


// // POST new note

app.post("/api/notes", async (req,res)=>{
  const {error} = validateNote(req.body);
  if(error) 
    return res.status(400).send(error.details[0].message);
  try{
    const newNote= new Note({
      title:req.body.title,
      body: req.body.body,
    });

    await newNote.save();
    res.send(newNote);
  }catch(err){
    res.status(500).send("Error in Creating Note");
  }
});


// // PUT (Update) note

app.put("/api/notes/:id", async(req,res)=>{
  const {error} = validateNote(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  try{
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body
      },
      {
        new:true
      }
    );
    if(!updatedNote)
      return res.status(404).send("Note Not Found");
    res.send(updatedNote);
  }catch(err){
    res.status(400).send("Error Updating Note");
  }
})




// DELETE note

app.delete("/api/notes/:id", async (req,res)=>{
  try{
    const deletedNote= await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote)
      return res.status(404).send("Note not found");
    res.send(deletedNote); 
  }catch(err){
    res.status(400).send("Error in deleting note");
  }
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));