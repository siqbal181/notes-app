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
        body: JSON.stringify({content: data}),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }
}

module.exports = NotesClient;