const express = require("express");
const path = require("path");
const api = require("./routes/notes");
const PORT = process.env.PORT || 3001;
const app = express(); 

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import custom middleware, "api" that directs to notes.js if URL contains /api
app.use("/api", api);

app.use(express.static("public"));

// GET Route for notes page
app.get("/notes", (request, response) =>{
    response.sendFile(path.join(__dirname, "/public/notes.html"))
});

// GET Route for index page
app.get("*", (request, response) =>{
    response.sendFile(path.join(__dirname, "/public/index.html"))
});
// GET Route for
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));