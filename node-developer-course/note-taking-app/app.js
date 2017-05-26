const fs = require('fs');
const os = require('os');
const notes = require('./notes');
const _ = require('lodash');
const yargs = require('yargs');

// var user = os.userInfo();
//
//
// var res = notes.addNote();
// console.log(res);
//
// console.log(_.isString('Mini'));
//
// var filteredArray = _.uniq(['1','1',1, '3']);
//
// console.log(filteredArray);

// fs.appendFile('greetings.txt', `\nHello ${user.username}! you are ${notes.age}`, function(error){
//   if(error){
//     console.log(error);
//   } else {
//     console.log("done!");
//   }
// });

const argv = yargs.argv;

// Array of all command line args
console.log("Process:", process.argv);
console.log("Yargs:", argv);

var command = process.argv[2];

if (command === "add") {
  var addedNote = notes.addNote(argv.title, argv.body);
  if (_.isUndefined(addedNote)) {
    console.log("Did not add note");
  } else {
    console.log(`Note with title: ${addedNote.title} was successfully added!`);
  }
} else if (command === "list") {
  notes.getAll();
} else if (command === "read") {
  notes.getNote(argv.title);
} else if (command === "remove") {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? "Note was Removed" : "Note was not found";
  console.log(message);
} else {
  console.log("Command not recognized");
}
