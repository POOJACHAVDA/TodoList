const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

// function to add todo

const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("you must write something in your to do");
    return false;
  }

  if (addBtn.value === "edit") {
    //passing the original text to editLocalTodos function before edit it in the todoList
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
  } 
  else {
    //creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    //creating Edit Btn
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);
    
    //creating Delete Btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};

//Function To Update : (Edit/Delete) todo

const updateTodo = (e) => {
  if (e.target.innerHTML === "remove") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }

  if (e.target.innerHTML === "edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "edit";
    editTodo = e;
  }
};

//Function to save Local to do
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } 
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

//Function to get Local to do
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } 
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo => {
       
      //creating p tag  
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      //creating Edit Btn
      const editBtn = document.createElement("button");
      editBtn.innerHTML = "edit";
      editBtn.classList.add("btn", "editBtn");
      li.appendChild(editBtn);
      
      //creating Delete Btn
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "remove";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
};

//Function to Delete Local todo
const deleteLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } 
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

    
  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  if(todoIndex > -1){
    todos.splice(todoIndex, 1);
  }
 
  localStorage.setItem("todos", JSON.stringify(todos));
  

};

const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
