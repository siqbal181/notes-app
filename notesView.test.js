/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

describe('Notes view', () => {
  it('displays two notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel;
    const view = new NotesView(model);
    model.addNote('My first note');
    model.addNote('My second note');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('adds note using click button', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel;
    const view = new NotesView(model);

    const noteInput = document.querySelector('#note-input');
    noteInput.value = 'Here is my note to test!!';

    const addNoteButton = document.querySelector('#note-button');
    addNoteButton.click();

    expect(document.querySelector('div.note').textContent).toEqual('Here is my note to test!!');
  })
});