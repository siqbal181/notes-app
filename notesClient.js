class NotesClient {
  loadData(callback) {
    return fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => callback(data))
  }

  // load notes without a callback
  async loadNotes() {
    const response = await fetch('http://localhost:3000/notes');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  // post notes
  async createNote(data) {
    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Success", result);
    } catch (error) {
      console.log("Error:", error);
    }
  }
}

module.exports = NotesClient;