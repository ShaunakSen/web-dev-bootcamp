console.log("starting notes");
const fs = require('fs');

var addNote = (title, body) => {
  var notes = [];
  var note = {
    title,
    body
  };

  // fetch notes

  try{
    var notesString = fs.readFileSync('notes-data.json');
    notes = JSON.parse(notesString);
  }catch(err){

  }

  // Check for duplicate titles

  var duplicateNotes = notes.filter((note) => note.title === title);

  if(duplicateNotes.length === 0){
    notes.push(note);
    // update the file
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
  }

};

var getAll = () => {
  console.log("Getting all notes");
}

var getNote = (title) => {
  console.log("Getting note with title:", title);
}

var removeNote = (title) => {
  console.log("Removing note with title:", title);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};

// Same syntax as:
// module.exports = {
//   addNote: addNote
// }
