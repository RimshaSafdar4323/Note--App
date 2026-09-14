// const express = require("express");
// const Joi = require("joi");
// const app = express();


// app.use(express.json());

// let notes = [
//     {
//         id: "1",
//         title:"Summary",
//         body:["Day1","Day2","Day3"],
//         createdAt: Date.now(),
//         updatedAt: Date.now()
//     },
//     {
//         id: "2",
//         title:"Summary1",
//         body:["Day4","Day5","Day6"],
//         createdAt: Date.now(),
//         updatedAt: Date.now()
//     },
//     {
//         id: "3",
//         title:"Summary2",
//         body:["Day7","Day8","Day9"],
//         createdAt: Date.now(),
//         updatedAt: Date.now()
//     }
// ];
// // // Joi Validation Function
// // function validateNote(note) {
// //   const schema = Joi.object({
// //     title: Joi.string().min(1).required(),
// //     body: Joi.string().min(1).required(),
// //   });
// //   return schema.validate(note);
// // }

// function validateNote(note) {
//   const schema = Joi.object({
//     title: Joi.string().min(1).required(),
//     body: Joi.array().items(Joi.string()).min(1).required(), // array bana do
//   });
//   return schema.validate(note);
// }

// // GET all notes
// app.get("/api/notes", (req, res) => {
//   res.send(notes);
// });

// // GET single note by ID
// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((n) => n.id === req.params.id);
//   if (!note) return res.status(404).send("Note not found");
//   res.send(note);
// });

// // POST new note
// app.post("/api/notes", (req, res) => {
//   const { error } = validateNote(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const currentTime = Date.now();
//   const newNote = {
//     id: currentTime.toString(),
//     title: req.body.title,
//     body: req.body.body,
//     createdAt: currentTime,
//     updatedAt: currentTime,
//   };

//   notes.push(newNote);
//   res.send(newNote);
// });

// // PUT (Update) note
// app.put("/api/notes/:id", (req, res) => {
//   const note = notes.find((n) => n.id === req.params.id);
//   if (!note) return res.status(404).send("Note not found");

//   const { error } = validateNote(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   note.title = req.body.title;
//   note.body = req.body.body;
//   note.updatedAt = Date.now();

//   res.send(note);
// });

// // DELETE note
// // app.delete("/api/notes/:id", (req, res) => {
// //   const note = notes.find((n) => n.id === req.params.id);
// //   if (!note) return res.status(404).send("Note not found");

// //   const index = notes.indexOf(note);
// //   notes.splice(index, 1);

// //   res.send(note);
// // });


// // DELETE note
// app.delete("/api/notes/:id", (req, res) => {
//   const index = notes.findIndex((n) => n.id === req.params.id);
//   if (index === -1) return res.status(404).send("Note not found");

//   const deletedNote = notes.splice(index, 1)[0]; // splice array return karta hai
//   res.send(deletedNote);
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));



import express from "express";
import Joi from "joi";
import cors from "cors"; 


const app = express();
app.use(cors());

app.use(express.json());


let notes = [
    {
        id: "1",
        title:"Summary",
        body:["Day1","Day2","Day3"],
        createdAt: Date.now(),
        updatedAt: Date.now()
    },
    {
        id: "2",
        title:"Summary1",
        body:["Day4","Day5","Day6"],
        createdAt: Date.now(),
        updatedAt: Date.now()
    },
    {
        id: "3",
        title:"Summary2",
        body:["Day7","Day8","Day9"],
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
];



// function validateNote(note) {
//   const schema = Joi.object({
//     title: Joi.string().min(1).required(),
//     body: Joi.array().items(Joi.string()).min(1).required(),
//   });
//   return schema.validate(note);
// }

function validateNote(note) {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    body: Joi.string().min(1).required(), // <-- array ki jagah string
  });
  return schema.validate(note);
}


// GET all notes
app.get("/api/notes", (req, res) => {
  res.send(notes);
});

// GET single note by ID
app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === req.params.id);
  if (!note) 
    return res.status(404).send("Note not found");
  res.send(note);
});




// // POST new note
// app.post("/api/notes", (req, res) => {
//   const { error } = validateNote(req.body);
//   if (error) 
//     return res.status(400).send(error.details[0].message);

//   const currentTime = Date.now();
//   const newNote = {
//     id: currentTime.toString(),
//     title: req.body.title,
//     body: req.body,
//     createdAt: currentTime,
//     updatedAt: currentTime,
//   };

//   notes.push(newNote);
//   res.send(newNote);
// });


// // POST new note
app.post("/api/notes", (req, res) => {
  const { error } = validateNote(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const currentTime = Date.now();
  const newNote = {
    id: currentTime.toString(),
    title: req.body.title,
    body: req.body.body,
    createdAt: currentTime,
    updatedAt: currentTime,
  };

  notes.push(newNote);
  res.send(newNote);
});



// PUT (Update) note
app.put("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === req.params.id);
  if (!note) 
    return res.status(404).send("Note not found");

  const { error } = validateNote(req.body);
  if (error) 
    return res.status(400).send(error.details[0].message);

  note.title = req.body.title;
  note.body = req.body.body;
  note.updatedAt = Date.now();

  res.send(note);
});




// DELETE note
app.delete("/api/notes/:id", (req, res) => {
  const index = notes.findIndex((n) => n.id === req.params.id);
  if (index === -1) 
    return res.status(404).send("Note not found");

  const deletedNote = notes.splice(index, 1)[0];
  res.send(deletedNote);
});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));