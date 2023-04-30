const notesModel = require('./notesModel');
const notesView = require('./notesView');

console.log('The note app is running')

const notes = new notesModel;
// notes.addNote('This is an example note');

const view = new notesView(notes);
// view.displayNotes();
