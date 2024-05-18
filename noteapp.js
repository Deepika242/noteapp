const notesContainerEl = document.getElementById("app");
const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

getNotes().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  notesContainerEl.insertBefore(noteEl, btnEl);
  appEl.insertBefore(noteEl, btnEl);
});

btnEl.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("note-ap") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("note-ap", JSON.stringify(notes));
}

function createNoteEl(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Note";

  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });
  element.value = content;

  element.addEventListener("dblclick", () => {
    const noteDelete = confirm("Want to Delete the note?");
    if (noteDelete) {
      const warning = confirm("Do you want to delete this note?");
      if (warning) {
        deleteNote(id, element);
      }
    }
  });

  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNote(notes);
  appEl.removeChild(element);
}

function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];
  target.content = content;
  saveNote(notes);
}

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  notesContainerEl.insertBefore(noteEl, btnEl);
  appEl.insertBefore(noteEl, btnEl);

  notes.push(noteObj);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];

  target.content = newContent;
  saveNotes(notes);
  saveNote(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  function saveNote(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));
  }

  saveNotes(notes);
  notesContainerEl.removeChild(element);
  function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
  }

  btnEl.addEventListener("click", addNote);
}
