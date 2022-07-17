const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// api/notes
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '..//db/db.json'));
});

router.post('/notes', (req, res) => {
  
  const newNote = {
    title : req.body.title,
    text : req.body.text,
    id : uuidv4()
  };

  fs.readFile(path.join(__dirname, '..//db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;

    console.log("data from '..//db/db.json'.json", data );
    const parsedNotes = JSON.parse(data); 
    console.log("parsedNOtes", parsedNotes);

    console.log('newNote', newNote);
    parsedNotes.push(newNote);

    fs.writeFile(
      path.join(__dirname, '..//db/db.json'),
      JSON.stringify(parsedNotes),
      (err) => {
        if (err) throw err;
        console.log("Note saved to '..//db/db.json'!");
      }
    );
  });
  res.sendFile(path.join(__dirname, '..//db/db.json'));
});

// :id lets us know that we are passing a dynamic parameter
router.delete('/notes/:id', (req, res) => {
  console.log(req.params.id);

  fs.readFile(path.join(__dirname, '..//db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;

    const parsedNotes = JSON.parse(data);

    const notesToKeep = parsedNotes.filter((note) => note.id !== req.params.id);

    fs.writeFile(
      path.join(__dirname, '..//db/db.json'),
      JSON.stringify(notesToKeep),
      (err) => {
        if (err) throw err;
        console.log("Note deleted successfully from '..//db/db.json'!");
      }
    );
  });
  res.sendFile(path.join(__dirname, '..//db/db.json'));
});

module.exports = router