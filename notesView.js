class NotesView {
  constructor(model, client) {
    this.client = client;
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');
    this.addNoteButton = document.querySelector('#note-button');
    
    // dont forget to async your event listeners
    this.addNoteButton.addEventListener('click', () => {
      const noteInput = document.querySelector('#note-input').value;
      this.model.addNote(noteInput);
      this.displayNotes();
      document.querySelector('#note-input').value = ''
    });
  }

  displayNotes() {
    const notesToClear = document.querySelectorAll('.note');
    notesToClear.forEach(note => {
      note.remove();
    })

    const allNotes = this.model.getNotes();
    allNotes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
  }

  async loadNotesFromApi() {
    await this.client.loadData(this.model.setNotes);
    this.displayNotes();
  }

  displayNotesFromApi() {
    this.displayNotes();
  }

  // displayNotesFromAPIwithout a callback
  async displayNotesFromApi2() {
      const result = await this.client.loadNotes()
      this.model.setNotes(result)
      this.displayNotes()
  }

  async createNote(data) {
    const result = await this.client.createNote(data);
    this.model.addNote(result);
    this.loadNotesFromApi();
  }
}


module.exports = NotesView;