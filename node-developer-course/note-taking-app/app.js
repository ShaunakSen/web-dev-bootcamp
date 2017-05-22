const fs = require('fs');
const os = require('os');
const notes = require('./notes');
const _ = require('lodash');

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


// Array of all command line args
console.log(process.argv);

var command = process.argv[2];

if(command === "add"){
  console.log("Adding new note");
} else if (command === "list") {
  console.log("Listing all notes");
}
