'use strict'

// Read existing notes from localStorage
const getSavedNotes = function (){
    const notesJSON= localStorage.getItem('notes')
    
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    }catch(e){
        return []
    }
}
// Save the notes to local storage
const saveNotes = function (notes) {
    localStorage.setItem('notes',JSON.stringify(notes))
}

// Remove a note from the list
const removeNote = function(id){
    const noteIndex = notes.findIndex(function(note){
        return note.id===id
    })

    if(noteIndex>-1){
        notes.splice(noteIndex,1)
    }

    saveNotes(notes)
}

// Generate last edited text value
const generateLastEdited = function (timeStamp) {
    return `Last edited: ${moment(timeStamp).fromNow()}`
}

// Generate the DOM structure for a note
const generateNoteDom = function(note){
    const title = document.querySelector('#note_title')
    const body = document.querySelector('#note_body')
    const noteEl=document.createElement('button')
    const wordsContainer = document.createElement('div')
    const remove = document.createElement('button')
    const textEl=document.createElement('p')
    const statusEl=document.createElement('p')
    
    // Setup the note title text
    if(note.title.length>0){
        textEl.textContent=note.title
    }else{
        note.title = 'Unnamed note'
        textEl.textContent=note.title
    }
    // Remove button setup
    remove.textContent = 'Delete note'
    remove.addEventListener('click', function(){
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes,filtersNotes)
        title.value=''
        body.value=''
    })

    noteEl.addEventListener('click', function(){
        displayEditor()
        editNotes(note.id)
    })
    // Setup the status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    
    // Appending the the Note title and last updated text values
    wordsContainer.appendChild(textEl)
    wordsContainer.appendChild(statusEl)

    // Appending the words container for the note title and last updated text values and also appending remove button
    noteEl.appendChild(wordsContainer)
    noteEl.appendChild(remove)

    // Styling of the elements
    noteEl.classList.add('note_items')
    wordsContainer.classList.add('words')
    remove.classList.add('button','remove')


    return noteEl
}
// Sort your notes by one of three ways
const sortNotes = function (notes, sortBy) {
    if (sortBy === 'byEdited'){
        return notes.sort(function(a,b){
            if(a.updatedAt>b.updatedAt){
                return -1
            }else if(a.updatedAt<b.updatedAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'byCreated'){
        return notes.sort(function(a,b){
            if(a.createdAt>b.createdAt){
                return -1
            }else if(a.createdAt<b.createdAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'alphabetical'){
        return notes.sort(function(a,b){
            if(a.title.toLowerCase()<b.title.toLowerCase()){
                return -1
            }else if(a.title.toLowerCase()>b.title.toLowerCase()){
                return 1
            }else{
                return 0
            }
        })
    }else {
        return notes
    }
        
    
}

// Render application notes
const renderNotes = function(notes,filtersNotes){
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filtersNotes.sortBy)
    const filteredNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filtersNotes.searchText.toLowerCase())
    })

    notesEl.innerHTML=''

    if(filteredNotes.length>0){
        filteredNotes.forEach(function(note){
            const noteEl = generateNoteDom(note)
            notesEl.appendChild(noteEl)
        })
    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

    
}
// Editing notes section
const editNotes = function (id) {

    const titleElement = document.querySelector('#note_title')
    const bodyElement = document.querySelector('#note_body')

    const copy = []
    notes.forEach(function(note){
        copy.push({
            id:note.id,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
            title:note.title,
            body:note.body
        })
    })

    let note = notes.find(function (note) {
        return note.id === id
    })
    let index =notes.findIndex(function(note){
        return note.id === id
    })
    
    if(note){
        if(note.title === '' && note.body === ''){
            titleElement.setAttribute('placeholder','Start editing note')
        }else{
            titleElement.value=note.title
            bodyElement.value=note.body
        }
    }else{
        return
    }
    
    
    // Updates title of note
    titleElement.addEventListener('input',function(e){
        note.title = e.target.value
        note.updatedAt = moment().valueOf()
        notes = copy.filter(function(){
            return true
        })
        notes.splice(index,1,note)
        saveNotes(notes)
        renderNotes(notes,filtersNotes)
    })
    
    // Updates body of notes
    bodyElement.addEventListener('input',function(e){
        note.body = e.target.value
        note.updatedAt = moment().valueOf()
        notes = copy.filter(function(){
            return true
        })
        notes.splice(index,1,note)
        saveNotes(notes)
        renderNotes(notes,filtersNotes)
    })
    
    
    // Allows for syncing of data across multiple pages
    // (eg. if two tabs of the same document are open, the changes are reflected within the second document)
    window.addEventListener('storage',function(e){
        if (e.key === 'notes'){
          notes = JSON.parse(e.newValue)
        }
        note = notes.find(function (note) {
            return note.id === noteId
        })
        
        if (!note) {
            location.assign('index.html')
        }
        
        titleElement.value = note.title
        bodyElement.value = note.body
    })
    
    }
    
const displayEditor = function () {
    bodyEl.classList.add('body_style')
    editor.classList.add('editor_edit')
    editor.style.display = 'block'
}