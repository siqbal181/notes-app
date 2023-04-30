class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');
    this.addNoteButton = document.querySelector('#note-button');

    this.addNoteButton.addEventListener('click', () => {
      this.model.addNote();
      this.displayNotes();
    });
  }

  displayNotes() {
    const noteInput = document.querySelector('#note-input').value;
    const allNotes = this.model.getNotes();

    allNotes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.innerText = noteInput;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
  }
}


module.exports = NotesView;