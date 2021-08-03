const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));

// GET Route for notes page
app.get("/notes", (request, responese) =>{
    responese.sendFile(path.join(__dirname, "public/notes.html"))
});
// GET Route for index page
app.get("*", (request, responese) =>{
    responese.sendFile(path.join(__dirname, "public/index.html"))
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));