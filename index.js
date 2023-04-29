const notesModel = require('./notesModel');

console.log('The note app is running')

const notes = new notesModel;
notes.addNote('Buy milk')
notes.addNote('Go to gym')
console.log(notes.getNotes());