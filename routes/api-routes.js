var path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
let dbJSON = require("../db/db.json");

module.exports = function (app) {
    // GET request
    app.get("/api/notes", function (req, res) {
        res.send(dbJSON);
    });
    // POST request
    app.post("/api/notes", function (req, res) {

        if (!req.body.title) {
            return res.json({ error: "Title is required" });
        }

        // Writes files from user input to show on front end and saves data
        const note = { ...req.body, id: uuidv4() }
        dbJSON.push(note);
        fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(dbJSON), (err) => {
            if (err) {
                return res.json({ error: "Unable to write file" });
            }

            return res.json(note);
        });
    });

    // DELETE request
    app.delete("/api/notes/:id", function (req, res) {
        let userID = req.params.id;
        const newNote = dbJSON.filter(note => note.id !== userID);
        dbJSON = newNote;
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dbJSON), (err) => {
            if (err) {
                return res.json({ error: "Unable to write file" });
            }
            return res.json(newNote);
        });
    });
};