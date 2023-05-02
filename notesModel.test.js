const NotesModel = require('./notesModel');

describe(('notesModel'), () => {
  let model;

  beforeEach(() => {
    model = new NotesModel;
  });

  it('returns an empty array when initialized', () => {
    expect(model.getNotes()).toEqual([]);
  })

  it('adds a note to to the model', () => {
    model.addNote('Buy milk');
    expect(model.getNotes()).toEqual(['Buy milk']);
  })

  it('adds two notes to the model', () => {
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
  })

  it('empties array when reset is called', () => {
    model.addNote('Buy milk');
    model.reset();
    expect(model.getNotes()).toEqual([]);
  })
})