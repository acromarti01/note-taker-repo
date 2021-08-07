const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require('uuid');

// notes.get("/notes", async(request, response) =>{
//     const data = readFromFile("./db/db.json", "utf8");
//     response.json(JSON.parse(data));      
// });
notes.get("/notes", (request, response) =>{
    readFromFile("./db/db.json", "utf8").then(data => response.json(JSON.parse(data))); 
    /*The readFromFile is a promise so needs a ".then".  The reason data needs to be parsed is because jsonNotes
    is a string and needs to be a object*/
});

notes.post("/notes", (request, response) =>{
    const note = {
        title: request.body.title,
        text: request.body.text,
        id: uuidv4()
    };
    readAndAppend(note, './db/db.json');    
    response.json(note);    
});

notes.delete("/notes/:id", async(request, response) => {
    const id = request.params.id;
    const data = await readFromFile("./db/db.json", "utf8");
    const jsonData = JSON.parse(data);
    const filteredJsonData = jsonData.filter((note) => note.id !== id);
    writeToFile("./db/db.json", filteredJsonData);

    response.json(`Note "${id}" has been deleted`);
});

module.exports = notes;