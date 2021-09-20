// selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);


// functions

function addTodo(event){
    // prevent form from submitting
    event.preventDefault();

    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // save to localStorage
    saveLS(todoInput.value);

    // check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // delete button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // append to list
    todoList.appendChild(todoDiv);

    // clear input value
    todoInput.value = "";
}


function deletecheck(e){
    const item = e.target;

    // delete todo
    if(item.classList[0] === "trash-btn"){
        const todo =item.parentElement;
        todo.classList.add("fall");
        removeLS(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
        
    }

    // check mark
    if(item.classList[0] === "complete-btn"){
        const todo =item.parentElement;
        todo.classList.toggle("completed");
    }
};


function saveLS(todo) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

};

function getTodos() {
    let todos;

    if(localStorage.getItem("todos") === null){
        todos=[];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){

     // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-clipboard-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // delete button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // append to list
    todoList.appendChild(todoDiv);
    });

}

function removeLS(todo){

    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}