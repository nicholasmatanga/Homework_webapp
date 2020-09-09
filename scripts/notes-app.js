'use strict'

let notes = getSavedNotes()

const filtersNotes= {
      searchText: '',
      sortBy: 'byEdited'
  }


const editor = document.querySelector('#editor_container')
const bodyEl = document.querySelector('body')

renderNotes(notes,filtersNotes)

document.querySelector('#create_note').addEventListener('click',function(e){
    const id = uuidv4();
    const timeStamp = moment().valueOf()

    notes.push({
       id:id,
       createdAt: timeStamp,
       updatedAt: timeStamp,
       title:'',
       body:''
   })

   displayEditor()
   saveNotes(notes)
   renderNotes(notes,filtersNotes)
   editNotes(id)
})


document.querySelector('#search_text').addEventListener('input',function(e){
    filtersNotes.searchText = e.target.value
    renderNotes(notes,filtersNotes)
})

document.querySelector('#sort_by').addEventListener('change',function(e){
    filtersNotes.sortBy = e.target.value
    renderNotes(notes, filtersNotes)
})

document.querySelector('.editor_button').addEventListener('click', function(){
    editor.classList.remove('editor_edit')
    editor.classList.add('closing')
    setTimeout(function(){
        editor.style.display = 'none'
    },500)
    
})

// Allows changes in the title to be reflected immediately in the home page as you are editing
// window.addEventListener('storage',function(e){
//     if (e.key === 'notes'){
//       notes = JSON.parse(e.newValue)
//       renderNotes(notes, filtersNotes) 
//     }
    
// })

