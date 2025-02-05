import mongoose, { set } from "mongoose";

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/note-app").then(
    () => {
        console.log("connected to the database");
    }).catch((err) => {
        console.log("FAILED TO CONNECT TO THE DATABASE", err);
    });
