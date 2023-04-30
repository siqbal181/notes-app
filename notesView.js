class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');
    this.addNoteButton = document.querySelector('#note-button');
    
    this.addNoteButton.addEventListener('click', () => {
      const noteInput = document.querySelector('#note-input').value;
      this.model.addNote(noteInput);
      this.displayNotes();
    });
  }

  displayNotes() {
    const allNotes = this.model.getNotes();

    allNotes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
  }
}


module.exports = NotesView;