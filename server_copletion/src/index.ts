
import express from "express";
import './db';
import Note, { NoteDocument } from './models/note';
import { error } from "console";
import { create, deleteSingleNote, getAllNotes, getSingleNote, updateSingleNote } from "./controllers/note";
import note from "./models/note";

import noteRouter from "./routers/note";
//first we have to create a server 


const app = express();

//this line will parse post request coming from the fetch.post() method in the frontend
app.use(express.json());

//this will parse the post request coming from the html form
app.use(express.urlencoded({ extended: false }));


//we can use this middleware to parse the incoming request data for every opetaion we do in the server

//this will work but theres a catch it won't work for all so we will use the upper mentioned ones for out use

// app.use( (req, res, next) => {


//     req.on("data", (chunk) => {
//         // console.log(JSON.parse(chunk));
//         req.body = JSON.parse(chunk);
//         next();
//     })

// });


app.post("/", (req, res) => {

    res.json({ message: "I am listening" });
    console.log(req.body);

});


interface IncomingBody {
    title: string,
    description?: string
}


// app.post("/create", async (req, res) => {
//     // const newNote = new Note<NoteDocument>({
//     //     title: (req.body as IncomingBody).title,

//     //     description: (req.body as IncomingBody).description

//     // });
//     // await newNote.save();


//     // await Note.create<NoteDocument>({
//     //     title: (req.body as IncomingBody).title,
//     //     description: (req.body as IncomingBody).description
//     // })


//     // res.json({ message: "I am lisitng to the create route" });
// })


//updating 


// app.post("/create", create);



// app.patch("/:noteId", async (req, res) => {

//     // const { noteId } = req.params;
//     // const note = await Note.findById(noteId);

//     // if (!note) {
//     //     return res.json({ error: "Note not found" });

//     // }
//     // const { title, description } = req.body as IncomingBody;

//     // if (title) note.title = title;

//     // if (description) note.description = description;



//     //this is an alternative way to update the note
//     const { noteId } = req.params;
//     const { title, description } = req.body as IncomingBody;

//     const note = await Note.findByIdAndUpdate(noteId, { title, description }, { new: true });
//     if (!note) {
//         return res.json({ error: "Note not found" });

//     }
//     await note.save();
//     res.json({ note });
//     // res.json({ message: "Note updated successfully" });


// });


//deleting

// app.patch("/:noteId", updateSingleNote);

// app.delete("/:noteId", async (req, res) => {

//     const { noteId } = req.params;
//     //this is used when we are deleting something for a known id but if we want to delete for title or anythign else folow the below one
//     const removedNote = await Note.findByIdAndDelete(noteId);

//     if (!removedNote) {
//         return res.json({ error: "Note not found" });
//     }
//     res.json({ message: "Note deleted successfully" });

//     //other than id
//     // await Note.findOneAndDelete({ title: noteId });



// });

// app.delete("/:noteId", deleteSingleNote);

// app.get("/", async (req, res) => {

//     const notes = await Note.find();

//     res.json({ notes });

// });

// app.get("/", getAllNotes);

//finding a specific note by id

// app.get("/:noteId", async (req, res) => {

//     const { noteId } = req.params;
//     const note = await Note.findById(noteId);
//     if (!note) {
//         return res.json({ error: "Note not found" });
//     }
//     res.json({ note });
// });

// app.get("/:noteId", getSingleNote);


//now we would need some port for listening 


app.use("/note", noteRouter);


app.listen(8000, () => {
    console.log('Server is running on port 8000');
})