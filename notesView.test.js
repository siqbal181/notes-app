/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
const NotesClient = require('./notesClient');

const jestFetchMock = require("jest-fetch-mock");
jestFetchMock.enableMocks();

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

  it('verifies when displayNotes is called twice', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel;
    const view = new NotesView(model);

    const addNoteButton = document.querySelector('#note-button');

    const noteInput = document.querySelector('#note-input');
    noteInput.value = 'Here is my note to test!!';
    addNoteButton.click();

    const noteInputTwo = document.querySelector('#note-input');
    noteInputTwo.value = 'Another note to test duplication!!';
    addNoteButton.click();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  })

  it('displays notes from API on NotesView client class', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel;

    // Mock the notesClient
    const mockNotesClient = {
      loadData: jest.fn(),
    }

    mockNotesClient.loadData.mockResolvedValueOnce({
      note: 'This note is coming from the server',
    })

    // Run the rest as usual, making a new view with the mockNotesClient as an argument
    const view = new NotesView(model, mockNotesClient);
    // expect(view.displayNotesFromApi()).toBe('This note is coming from the server');
    expect(model.getNotes()).toEqual('This note is coming from the server');
  })
});