const fileSystem = require("fs");
const express = require("express");
const path = require("path");
const { readFromFile, readAndAppend, writeToFile } = require("./fsUtils");
const PORT = process.env.PORT || 3001;
const app = express(); 

app.use(express.static("public"));
//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET Route for notes page
app.get("/notes", (request, response) =>{
    response.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("/api/notes", async(request, response) =>{
    const data = await readFromFile("./db/db.json", "utf8");
    response.json(JSON.parse(data));
});

app.post("/api/notes", (request, response) =>{
    console.log("THIS IS THE REQUEST BODY \n", request.body);
    //console.log(typeof(request.body));
    //console.log(request.body.title, request.body.text);
    const note = {
        title: request.body.title,
        text: request.body.text
    };
    readAndAppend(note, './db/db.json');
});

// GET Route for index page
app.get("*", (request, response) =>{
    response.sendFile(path.join(__dirname, "/public/index.html"))
});
// GET Route for
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));