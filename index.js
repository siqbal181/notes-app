const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
const notesClient = require('./notesClient');

console.log('The note app is running')

const client = new NotesClient();
const notes = new notesModel;
// notes.addNote('This is an example note');

const view = new NotesView(notes);
// view.displayNotes();
