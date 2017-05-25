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

if(command === "add"){
  notes.addNote(argv.title, argv.body);
} else if (command === "list") {
  notes.getAll();
} else if (command === "read") {
  notes.getNote(argv.title);
} else if (command === "remove") {
  notes.removeNote(argv.title);
} else {
  console.log("Command not recognized");
}
