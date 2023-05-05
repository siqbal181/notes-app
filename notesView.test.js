/**
 * @jest-environment jsdom
 */

const jestFetchMock = require("jest-fetch-mock");
jestFetchMock.enableMocks();
jest.mock('./notesClient');

const fs = require('fs');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
const NotesClient = require('./notesClient');

describe('Notes view', () => {
  beforeEach(() => {
    NotesClient.mockClear();
  })

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

  // displayNotes using Async await fetch version
  test('sets the notes through the API', async () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel;
    const mockClient = {
      loadNotes: jest.fn()
    }
    mockClient.loadNotes.mockResolvedValueOnce(
      ["some note", "some other note"]);
    const view = new NotesView(model, mockClient)
    await view.displayNotesFromApi2()
    const divs = document.querySelectorAll('div.note')
    
    expect(mockClient.loadNotes.mock.calls.length).toEqual(1);
    expect(divs.length).toEqual(2)
    expect(divs[0].innerHTML).toEqual('some note')
    expect(divs[1].innerHTML).toEqual('some other note')
  })

  // displayNotes using the non-async version
  test('displays the notes from the api', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const mockNotesClient = new NotesClient();
    const model = new NotesModel();

    mockNotesClient.loadData.mockImplementation((callback) => callback(['This note is from server']));

    view = new NotesView(model, mockNotesClient);
    view.displayNotes();
    view.loadNotesFromApi();
    view.displayNotesFromApi();
    expect(document.querySelector('.note').textContent).toEqual('This note is from server');

  });

  test('it creates a new note and adds to the page', async () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const mockNotesClient = new NotesClient();
    const model = new NotesModel();

    mockNotesClient.createNote.mockImplementation((data) => JSON.stringify(data));
    const newNote = 'Hello just testing'
    view = new NotesView(model, mockNotesClient);
    await view.createNote(newNote);
    expect(document.querySelector('.note').textContent).toEqual('"Hello just testing"');
  })
});