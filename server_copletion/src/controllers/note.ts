
import { RequestHandler } from "express";
import Note, { NoteDocument } from "../models/note";

export interface IncomingBody {
    title: string,
    description?: string
}

export const create: RequestHandler = async (req, res) => {
    // const newNote = new Note<NoteDocument>({
    //     title: (req.body as IncomingBody).title,

    //     description: (req.body as IncomingBody).description

    // });
    // await newNote.save();


    await Note.create<NoteDocument>({
        title: (req.body as IncomingBody).title,
        description: (req.body as IncomingBody).description
    })


    res.json({ message: "I am lisitng to the create route" });
};


export const updateSingleNote: RequestHandler = async (req, res) => {

    // const { noteId } = req.params;
    // const note = await Note.findById(noteId);

    // if (!note) {
    //     return res.json({ error: "Note not found" });

    // }
    // // const { title, description } = req.body as IncomingBody;

    // if (title) note.title = title;

    // if (description) note.description = description;



    //this is an alternative way to update the note
    const { noteId } = req.params;
    const { title, description } = req.body as IncomingBody;

    const note = await Note.findByIdAndUpdate(noteId, { title, description }, { new: true });
    if (!note) {
        return res.json({ error: "Note not found" });

    }
    await note.save();
    res.json({ note });
    // res.json({ message: "Note updated successfully" });


};


export const deleteSingleNote: RequestHandler = async (req, res) => {

    const { noteId } = req.params;
    //this is used when we are deleting something for a known id but if we want to delete for title or anythign else folow the below one
    const removedNote = await Note.findByIdAndDelete(noteId);

    if (!removedNote) {
        return res.json({ error: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });

    //other than id
    // await Note.findOneAndDelete({ title: noteId });



};


export const getAllNotes: RequestHandler = async (req, res) => {

    const notes = await Note.find();

    res.json({ notes });

};

export const getSingleNote: RequestHandler = async (req, res) => {

    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) {
        return res.json({ error: "Note not found" });
    }
    res.json({ note });
};