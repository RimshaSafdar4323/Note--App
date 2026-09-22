import Note from "../models/noteModels.js";
import { validateNote } from "../validations/noteValidation.js";

export const getAllNotes = async (req, res) => {
  try {
    const user_id = req.user._id; // Assuming the user ID is stored in req.user after authentication
    const notes = await Note.find({ user_id }).sort({ createdAt: -1 }); // Fetch notes for the authenticated user and sort by creation date
    res.send(notes);
  } catch (err) {
    res.status(500).send("Error fetching notes");
  }
};



export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Note not found");
    res.send(note);
  } catch (err) {
    res.status(400).send("Invalid ID format");
  }
};

export const createNote = async (req,res)=>{
  const {error} = validateNote(req.body);
  if(error) 
    return res.status(400).send(error.details[0].message);
  try{
    const user_id = req.user._id; // Assuming the user ID is stored in req.user after authentication
    const newNote= new Note({
      title:req.body.title,
      body: req.body.body,
      user_id: user_id
    });

    await newNote.save();
    res.send(newNote);
  }catch(err){
    res.status(500).send("Error in Creating Note");
  }
};

// export const updateNote = async(req,res)=>{
//   const {error} = validateNote(req.body);
//   if(error) return res.status(400).send(error.details[0].message);

//   try{
//     const updatedNote = await Note.findByIdAndUpdate(
//       req.params.id,
//       {
//         title: req.body.title,
//         body: req.body.body
//       },
//       {
//         new:true
//       }
//     );
//     if(!updatedNote)
//       return res.status(404).send("Note Not Found");
//     res.send(updatedNote);
//   }catch(err){
//     res.status(400).send("Error Updating Note");
//   }
// };

export const updateNote = async (req, res) => {
  const { error } = validateNote(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body
      },
      {
        new: true
      }
    );

    if (!updatedNote) {
      return res.status(404).send("Note Not Found");
    }

    res.send(updatedNote);

  } catch (err) {
    console.log(err); 
    res.status(400).send("Error Updating Note");
  }
};

export const deleteNote = async (req,res)=>{
  try{
    const deletedNote= await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote)
      return res.status(404).send("Note not found");
    res.send(deletedNote); 
  }catch(err){
    res.status(400).send("Error in deleting note");
  }
};


