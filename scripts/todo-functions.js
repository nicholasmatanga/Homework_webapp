'use strict'

// Retrieving existing todos from local storage
const getSavedTodos = function(){
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch(e){
        return []
    } 
}

// Mark todo as complete
const checkTodo = function(id,value){
    const todoItem = todos.find(function(todo){
        return todo.id===id
    })

    if(todoItem){
    todoItem.completed=value
    }
}

// Remove todo by id

const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function(todo){
        return todo.id === id
    })

    if(todoIndex>-1){
        todos.splice(todoIndex,1)
    }
    
}

// Save todos to local storage

const saveTodos = function(todos){
    localStorage.setItem('todos',JSON.stringify(todos))
}

// Generate the DOM structure for a todo item
const generateTodoDOM = function(todo){
    const root=document.createElement('label')
    const containerEl = document.createElement('div')
    const paragraph=document.createElement('span')
    const button=document.createElement('button')
    const checkbox=document.createElement('input')


    // Setup for completed todo checkbox
    checkbox.setAttribute('type','checkbox')
    checkbox.checked=todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change',function(){
        checkTodo(todo.id,checkbox.checked)
        saveTodos(todos)
        renderTodos(todos,filters)
    })

    // Setup for todo text content
    paragraph.textContent=todo.text
    containerEl.appendChild(paragraph)

    // Setup container
    root.appendChild(containerEl)
    containerEl.classList.add('todo_items_container')


    // Setup for delete button
    button.textContent='remove'
    button.classList.add('button_todo_item', 'button_remove')
    root.appendChild(button)
    button.addEventListener('click',function () {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    // Setup for todo button to edit title and text value of todo
    
    root.classList.add('todo_items')


    return root
}

const generateSummaryTodo = function(item){
    const mySummary = document.createElement('h2')
    const grammar = item.length === 1 ? 'todo' : 'todos'
    mySummary.classList.add('todo_summary')
    mySummary.textContent = `You have ${item.length} ${grammar} left`

    return mySummary

}

// Render application todos
const renderTodos=function(todos,filters){

    let filteredTodos = todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    
    const incompleteTodos=filteredTodos.filter(function(todo){
        return !todo.completed
    })
    
    document.querySelector('#todos').innerHTML=''
    
    
    const mySummary = generateSummaryTodo(incompleteTodos)
    document.querySelector('#todos').appendChild(mySummary)
    
    if(filteredTodos.length>0){
        if(!filters.hideCompleted){
            filteredTodos.forEach(function(todo){
                const paragraph=generateTodoDOM(todo)
                document.querySelector('#todos').appendChild(paragraph)
            })
            }else{
                filteredTodos.forEach(function(todo){
                    if(!todo.completed){
                    const paragraph=generateTodoDOM(todo)
                    document.querySelector('#todos').appendChild(paragraph)
                    }
                })
            }
    }else{
        const noShow = document.createElement('p')
        noShow.textContent = 'No to-dos to show'
        noShow.classList.add('empty-message')

        document.querySelector('#todos').appendChild(noShow)
    }
    }

