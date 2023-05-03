class NotesModel {
  constructor() {
    this.notes = [];
  }
  setNotes(notes) {
    this.notes = notes;
  }

  getNotes() {
    return this.notes;
  }

  addNote(note) {
    this.notes.push(note);
  }

  reset() {
    this.notes.length = 0;
  }
}

module.exports = NotesModel;