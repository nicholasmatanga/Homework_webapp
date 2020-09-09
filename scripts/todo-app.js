'use strict'

let todos = getSavedTodos()

const filters={
    searchText:'',
    hideCompleted:false
}

let newItemTodo = 0
let newIdTodo

renderTodos(todos,filters)

// Search for whatever is typed in and return the items that match
document.querySelector('#search_todos').addEventListener('input',function(e){
    filters.searchText=e.target.value
    renderTodos(todos,filters)
})

// Creates a new node in the DOM and displays
document.querySelector('#todo_form').addEventListener('submit',function(e){
    const todoText = e.target.elements.newTodo.value.trim()
    const todoId = uuidv4()
    e.preventDefault()
    if(todoText.length>0){
    todos.push({
        id: todoId,
        text:todoText,
        details:'',
        completed:false
    })
    
    newItemTodo = 1
    newIdTodo = todoId
    saveTodos(todos)
    renderTodos(todos,filters)
    e.target.elements.newTodo.value=''
}
    
})
// Hides anything that is not marked as complete
document.querySelector('#hide').addEventListener('change',function(e){
    filters.hideCompleted=e.target.checked
    renderTodos(todos,filters) 
})

// Notifies user to input values
document.querySelector('.submit').addEventListener('click',function(e){
    if(document.querySelector('.input').value === ''){
        document.querySelector('.input').setAttribute('placeholder','Please enter a new item')
    }
})


