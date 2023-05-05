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

  // // Now working with the client API
  // test('displays notes from API on NotesView client class', async () => {
  //   document.body.innerHTML = fs.readFileSync('./index.html');
  //   fetch.resetMocks();

  //   const model = new NotesModel;
  //   const mockNotesClient = {
  //     loadData: jest.fn()
  //   }

  //   const view = new NotesView(model, mockNotesClient);
  //   expect(model.getNotes()).toEqual([])
    
  //   mockNotesClient.loadData.mockResolvedValueOnce(
  //   model.setNotes(['this is a note', 'so is this']));
  //   expect(mockNotesClient.loadData.mock.calls.length).toEqual(0);

  //   await view.loadNotesFromApi()    
  //   expect(mockNotesClient.loadData.mock.calls.length).toEqual(1);
  //   expect(model.getNotes()).toEqual(['this is a note', 'so is this'])
  // })

  // using Async await fetch version
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

  test('displays the notes from the api', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const mockNotesClient = new NotesClient();
    const model = new NotesModel();

    mockNotesClient.loadData.mockImplementation((callback) => callback(['This note is from server']));

    view = new NotesView(model, mockNotesClient);
    view.loadNotesFromApi();
    view.displayNotesFromApi();
    expect(document.querySelector('.note').textContent).toEqual('This note is from server');

  });
});