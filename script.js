const url = "http://localhost:3000/notes"
const form = document.querySelector('#noteapp')
const noteList = document.getElementById('note-list')



form.addEventListener('submit', event => {
    event.preventDefault()
    const noteText = document.getElementById('note-text').value
    console.log(noteText, "Type notes here...")
    createNote(noteText)
})

noteList.addEventListener('click', event => {
    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
    }
})

function listNotes() {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        for (let note of data) {
            console.log(note)
            renderNoteItem(note)
        }
    })
}

function createNote(noteText) {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            create_at: moment().format() 
        })
    })
    .then(response => response.json())
    .then(data => renderNoteItem(data))
}

function deleteNote(element) {
    const noteId = element.parentElement.id
    fetch(url + "/" + `${noteId}`, {
        method: 'DELETE'
    }).then(() => element.remove())
}

function updateNote(element) {
    const noteId = element.parentElement.id
    const newText = prompt ("Modify new text")
    fetch(url + "/" + `${noteId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: newText,
            body: newText,
            create_at: moment().format() 
        })
    }).then(() => element.children[0].innerHTML= newText)
    
}

function renderNoteItem(noteObj) {
    const itemEl = document.createElement('li') 
    itemEl.id = noteObj.id
        renderNoteText(itemEl, noteObj)
        console.log(itemEl)
        noteList.appendChild(itemEl)
}

function renderNoteText(noteListItem, noteObj) {
    noteListItem.innerHTML = `<span class="dib w-40">${noteObj.body}</span><i class="delete" onclick="deleteNote(this.parentElement)">Delete</i><i class="Edit" onclick = "updateNote(this.parentElement)">Edit</i>`
}

listNotes();