
import express from "express";
import './db';
import Note from './models/note';

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

app.post("/create", async(req, res) => {
    const newNote = new Note({title: req.body.title, description: req.body.description});
    await newNote.save();
    res.json({ message: "I am lisitng to the create route" });
})



//now we would need some port for listening 



app.listen(8000, () => {
    console.log('Server is running on port 8000');
})