const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
const NotesClient = require('./notesClient');

console.log('The note app is running')

const client = new NotesClient();
const model = new NotesModel();
const view = new NotesView(model, client);
// notes.addNote('This is an example note');


view.loadNotesFromApi();
