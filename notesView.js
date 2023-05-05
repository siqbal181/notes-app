class NotesView {
  constructor(model, client) {
    this.client = client;
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');
    this.addNoteButton = document.querySelector('#note-button');
    
    this.addNoteButton.addEventListener('click', async () => {
      const noteInput = document.querySelector('#note-input').value;
      // this.model.addNote(noteInput);
      console.log(noteInput);
      await this.addNoteFromAPI(noteInput);
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
    // await this.client.loadData(this.model.setNotes);
    const result = await this.client.loadNotes();
    this.model.setNotes(result)
    this.displayNotes();
  }

  displayNotesFromApi() {
    this.displayNotes();
  }

  // displayNotesFromAPIwithout a callback
  // async displayNotesFromApi2() {
  //     const result = await this.client.loadNotes()
  //     this.model.setNotes(result)
  //     this.displayNotes()
  // }

  // async addNoteFromAPI() {
  //   const result = await this.client.createNote(document.querySelector('#note-input').value);
  //   // this.model.addNote(result);
  //   this.loadNotesFromApi();
  // }
  async addNoteFromAPI(data) {
    const result = await this.client.createNote(data);
  }
}


module.exports = NotesView;