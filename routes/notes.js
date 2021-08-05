const notes = require('express').Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require('uuid');

notes.get("/notes", async(request, response) =>{
    const data = await readFromFile("./db/db.json", "utf8");
    response.json(JSON.parse(data));
});

notes.post("/notes", async(request, response) =>{
    const note = {
        title: request.body.title,
        text: request.body.text,
        id: uuidv4()
    };
    readAndAppend(note, './db/db.json');
    const data = await readFromFile("./db/db.json", "utf8");
    response.json(JSON.parse(data));
});

module.exports = notes;